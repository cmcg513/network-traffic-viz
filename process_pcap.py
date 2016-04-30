import pyshark
import argparse
import json

def parse_args():
	parser = argparse.ArgumentParser(description="Outputs PCAP data to display")
	parser.add_argument("pcap", metavar="PCAP", type=str, help="filepath for PCAP")
	return parser.parse_args()