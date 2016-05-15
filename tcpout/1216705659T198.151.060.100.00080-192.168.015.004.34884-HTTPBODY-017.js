/*
ALL FUNCTIONS IN THIS FILE ARE DEPENDENT ON prototype.js

********************************
HIDE REVEAL FUNCTION DOCS
********************************

Create a hide reveal panel with the following 3 steps:
	(These 3 steps use default classnames.
	Overriding these defaults is described below)

1) Call initHideReveal function from pageInit

pageInit is executed onLoad in every page in NOVO, add this to your module
to initalize:

  function pageInit () { initHideReveal(); }

2) Your markup needs these 3 elements:

	a) A wrappper div with class "hideReveal"
	b) The clickable element within this wrapper with class "hrClickArea".
	   Can be a div, a tag, any clickable element, NOTE this has not been tested for checkboxes.
	c) Some area that will be hidden/revealed when hrClickArea is clicked

	 IE:

	 <div class="hideReveal">
			<div class="hrClickArea">Show/Hide Instructions</div>
			<div class="someClassName">Instructions that are hidden & revealed</div>
	 </div>

You can change "someClassName" to whatever you want, don't change hideReveal & hrClickArea unless you follow
 the instructions in the "OVERRIDDING DEFAULT STYLES" section below.

3) Add 2 styles, .hrHide & .hrReveal & include your hidden/revealed area as a secondary:

.hrHide .someClassName { display: none; }
.hrReveal .someClassName { display: block; }

Note, if your hide/reveal panel is revealed on page load, make sure your wrapper div has the class hrReveal:

	 IE:

	 <div class="hideReveal hrReveal">
			<div class="hrClickArea">View Instrtuctions</div>
			<div class="someClassName">Instructions that are hidden revealed</div>
	 </div>

** CHANGING TEXT **

You can change text on the page associated with your hide/reveal instance.
For instance, you may have a button that says "View instructions", and it will need to
 	say "Hide instructions" when your intructions are in the reveal state.

To do this, initialize the hideReveal objects yourself with a second argument.
The argument should be 3 pipe delimited values: "class name|text while hidden|text while revealed"
The classname can be hrClickArea if you choose, but can be any other class name you'd prefer,
	as long as it exists in your html.
Use the following of "function pageInit () { initHideReveal(); }":

	document.getElementsByClassName("hideReveal").each(function(element){
		new hideReveal(element,"myClassWithTextThatChanges|View instructions|Hide insturctions");
	});

This will change the entire innerHTML of the item with class myClassWithTextThatChanges,
	so if you need html, include it in the 2nd and/or 3rd piped values.

** OVERRIDDING DEFAULT STYLES **

To override, initialize the hideReveal objects yourself with extra arguments.
Use this instead of "function pageInit () { initHideReveal(); }":

	document.getElementsByClassName("hideReveal").each(function(element){
		new hideReveal(element,"","myClickAreaClass","myHiddenClass","myRevealedClass");
	});
	//Notice that the 2nd parameter is left blank, this won't change any innerHTML on the page

	or

	document.getElementsByClassName("hideReveal").each(function(element){
		new hideReveal(element,"myClass|View|Hide","myClickAreaClass","myHiddenClass","myRevealedClass");
	});
	//Notice that the 2nd parameter will result in changed innerHTML when the object is clicked


You can also change the "hideReveal" class if you want to by changing the argument sent to getElementsByClassName:

	document.getElementsByClassName("myWrapperClass").each(function(element){
		new hideReveal(element,"myClass|View|Hide","myClickAreaClass","myHiddenClass","myRevealedClass");
	});
*/


var hideReveal = Class.create();
hideReveal.prototype = {

	initialize: function (element) {

		var args = hideReveal.arguments;

		log.info('initializing upgrade element');
		this.element=element;

		if (args[1]){
			var a = args[1].split('|');
			this.textChangeClass=a[0];
			this.hideText=a[1];
			this.revealText=a[2];
		}

		if (args[2]){
			var clickAreaClassName=args[2];
		}else{
			var clickAreaClassName="hrClickArea";
		}
		log.info('click area class name: ' + clickAreaClassName);

		this.clickAreas=document.getElementsByClassName(clickAreaClassName,element);

		this.clickAreas.each(function(child){
			Event.observe(child, 'click', this.hrToggle.bindAsEventListener(this), false);
		}.bind(this));

		/* Set default hide & reveal classes, for upgrades project
							Override with setHideClasses & setRevealClasses */
		if (args.length>=5) {
			this.setHideClasses(args[3]);
			this.setRevealClasses(args[4]);
		}else{
			/* Use defaults */
			this.setHideClasses('hrHide');
			this.setRevealClasses('hrReveal');
		}

		/* Detect text change class if needed */
		if (this.textChangeClass){
			this.children=document.getElementsByClassName(this.textChangeClass,element);

			log.debug(this.children.length);
			this.children.each(function(child){
				this.changeTextOnThis=child;
			}.bind(this));
		}

		/* Set flags that turn on/off custom code in hrToggle
							Also project specific code */
		this.isUpgrade=false;
		if (this.element.hasClassName('upgrades')){
			this.isUpgrade=true;
			this.children=document.getElementsByClassName("switches",element);

			log.debug(this.children.length);
			this.children.each(function(child){
				this.child=child;

			}.bind(this));
		}

	},

	hrToggle: function(){

		if (Element.hasClassName(this.element,this.revealClasses[0])){
			/* STATE CURRENTLY IS REVEAL, SETTING TO HIDE */

			for (var i = 0, j=this.revealClasses.length; i < j; i++){
				this.element.removeClassName(this.revealClasses[i]);
			}
			for (var i = 0, j=this.hideClasses.length; i < j; i++){
				this.element.addClassName(this.hideClasses[i]);
			}

			/* Change text if requested */
			if (this.changeTextOnThis){
				this.changeTextOnThis.innerHTML=this.hideText;
			}

		}else{
			/* STATE CURRENTLY IS HIDE, SETTING TO REVEAL  */

			for (var i = 0, j=this.hideClasses.length; i < j; i++){
				this.element.removeClassName(this.hideClasses[i]);
			}
			for (var i = 0, j=this.revealClasses.length; i < j; i++){
				this.element.addClassName(this.revealClasses[i]);
			}

			/* Change text if requested */
			if (this.changeTextOnThis){
				this.changeTextOnThis.innerHTML=this.revealText;
			}

		}

	},

	setHideClasses: function(classNamesPipeDelimited){
		var a = classNamesPipeDelimited.split('|');
		this.hideClasses = new Array();
		for (var i = 0; i < a.length; i++){
			this.hideClasses[i]=a[i];
		}
	},

	setRevealClasses: function(classNamesPipeDelimited){
		var a = classNamesPipeDelimited.split('|');
		this.revealClasses = new Array();
		for (var i = 0; i < a.length; i++){
			this.revealClasses[i]=a[i];
		}
	}

};

//Initialize your hide/reveal objects w/ this function
function initHideReveal(){

	if (initHideReveal.arguments[0]) {
		var className=initHideReveal.arguments[0];
	}else{
		var className="hideReveal";
	}

	document.getElementsByClassName(className).each(function(element){
		new hideReveal(element);
	});
}


/* This is specific to Electronic Seat Upgrades, AIR327 */
var checkboxStyleChange = Class.create();
checkboxStyleChange.prototype = {

	initialize: function (element) {

		this.children=document.getElementsByClassName("switches",element);

		log.debug(this.children.length);
		this.children.each(function(child){
			this.child=child;

		}.bind(this));


		this.stripes=document.getElementsByClassName("stripes",element);
		this.stripes.each(function(stripe){
			this.stripe=stripe;

		}.bind(this));


		this.inputElements=$A(element.getElementsByTagName("input"));

		log.debug("input elements length: " + this.inputElements.length);
		this.inputElements.each(function(inputElement){
			if (inputElement.type=="checkbox") {
				log.info('adding event handler for chk: ' + inputElement.type);
				Event.observe(inputElement, 'click', this.checkboxClick.bindAsEventListener(this), false);
				this.checkbox=inputElement;
			}
		}.bind(this));
		log.info('after inputElements loop')



	},

	checkboxClick: function () {

		/* CHANGES THE BACKGROUND BEHIND THE +/- BUTTON */
		if (this.checkbox.checked) {
			this.child.removeClassName("upgradeSwitchOFF");
			this.child.addClassName("upgradeSwitchON");

			this.stripe.removeClassName("upgradeTopStripeOFF");
			this.stripe.addClassName("upgradeTopStripeON");

		}else{
			this.child.removeClassName("upgradeSwitchON");
			this.child.addClassName("upgradeSwitchOFF");

			this.stripe.removeClassName("upgradeTopStripeON");
			this.stripe.addClassName("upgradeTopStripeOFF");
		}
	}

};



/*
********************************
Value Collector - combines a collection of input values in a comma delimited string and stores it into a single input value.
********************************

Add this functionality with the following steps:


1)	Create a hidden input to store the collected values. Use the params attribute to pass along the
	the base object id in JSON format.

	ex. <input class="valueCollection" type="hidden" name="answerList" id="answerList" params="{'baseObjId': 'enableAnswersSection'}" value=""/>


2)	Add the class, "collectable" to all the inputs whose values should be collected.

	ex. <input class="collectable" value="<c:out value="${questionStatus.count}"/>_<c:out value="${answerStatus.count}"/>" type="checkbox" >


3)	Create an instance of the Value Collector object passing the follwing values to the constructor:

	ex. var valueCollector = new ValueCollector();

	To make this object more efficient, you may pass a baseObj from which to start looking for the storage input

*/

/* TODO(templates2): make sure this works for the trip purpose project; comment this section better -vgracia */

var ValueCollector = new Class.create();
ValueCollector.prototype = {
	initialize: function(baseObj, typeToCollect) {

		this.baseObj = (baseObj) ? baseObj: document;
		this.classNameForCollectables = "collectable";
		this.collectorInputObj = document.getElementsByClassName("valueCollection", $(this.baseObj)).first();
		this.collectableFilter = (typeToCollect) ? this.getFilter(typeToCollect) : this.getFilter("checked");


		if (this.collectorInputObj) {
			var params = eval( "(" + $(this.collectorInputObj).getAttribute("params") + ")");

			this.formObj = this.collectorInputObj.form;
			this.baseObj = $(params.baseObjId);
			Event.observe(this.formObj, 'submit', this.collectVals.bind(this));
		}
	},

	collectVals: function () {
		// - Find all collectable descendents of baseObj
		// - Find all of the above that are checked
		// - Join all the value attributes with a comma delimiter
		this.collectorInputObj.value = document.getElementsByClassName(this.classNameForCollectables, this.baseObj).findAll(this.collectableFilter).pluck('value').join(",");
		//alert("test: " + this.collectorInputObj.value);
	},

	getFilter: function (typeToCollect) {
		var filter = null;
		if(typeToCollect == "checked") {
			filter = function (element) {return element.checked;}
		}
		else if(typeToCollect == "all") {
			filter = function (element) {return true;}
		}
		else if(typeToCollect == "allNotRemoved") {
			filter = function (element) {return !(element.hasClassName("removedInput"));}
		}
		return filter;
	}
};









/*
********************************
HideRevealAll - Adds the ability to hide/reveal a group of hide/reveal controls.
********************************

Add this functionality with the following steps:

1)	Follow the same instructions of the HideReveal class above.

2)	Create a element with the class "hideAllControl" or "revealAllControl". An onclick handler will be added to this
	element.

	ex. <a href="" class="revealAllControl">Expand all</a>

3) Create a new instance of the HideRevealAll object.

	ex. new HideRevealAll();

*/


var HideRevealAll = new Class.create();

HideRevealAll.prototype = {
	initialize: function(baseObj) {
		this.baseObj = (baseObj) ? baseObj: document;
		this.hideAllControl = document.getElementsByClassName("hideAllControl", $(this.baseObj)).first();
		this.revealAllControl = document.getElementsByClassName("revealAllControl", $(this.baseObj)).first();

		if (this.hideAllControl) {Event.observe(this.hideAllControl, 'click', this.hideAll.bind(this));}
		if (this.revealAllControl) {Event.observe(this.revealAllControl, 'click', this.revealAll.bind(this));}
	},

	hideAll: function (event) {
		var count=0;
		var changeList = document.getElementsByClassName("hideRevealPanelON",this.baseObj);
		for (var i=0; i<changeList.length;i++) {
			changeList[i].removeClassName("hideRevealPanelON");
			changeList[i].addClassName("hideRevealPanelOFF");
		}
		Event.stop(event);
		return false;

	},

	revealAll: function (event) {
		var count=0;
		var changeList = document.getElementsByClassName("hideRevealPanelOFF",this.baseObj);
		for (var i=0; i<changeList.length;i++) {
			changeList[i].removeClassName("hideRevealPanelOFF");
			changeList[i].addClassName("hideRevealPanelON");
		}
		Event.stop(event);
		return false;
	}

};




/*
********************************
AnswerCountUpdater, AnswerCountController  - Keeps a count of the number of currently selected checkboxes.
********************************


NOTE: Currently this is only for use with the standard trip purpose question table. To reuse this functionality on
another page, simply call the contstuctor, "new AnswerCountController()",  in the pageInit function.

*/

var AnswerCountController = Class.create();

AnswerCountController.prototype = {
	initialize: function(baseObj) {
		this.baseObj = (baseObj) ? baseObj: document;
		var className="questionRow";

		if (document.getElementsByClassName(className, $(this.baseObj)).first()) {
			document.getElementsByClassName(className, $(this.baseObj)).each(function(element){
				new AnswerCountUpdater(element, this);
			}.bind(this));
		}
	},

	setCount: function (container) {
		//assuming all inputs in this container are checkboxes.
		var checkboxes = $(container).getElementsByTagName("input");
		var checkedCount = 0;
		for (var i=0; i<checkboxes.length;i++) {
			if(checkboxes[i].checked){checkedCount++;}
		}
		var counterElement = document.getElementsByClassName("counter", $(container)).first()
		counterElement.innerHTML = ((checkedCount!=0) ? checkedCount: "No") + " answer" + ((checkedCount!=1) ? "s": "") + " selected.";
	}

}

var AnswerCountUpdater = Class.create();

AnswerCountUpdater.prototype = {
	initialize: function(baseObj, controller) {
		this.baseObj = baseObj;
		this.controller = controller;

		$A($(this.baseObj).getElementsByTagName("input")).each( function(element) {
			Event.observe(element, 'click', this.setCount.bind(this));
		}.bind(this));
		this.setCount();
	},


	// put this in the event obs call above.
	setCount: function () {
		this.controller.setCount(this.baseObj);
	}
}







/*
This function handles session-time out by detecting <html> element in the response.
It takes the same parameters as Ajax.Udpater constructor.
*/
function ajaxUpdate(elem, url, options) {

    userOnComplete = options.onComplete;

    options.onComplete = function(transport, json) {
        if (transport.responseText.match(/<\s*html(\s.*)*>/i)){
            /* This should do something different in prod */
            /* Also in dev a better error behavior is worth investigating */
           window.location.reload();
        } else {
            Element.update(elem, transport.responseText )
            if (userOnComplete) userOnComplete(transport, json);
        }
    }
    new Ajax.Request(url, options)
}

function ajaxScriptRequest(url, options) {
    userOnComplete = options.onComplete;

    options.onComplete = function(transport, json) {
        if (!(transport.getResponseHeader('Content-type') || '').match(/^text\/javascript/i) ) {
            window.location.reload();
        } else {
            if (userOnComplete) userOnComplete(transport, json);
        }
    }
    new Ajax.Request(url, options)
}




/*
********************************
RemoveController, RemovableItem  - Adds remove and 1 level undo features to objects.
********************************

*/

var RemoveController = Class.create();
RemoveController.prototype = {

	initialize: function (baseObj) {
		log.info('Initializing RemoveControl');

		var args = RemoveController.arguments;
		this.baseObj = (baseObj) ? baseObj: document;

		this.controlObj = document.getElementsByClassName("removeController",baseObj).first();

		if(this.controlObj) {
			var params = eval( "(" + this.controlObj.getAttribute('params') + ")");
			if(params) {
				this.removeRH = params.removeRH;
				this.undoRH = params.undoRH;
			}

			this.lastRemovedObj = null;

			this.removableItems=document.getElementsByClassName("removable",baseObj);
			this.removableItems.each(function(element) {new RemovableItem(element, this);}.bind(this));

			this.messageObj = document.getElementsByClassName("previewMsgArea",baseObj).first();
			this.undoHandle = null;
		}
	},

	undo: function(){


		if(this.undoRH) {
			//alert(this.undoRH + "&" + this.lastRemovedObj.undoRHparams);
			new Ajax.Request(this.undoRH + "?" + this.lastRemovedObj.undoRHparams, {method:'get'});
		}

		// Make the last item removable again
		if(document.getElementsByClassName("lastNotRemovable",this.baseObj).length > 0) {
			document.getElementsByClassName("lastNotRemovable",this.baseObj).first().addClassName("removable")
			document.getElementsByClassName("lastNotRemovable",this.baseObj).first().removeClassName("lastNotRemovable")
		}

		this.lastRemovedObj.targetObj.removeClassName("removed");
		this.lastRemovedObj.targetObj.addClassName("removable");

		// Adding this to mark/unmark inputs that have been removed.
		$A($(this.lastRemovedObj.targetObj).getElementsByTagName("input")).each( function(element) {element.removeClassName("removedInput")});


		this.lastRemovedObj = null;
		if (this.messageObj) {
			this.messageObj.style.display = "none";
		}


		return false;
	},

	removeItem: function(itemToRemove) {

		if(this.lastRemovedObj) {
			this.lastRemovedObj.targetObj.parentNode.removeChild(this.lastRemovedObj.targetObj)};
		this.lastRemovedObj = itemToRemove;

		itemToRemove.targetObj.removeClassName("removable");
		itemToRemove.targetObj.addClassName("removed");
		// Adding this to mark/unmark inputs that have been removed.
		$A($(itemToRemove.targetObj).getElementsByTagName("input")).each( function(element) {element.addClassName("removedInput")});

		this.displayStatus(itemToRemove);

		if(this.removeRH) {
			new Ajax.Request(this.removeRH + "?" + itemToRemove.removeRHparams, {method:'get'});
		}

		// If we just removed the second-to-last item, we shouldn't allow the last to be removed.
		var lastItem;
		if(document.getElementsByClassName("removable",this.baseObj).length == 1) {
			lastItem = document.getElementsByClassName("removable",this.baseObj).first();
			lastItem.addClassName("lastNotRemovable");
			lastItem.removeClassName("removable");
		}
	},

	displayStatus: function (itemToRemove) {
		if (this.messageObj) {
			this.messageObj.style.display = "block";
			this.messageObj.innerHTML = "<p class='alert removeAlert'>The " + itemToRemove.type + ", " + itemToRemove.title + ",  has been removed from the template. <span class='undoHandle'>Undo remove</span></p>";
			this.undoHandle = document.getElementsByClassName("undoHandle",this.messageObj).first();
			Event.observe(this.undoHandle, 'click', this.undo.bind(this));
		}

	}
};

var RemovableItem = Class.create();

RemovableItem.prototype = {
	initialize: function(targetObj, controller) {


		this.targetObj = targetObj;
		this.controller = controller;

		var params = eval( "(" + this.targetObj.getAttribute("params") + ")");
		if(params) {
			this.removeRHparams = params.removeRHparams;
			this.undoRHparams = params.undoRHparams;
			this.type = params.type;
		}

		this.title = "";
		if($(document.getElementsByClassName("heading",targetObj).first())) {
			this.title=document.getElementsByClassName("heading",targetObj).first().innerHTML;
		}
		// look for js params and create funtion that hits RH
		this.removeHandles=document.getElementsByClassName("removeHandle",targetObj);
		this.removeHandles.each( function(element) {
			Event.observe(element, 'click', this.removeItem.bind(this));
		}.bind(this));

	},


	// put this in the event obs call above.
	removeItem: function () {
		this.controller.removeItem(this);
	}
}



/*
********************************
ValCascadeController, cascadeableInput  - Allows inputs to dynamically inherit the value of another input.
********************************
*/

var ValCascadeController = Class.create();
ValCascadeController.prototype = {

	initialize: function (baseObj) {
		//log.info('Initializing ValCascadeController`');

		var args = ValCascadeController.arguments;
		this.baseObj = (baseObj) ? baseObj: document;

		this.allCascadableInputObjs = new Array();
		this.cascadeSetNames = new Array();

		// build a hash table of cascading sets and create a backing object for each input
		var cascadableInputs=document.getElementsByClassName("cascadable",baseObj);
		cascadableInputs.each(function(element) {
			var params = eval( "(" + $(element).getAttribute("params") + ")");
			if(this.allCascadableInputObjs[params.cascadeName] == null) {
				this.allCascadableInputObjs[params.cascadeName] = new Array();
				this.cascadeSetNames[this.cascadeSetNames.length] =params.cascadeName;
			}
			this.allCascadableInputObjs[params.cascadeName][this.allCascadableInputObjs[params.cascadeName].length] = new CascadableInput(element, this);
		}.bind(this));
	},

	cascadeVals: function () {
		var cascadingVal = "";
		//alert("test");
		// This hash based solution works fine but a new object would probably be better; This should be
		// refactored if it's use goes beyond simple static cascadable inputs.
		for(var i=0; i<this.cascadeSetNames.length;i++) {

			// sort() method to ensure correct cascade order in array elements
			this.allCascadableInputObjs[(this.cascadeSetNames[i])].sort(this.orderCheck);

			valueToCascade = null;

			for(var j=0; j<this.allCascadableInputObjs[(this.cascadeSetNames[i])].length; j++) {
			//alert("test");
				cascadableInputObj = this.allCascadableInputObjs[(this.cascadeSetNames[i])][j];

				// Find the first value to cascade through to the others. The first input that is not disabled will be used.
				if(valueToCascade == null && cascadableInputObj.okToUseValueForCascading()) {
					valueToCascade = cascadableInputObj.targetObj.value;
				}
				else {
					// Update the rest of the inputs that have not been changed by the user with the value to cascaded
					if (cascadableInputObj.okToChangeValue()) {
						cascadableInputObj.targetObj.value = valueToCascade;
						//alert("test:" + cascadableInputObj.targetObj.value);
					}
				}
			}

		}
	},

	// I never trust the order in which items are collected by get methods, this compare function is used by the
	// native array sort() method to ensure correct cascade order.
	orderCheck: function (item1, item2) {
		// implicitly casting here str -> int
		return item1.cascadeOrder - item2.cascadeOrder;
	}
};



var CascadableInput = Class.create();

CascadableInput.prototype = {
	initialize: function(targetObj, controller) {

		this.targetObj = targetObj;
		this.controller = controller;
		this.touched = false;
		this.origValue = targetObj.value;

		var params = eval( "(" + $(this.targetObj).getAttribute("params") + ")");
		if(params) {
			this.cascadeName = params.cascadeName ;
			this.cascadeOrder = params.cascadeOrder;
		}
		Event.observe(this.targetObj, 'mousedown', this.handleTouch.bind(this));
		Event.observe(this.targetObj, 'blur', this.handleValChange.bind(this));
	},


	// if the input has not yet been touched, the original value and then mark as touched.
	// the stored value will be used to determine if the value has been changed by the user or not.
	handleTouch: function () {
		//alert("touched: " + this.touched);
		if(!this.touched) {
			this.touched= true;
			this.origValue =  this.targetObj.value;
		}
	},

	// determines if the value has been changed by the user or not.
	userChanged: function () {
		//alert("userChanged" +"(" + this.cascadeName + "/" + this.cascadeOrder + ")" + ":"  +  (this.touched && (this.origValue != this.targetObj.value)) + "\n" +
		//"touched: " + this.touched + "\n" +
		//"origVal: " + this.origValue + " =? " +   this.targetObj.value);
		return  (this.touched && (this.origValue != this.targetObj.value));
	},

	// we only cascade values to input that have not been changed by the user and have not been disabled.
	okToChangeValue: function () {
		//var tmp = this.userChanged();
		//alert("okToCascade" +"(" + this.cascadeName + "/" + this.cascadeOrder + ")" + ":"  +  (!tmp && !this.targetObj.disabled));
		return  (!this.userChanged() && !this.targetObj.disabled);
	},
	okToUseValueForCascading: function () {
		return  (!this.targetObj.disabled);
	},

	// Update the inputs when a value is changed.
	handleValChange: function () {
		this.controller.cascadeVals();
	}

}


function centerOnWindow(objToPosition) {
	// 'obj' is the positionable object
	var obj = $(objToPosition);
	// window scroll factors
	var scrollX = 0, scrollY = 0;
	if (document.body && typeof document.body.scrollTop != "undefined") {
		scrollX += document.body.scrollLeft;
		scrollY += document.body.scrollTop;
		if (document.body.parentNode &&
			typeof document.body.parentNode.scrollTop != "undefined") {
			scrollX += document.body.parentNode.scrollLeft;
			scrollY += document.body.parentNode.scrollTop
		}
	} else if (typeof window.pageXOffset != "undefined") {
		scrollX += window.pageXOffset;
		scrollY += window.pageYOffset;
	}

	var x = Math.round((getInsideWindowWidth()/2) -
		(obj.getWidth()/2)) + scrollX;
	var y = Math.round((getInsideWindowHeight()/2) -
		(obj.getHeight()/2)) + scrollY;


	alert("scrollY:" + scrollY + "\n" +
		"getInsideWindowHeight(): " + getInsideWindowHeight() + "\n" +
		"obj.getHeight(): " + obj.getHeight() + "\n" +
	"y: " + y  + "\n"
		);


	var units = (typeof obj.left == "string") ? "px" : 0
	obj.left = x + units;
	obj.style.marginTop = y + units;
}




var Ellipsify = new Class.create();

Ellipsify.prototype = {
	initialize: function(baseObj) {
		this.baseObj = (baseObj) ? baseObj: document;

		var params;
		document.getElementsByClassName("ellipsify", $(this.baseObj)).each(
			function(element) {
				params = eval( "(" + $(element).getAttribute("params") + ")");
				this.addEllipse(element, params.maxChars);
			}.bind(this)
		);

	},

	addEllipse: function (textContainer, maxChars) {
		if (textContainer.innerHTML.length > maxChars) {
			textContainer.innerHTML = textContainer.innerHTML.substr(0, maxChars - 3) + "...";
		}
	}
};



function ajaxUpdateWithPageWait(elem, url, options) {

	$(document.body).addClassName('waitingState');
	userOnComplete = options.onComplete;

	options.onComplete = function(transport, json) {
		if (transport.responseText.match(/<\s*html(\s.*)*>/i)){
			/* This should do something different in prod */
			/* Also in dev a better error behavior is worth investigating */
		   window.location.reload();
		} else {
			Element.update(elem, transport.responseText )
			if (userOnComplete) userOnComplete(transport, json);
			$(document.body).removeClassName('waitingState');
		}
	}
	new Ajax.Request(url, options)
}



/*
********************************
DynamicPasswordValidator - allows users to get immediate feedback on the correctness of their passord inputs.
********************************
*/

var DynamicPasswordValidator = Class.create();

DynamicPasswordValidator.prototype = {
	initialize: function(baseObj) {
		this.baseObj = (baseObj) ? baseObj: document;

		var className="dynamicPasswordValidationControl";
		this.passwordInputObj;
		this.retypePasswordInputObj;
		this.complexityLvl; //Not in use at this time, could be added with JSON params
		this.controlObj;
		this.noMatchField = null;

		this.checkPassword_Ref = this.checkPassword.bind(this);
		this.checkRetypePassword_Ref = this.checkRetypePassword.bind(this);

		//assumes one control per baseObj
		this.controlObj = document.getElementsByClassName(className, $(this.baseObj)).first();
		this.controlObj.addClassName("enforcingComplexPasswords");

		if (this.controlObj) {
			this.passwordInputObj = document.getElementsByClassName('passwordControl', this.controlObj).first()
			this.retypePasswordInputObj = document.getElementsByClassName('retypePasswordControl', this.controlObj).first()
		}

		if (this.passwordInputObj && this.retypePasswordInputObj) {
			if (this.passwordInputObj) {Event.observe(this.passwordInputObj, 'keyup', this.checkPassword_Ref);}
			if (this.retypePasswordInputObj) {Event.observe(this.retypePasswordInputObj, 'keyup', this.checkRetypePassword_Ref);}
		}

		this.checkPassword();
		this.checkRetypePassword();
	},

	checkPassword: function (container) {
		var str = $F(this.passwordInputObj);

		var tmpChk;

		tmpChk = document.getElementsByClassName("lengthChk", this.controlObj).first();
		if(tmpChk) {
			if (str.length >= 8 && str.length <= 12) { tmpChk.addClassName("ok");}
			else {tmpChk.removeClassName("ok");}
		}

		tmpChk = document.getElementsByClassName("lowerCaseChk", this.controlObj).first();
		if(tmpChk) {
			if ((/[a-z]/).test(str)) {tmpChk.addClassName("ok");}
			else {tmpChk.removeClassName("ok");}
		}

		tmpChk = document.getElementsByClassName("upperCaseChk", this.controlObj).first();
		if(tmpChk) {
			if ((/[A-Z]/).test(str)) {tmpChk.addClassName("ok");}
			else {tmpChk.removeClassName("ok");}
		}

		tmpChk = document.getElementsByClassName("numberChk", this.controlObj).first();
		if(tmpChk) {
			if((/\d/).test(str)) {tmpChk.addClassName("ok");}
			else {tmpChk.removeClassName("ok");}
		}

		tmpChk = document.getElementsByClassName("symbolChk", this.controlObj).first();
		if (tmpChk) {
			if( (/[-~!#\$%&\(\)\+=\.]/).test(str)) {tmpChk.addClassName("ok");}
			else {tmpChk.removeClassName("ok");}
		}

		tmpChk = document.getElementsByClassName("noSpaceChk", this.controlObj).first();
		if(tmpChk) {
			if((!(/\s/).test(str)) && (str.length >= 1) ) {tmpChk.addClassName("ok");}
			else {tmpChk.removeClassName("ok");}
		}

		tmpChk = document.getElementsByClassName("noMatchChk", this.controlObj).first();
		if(tmpChk && this.noMatchField) {
			if(($F(this.noMatchField) != $F(this.passwordInputObj)) && (str.length >= 1) ) {tmpChk.addClassName("ok");}
			else {tmpChk.removeClassName("ok")}
		}

		this.checkRetypePassword();
	},


	checkRetypePassword: function (container) {
		var firstValue = $F(this.passwordInputObj);
		var verifyValue = $F(this.retypePasswordInputObj);

		var isValidSoFar = new RegExp("^" + verifyValue + "");
		isValidSoFar.test(firstValue)

		if(verifyValue != "") {
			if(firstValue == verifyValue) { this.controlObj.addClassName("passwordMatch");this.controlObj.removeClassName("noPasswordMatch")}
			else if (!isValidSoFar.test(firstValue)) {this.controlObj.removeClassName("passwordMatch");this.controlObj.addClassName("noPasswordMatch")}
			else {this.controlObj.removeClassName("passwordMatch");this.controlObj.removeClassName("noPasswordMatch");}
		}
		else {
			this.controlObj.removeClassName("noPasswordMatch")
			this.controlObj.removeClassName("passwordMatch")
		}
	},

	setNoMatchField: function (inputObj) {
		this.noMatchField = inputObj;
	},

	destroy: function(baseObj) {

		this.controlObj.removeClassName("enforcingComplexPasswords");
		Event.stopObserving(this.passwordInputObj, 'keyup', this.checkPassword_Ref);
		Event.stopObserving(this.retypePasswordInputObj, 'keyup', this.checkRetypePassword_Ref);
		this.controlObj.removeClassName("noPasswordMatch")
		this.controlObj.removeClassName("passwordMatch")

	}


}

/*Character counter - counts down on keypress*/
charCount = Class.create();
charCount.prototype = {
    initialize: function (textField,countSpan,options) {
        this.textField=textField;
        this.countSpan=countSpan;
        this.options=options;
        if(this.options.maxChars) this.setMax(this.options.maxChars);
            else this.setMax(255);
        this.cropWarningIsShowing=false;
        this.updateCount();
        Event.observe(this.textField,"keyup",this.updateCount.bindAsEventListener(this));
        Event.observe(this.textField,"blur",this.updateCount.bindAsEventListener(this));
    },
    updateCount: function() {
        this.count = this.maxChars - this.textField.value.length;
        this.countSpan.innerHTML=this.count;

        if(this.cropWarningIsShowing&&this.count>0)
            this.options.cropWarningElement.style.display="none";

        if (this.options.plural)
            this.options.plural.innerHTML=this.count==1 ? "" : this.options.plural.innerHTML="s";

        if (this.options.enforceLength && this.count < 0){
            this.textField.value=this.textField.value.substring(0,this.maxChars);
            this.countSpan.innerHTML="0";
            if (this.options.cropWarningElement) {
                this.options.cropWarningElement.style.display="block";
                this.options.cropWarningElement.innerHTML=this.options.cropWarningInnerHTML;
                this.cropWarningIsShowing=true;
            }
        }
    },
    setMax: function(maxChars) {
        this.maxChars=maxChars;
        if(this.options.totalElement) this.options.totalElement.innerHTML=maxChars;
        this.updateCount();
    }

}

function initHideRevealPanel(targetId) {
    if (targetId==undefined){var targetId='body';}
    document.getElementsByClassName("hideReveal", $(targetId)).each(
            function(element){
                new hideReveal(element,"","","hideRevealPanelOFF","hideRevealPanelON");
            }
            );//ff3x above
}


function initMcModules (moduleClassName, baseObj) {
	var baseObj = (baseObj) ? baseObj: document;

	// a list of elements that contain microcontent triggers and content
	var topLvlElememts = document.getElementsByClassName(moduleClassName, baseObj);//ff3x
	topLvlElememts.each(
		function(element) {
			var params = eval( "(" + $(element).getAttribute("microcontent") + ")");
			var content = $(params.contentId).innerHTML;
			new Microcontent([element], {string:content}, {headerless:'true'});
			// TODO: review this with Scott. -vgracia
			//Novo.Microcontent.activate([$(element)],{content:{string:content1}, options:{headerless:'true', triggerEvent:'click', closeEvent:'click'}});
		}
	);
}



