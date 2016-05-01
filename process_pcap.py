import pyshark
import argparse
import json

def parse_args():
	parser = argparse.ArgumentParser(description="Outputs PCAP data to display")
	parser.add_argument("pcap", metavar="PCAP", type=str, help="filepath for PCAP")
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

	stats_json = open("stats.json","w")
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
	# update for ip.src
	update_per_ip_stats_sub(stats,ip.src,ip.dst,protoc)
	# update for ip.dst
	update_per_ip_stats_sub(stats,ip.dst,ip.src,protoc)

def update_per_ip_stats_sub(stats,ip_addr1,ip_addr2,protoc):
	if not(ip_addr1 in stats['per_ip']):
		init_per_ip(stats,ip_addr1)
	ip_stats = stats['per_ip'][ip_addr1]
	ip_stats['agg']['total'] += 1
	if protoc in ip_stats['agg']['per_protoc']:
		ip_stats['agg']['per_protoc'][protoc] += 1
	else:
		ip_stats['agg']['per_protoc'][protoc] = 1

	if ip_addr2 not in ip_stats['per_other_ip']:
		init_per_other_ip(stats,ip_addr1,ip_addr2)

	other_ip_stats = ip_stats['per_other_ip'][ip_addr2]
	other_ip_stats['total'] += 1
	if protoc in other_ip_stats['per_protoc']:
		other_ip_stats['per_protoc'][protoc] += 1
	else:
		other_ip_stats['per_protoc'][protoc] = 1

def init_per_ip(stats,ip_addr):
	stats['per_ip'][ip_addr] = dict()
	stats['per_ip'][ip_addr]['agg'] = dict()
	stats['per_ip'][ip_addr]['agg']['total'] = 0
	stats['per_ip'][ip_addr]['agg']['per_protoc'] = dict()
	stats['per_ip'][ip_addr]['per_other_ip'] = dict()

def init_per_other_ip(stats,ip_addr1,ip_addr2):
	stats['per_ip'][ip_addr1]['per_other_ip'][ip_addr2] = dict()
	stats['per_ip'][ip_addr1]['per_other_ip'][ip_addr2]['total'] = 0
	stats['per_ip'][ip_addr1]['per_other_ip'][ip_addr2]['per_protoc'] = dict()

if __name__ == "__main__":
	main()
