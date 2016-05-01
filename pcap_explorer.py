# Author: Casey McGinley
# Class: CS-GY 6963 Digital Forensics
# Instructor: Marc Budosky
#
# Final Project: PCAP Explorer
#
# Unlike the UI elements, this script had no foundation in the previous project. pcap_explorer is the CLI for the 
# PCAP Explorer project which ingests a PCAP, parses it, extracts files using tcpflow, aggregates statisitcs and 
# then outputs them in JSON format so that the web UI can read the data. In addition, this script launches a 
# simple HTTP server locally to host the webapp once that data processing is complete. The script also features 
# a rich set of command line arguments allowing users to perform these actions separately or in succession. 

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

# parse the command line arguments
def parse_args():
	parser = argparse.ArgumentParser(description="PCAP Explorer: A Python utility for the digital forensics investigator. Ingests a PCAP, aggregates communication statistics for IP pairs, and launches a web-based visualization. At least one (and possibly both) of the following options must be provided at runtime: -i -s")
	parser.add_argument("-i", "--in_file", metavar="PCAP", type=str, help="Filepath for input file (PCAP)")
	parser.add_argument("-o", "--out_file", metavar="OUT", type=str, help="Filepath for for the JSON output. data.json by default. NOTE: The webapp only ingests data from data.json")
	parser.add_argument("-t", "--tcpflow", action="store_true", help="Enables tcpflow data extraction. WARNING: all data in tcpout/ will be overwritten")
	parser.add_argument("-s", "--server", action="store_true", help="Launch server for the web app")
	parser.add_argument("-b", "--browser", action="store_true", help="Open the webapp in your default browser")
	parser.add_argument("-a", "--all", action="store_true", help="Enables tcpflow, server and browser. Equivalent to -tsb")
	parser.add_argument("-p", "--port", metavar="PORT", type=int, help="Port number to bind web app too. 8000 by default")
	args = parser.parse_args()

	# enable equivalent args
	if args.all:
		args.tcpflow = True
		args.server = True
		args.browser = True

	# ensure at least one of the main options were specified
	if not args.in_file and not args.server:
		raise Exception("Neither -i nor -s was specified, at least one is required. Run again with -h for more information.")
	# ensure the browser is attempted to be launched if the server isn't started
	if args.browser and not args.server:
		raise Exception("The -b option is only available when -s is enabled as well. Run again with -h for more information.")
	# ensure that tcpflow is only run when ingesting a PCAP
	if args.tcpflow and not args.in_file:
		raise Exception("The -t option is only available when a file has been provided with -i. Run again with -h for more information.")
	return args

# the main routine
def main():
	args = parse_args()

	# check if a PCAP was provided
	if args.in_file:
		# check if an output filename was specified
		if args.out_file:
			process_pcap(args.in_file,args.tcpflow,out_filename=args.out_file)
		else:
			process_pcap(args.in_file,args.tcpflow)
	# check if the server option was specified
	if args.server:
		# check if a port was specified
		if args.port:
			serve_app(args.browser,port=args.port)
		else:
			serve_app(args.browser)

# activates the server to host the web app
def serve_app(open_browser,port=8000):
	if not os.path.isfile("data.json"):
		raise Exception("File data.json does not exist. Please run again with option -i and a specified PCAP to generate data.json")
	handler = SimpleHTTPServer.SimpleHTTPRequestHandler
	httpd = SocketServer.TCPServer(("", port), handler)
	print "*** Serving on http://localhost:" + str(port) + "/ ***"
	# check if the user wants the script to launch their browser for them
	if open_browser:
		webbrowser.open("http://localhost:" + str(port) + "/")
	httpd.serve_forever()

# handles the ingest of PCAP files
def process_pcap(pcap_filename,tcpflow_enabled,out_filename="data.json"):
	# setup the statistics dictionary
	stats = dict()
	# record the PCAP's name (used as title in webapp)
	stats['pcap'] = pcap_filename
	# agg for aggregate
	stats['agg'] = dict()
	stats['agg']['total'] = 0
	stats['agg']['per_protoc'] = dict()
	stats['per_ip'] = dict()
	stats['files'] = dict()

	# generate statistics based on communication between IP pairs
	parse_pcap(pcap_filename,stats)

	# extract files with tcpflow if enabled
	if tcpflow_enabled:
		run_tcpflow(pcap_filename)
		process_tcpout(stats)

	# output the stats to JSON format
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

# process the tcpflow output and record the filepaths and time information
def process_tcpout(stats):
	print ">>> Processing tcpout..."
	for dirpath, dirnames, filenames in os.walk("tcpout"):
		for filename in filenames: 
			pattern = re.compile(r"(\d{10})T(\d{3}\.\d{3}\.\d{3}\.\d{3})\.\d{5}\-(\d{3}\.\d{3}\.\d{3}\.\d{3})\.\d{5}")
			try:
				timestamp, ip_src, ip_dst = re.search(pattern, filename).groups()
			except:
				continue
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

# execute tcpflow using subprocess
def run_tcpflow(pcap_filename):
	if os.path.isdir("tcpout"):
		print ">>> Removing old files in directory tcpout..."
		shutil.rmtree("tcpout")
		print ">>> Done!"
	try:
		print ">>> Running tcpflow on " + pcap_filename + "..."
		subprocess.check_output(["tcpflow","-Ft","-a","-o","tcpout","-r",pcap_filename])
	except:
		raise Exception("Error carving files from " + pcap_filename)
	print ">>> Done!"

# parse the PCAP using pyshark and generate the statisitics
def parse_pcap(pcap_filename,stats):
	print ">>> Parsing " + pcap_filename + "..."
	cap = pyshark.FileCapture(pcap_filename)

	# iterate over the packets
	for pkt in cap:
		# skip over packets residing on layers beneath IP
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

# update the aggregate statistics (for the whole batch, not just one IP)
def update_agg_stats(stats,ip,protoc):
	stats['agg']['total'] += 1
	if protoc in stats['agg']['per_protoc']:
		stats['agg']['per_protoc'][protoc] += 1
	else:
		stats['agg']['per_protoc'][protoc] = 1

# update statistics on a per-ip basis
def update_per_ip_stats(stats,ip,protoc):
	# initialize internal dictionaries as needed
	if not(ip.src in stats['per_ip']):
		init_per_ip(stats,ip.src)
	if not(ip.dst in stats['per_ip']):
		init_per_ip(stats,ip.dst)

	# update each IP's aggregate stats
	src_stats = stats['per_ip'][ip.src]
	dst_stats = stats['per_ip'][ip.dst]
	src_stats['agg']['total']['sent'] += 1
	dst_stats['agg']['total']['rcvd'] += 1

	# update each IP's aggregate stats on a per-protocol basis
	if protoc in src_stats['agg']['per_protoc']:
		src_stats['agg']['per_protoc'][protoc]['sent'] += 1
	else:
		src_stats['agg']['per_protoc'][protoc] = dict()
		src_stats['agg']['per_protoc'][protoc]['sent'] = 1
		src_stats['agg']['per_protoc'][protoc]['rcvd'] = 0
	if protoc in dst_stats['agg']['per_protoc']:
		dst_stats['agg']['per_protoc'][protoc]['rcvd'] += 1
	else:
		dst_stats['agg']['per_protoc'][protoc] = dict()
		dst_stats['agg']['per_protoc'][protoc]['sent'] = 0
		dst_stats['agg']['per_protoc'][protoc]['rcvd'] = 1

	# initialize as needed
	if ip.dst not in src_stats['per_other_ip']:
		init_per_other_ip(stats,ip.src,ip.dst)
	if ip.src not in dst_stats['per_other_ip']:
		init_per_other_ip(stats,ip.dst,ip.src)


	# update each IP's IP-pair stats on a total basis
	src_stats['per_other_ip'][ip.dst]['total']['sent'] += 1
	dst_stats['per_other_ip'][ip.src]['total']['rcvd'] += 1

	# update each IP's IP-pair stats on a per-protocol basis
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

# initialize the dictionary structure
def init_per_ip(stats,ip_addr):
	stats['per_ip'][ip_addr] = dict()
	stats['per_ip'][ip_addr]['agg'] = dict()
	stats['per_ip'][ip_addr]['agg']['total'] = dict()
	stats['per_ip'][ip_addr]['agg']['total']['sent'] = 0
	stats['per_ip'][ip_addr]['agg']['total']['rcvd'] = 0
	stats['per_ip'][ip_addr]['agg']['per_protoc'] = dict()
	stats['per_ip'][ip_addr]['per_other_ip'] = dict()

# initialize the dicitonary structure
def init_per_other_ip(stats,ip_addr1,ip_addr2):
	stats['per_ip'][ip_addr1]['per_other_ip'][ip_addr2] = dict()
	stats['per_ip'][ip_addr1]['per_other_ip'][ip_addr2]['total'] = dict()
	stats['per_ip'][ip_addr1]['per_other_ip'][ip_addr2]['total']['sent'] = 0
	stats['per_ip'][ip_addr1]['per_other_ip'][ip_addr2]['total']['rcvd'] = 0
	stats['per_ip'][ip_addr1]['per_other_ip'][ip_addr2]['per_protoc'] = dict()

if __name__ == "__main__":
	main()
