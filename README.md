# Final Project: PCAP Explorer

## What is it?
PCAP Explorer is a tool designed to help investigators examine trends in communication between IP addresses. It ingests PCAPs, aggregates statistics, and visualizes these stats in an HTML/JavaScript vizualization. The primary script is written in Python and the web app is HTML, CSS and JavaScript.

## Who made it?
This project was authored by **Casey McGinley** (cmm771@nyu.edu) as a final project for **Digital Forensics (CS-GY 6963)** taught by **Prof. Marc Budofsky**

## What external libraries/sources does it use?
This application is a fork from a previous project, authored by myself and Athanasios Papadopoulos, which visualized email communications over time. More information on this project can be found by following the link below:
https://github.com/nyu-cs6313-fall2015/Group-4
<br/><br/>
In addition, this project makes use of the following libraries/tools:
- D3
  - JavaScript library. Used to load data and dynamically manipulate HTML elements
  - https://d3js.org/
- Sortable
  - Used to make a pretty, sortable table
  - http://github.hubspot.com/sortable/docs/welcome/ 
- PyShark/Wireshark/Tshark
  - Used to parse the PCAPs
  - http://kiminewt.github.io/pyshark/ 
- tcpflow
  - Used to carve files out of TCP sessions in the PCAPs
  - https://github.com/simsong/tcpflow 
- BestCSSButtonGenerator
  - Used to generate CSS for buttons for the UI
  - http://www.bestcssbuttongenerator.com/ 

## Setup/Installation
This application was built and tested in a Debian-based Linux environment. It has been tested successfully in both Ubuntu and Kali linux. In order to install all Python related dependencies run "pip install -r requirements.txt". Alternatively, since pyshark is the only 3rd party Python module this project accesses directly, you should be able to just type "pip install pyshark" but if you run into any problems, pyshark's dependecies are listed explicitly in requirements.txt. However, PyShark is essentially just a wrapper around Wireshark/Tshark code, so you need to have these programs installed as well. On Ubuntu, you can do this with "apt-get install wireshark" and "apt-get install tshark". Finally, if you wish to use the tcpflow integration, that must be installed as well ("apt-get install tcpflow"). So, in summation, do the following:
- pip install -r requirements.txt
  - if the installation of libxml fails (as it did for me on Kali), do the following and then try again:
  - apt-get intstall libxml2-dev libxslt1-dev zlib1g-dev
- apt-get install wireshark
- apt-get install tshark
- apt-get install tcpflow

## Using PCAP Explorer
PCAP Explorer's command line options and instructions are as below:
```
usage: pcap_explorer.py [-h] [-i PCAP] [-o OUT] [-t] [-s] [-b] [-a] [-p PORT]

PCAP Explorer: A Python utility for the digital forensics investigator.
Ingests a PCAP, aggregates communication statistics for IP pairs, and launches
a web-based visualization. At least one (and possibly both) of the following
options must be provided at runtime: -i -s

optional arguments:
  -h, --help            show this help message and exit
  -i PCAP, --in_file PCAP
                        Filepath for input file (PCAP)
  -o OUT, --out_file OUT
                        Filepath for for the JSON output. data.json by
                        default. NOTE: The webapp only ingests data from
                        data.json
  -t, --tcpflow         Enables tcpflow data extraction. WARNING: all data in
                        tcpout/ will be overwritten
  -s, --server          Launch server for the web app
  -b, --browser         Open the webapp in your default browser
  -a, --all             Enables tcpflow, server and browser. Equivalent to
                        -tsb
  -p PORT, --port PORT  Port number to bind web app too. 8000 by default
```
The most common use-case will be the following:
```
python pcap_explorer.py -a -i myPCAP.pcap
```
That command will parse the PCAP, enable tcpflow, start a web server and launch your browser to localhost:8000
