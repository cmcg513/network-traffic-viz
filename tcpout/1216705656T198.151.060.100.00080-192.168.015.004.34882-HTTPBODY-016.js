var ModalDialog = Class.create();
ModalDialog.prototype = {
	initialize: function(elementId) {


	  log.info('initiailizing');

	  	ModalDialog.hide();
		this.visible = true;
		this.getPageHeightAndScroll();

		this.modalDiv = document.createElement('div');
		this.modalDiv.className = 'modal';
		this.body = document.getElementsByTagName('body')[0];
		this.body.appendChild(this.modalDiv);

		this.modalDiv.style.height = this.pageHeight + "px";
		this.modalDiv.style.filter = 'alpha(opacity=50)';
		this.modalDiv.style.opacity = 0.5;
		this.modalDiv.style.MozOpacity = 0.5;
		
		this.agentDiv = Element.extend(document.createElement('div')); //create a holder div for the markup
		this.agentDiv.className = "modalDialog";
		// There should be only one modalDialog displayed
		// We need this to access the intended dialog -vgracia(templates)
		this.agentDiv.id ="modalDialog";
		
		this.lightBox = $(elementId); //grab lightBox element from page
		this.agentDiv.appendChild(this.lightBox); //append lightBox to modalDialog
		this.body.appendChild(this.agentDiv); //append modalDialog to body
		this.lightBox.style.display = "block"; //display lightBox
		
		this.agentDivHeight = this.agentDiv.getHeight(); //get height of modalDialog for correct positioning
		
		this.agentDivTopMargin = 0; //default = no top offset; change search is taller than viewport height
		if (this.agentDivHeight < this.windowHeight) { //but, if change search is smaller than viewport height
			this.agentDivTopMargin = (this.windowHeight - this.agentDivHeight) * .5; //center vertically
		}
		this.agentDiv.style.marginTop = this.yScroll + this.agentDivTopMargin + "px"; //adjust position on screen


		ModalDialog.hideSelects();
		
	},
	
	getPageHeightAndScroll: function() {
		//core code from quirksmode.org & lightbox.js

		//BEGIN: page height
		if (window.innerHeight && window.scrollMaxY) {this.yScroll = window.innerHeight + window.scrollMaxY;}
		// all but Explorer Mac
		else if (document.body.scrollHeight > document.body.offsetHeight){this.yScroll = document.body.scrollHeight;}
		// Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari
		else {this.yScroll = document.body.offsetHeight;}

		// all except Explorer
		if (self.innerHeight) {this.windowHeight = self.innerHeight;}
		// Explorer 6 Strict Mode
		else if (document.documentElement && document.documentElement.clientHeight) {this.windowHeight = document.documentElement.clientHeight;}
		// other Explorers
		else if (document.body) {this.windowHeight = document.body.clientHeight;}

		// for small pages with total height less than height of the viewport
		if (this.yScroll < this.windowHeight) this.pageHeight = this.windowHeight;
		else this.pageHeight = this.yScroll;
		//END: page height

		//BEGIN: page scroll
		if (self.pageYOffset) this.yScroll = self.pageYOffset;
		else if (document.documentElement && document.documentElement.scrollTop) this.yScroll = document.documentElement.scrollTop; // Explorer 6 Strict
		else if (document.body) this.yScroll = document.body.scrollTop; // all other Explorers
		//END: page scroll
	}



}



ModalDialog.hide = function() {
    var modal = document.getElementsByClassName('modal')[0];
    var modalDialog = document.getElementsByClassName('modalDialog')[0];
    if(modal) modal.remove();
    if(modalDialog) modalDialog.remove();
    ModalDialog.showSelects();
}


ModalDialog.showSelects = function() {
	var selects = document.getElementsByTagName("select")
	for (var i=0; i<selects.length;i++) {
		selects[i].style.visibility = "visible"
	}
}


ModalDialog.hideSelects = function() {
	var selects = document.getElementsByTagName("select")
	for (var i=0; i<selects.length;i++) {
		selects[i].style.visibility = "hidden"
	}
	var modalSelects = document.getElementsByClassName('modalDialog')[0].getElementsByTagName("select");
	for (var i=0; i<modalSelects.length;i++) {
		modalSelects[i].style.visibility = "visible"
	}
}


// Using calculations above to create a less dependent move function
ModalDialog.moveToCenter = function() {
	var modalDialog = document.getElementsByClassName('modalDialog')[0];

	var yScroll;
	if (window.pageYOffset) yScroll = window.pageYOffset;
		else if (document.documentElement && document.documentElement.scrollTop) yScroll = document.documentElement.scrollTop; // Explorer 6 Strict
		else if (document.body) yScroll = document.body.scrollTop; // all other Explorers

	modHeight = modalDialog.getHeight(); //get height of modalDialog for correct positioning

	var modTopMargin = 0; //default = no top offset; change search is taller than viewport height
	if (modHeight < getInsideWindowHeight()) { //but, if change search is smaller than viewport height
		modTopMargin = (getInsideWindowHeight() - modHeight) * .5; //center vertically
	}
	modalDialog.style.marginTop = yScroll + modTopMargin + "px"; //adjust position on screen
}
