/*
** This is the botFloatFlyout object. It has been refactored to use  
** the Prototype Api and Prototype Extentions. Most of the code has  
** been refactored except for flyOut() and closeflyOut() which have 
** been heavily modified by UIC-155.
**
** A clean up of IE 6 hacks done for UIC-155 will really make this 
** Class simpler and generic.
**
** Author: Sandeep Krishnappa
*/

var botFloatFlyout = Class.create();
botFloatFlyout.prototype = {
	initialize: function(options) {
		this.isflyoutOpen = false;
		this.isflyoutCloseable = false;

		this.isFloatingEnabled = ($('isFloatingEnabled') && ($('isFloatingEnabled').value == 'true')) ? true : false;
		
		this.amenitiesUserMax = ($('amenitiesUserMax')) ? $('amenitiesUserMax').value : 0;
		this.newHotelChangeSearchOrbot = ($('newHtlChgOrbEnabled')) ? $('newHtlChgOrbEnabled').value : false;
				
		this.options = {
			mover:     $('floating'),
			obstacle:  ($('leftRailAds') && ($('leftRailAds').offsetHeight > 0)) ? $('leftRailAds') : null,
			stopper:   ($('footer')) ? $('footer') : (($('orbotStopper')) ? $('orbotStopper') : null)
		}
		
		Object.extend(this.options, options || {});		//overwrite this.options with options object literal

		if ($('expandSearch')) {$('expandSearch').style.visibility = "visible";}
		
		this.mover = new Object();
		this.mover.element = this.options.mover;
		if(this.mover.element) {this.calculateMoverPositions();}
			
		this.obstacle = new Object();
		this.obstacle.element = this.options.obstacle;
		if(this.obstacle.element) {this.calculateObstaclePositions();}
		
		this.stopper = new Object();
		this.stopper.element = this.options.stopper;
		if(this.stopper.element) {this.calculateStopperPositions();}
		
		if ((this.amenitiesUserMax > 0) && $('selectAmenities')) {
			limitChecks(amenChecks, this.amenitiesUserMax);
		}
				
		// Determine if the bot is taller than the viewport and don't scroll if it is.
		this.isTooTall = (this.mover.height > Position.calculateViewport().height);

		if (this.mover.element) {
			Event.observe(this.mover.element, 'mouseout', function() {this.isflyoutCloseable = true;}.bind(this));
			Event.observe(this.mover.element, 'mouseover', function() {this.isflyoutCloseable = false;}.bind(this));
		
			if(!this.newHotelChangeSearchOrbot) {
				Event.observe(this.mover.element, 'click', function(event) {
					if(!this.isflyoutOpen) {
						this.flyOutMover();
						if(Event.element(event) && 'INPUT' == Event.element(event).tagName) {
							Event.element(event).focus();
						}
					}
				}.bindAsEventListener(this));
			}
		}
		
		// Close the flyout if you scroll or click outside the flyout
		Event.observe(document, 'click', function() {if(this.isflyoutOpen && this.isflyoutCloseable) {this.closeflyOutMover();}}.bind(this));
		
		// Now lets Slide the Mover if it has to
		if (this.isFloatingEnabled && !this.isTooTall && this.mover.element) {
			this.slideMover();
		}
	},
	calculateMoverPositions: function() {
		this.mover.element.style.top = 0 + "px";
		this.mover.element.style.position = (is_saf) ? "relative" : "static";
		this.mover.position = this.mover.element.getPosition();
		this.mover.height   = this.mover.element.offsetHeight;
	},
	calculateObstaclePositions: function() {
		this.obstacle.height = this.obstacle.element.offsetHeight;
		this.obstacle.position = this.obstacle.element.getPosition();
	},
	calculateStopperPositions: function() {		
		this.stopper.position = this.stopper.element.getPosition();
	},
	handleMoverResize: function() {
		this.calculateMoverPositions();
		this.slideMover();
	},
	slideMover: function() {
		var scroll     = Position.calculateScroll();
//		var viewport   = Position.calculateViewport();
//		var pageHeight = Position.calculatePageHeight();
		
		var scrollableDistance = (this.obstacle.element) ? (this.obstacle.position.y + this.obstacle.height) : 0;
		scrollableDistance = this.stopper.position.y - scrollableDistance;
		
		this.calculateStopperPositions();			// Ajax update in hotel results changes the stopper positions
		
		var moverTop = 0;
		var moverStyle = "relative";
		
		// Calculate where to position the mover based on the Obstacle position and Footer position
		if (this.obstacle.element && ((scroll.y < this.obstacle.position.y + this.obstacle.height) && (scroll.y > this.obstacle.position.y)) && (this.mover.height < scrollableDistance)) {
			moverTop = (this.obstacle.position.y + this.obstacle.height - this.mover.position.y);
			//log.debug("Glide Orbot: Obstacle present & in view. So place the mover below the Obstacle.");
		} else if ((this.mover.height < scrollableDistance) && (scroll.y + this.mover.height > this.stopper.position.y)) {
			moverTop = (this.stopper.position.y - this.mover.position.y - this.mover.height);
			//log.debug("Glide Orbot: Mover goes over the bottom. So place the mover above the bottom.");
		} else if ((this.mover.height < scrollableDistance) && ((!this.obstacle.element && scroll.y > this.mover.position.y) || (this.obstacle.element && scroll.y > this.obstacle.position.y))) {
			if (is_ie || is_saf) {
				moverTop = scroll.y - this.mover.position.y;
			} else {
				moverStyle = "fixed";
			}	
			//log.debug("Glide Orbot: Mover can safely be fixed at the top left corner.");
		} else {
			//log.debug("Glide Orbot: Mover should be where it was. No need to float.");
		}
		
		this.mover.element.style.top = (moverTop) + "px";
		this.mover.element.style.position = moverStyle;	
	},
	flyOutMover: function() {
		this.isflyoutOpen = true;
		this.mover.element.style.position = "relative";
		
		if (!this.newHotelChangeSearchOrbot) {
			if ($('options')) {
				$('options').style.left = "160px";
			} 
			
			if ($('chgBotBox')) {
				$('chgBotBox').style.backgroundPosition = "-100px 0";
			}
		} else {
			var additionalSearchAddress = $A(['htlchgDates','htlchgLocations','htlchgGuestInfo']);
			
			if ($('htlchgAddress').checked) {
				for (var i=0; i<additionalSearchAddress.length; i++) {
					if (!$(additionalSearchAddress[i]).hasClassName("adr")) {
						$(additionalSearchAddress[i]).addClassName("adr");
					}
				}
			}
			
			if($('htlchgSpecificHotelAddOpts').value != "Hotel name contains..."){
				$('htlchgSpecificHotel').value = $('htlchgSpecificHotelAddOpts').value;
			}
					
			if($('htlchgHotelChainAddOpts').value != "all hotel companies"){
				$('htlchgHotelChain').value = $('htlchgHotelChainAddOpts').value;
			}
			
			$('collapsedOrbotSubmitted').value="false";			
			
			$('hideOptions').style.display = "block";
			$('optionsHook').style.display = "block";
			$('searchByTitle').style.display = "block";
			$('topHideOptions').style.display = "block";
			$('hotelNameChain').style.display = "none";
			$('htlchg').style.width = "660px";
			
			// Dint want to add this hack. But the absolute positioning of Change Search Orbot for IE6 gorced me to add this.
			if(!this.mover.element.hasClassName('flyout')) {
				this.mover.element.addClassName('flyout');
			}
		}
		
		$('expandSearch').style.display = "none";
		
		if(this.isFloatingEnabled && !this.isTooTall) {
			this.handleMoverResize();
		}
	},
	closeflyOutMover: function() {
		if (!this.newHotelChangeSearchOrbot) {
			if ($('options')) {
				$('options').style.left = "-1600px";
			} 
					
			if ($('chgBotBox')) {
				$('chgBotBox').style.backgroundPosition = "100% 0";
			}
		} else {
			if($('htlchgSpecificHotel').value != "Hotel name contains...") {
				$('htlchgSpecificHotelAddOpts').value = $('htlchgSpecificHotel').value;
			}
			
			if($('htlchgHotelChain').value != "all hotel companies") {
				$('htlchgHotelChainAddOpts').value = $('htlchgHotelChain').value;
			}
			
			$('collapsedOrbotSubmitted').value="false";			
						
			$('hideOptions').style.display = "none";
			$('optionsHook').style.display = "none";
			$('searchByTitle').style.display = "none";
			$('topHideOptions').style.display = "none";
			$('hotelNameChain').style.display = "block";
			$('htlchg').style.width = "140px";
			
			$('chgBotBox').style.backgroundPosition = "100% 0";
			$('chgBotBox').style.width = "160px";
			
			if(this.mover.element.hasClassName('flyout')) {
				this.mover.element.removeClassName('flyout');
			}
		}
	
		$('expandSearch').style.display = "block";
		
		if(this.isFloatingEnabled && !this.isTooTall) {
			this.handleMoverResize();
		}
		
		this.isflyoutOpen = false;
	}
};
				
function cityOrAddressSearch() {
	var i = 0;
	var additionalSearchAddress = $A(['htlchgDates','htlchgLocations','htlchgGuestInfo']);
	if($('htlchgAddress').checked) {
		for (i=0; i<additionalSearchAddress.length; i++) {		
			if(!$(additionalSearchAddress[i]).hasClassName("adr"))
				$(additionalSearchAddress[i]).addClassName("adr");
		}

	} else if($('htlchgCityPOI').checked) {
		for (i=0; i<additionalSearchAddress.length; i++) {			
			if($(additionalSearchAddress[i]).hasClassName("adr"))
				$(additionalSearchAddress[i]).removeClassName("adr");
		}
	}
	
	if(typeof botFloatFlyoutObject != 'undefined' && botFloatFlyoutObject.isFloatingEnabled) {
		botFloatFlyoutObject.handleMoverResize();
	}
}

// Have kept the interface to reopen the flyout intact 
function reopenFlyout() {
	//log.debug("Reopen flyout.");
	if(typeof botFloatFlyoutObject != 'undefined' && !botFloatFlyoutObject.isflyoutOpen) {
		botFloatFlyoutObject.flyOutMover();
	}
}

// Have kept the interface to close the flyout intact
function closeFlyout() {
	//log.debug("Close flyout.");
	if(typeof botFloatFlyoutObject != 'undefined' && botFloatFlyoutObject.isflyoutOpen) {
		botFloatFlyoutObject.closeflyOutMover();
	}
}

Event.observe(window, 'load', function() {
		botFloatFlyoutObject = new botFloatFlyout();
		
		Event.observe(window, 'scroll', function() {
			if(this.isflyoutOpen && this.isflyoutCloseable && !this.isTooTall) {
				this.closeflyOutMover();
				this.calculateMoverPositions();
			}
			if(this.isFloatingEnabled && this.mover.element && !this.isTooTall) {
				this.slideMover();
			}}.bind(botFloatFlyoutObject));
	});