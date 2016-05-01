import pyshark
import argparse
import json
import SimpleHTTPServer
import SocketServer
import webbrowser
import os
import subprocess
import shutil
import re
from datetime import datetime

def parse_args():
	parser = argparse.ArgumentParser(description="Python script to process PCAP data and/or launch the web application. At least one (and possibly both) of the following options must be provided at runtime: -i -s")
	parser.add_argument("-i", "--in_file", metavar="PCAP", type=str, help="Filepath for input file (PCAP)")
	parser.add_argument("-o", "--out_file", metavar="OUT", type=str, help="Filepath for for the JSON output. data.json by default")
	parser.add_argument("-t", "--tcpflow", action="store_true", help="Enables tcpflow data extraction. WARNING: all data in tcpout/ will be overwritten")
	parser.add_argument("-s", "--server", action="store_true", help="Launch server for the web app")
	parser.add_argument("-b", "--browser", action="store_true", help="Open the webapp in your default browser")
	parser.add_argument("-a", "--all", action="store_true", help="Enables tcpflow, server and browser. Equivalent to -tsb")
	parser.add_argument("-p", "--port", metavar="PORT", type=int, help="Port number to bind web app too. 8000 by default")
	args = parser.parse_args()
	if args.all:
		args.tcpflow = True
		args.server = True
		args.browser = True
	if not args.in_file and not args.server:
		raise Exception("Neither -i nor -s was specified, at least one is required. Run again with -h for more information.")
	if args.browser and not args.server:
		raise Exception("The -b option is only available when -s is enabled as well. Run again with -h for more information.")
	if args.tcpflow and not args.in_file:
		raise Exception("The -t option is only available when a file has been provided with -i. Run again with -h for more information.")
	return args

def main():
	args = parse_args()
	if args.in_file:
		if args.out_file:
			process_pcap(args.in_file,args.tcpflow,out_filename=args.out_file)
		else:
			process_pcap(args.in_file,args.tcpflow)
	if args.server:
		if args.port:
			serve_app(args.browser,port=args.port)
		else:
			serve_app(args.browser)

def serve_app(open_browser,port=8000):
	if not os.path.isfile("data.json"):
		raise Exception("File data.json does not exist. Please run again with option -i and a specified PCAP to generate data.json")
	handler = SimpleHTTPServer.SimpleHTTPRequestHandler
	httpd = SocketServer.TCPServer(("", port), handler)
	print "*** Serving on http://localhost:" + str(port) + "/ ***"
	if open_browser:
		webbrowser.open("http://localhost:" + str(port) + "/")
	httpd.serve_forever()

def process_pcap(pcap_filename,tcpflow_enabled,out_filename="data.json"):
	stats = dict()
	stats['pcap'] = pcap_filename
	stats['agg'] = dict()
	stats['agg']['total'] = 0
	stats['agg']['per_protoc'] = dict()
	stats['per_ip'] = dict()
	stats['files'] = dict()

	parse_pcap(pcap_filename,stats)
	if tcpflow_enabled:
		run_tcpflow(pcap_filename)
		process_tcpout(stats)

	stats_json = open(out_filename,"w")
	stats_json.write(json.dumps(
		stats,
		indent=4,
		sort_keys=True,
		separators=(',',':'),
		encoding="utf-8"
	))
	stats_json.close()
	
	print ">>> Data written to " + out_filename + "\n"

def process_tcpout(stats):
	print ">>> Processing tcpout..."
	for dirpath, dirnames, filenames in os.walk("tcpout"):
		for filename in filenames: 
			if "report" in filename:
				continue
			pattern = re.compile(r"(\d{10})T(\d{3}\.\d{3}\.\d{3}\.\d{3})\.\d{5}\-(\d{3}\.\d{3}\.\d{3}\.\d{3})\.\d{5}")
			timestamp, ip_src, ip_dst = re.search(pattern, filename).groups()
			ip_src = ".".join([str(int(x)) for x in ip_src.split(".")])
			ip_dst = ".".join([str(int(x)) for x in ip_dst.split(".")])
			rel_path = "/"+os.path.join(dirpath,filename)
			if ip_src not in stats['files']:
				stats['files'][ip_src] = dict()
				stats['files'][ip_src][ip_dst] = dict()
			else:
				if ip_dst not in stats['files'][ip_src]:
					stats['files'][ip_src][ip_dst] = dict()
			stats['files'][ip_src][ip_dst][filename] = {"path":rel_path, "timestamp":timestamp, "time_string":datetime.fromtimestamp(int(timestamp)).strftime('%Y-%m-%d %I:%M:%S %p')}

			if ip_dst not in stats['files']:
				stats['files'][ip_dst] = dict()
				stats['files'][ip_dst][ip_src] = dict()
			else:
				if ip_src not in stats['files'][ip_dst]:
					stats['files'][ip_dst][ip_src] = dict()
			stats['files'][ip_dst][ip_src][filename] = {"path":rel_path, "timestamp":timestamp, "time_string":datetime.fromtimestamp(int(timestamp)).strftime('%Y-%m-%d %I:%M:%S %p')}
	print ">>> Done!"

def run_tcpflow(pcap_filename):
	if os.path.isdir("tcpout"):
		print ">>> Removing old files in directory tcpout..."
		shutil.rmtree("tcpout")
		print ">>> Done!"
	#tcpflow -Ft -a -o tcpout/ -r test.pcap 
	try:
		print ">>> Running tcpflow on " + pcap_filename + "..."
		subprocess.check_output(["tcpflow","-Ft","-a","-o","tcpout","-r",pcap_filename])
	except:
		raise Exception("Error carving files from " + pcap_filename)
	print ">>> Done!"

def parse_pcap(pcap_filename,stats):
	print ">>> Parsing " + pcap_filename + "..."
	cap = pyshark.FileCapture(pcap_filename)

	for pkt in cap:
		try:
			ip = pkt.ip
		except:
			continue
		if ip == None:
			continue
		protoc = pkt.highest_layer
		update_agg_stats(stats,ip,protoc)
		update_per_ip_stats(stats,ip,protoc)
	cap.close()
	print ">>> Done!"

def update_agg_stats(stats,ip,protoc):
	stats['agg']['total'] += 1
	if protoc in stats['agg']['per_protoc']:
		stats['agg']['per_protoc'][protoc] += 1
	else:
		stats['agg']['per_protoc'][protoc] = 1

def update_per_ip_stats(stats,ip,protoc):
	if not(ip.src in stats['per_ip']):
		init_per_ip(stats,ip.src)
	if not(ip.dst in stats['per_ip']):
		init_per_ip(stats,ip.dst)

	src_stats = stats['per_ip'][ip.src]
	dst_stats = stats['per_ip'][ip.dst]
	src_stats['agg']['total']['sent'] += 1
	dst_stats['agg']['total']['rcvd'] += 1
	# src_stats['agg']['total']['rcvd'] += 1
	if protoc in src_stats['agg']['per_protoc']:
		src_stats['agg']['per_protoc'][protoc]['sent'] += 1
		# src_stats['agg']['per_protoc'][protoc]['rcvd'] += 1
	else:
		src_stats['agg']['per_protoc'][protoc] = dict()
		src_stats['agg']['per_protoc'][protoc]['sent'] = 1
		src_stats['agg']['per_protoc'][protoc]['rcvd'] = 0
		# src_stats['agg']['per_protoc'][protoc]['rcvd'] = 1
	if protoc in dst_stats['agg']['per_protoc']:
		# src_stats['agg']['per_protoc'][protoc]['sent'] += 1
		dst_stats['agg']['per_protoc'][protoc]['rcvd'] += 1
	else:
		# src_stats['agg']['per_protoc'][protoc]['sent'] = 1
		dst_stats['agg']['per_protoc'][protoc] = dict()
		dst_stats['agg']['per_protoc'][protoc]['sent'] = 0
		dst_stats['agg']['per_protoc'][protoc]['rcvd'] = 1

	if ip.dst not in src_stats['per_other_ip']:
		init_per_other_ip(stats,ip.src,ip.dst)
	if ip.src not in dst_stats['per_other_ip']:
		init_per_other_ip(stats,ip.dst,ip.src)

	# other = src_stats['per_other_ip'][ip.dst]
	src_stats['per_other_ip'][ip.dst]['total']['sent'] += 1
	dst_stats['per_other_ip'][ip.src]['total']['rcvd'] += 1
	if protoc in src_stats['per_other_ip'][ip.dst]['per_protoc']:
		src_stats['per_other_ip'][ip.dst]['per_protoc'][protoc]['sent'] += 1
	else:
		src_stats['per_other_ip'][ip.dst]['per_protoc'][protoc] = dict()
		src_stats['per_other_ip'][ip.dst]['per_protoc'][protoc]['sent'] = 1
		src_stats['per_other_ip'][ip.dst]['per_protoc'][protoc]['rcvd'] = 0
	if protoc in dst_stats['per_other_ip'][ip.src]['per_protoc']:
		dst_stats['per_other_ip'][ip.src]['per_protoc'][protoc]['rcvd'] += 1
	else:
		dst_stats['per_other_ip'][ip.src]['per_protoc'][protoc] = dict()
		dst_stats['per_other_ip'][ip.src]['per_protoc'][protoc]['sent'] = 0
		dst_stats['per_other_ip'][ip.src]['per_protoc'][protoc]['rcvd'] = 1

def init_per_ip(stats,ip_addr):
	stats['per_ip'][ip_addr] = dict()
	stats['per_ip'][ip_addr]['agg'] = dict()
	stats['per_ip'][ip_addr]['agg']['total'] = dict()
	stats['per_ip'][ip_addr]['agg']['total']['sent'] = 0
	stats['per_ip'][ip_addr]['agg']['total']['rcvd'] = 0
	stats['per_ip'][ip_addr]['agg']['per_protoc'] = dict()
	stats['per_ip'][ip_addr]['per_other_ip'] = dict()

def init_per_other_ip(stats,ip_addr1,ip_addr2):
	stats['per_ip'][ip_addr1]['per_other_ip'][ip_addr2] = dict()
	stats['per_ip'][ip_addr1]['per_other_ip'][ip_addr2]['total'] = dict()
	stats['per_ip'][ip_addr1]['per_other_ip'][ip_addr2]['total']['sent'] = 0
	stats['per_ip'][ip_addr1]['per_other_ip'][ip_addr2]['total']['rcvd'] = 0
	stats['per_ip'][ip_addr1]['per_other_ip'][ip_addr2]['per_protoc'] = dict()

if __name__ == "__main__":
	main()
