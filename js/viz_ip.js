//correlates ENTER to the "GO" button for the search field
function prsButton(event, value){
    if (event.keyCode == 13)
        document.getElementById('goButton').click();
}

//performs a context switch to a new IP address 
function getIP(){
    var x = document.getElementById("emailName").value;

    var res = Controller.user_list.filter(function(d) {
        return d == x;
    });

    if(res.length == 0) {
        alert("No matchin entry found for: " + x)
    } else {
        Selection.select(res);
    }
}

function closeLoadingOverlay() {
    d3.select("#loading").style("display", "none");
    d3.select("#overlayBkgrd").style("display", "none");
    d3.select("#headTitle").text(Controller.title);
    d3.select("#pageTitle").text(Controller.title);
}

function openUserSelectOverlay() {
    d3.select("#userSelectBlock").style("display","block");
    d3.select("#overlayBkgrd").style("display", "block");
}

function closeEmailOverlay() {
    d3.select("#emailListBlock").style("display","none");
    d3.select("#overlayBkgrd").style("display", "none");
}

function closeUserSelectOverlay() {
    d3.select("#userSelectBlock").style("display","none");
    d3.select("#overlayBkgrd").style("display", "none");
}

function goToNextPage() {
    Selection.nextPage();
}

function goToPrevPage() {
    Selection.prevPage();
}

// return the radius for a given area
function return_radius(area) {
    return Math.sqrt(area/Math.PI);
}

//returns the area for a given radius
function return_area(radius) {
    // return Math.exp(Math.round(Math.PI*Math.pow(radius, 2)));
    // return Math.round(Math.PI*Math.pow(radius, 2));
    return Math.round(Math.PI*Math.pow(radius, 2));
}

//generates the node objects for the viz based on the given IP address
function get_node_list(chosen_user) {
    var user_data_dict = Controller.user_data_dict;
    var files = Controller.files;
    console.log(files)
    var chunked_node_list = [];
    var node_list = [];
    var i = 0;
    for (other_user in user_data_dict[chosen_user]['per_other_ip']) {
        i += 1;
        for (protoc in user_data_dict[chosen_user]['per_other_ip'][other_user]['per_protoc']) {
            var fnames = [];
            if (chosen_user in files) {
                if (other_user in files[chosen_user]) {
                    fnames = Object.keys(files[chosen_user][other_user]);
                }
            }
            node = {
                name: other_user,
                protoc: protoc,
                nSent: user_data_dict[chosen_user]['per_other_ip'][other_user]['per_protoc'][protoc]['sent'],
                nRecvd: user_data_dict[chosen_user]['per_other_ip'][other_user]['per_protoc'][protoc]['rcvd'],
                nTotal: user_data_dict[chosen_user]['per_other_ip'][other_user]['per_protoc'][protoc]['sent'] + user_data_dict[chosen_user]['per_other_ip'][other_user]['per_protoc'][protoc]['rcvd'],
                fnames: fnames
            };
            node_list.push(node);
        }
        if (i % 10 == 0) {
            chunked_node_list.push(node_list);
            node_list = [];
        }
    }
    if (i % 10 != 0) {
        chunked_node_list.push(node_list);
    }
    return chunked_node_list;
}

//returns a list of the aggregated communication statistics for each IP 
//(this function could be refactored to better fit the current use-case)
function get_other_users_numbers(other_users, chosen_user) {
    var user_data_dict = Controller.user_data_dict;
    var files = Controller.files;
    console.log(user_data_dict);
    var total_comm = [];
    total_comm[0] = {};
    total_comm[0]["name"] = "Total (" + chosen_user + ")";
    total_comm[0]["sent"] = user_data_dict[chosen_user]['agg']['total']['sent'];
    total_comm[0]["received"] = user_data_dict[chosen_user]['agg']['total']['rcvd'];
    total_comm[0]['fnames'] = []

    for (var i = 1; i <= other_users.length; i++) {
        var fnames = [];
        if (other_users[i-1] in files) {
            if (chosen_user in files[other_users[i-1]]) {
                fnames = Object.keys(files[other_users[i-1]][chosen_user]);
            }
        }
        total_comm[i] = {};
        total_comm[i]["name"] = other_users[i-1];
        total_comm[i]["sent"] = user_data_dict[other_users[i-1]]['per_other_ip'][chosen_user]['total']['sent'];
        total_comm[i]["received"] = user_data_dict[other_users[i-1]]['per_other_ip'][chosen_user]['total']['rcvd'];
        total_comm[i]["fnames"] = fnames;
    }
    return total_comm;
}

//returns a list of the IP addresses that the currently selected IP communicated with
//(may also be refactored for current use-case)
function get_other_users(node_list) {
    var other_users = [];
    for (var i = 0; i < node_list.length; i++) {
        if (other_users.indexOf(node_list[i].name) < 0) {
            other_users.push(node_list[i].name);
        }
    }

    return other_users.sort();
}

function get_adjusted_date_limits(node_list) {
    var max_date = null;
    var min_date = null;

    for (var i = 0; i < node_list.length; i++) {
        if (min_date == null) {min_date = node_list[i].date;}
        if (max_date == null) {max_date = node_list[i].date;}
        if (min_date > node_list[i].date) {
            min_date = node_list[i].date;
        }
        if (max_date < node_list[i].date) {
            max_date = node_list[i].date;
        }
    }
    var dates = [];
    for (var dt = new Date(min_date); dt <= new Date(max_date); dt.setMonth(dt.getMonth() + 1)) {
        dates.push(new Date(dt));
    }

    return dates;
}

function get_protocs(node_list) {
    var protocs = [];
    for (var i = 0; i < node_list.length; i++) {
        if (protocs.indexOf(node_list[i].protoc) < 0) {
            protocs.push(node_list[i].protoc);
        }
    }
    return protocs;
}


//manages the whole viz, imports the data and starts the init process
var Controller = {
    init: function() {
        self = this;
        d3.json("data.json", function(data) {
            self.title = data.pcap;
            self.files = data.files;
            self.agg_data = data.agg;
            self.user_list = Object.keys(data.per_ip);
            self.user_data_dict = data.per_ip;
//                        self.user_list = data.user_list.sort();
//                        self.email_dict = data.emails;
//                        self.user_data_dict = data.user_data;
//                        self.startDate = new Date(data.start_date);
//                        self.endDate = new Date(data.end_date);
//                        self.year_month_pairs = data.year_month_pairs;
            Selection.init(self.user_list);
            IPSelectList.init(self.user_data_dict);
            closeLoadingOverlay();
        });
    }
}

//handles the context switches from one IP to another
var Selection = {
    //initialization
    init: function(user_list) {
        this.user_list = user_list;

        //assigns the select action to the dropdown element
        this.ddown = d3.select("#dropdown").on('change', function() {
            Selection.select(d3.select(this).property('value'));
        });

        //selects the first IP in the list by default
        Selection.select(user_list[0]);
    },

    //performs the selection; generates the new nodes and other internal data structures
    select: function(chosen_user) {
        this.chosen_user = chosen_user;
        this.chunked_node_list = get_node_list(chosen_user);
        this.chunk_index = 0;
        console.log(this.chunked_node_list.length);
        var node_list = this.chunked_node_list[0];
        if (this.chunked_node_list.length > 1) {
            d3.select("#nextArrow").style("display","inline");
            var ipRange = d3.select("#ipRange");
            ipRange.style("display","inline");
            ipRange.text("Page " + 1 + " of " + this.chunked_node_list.length);
        } else {
            d3.select("#prevArrow").style("display","none");
            d3.select("#nextArrow").style("display","none");
            d3.select("#ipRange").style("display","none");
        }
        var other_users = get_other_users(node_list);
        var total_comm = get_other_users_numbers(other_users, chosen_user);
        var protocs = get_protocs(node_list);
        var payload = [node_list, other_users, total_comm, protocs];

        //assigns the user list to the dropdown values
        var opt_elements = this.ddown.selectAll("option").data(this.user_list);
        opt_elements.exit().remove();
        opt_elements.enter().append("option");
        opt_elements.transition().attr({
            selected: function(d) {
                if (d == chosen_user) { return "selected"; }
                else { return null; }
            },
            value: function(d) { return d; },
        }).text(function(d) { return d; });

        //notify the Dispatcher that the data has changed
        Dispatcher.notify('update', payload);
    },
    
    nextPage: function() {
        this.chunk_index += 1;
        var node_list = this.chunked_node_list[this.chunk_index];
        var other_users = get_other_users(node_list);
        var total_comm = get_other_users_numbers(other_users, this.chosen_user);
        var protocs = get_protocs(node_list);
        var payload = [node_list, other_users, total_comm, protocs];
        if (this.chunk_index == 1) {
            d3.select("#prevArrow").style("display","inline");
        }
        if (this.chunk_index == (this.chunked_node_list.length - 1)) {
            d3.select("#nextArrow").style("display","none");
        }
        d3.select("#ipRange").text("Page " + (this.chunk_index + 1) + " of " + this.chunked_node_list.length);
        Dispatcher.notify('update', payload);
    },
    
    prevPage: function() {
        this.chunk_index -= 1;
        var node_list = this.chunked_node_list[this.chunk_index];
        var other_users = get_other_users(node_list);
        var total_comm = get_other_users_numbers(other_users, this.chosen_user);
        var protocs = get_protocs(node_list);
        var payload = [node_list, other_users, total_comm, protocs];
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
var Timeline = {
    //initialization
    init: function() {
        //------ Establish some important dimensional settings ------
        //min and max radius size for nodes
        this.MIN_R = 5;
        this.MAX_R = 15;

        //calculate window and SVG height based on browser size
        this.WINDOW_WIDTH = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        this.WINDOW_HEIGHT = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        this.SVG_WIDTH = this.WINDOW_WIDTH - 350;
        this.SVG_HEIGHT = this.WINDOW_HEIGHT - 70;

        //calculate the size of the legend and the X and Y dimensions of the main SVG
        this.LEGEND_X = 100;
        this.RANGE = this.SVG_WIDTH - this.LEGEND_X

        this.X_AXIS_OFFSET_Y = this.SVG_HEIGHT - 50;
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
        var other_users = payload[1];
//                    var dates = payload[2];
        var protocs = payload[3];

//                    this.x_scale.domain([dates[0], dates[dates.length-1]]);
        //set the domains of the x and y scales
        //the domains represent the internal value associated with the scale, and will be mapped to range values
        //which can be thought of as the "real" (e.g. pixels, length)
        this.x_scale.domain(protocs);
        this.y_scale.domain(other_users);

        //"activate" the x and y axes
        this.x_axis_group.transition().call(this.x_axis)
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-55)");
        this.y_axis_group.transition().call(this.y_axis);

        //select the main svg tag
        var svg = d3.select("#viz");

        //remove the old x-line svg elements and append new ones
        var x_lines = svg.select("#x_lines").selectAll("line").data(other_users);
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
//                    tooltip.select("#nodeNameDate").text(d.name + " - " + abbr_list[d.date.getMonth()] + " " + String(d.date.getFullYear()) + ":");
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

    // getElement: function(d) {
    //     // return this.list.selectAll("li").filter(function(e) { return d.name == e.name });
    // },

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
//files exchanged between them (as carved by tcpflow)
var Summary = {
    init: function() {
        this.file_list = d3.select("#emailListBlock").select("#emailList");
        this.summary_block = d3.select("#summaryBlock");
    },
    call: function(node) {
        var self = this;
        var files = Controller.files;
        var chosen_user = Selection.chosen_user;
        var user_data_dict = Controller.user_data_dict;
        this.file_list.selectAll("ul").remove();
        this.summary_block.selectAll("h1").remove();
        this.summary_block.selectAll("ul").remove();
//        var unionIds = unionOfArrays(node.sentIds, node.recvdIds);
//        unionIds.sort(function(a, b) {
//            var a_date = new Date(email_dict[a].date);
//            var b_date = new Date(email_dict[b].date);
//            if (a_date > b_date) { return 1; }
//            if (a_date < b_date) { return -1; }
//            else { return 0; }
//        });
        var fnames = node.fnames;
        console.log(node);
        console.log(fnames);
        fnames.sort(function(a, b) {
            var timestamp_a = files[chosen_user][node.name][a];
            var timestamp_b = files[chosen_user][node.name][b];
            if (timestamp_a > timestamp_b) { return 1; }
            if (timestamp_a < timestamp_b) { return -1; }
            else { return 0; }
        })
        var title = this.summary_block.append("h1").text("Summary: " + chosen_user + " - " + node.name);
        var stats = title.append("ul");
        var agg_traffic = stats.append("li").text("Aggregate traffic:");
        agg_traffic = agg_traffic.append("ul");
        agg_traffic.append("li").text(chosen_user+ " to " + node.name + ": " + user_data_dict[chosen_user]['per_other_ip'][node.name]['total']['sent']);
        agg_traffic.append("li").text(node.name+ " to " + chosen_user + ": " + user_data_dict[chosen_user]['per_other_ip'][node.name]['total']['rcvd']);
        agg_traffic.append("li").text("Total: " + (user_data_dict[chosen_user]['per_other_ip'][node.name]['total']['sent'] + user_data_dict[chosen_user]['per_other_ip'][node.name]['total']['rcvd']));
        var per_protocol = stats.append("li").text("Traffic by protocol:");
        per_protocol = per_protocol.append("ul");
        var protocol = null;
        for (protoc in user_data_dict[chosen_user]['per_other_ip'][node.name]['per_protoc']) {
            protocol = per_protocol.append("li").text(protoc + ":");
            protocol = protocol.append("ul");
            protocol.append("li").text(chosen_user+ " to " + node.name + ": " + user_data_dict[chosen_user]['per_other_ip'][node.name]['per_protoc'][protoc]['sent']);
            protocol.append("li").text(node.name+ " to " + chosen_user + ": " + user_data_dict[chosen_user]['per_other_ip'][node.name]['per_protoc'][protoc]['rcvd']);
            protocol.append("li").text("Total: " + (user_data_dict[chosen_user]['per_other_ip'][node.name]['per_protoc'][protoc]['sent'] + user_data_dict[chosen_user]['per_other_ip'][node.name]['per_protoc'][protoc]['rcvd']));
        }
        
        var selection = this.file_list.selectAll("ul").data(fnames);
        selection.enter().append("ul").classed("fullEmail", true);
//
        var header = selection.append("li").classed("emailHeader", true).append("ul");
        var file = header.append("li");
        file.append("span").text("File:").classed("emailDetailHeader", true);
        file.append("a")
            .attr("href",function(d) {return files[chosen_user][node.name][d]["path"];})
            .attr("target","_blank").text(function(d) {return d;})
            .classed("emailDetailHeader", true);
        var timestring = header.append("li");
        timestring.append("span").text("Date/Time:").classed("emailDetailHeader", true);
        timestring.append("span").text(function(d) {return files[chosen_user][node.name][d]["time_string"];}).classed("emailDetailHeader", true);
        var timestamp = header.append("li");
        timestamp.append("span").text("Unix Timestamp:").classed("emailDetailHeader", true);
        timestamp.append("span").text(function(d) {return files[chosen_user][node.name][d]["timestamp"];}).classed("emailDetailHeader", true);
        d3.select("#emailListBlock").style("display", "block");
        d3.select("#overlayBkgrd").style("display", "block");
    }
}

//return the union of two arrays
function unionOfArrays(arr1, arr2) {
    var arr3 = [];
    for (var i = 0; i < arr1.length; i++) {
        arr3.push(arr1[i]);
    }
    for (var i = 0; i < arr2.length; i++) {
        if (arr3.indexOf(arr2[i]) == -1) {
            arr3.push(arr2[i]);
        }
    }
    return arr3;
}

//takes a list and formats it as a string 
function formatListToString(listToFormat) {
    if (listToFormat) {
        var s = "";
        if (listToFormat.length > 0) {
            for (var i=0; i < (listToFormat.length - 1); i++) {
                s = s + listToFormat[i] + ", "
            }
            s = s + listToFormat[listToFormat.length - 1];
        }
        return s;
    }
    return "";
}

//an overlay allowing us to view and sort all IP addresses by the amount of traffic they generated and received
var IPSelectList = {
    //initialization
    init: function(user_data_dict) {
        //select the HTML elements
        var table = d3.select("#userSelectTable");
        this.tbody = table.select("tbody");

        //get a list of the aggregate sent-received statisitics for each IP
        var ipGrandTotals = getIPGrandTotals(user_data_dict);

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
                closeUserSelectOverlay();
            });
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
function getIPGrandTotals(user_data_dict) {
    var totals = [];
    for (ip in user_data_dict) {
        var ipTotal = {};
        ipTotal['name'] = ip;
        ipTotal['nSent'] = user_data_dict[ip]['agg']['total']['sent'];
        ipTotal['nRecvd'] = user_data_dict[ip]['agg']['total']['rcvd'];
        ipTotal['nTotal'] = user_data_dict[ip]['agg']['total']['sent'] + user_data_dict[ip]['agg']['total']['rcvd'];
        totals.push(ipTotal);
    }
    return totals;
}

Timeline.init();
SideBar.init();
Summary.init();
Dispatcher.add(Timeline);
Dispatcher.add(SideBar);
Controller.init();