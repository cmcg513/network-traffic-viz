/*
Author: Casey McGinley
Class: CS-GY 6963 Digital Forensics
Instructor: Marc Budosky

Final Project: PCAP Explorer

The UI component of this project was based heavily off a previous project
of mine which can be found here: https://github.com/nyu-cs6313-fall2015/Group-4

The code had to be modified very heavily in order to support the new data set
and add new features, though much of the core infrastructure and visual elements 
were preserved from the original project. Things explicitly marked old were largely
untouched. Things explicitly marked new are entirely new features. Things left unmarked
are a mix of the old and new
*/

//Closes the loading window
function closeLoadingOverlay() {
    d3.select("#loading").style("display", "none");
    d3.select("#overlayBkgrd").style("display", "none");
    d3.select("#headTitle").text(Controller.title);
    d3.select("#pageTitle").text(Controller.title);
}

//Opens an overlay for selecting a new IP
function openIPSelectOverlay() {
    d3.select("#IPSelectBlock").style("display","block");
    d3.select("#overlayBkgrd").style("display", "block");
}

//Closes the summary overlay
function closeSummaryOverlay() {
    d3.select("#summaryListBlock").style("display","none");
    d3.select("#overlayBkgrd").style("display", "none");
}

//Closes the overlay for selecting an IP
function closeIPSelectOverlay() {
    d3.select("#IPSelectBlock").style("display","none");
    d3.select("#overlayBkgrd").style("display", "none");
}

//Opens a configruation overlay
function openConfigureOverlay() {
    d3.select("#configureWindow").style("display", "block");
    d3.select("#overlayBkgrd").style("display", "block");
}

//Closes a configuration overlay
function closeConfigureOverlay() {
    d3.select("#configureWindow").style("display", "none");
    d3.select("#overlayBkgrd").style("display", "none");
}

//Advances the paging (paging implemented when too many IPs
//are on the y-axis at once; this threshold is configurable)
function goToNextPage() {
    Selection.nextPage();
}

//Return to the previous set of y-axis values
function goToPrevPage() {
    Selection.prevPage();
}

// return the radius for a given area (old)
function return_radius(area) {
    return Math.sqrt(area/Math.PI);
}

//returns the area for a given radius (old)
function return_area(radius) {
    return Math.round(Math.PI*Math.pow(radius, 2));
}

//generates the node objects for the viz based on the given IP address
//modified from the old code fit the data and to "chunk" the the list of node objects
//in order to support paging
function get_node_list(chosen_ip,chunk_size) {
    var ip_data = Controller.ip_data;
    var files = Controller.files;
    var chunked_node_list = [];
    var node_list = [];
    var i = 0;
    
    //construct nodes based on the chosen IP and the IP's that IP communicated with
    //"chunk" them so that the y-axis is not too crowded
    for (other_user in ip_data[chosen_ip]['per_other_ip']) {
        i += 1;
        for (protoc in ip_data[chosen_ip]['per_other_ip'][other_user]['per_protoc']) {
            //generate a list of the filenames exchanged between these IPs
            var fnames = [];
            if (chosen_ip in files) {
                if (other_user in files[chosen_ip]) {
                    fnames = Object.keys(files[chosen_ip][other_user]);
                }
            }
            node = {
                name: other_user,
                protoc: protoc,
                nSent: ip_data[chosen_ip]['per_other_ip'][other_user]['per_protoc'][protoc]['sent'],
                nRecvd: ip_data[chosen_ip]['per_other_ip'][other_user]['per_protoc'][protoc]['rcvd'],
                nTotal: ip_data[chosen_ip]['per_other_ip'][other_user]['per_protoc'][protoc]['sent'] + ip_data[chosen_ip]['per_other_ip'][other_user]['per_protoc'][protoc]['rcvd'],
                fnames: fnames
            };
            node_list.push(node);
        }
        if (i % chunk_size == 0) {
            chunked_node_list.push(node_list);
            node_list = [];
        }
    }
    //make sure the last chunk is pushed on
    if (i % chunk_size != 0) {
        chunked_node_list.push(node_list);
    }
    return chunked_node_list;
}

//returns a list of the aggregated communication statistics for each IP 
//based on old code, modified to support the new data and structure
//the returned data is used to populate the SideBar element
function get_other_ips_numbers(other_ips, chosen_ip) {
    var ip_data = Controller.ip_data;
    var files = Controller.files;
    var total_comm = [];
    
    //get aggregate data for the chosen ip
    total_comm[0] = {};
    total_comm[0]["name"] = "Total (" + chosen_ip + ")";
    total_comm[0]["sent"] = ip_data[chosen_ip]['agg']['total']['sent'];
    total_comm[0]["received"] = ip_data[chosen_ip]['agg']['total']['rcvd'];
    total_comm[0]['fnames'] = []

    //get aggregate data as it relates to chosen ip and every other IP
    for (var i = 1; i <= other_ips.length; i++) {
        var fnames = [];
        if (other_ips[i-1] in files) {
            if (chosen_ip in files[other_ips[i-1]]) {
                fnames = Object.keys(files[other_ips[i-1]][chosen_ip]);
            }
        }
        total_comm[i] = {};
        total_comm[i]["name"] = other_ips[i-1];
        total_comm[i]["sent"] = ip_data[other_ips[i-1]]['per_other_ip'][chosen_ip]['total']['sent'];
        total_comm[i]["received"] = ip_data[other_ips[i-1]]['per_other_ip'][chosen_ip]['total']['rcvd'];
        total_comm[i]["fnames"] = fnames;
    }
    return total_comm;
}

//returns a list of the IP addresses that the currently selected IP communicated with
//based on old code and mostly unchanged, aside from the custom sort function
function get_other_ips(node_list) {
    var other_ips = [];
    for (var i = 0; i < node_list.length; i++) {
        if (other_ips.indexOf(node_list[i].name) < 0) {
            other_ips.push(node_list[i].name);
        }
    }
    return other_ips.sort(function(a,b) {
        var split_a = a.split(".");
        var split_b = b.split(".");
        for (var i = 0; i < split_a.length; i++) {
            if (parseInt(split_a[i]) > parseInt(split_b[i])) {
                return 1;
            }
            if (parseInt(split_a[i]) < parseInt(split_b[i])) {
                return -1;
            }
        }
        return 0;
    });
}

//returns a list of protocols (new)
function get_protocs(node_list) {
    var protocs = [];
    for (var i = 0; i < node_list.length; i++) {
        if (protocs.indexOf(node_list[i].protoc) < 0) {
            protocs.push(node_list[i].protoc);
        }
    }
    return protocs;
}

//generates a list of numbers between start and end, inclusive (new)
function generate_numbers(start,end) {
    var nums = [];
    for (var i = start; i <= end; i++) {
        nums.push(i);
    }
    return nums;
}


//manages the whole viz, imports the data and starts the init process
//the Controller, Dispatcher and Selection entities were first implemented
//in the original project; they manage all of the event-based changes to the 
//data and the constraints
//this posrtion was modifief only to suit the new data
var Controller = {
    init: function() {
        self = this;
        d3.json("data.json", function(data) {
            self.title = data.pcap;
            self.files = data.files;
            self.ip_list = Object.keys(data.per_ip).sort(function(a,b) {
                var split_a = a.split(".");
                var split_b = b.split(".");
                for (var i = 0; i < split_a.length; i++) {
                    if (parseInt(split_a[i]) > parseInt(split_b[i])) {
                        return 1;
                    }
                    if (parseInt(split_a[i]) < parseInt(split_b[i])) {
                        return -1;
                    }
                }
                return 0;
            });
            self.ip_data = data.per_ip;

            Selection.init(self.ip_list);
            IPSelectList.init(self.ip_data);
            closeLoadingOverlay();
        });
    }
}

//handles the context switches from one IP to another
//same basic structure as in the orgiinal project, but some hefty additions
//to support new features and more complex data in this project
var Selection = {
    //initialization
    init: function(ip_list) {
        this.ip_list = ip_list;
        this.chunk_size = 10;
        this.chosen_ip = ip_list[0];
        this.maxNodeRad = 15;

        //assigns the select action to the dropdown element
        this.ddown = d3.select("#dropdown").on('change', function() {
            Selection.select(d3.select(this).property('value'));
        });
        
        //sets up the dropdown action allowing users to select how many entries appear on the y-axis at once (new feature)
        this.chunk_select = d3.select("#setChunkSize").on('change', function() {
            Selection.chunk_size = parseInt(d3.select(this).property('value'));
            Selection.select(Selection.chosen_ip);
        });
        
        //sets up the dropdown action allowing users to select how large the nodes scale to (new feature)
        //disabling this feature due to ongoing bugs
//        this.rad_select = d3.select("#setMaxNodeSize").on('change', function() {
//            Selection.maxNodeRad = parseInt(d3.select(this).property('value'));
//            Selection.select(Selection.chosen_ip);
//        });
        
        //selects the first IP in the list by default
        Selection.select(this.chosen_ip);
    },

    //performs the selection; generates the new nodes and other internal data structures
    select: function(chosen_ip) {
        this.chosen_ip = chosen_ip;
        this.chunked_node_list = get_node_list(chosen_ip,this.chunk_size);
        this.chunk_index = 0;
        var node_list = this.chunked_node_list[0];
        
        //enable the next arrow if there is more than one chunk/page (new)
        if (this.chunked_node_list.length > 1) {
            d3.select("#nextArrow").style("display","inline");
            var ipRange = d3.select("#ipRange");
            ipRange.style("display","inline");
            ipRange.text("Page " + 1 + " of " + this.chunked_node_list.length);
        } else { //otherwise ensure the arrows are hidden
            d3.select("#prevArrow").style("display","none");
            d3.select("#nextArrow").style("display","none");
            d3.select("#ipRange").style("display","none");
        }
        
        //setup the payload
        var other_ips = get_other_ips(node_list);
        var total_comm = get_other_ips_numbers(other_ips, chosen_ip);
        var protocs = get_protocs(node_list);
        var payload = [node_list, other_ips, total_comm, protocs, this.maxNodeRad];

        //assigns the user list to the dropdown values for the IP selection dropdown
        var opt_elements = this.ddown.selectAll("option").data(this.ip_list);
        opt_elements.exit().remove();
        opt_elements.enter().append("option");
        opt_elements.transition().attr({
            selected: function(d) {
                if (d == chosen_ip) { return "selected"; }
                else { return null; }
            },
            value: function(d) { return d; },
        }).text(function(d) { return d; });
        
        //assigns values for the paging dropdown (new)
        var chunk_sizes = generate_numbers(1,100);
        opt_elements = this.chunk_select.selectAll("option").data(chunk_sizes);
        opt_elements.exit().remove();
        opt_elements.enter().append("option");
        opt_elements.transition().attr({
            selected: function(d) {
                if (d == Selection.chunk_size) { return "selected"; }
                else { return null; }
            },
            value: function(d) { return d; },
        }).text(function(d) { return d; });
        
        //assigns values for the node size dropdown
        //disabling this feature due to ongoing bugs
//        var rad_sizes = generate_numbers(15,100);
//        opt_elements = this.rad_select.selectAll("option").data(rad_sizes);
//        opt_elements.exit().remove();
//        opt_elements.enter().append("option");
//        opt_elements.transition().attr({
//            selected: function(d) {
//                if (d == Selection.maxNodeRad) { return "selected"; }
//                else { return null; }
//            },
//            value: function(d) { return d; },
//        }).text(function(d) { return d; });

        //notify the Dispatcher that the data has changed
        Dispatcher.notify('update', payload);
    },
    
    //advance the paging (e.g. the next chunk) (new)
    nextPage: function() {
        this.chunk_index += 1;
        var node_list = this.chunked_node_list[this.chunk_index];
        var other_ips = get_other_ips(node_list);
        var total_comm = get_other_ips_numbers(other_ips, this.chosen_ip);
        var protocs = get_protocs(node_list);
        var payload = [node_list, other_ips, total_comm, protocs, this.maxNodeRad];
        
        //hide and display the arrows as needed
        if (this.chunk_index == 1) {
            d3.select("#prevArrow").style("display","inline");
        }
        if (this.chunk_index == (this.chunked_node_list.length - 1)) {
            d3.select("#nextArrow").style("display","none");
        }
        d3.select("#ipRange").text("Page " + (this.chunk_index + 1) + " of " + this.chunked_node_list.length);
        
        //update the payload for the new chunk of IPs
        Dispatcher.notify('update', payload);
    },
    
    //go back a page (the previous chunk) (new)
    prevPage: function() {
        this.chunk_index -= 1;
        var node_list = this.chunked_node_list[this.chunk_index];
        var other_ips = get_other_ips(node_list);
        var total_comm = get_other_ips_numbers(other_ips, this.chosen_ip);
        var protocs = get_protocs(node_list);
        var payload = [node_list, other_ips, total_comm, protocs, this.maxNodeRad];
        if (this.chunk_index == 0) {
            d3.select("#prevArrow").style("display","none");
        }
        if (this.chunk_index == (this.chunked_node_list.length - 2)) {
            d3.select("#nextArrow").style("display","inline");
        }
        d3.select("#ipRange").text("Page " + (this.chunk_index + 1) + " of " + this.chunked_node_list.length);
        Dispatcher.notify('update', payload);
    }
}

//notifies its subscribers when data changes
//almost entirely unchanged; just an entity that ensures the synchonizaiton of it's
//subscribers
var Dispatcher = {
    //add a new subscriber
    add: function(view) {
        if(!this.subscribers) { 
            this.subscribers = [];
        }
        this.subscribers.push(view);
    },
    //distribute payload of new data to subscribers
    notify: function(type, payload) {
        this.subscribers.forEach(function(s) {
            s[type](payload);
        });
    }
}

//the visualization itself
//largely unchanged from the original project
//modifications here were solely to get the visualization to fit the new data (e.g. making the scale ordinal 
//for the protocols on the x-axis, etc.)
var Timeline = {
    //initialization
    init: function() {
        //------ Establish some important dimensional settings ------
        //calculate window and SVG height based on browser size
        this.WINDOW_WIDTH = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        this.WINDOW_HEIGHT = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        this.SVG_WIDTH = this.WINDOW_WIDTH - 350;
        this.SVG_HEIGHT = this.WINDOW_HEIGHT - 70;

        //calculate the size of the legend and the X and Y dimensions of the main SVG
        this.LEGEND_X = 100;
        this.RANGE = this.SVG_WIDTH - this.LEGEND_X

        this.X_AXIS_OFFSET_Y = this.SVG_HEIGHT - 80;
        this.Y_AXIS_OFFSET_X = 200;
        this.X_AXIS_OFFSET_X = 0;
        this.Y_AXIS_OFFSET_Y = 0;

        this.X_AXIS_RANGE_LOW = this.Y_AXIS_OFFSET_X;
        this.X_AXIS_RANGE_HIGH = this.RANGE - 30;
        this.Y_AXIS_RANGE_LOW = 40;
        this.Y_AXIS_RANGE_HIGH = this.X_AXIS_OFFSET_Y;

        //Set dimensions of the viz
        d3.select("#viz").attr("width", this.SVG_WIDTH);
        d3.select("#viz").attr("height", this.SVG_HEIGHT);

        //append the tags for the nodes, legend and "crosshairs"
        d3.select("#viz").append("g").attr("id", "x_lines");
        d3.select("#viz").append("g").attr("id", "y_lines");
        d3.select("#viz").append("g").attr("id", "nodesSent");
        d3.select("#viz").append("g").attr("id", "nodesReceived");
        d3.select("#viz").append("g").attr("id", "legend");

//                    this.x_scale = d3.time.scale();
        //Establish the X-scale --> mapping to an ordinal value, protocol names
        this.x_scale = d3.scale.ordinal();
        this.x_scale.rangePoints([this.X_AXIS_RANGE_LOW, this.X_AXIS_RANGE_HIGH], 1);

        //Establish Y scale --> mapping to an ordinal value, IP addresses
        this.y_scale = d3.scale.ordinal();
        this.y_scale.rangePoints([this.Y_AXIS_RANGE_LOW, this.Y_AXIS_RANGE_HIGH], 1);

        //Establish X axis
        this.x_axis = d3.svg.axis(); 
        this.x_axis.scale(this.x_scale);
        this.x_axis.orient("bottom");

        //Establish Y axis
        this.y_axis = d3.svg.axis();
        this.y_axis.scale(this.y_scale);
        this.y_axis.orient("left");
        this.x_axis
            .tickSize(10,0);
        this.y_axis
            .tickSize(20,0);

        //Append the x-axis
        this.x_axis_group = d3.select("#viz")
            .append("g")
            .attr("transform", "translate(" + this.X_AXIS_OFFSET_X + "," + this.X_AXIS_OFFSET_Y + ")");
        //Append the y-axis
        this.y_axis_group = d3.select("#viz")
            .append("g")
            .attr("transform", "translate(" + this.Y_AXIS_OFFSET_X + "," + this.Y_AXIS_OFFSET_Y + ")");
    },

    //update the timeline for the new payload of data
    update: function(payload) {
        var self = this;
        var node_list = payload[0];
        var other_ips = payload[1];
//                    var dates = payload[2];
        var protocs = payload[3];
        var maxNodeRad = payload[4];
        
        //min and max radius size for nodes
        this.MIN_R = 5;
        this.MAX_R = maxNodeRad;

//                    this.x_scale.domain([dates[0], dates[dates.length-1]]);
        //set the domains of the x and y scales
        //the domains represent the internal value associated with the scale, and will be mapped to range values
        //which can be thought of as the "real" (e.g. pixels, length)
        this.x_scale.domain(protocs);
        this.y_scale.domain(other_ips);

        //"activate" the x and y axes
        this.x_axis_group.transition().call(this.x_axis)
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-35)");
        this.y_axis_group.transition().call(this.y_axis);

        //select the main svg tag
        var svg = d3.select("#viz");

        //remove the old x-line svg elements and append new ones
        var x_lines = svg.select("#x_lines").selectAll("line").data(other_ips);
        x_lines.exit().remove();
        x_lines.enter().append("line");
        x_lines.attr({
            x1: self.X_AXIS_RANGE_LOW,
            y1: function(d) { return self.y_scale(d); },
            x2: self.X_AXIS_RANGE_HIGH,
            y2: function(d) { return self.y_scale(d); }
        });

        //remove the old y-line svg elements and append new ones
        var y_lines = svg.select("#y_lines").selectAll("line").data(protocs);
        y_lines.exit().remove();
        y_lines.enter().append("line");
        y_lines.attr({
            x1: function(d) { return self.x_scale(d); },
            y1: self.Y_AXIS_RANGE_LOW,
            x2: function(d) { return self.x_scale(d); },
            y2: self.Y_AXIS_RANGE_HIGH
        });

        //determine the mac and min radius sizes of all of the node elements
        var maxR = 0;
        console.log(node_list)
        console.log(node_list[0].nTotal);
        var minR = return_radius(node_list[0].nTotal);
        for (var i = 0; i < node_list.length; i++) {
            var r = return_radius(node_list[i].nSent);
            if (r > 0) {
                if (r > maxR) { maxR = r; };
                if (r < minR) { minR = r; };
            }
            r = return_radius(node_list[i].nRecvd);
            if (r > 0) {
                if (r > maxR) { maxR = r; };
                if (r < minR) { minR = r; };
            }
        };

        //TODO: the two segements below shoudl be extracted into a function since the code is so similar
        //scale the radius sizes based on the absolute max and min range value establish in the init procedure
        var area_scale = d3.scale.linear();
        // var area_scale = d3.scale.log();
        area_scale.range([self.MIN_R, self.MAX_R]);
        area_scale.domain([minR, maxR]);

        //remove the old nodes representing traffic sent and add the new ones for the new data
        var node_elements = svg.select("#nodesSent").selectAll("circle").data(node_list);
        node_elements.exit().remove();
        node_elements.enter().append("circle");

        //establish the event based functionality of these nodes
        node_elements
            .on('mouseover', function(d) {
            Dispatcher.notify('onMouseover', d);
        }).on('mouseout', function(d) {
            Dispatcher.notify('onMouseout', d);
        }).on('click', function(d) {
            Dispatcher.notify('onMouseout', d);
            Summary.call(d);
        }).on('contextmenu', function(d){
            Dispatcher.notify('onMouseout', d);
            d3.event.preventDefault();
            Selection.select(d.name); //a right-click cause a new selection to be made (a context switch)
        });

        //set the radius and position for the node elements
        node_elements.transition().attr({
            r: function(d) { if (d.nSent == 0) { return 0; } else { return area_scale(return_radius(d.nSent)); } },
            cx: function(d) { return self.x_scale(d.protoc) },
            cy: function(d) { return self.y_scale(d.name) }
        });
        node_elements.classed("sent", true);

        //remove the old nodes representing traffic received and add the new ones for the new data
        var node_elements = svg.select("#nodesReceived").selectAll("circle").data(node_list);
        node_elements.exit().remove();

        node_elements.enter().append("circle");
        node_elements
            .on('mouseover', function(d) {
            Dispatcher.notify('onMouseover', d);
        }).on('mouseout', function(d) {
            Dispatcher.notify('onMouseout', d);
        }).on('click', function(d) {
            Dispatcher.notify('onMouseout', d);
            Summary.call(d);
        }).on('contextmenu', function(d){
            Dispatcher.notify('onMouseout', d);
            d3.event.preventDefault();
            Selection.select(d.name);
        });

        //set the radius and position for the node elements
        node_elements.transition().attr({
            r: function(d) { if (d.nRecvd == 0) { return 0; } else { return area_scale(return_radius(d.nRecvd)); } },
            cx: function(d) { return self.x_scale(d.protoc) },
            cy: function(d) { return self.y_scale(d.name) }
        });
        node_elements.classed("received", true);

        //update the legend
        d3.select("#legend").remove();
        d3.select("#viz").append("g").attr("id", "legend");

        //sets up the sizes of the three "sample" nodes in the legend
        if (return_area(maxR) == return_area(minR)) {
            var rSize = 1; 
        }
        else if (return_area(maxR) == return_area(minR)+1) {
            var rSize = 2;
        }
        else if (return_area(maxR) > return_area(minR)+1) {
            var rSize = 3;
        }

        //the remaining code was poorly commented and written by a collaborator on the project that this projcet was forked from
        //it sets up the legend, but its logic is a bit opaque; still working through it myself
        //as far as future work goes, cleaning up the legend and it's code is high on the list
        var rMargin = 15;

        var r = [ { "radius": minR, "height": (self.X_AXIS_OFFSET_Y - area_scale(minR) - rMargin), } ];

        for (var i = 1; i < rSize; i++) {
            r.push({ "radius": minR + ((maxR - minR) / (rSize - 1)) * i });
            r[i].height = r[i-1].height - area_scale(r[i-1].radius) - rMargin - area_scale(r[i].radius);
        };

        var rectW = 6 * area_scale(maxR);
        var rectHh = self.X_AXIS_OFFSET_Y;
        var rectHl = r[rSize-1].height - area_scale(r[rSize-1].radius) - rMargin;
        var rectH = rectHh - rectHl;

        var legend = d3.select("#legend");

        var cx = self.RANGE;
        legend.append("rect")
            .attr("x", cx)
            .attr("y", rectHl)
            .attr("width", rectW)
            .attr("height", rectH)
            .style("fill", "none")
            .style("stroke", "eeeeee")
            .style("stroke-width", "2")

        for (var i = 0; i < rSize; i++) {
            legend.append("circle")
                .attr("r", area_scale(r[i].radius))
                .attr("cx", cx + 2*area_scale(maxR))
                // .attr("cx", cx + rectW/3)
                .attr("cy", r[i].height)
                .style("fill", "navy");

            legend.append("text")
                .attr("x", cx + 4.5*area_scale(maxR))
                // .attr("x", cx + rectW*2/3 )
                .attr("y", r[i].height + 4 )
                .style("font-size", "100%")
                .text( return_area(r[i].radius) );
        }

        var colorRectH = 20;
        var colorRectW = 20;
        var safety = 20;
        var dist = 20;
        var rectH1 = rectHl - safety - colorRectH;
        var rectH2 = rectH1 - safety - colorRectH;

        legend.append("rect")
            .attr("x", cx)
            .attr("y", rectH1)
            .attr("width", colorRectW)
            .attr("height", colorRectH)
            .style("fill", "red")
            .style("opacity", 0.7);

        legend.append("text")
                .attr("x", cx + colorRectW + 10 )
                .attr("y", rectH1 + colorRectH*2/3 )
                .style("font-size", "100%")
                .text( "Sent" );

        legend.append("rect")
            .attr("x", cx)
            .attr("y", rectH2)
            .attr("width", colorRectW)
            .attr("height", colorRectH)
            .style("fill", "green")
            .style("opacity", 0.5);

        legend.append("text")
                .attr("x", cx + colorRectW + 10 )
                .attr("y", rectH2 + colorRectH*2/3 )
                .style("font-size", "100%")
                .text( "Received" );
    }, 

    //returns sent node matching d
    getItemSent: function(d) {
        return d3.select("#nodesSent").selectAll("circle").filter(function(e) {
            return ((d.name == e.name) && (d.protoc == e.protoc));
        });
    },

    //returns received node matching d
    getItemReceived: function(d) {
        return d3.select("#nodesReceived").selectAll("circle").filter(function(e) {
            return ((d.name == e.name) && (d.protoc == e.protoc));
        });
    },

    //returns x-line matching d
    getXLine: function(d) {
        return d3.select("#x_lines").selectAll("line").filter(function(e) {
            return (d.name == e);
        });
    },

    //returns y-line matching d
    getYLine: function(d) {
        return d3.select("#y_lines").selectAll("line").filter(function(e) {
//                        return ((d.date.getMonth() == e.getMonth()) && (d.date.getFullYear() == e.getFullYear()));
            return (d.protoc == e);
        });
    },

    //establishes mouseover behavior when mouseover a node
    onMouseover: function(d) {
        //highlight the corresponding SVG elements
        this.getItemSent(d).classed("highlighted", true);
        this.getItemReceived(d).classed("highlighted", true);
        this.getXLine(d)
            .style("opacity", 1);
        this.getYLine(d)
            .style("opacity", 1);

        //bring up the tooltip
        var tooltip = d3.select("#tooltip");
        tooltip.select("#nodeNameDate").text(d.name + " - " + d.protoc);
        tooltip.select("#nodeSent").text("sent: " + String(d.nSent));
        tooltip.select("#nodeRecvd").text("received: " + String(d.nRecvd));
        tooltip.style("display", "block");

        //offset the tooltip a bit so that it's not on top of the mouse
        //default it to the right side, but flip to the left if at the window's edge
        var left = (d3.event.pageX) + 10;
        var right = left + parseInt(tooltip.style("width"));
        if (right > this.WINDOW_WIDTH) {
            right = (d3.event.pageX) - 30;
            left = right - parseInt(tooltip.style("width"))
        } 
        tooltip.style("left", (left + "px"));
        tooltip.style("top", ((d3.event.pageY) + 10) + "px");
    },

    //establishes the mouseover behavior for nodes/lines when mouseover the correspsonding list
    onMouseoverList: function(d) {
        this.getXLine(d)
            .style("opacity", 1);
    },

    //establishes mouseout behavior (e.g. un-highlight and remove tooltip)
    onMouseout: function(d) {
        this.getItemSent(d).classed("highlighted", false);
        this.getItemReceived(d).classed("highlighted", false);
        this.getXLine(d)
            .style("opacity", 0.25);
        this.getYLine(d)
            .style("opacity", 0.25);
        d3.select("#tooltip").style("display", "none");
    },

    //establishes the mouseout behavior for nodes/lines when mouseout the correspsonding list
    onMouseoutList: function(d) {
        this.getItemSent(d)
            .style("fill", "red");
        this.getItemReceived(d)
            .style("fill", "navy");
        this.getXLine(d)
            .style("opacity", 0.25);
    }
}

//the list of other IPs on the left
//also largely unchanged from the original project, other than to fit the new data
var SideBar = {
    //initialization
    init: function() {
        this.list = d3.select("#listBlock").select("#list");
    },
    //update sidebar base don new data
    update: function(payload) {
        var self = this;
        var total_comm = payload[2];

        //grab the data for the selected IP that will be placed above the scrollable list of other users
        var listHeaderData = total_comm.splice(0,1);
        listHeaderData = listHeaderData[0];

        //grab the listHeader HTML element and assign the appropriate text
        var listHeader = d3.select("#listHeader");
        listHeader.text(listHeaderData.name);
        listHeader.selectAll("ul").remove();
        listHeader.append("ul");
        listHeader.select("ul").append("li").text("sent: " + listHeaderData.sent).classed("subList", true);
        listHeader.select("ul").append("li").text("received: " + listHeaderData.received).classed("subList", true);

        //remove all the old li HTML elements and replace them with new ones bound to the new data
        this.list.selectAll("li").remove();
        var selection = this.list.selectAll("li").data(total_comm, function(d) { return d.name; });
        selection.enter().append("li").text(function(d) { return d.name + ":"; });

        //register event based behavior
        selection
            .on('mouseover', function(d, i) {
                Dispatcher.notify('onMouseoverList', d);
            }).on('mouseout', function(d, i) {
                Dispatcher.notify('onMouseoutList', d);
            }).on('click', function(d, i) {
                Dispatcher.notify('onMouseoutList', d);
                Summary.call(d);
            }).on('contextmenu', function(d, i){
                Dispatcher.notify('onMouseoutList', d);
                d3.event.preventDefault();
                Selection.select(d.name);
            });

        //class the top-line as upperList so we can bold it with CSS
        selection.classed("upperList", true);

        //add the sent and received bullets for each IP
        selection.append("ul");
        selection.select("ul").append("li").text(function(d) { return "sent: " + d.sent; }).classed("subList", true);
        selection.select("ul").append("li").text(function(d) { return "received: " + d.received; }).classed("subList", true);
    },

    onMouseover: function(d) {
        this.list.selectAll("li")
            .classed('highlighted', function(e) { return d.name == e.name });
    },

    onMouseoverList: function(d) {
        this.onMouseover(d);
    },

    onMouseout: function(d) {
        this.list.selectAll("li")
            .classed('highlighted', false)
    },

    onMouseoutList: function(d) {
        this.onMouseout(d);
    }
}

//an overlay displaying more granular information about the communication between two IPs, including the 
//files exchanged between them (as carved by tcpflow) and various statistics
//this feature is entirely new to the project
var Summary = {
    //initialize
    init: function() {
        this.file_list = d3.select("#summaryListBlock").select("#fileList");
        this.summary_block = d3.select("#summaryBlock");
    },
    call: function(node) {
        var self = this;
        var files = Controller.files;
        var chosen_ip = Selection.chosen_ip;
        var ip_data = Controller.ip_data;
        this.file_list.selectAll("ul").remove();
        this.summary_block.selectAll("h1").remove();
        this.summary_block.selectAll("ul").remove();

        //sort the filenames by timestamp
        var fnames = node.fnames;
        fnames.sort(function(a, b) {
            var timestamp_a = files[chosen_ip][node.name][a];
            var timestamp_b = files[chosen_ip][node.name][b];
            if (timestamp_a > timestamp_b) { return 1; }
            if (timestamp_a < timestamp_b) { return -1; }
            else { return 0; }
        })
        
        //add the statistical data
        var title = this.summary_block.append("h1").text("Summary: " + chosen_ip + " - " + node.name);
        var stats = title.append("ul");
        var total = ip_data[chosen_ip]['per_other_ip'][node.name]['total']['sent'] + ip_data[chosen_ip]['per_other_ip'][node.name]['total']['rcvd'];
        
        //the numbers representing the total traffic passing between the two parites
        var agg_traffic = stats.append("li").text("Aggregate traffic:").style("font-weight","bold");
        agg_traffic = agg_traffic.append("ul");
        agg_traffic.append("li")
            .text(chosen_ip+ " to " + node.name + ": " + ip_data[chosen_ip]['per_other_ip'][node.name]['total']['sent']);
        agg_traffic.append("li")
            .text(node.name+ " to " + chosen_ip + ": " + ip_data[chosen_ip]['per_other_ip'][node.name]['total']['rcvd']);
        agg_traffic.append("li")
            .text("Total: " + total);
        
        //the numbers representing the traffic passing between the two parties on a per-protocol basis
        var per_protocol = stats.append("li").text("Traffic by protocol:").style("font-weight","bold");
        per_protocol = per_protocol.append("ul");
        for (protoc in ip_data[chosen_ip]['per_other_ip'][node.name]['per_protoc']) {
            var protoc_total = ip_data[chosen_ip]['per_other_ip'][node.name]['per_protoc'][protoc]['sent'] + ip_data[chosen_ip]['per_other_ip'][node.name]['per_protoc'][protoc]['rcvd'];
            //determine the percentage of total traffic this protocol comprises
            var percentage = Math.round(protoc_total/total*100*100)/100;
            var protocol = per_protocol.append("li").text(protoc + " (" + percentage + "%) " + ":").style("font-weight","bold");
            protocol = protocol.append("ul");
            protocol.append("li")
                .text(chosen_ip+ " to " + node.name + ": " + ip_data[chosen_ip]['per_other_ip'][node.name]['per_protoc'][protoc]['sent']);
            protocol.append("li")
                .text(node.name+ " to " + chosen_ip + ": " + ip_data[chosen_ip]['per_other_ip'][node.name]['per_protoc'][protoc]['rcvd']);
            protocol.append("li")
                .text("Total: " + protoc_total);
        }
        
        //a list of known image format extensions
        var known_image_extensions = ['gif','jpg','jpeg','png','tif','tiff','jif','jfif','bmp'];
        
        var selection = this.file_list.selectAll("ul").data(fnames);
        selection.enter().append("ul").classed("fullFile", true);

        //for each file, add a link to the file, a date string and a Unix timestamp
        var header = selection.append("li").classed("fileHeader", true).append("ul");
        var file = header.append("li");
        file.append("span")
            .text("File:")
            .classed("fileDetailHeader", true);
        file.append("a")
            .attr("href",function(d) {return files[chosen_ip][node.name][d]["path"];})
            .attr("target","_blank").text(function(d) {return d;})
            .classed("fileDetailHeader", true);
        var timestring = header.append("li");
        timestring.append("span")
            .text("Date/Time:")
            .classed("fileDetailHeader", true);
        timestring.append("span")
            .text(function(d) {return files[chosen_ip][node.name][d]["time_string"];})
            .classed("fileDetailHeader", true);
        var timestamp = header.append("li");
        timestamp.append("span")
            .text("Unix Timestamp:")
            .classed("fileDetailHeader", true);
        timestamp.append("span")
            .text(function(d) {return files[chosen_ip][node.name][d]["timestamp"];})
            .classed("fileDetailHeader", true);
        //additonally, if the extension of the file matches one of the image extension, display the image inline in addition to the link
        var img = header.append("li");
        img.append("img")
            .attr("src",function(d) {
            var split = d.split(".");
            var ext = split[split.length-1];
            console.log(ext)
            if (known_image_extensions.indexOf(ext) >= 0) {
                return files[chosen_ip][node.name][d]["path"];
            } else {
                return "#";
            }
        }).style("display",function(d) {
            var split = d.split(".");
            var ext = split[split.length-1];
            if (known_image_extensions.indexOf(ext) >= 0) {
                return "block";
            } else {
                return "none";
            }
        }).style("max-width","500px");
        
        //set the overlay to display
        d3.select("#summaryListBlock").style("display", "block");
        d3.select("#overlayBkgrd").style("display", "block");
    }
}

//an overlay allowing us to view and sort all IP addresses by the amount of traffic they generated and received
//largely unchanged other than to fit the new data and to add a new column for the total number of
//other IPs a given IP communicated with
var IPSelectList = {
    //initialization
    init: function(ip_data) {
        //select the HTML elements
        var table = d3.select("#IPSelectTable");
        this.tbody = table.select("tbody");

        //get a list of the aggregate sent-received statisitics for each IP
        var ipGrandTotals = getIPGrandTotals(ip_data);

        //sort by total in descending order (that's why the comparator is backwards)
        ipGrandTotals.sort(function(a,b) {
            if (a.nTotal > b.nTotal) { return -1; }
            if (a.nTotal < b.nTotal) { return 1; }
            else { return 0; }
        });

        //bind elements to the list of aggregte IP data
        var selection = this.tbody.selectAll("tr").data(ipGrandTotals);

        //register events
        selection.enter().append("tr")
            .classed("userRow", "true")
            .on("mouseover", function(d) { IPSelectList.onMouseover(d); })
            .on("mouseout", function(d) { IPSelectList.onMouseout(d); })
            .on("click", function(d) { 
                Selection.select(d.name);
                closeIPSelectOverlay();
            });
        
        var ip_data = Controller.ip_data;
        
        
        //add data to each column
        selection.append("td")
            .attr("data-value", function(d) { return d.name; })
            .text(function(d) { return d.name; });
        selection.append("td")
            .attr("data-value", function(d) { return d.nSent; })
            .text(function(d) { return d.nSent; });
        selection.append("td")
            .attr("data-value", function(d) { return d.nRecvd; })
            .text(function(d) { return d.nRecvd; });
        selection.append("td")
            .attr("data-value", function(d) { return d.nTotal; })
            .text(function(d) { return d.nTotal; });
        selection.append("td") //the new column
            .attr("data-value", function(d) { return Object.keys(ip_data[d.name]['per_other_ip']).length; })
            .text(function(d) { return Object.keys(ip_data[d.name]['per_other_ip']).length; });
    },
    onMouseover: function(d) {
        this.tbody.selectAll("tr")
            .classed('highlighted', function(e) { return d.name == e.name });
    },

    onMouseout: function(d) {
        this.tbody.selectAll("tr")
            .classed('highlighted', false);
    }
}

//returns a list of the aggregate statistics for each IP
//modified to fit the new data
function getIPGrandTotals(ip_data) {
    var totals = [];
    for (ip in ip_data) {
        var ipTotal = {};
        ipTotal['name'] = ip;
        ipTotal['nSent'] = ip_data[ip]['agg']['total']['sent'];
        ipTotal['nRecvd'] = ip_data[ip]['agg']['total']['rcvd'];
        ipTotal['nTotal'] = ip_data[ip]['agg']['total']['sent'] + ip_data[ip]['agg']['total']['rcvd'];
        totals.push(ipTotal);
    }
    return totals;
}

//initialize all the entities
Timeline.init();
SideBar.init();
Summary.init();
Dispatcher.add(Timeline);
Dispatcher.add(SideBar);
Controller.init();
