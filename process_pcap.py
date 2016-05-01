import pyshark
import argparse
import json

def parse_args():
	parser = argparse.ArgumentParser(description="Outputs PCAP data to display")
	parser.add_argument("pcap", metavar="PCAP", type=str, help="filepath for PCAP")
	parser.add_argument("out", metavar="PCAP", type=str, help="filepath for for the JSON output")
	return parser.parse_args()

def main():
	args = parse_args()
	cap = pyshark.FileCapture(args.pcap)

	stats = dict()
	stats['agg'] = dict()
	stats['agg']['total'] = 0
	stats['agg']['per_protoc'] = dict()
	stats['per_ip'] = dict()

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

	stats_json = open(args.out,"w")
	stats_json.write(json.dumps(
		stats,
		indent=4,
		sort_keys=True,
		separators=(',',':'),
		encoding="utf-8"
	))
	stats_json.close()

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
