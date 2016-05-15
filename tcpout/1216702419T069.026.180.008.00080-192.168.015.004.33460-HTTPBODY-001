//! ################################################################
//! Copyright (c) 2006 Amazon.com, Inc., and its Affiliates.
//! All rights reserved.
//! Not to be reused without permission
//! $Change: 1484612 $
//! $Revision: #46 $
//! $DateTime: 2007/08/03 23:45:52 $
//! ################################################################
function ciuAnnotationsInitLibrary() {  // Begin library code wrapper. Goes all the way to the bottom of the file
if (window.goN2LibMon) { goN2LibMon.beginLoad('ciuAnnotations', 'ciuJavaScriptLibs'); }
function ciuAnnotationConfig() {
this.initialized = false;
}
ciuAnnotationConfig.prototype.initialize = function(oStrings, oImages, useProductLinks, openProductLinksInNewWindow) 
{
var self = this;
this.defaultDimension = 50;  // height & width note when it's first added
this.defaultTop = 40;  // initial position of note
this.defaultLeft = 40;
this.handleWidth = 10;  // width of dragging handle
this.handleWidth2 = this.handleWidth * 2;
this.dragOffset = this.handleWidth - 2;
this.maxChars = 363;        // maximum number of characters a note can hold
this.noteTimeOut = 400;//200;     // ms before note starts to fade out after user mouses off
this.noteFadeTick = 1;//20;      //ms per opacity change - higher is more computationally efficient
this.noteOpacityCutoff = 0; //the lower opacity limit before the note is hidden
this.useProductLinks = (useProductLinks ? useProductLinks : false);  //defaults to false
this.openProductLinksInNewWindow = (openProductLinksInNewWindow ? openProductLinksInNewWindow : false);
this.noteFadeFunction = function(t, o)   //fadeTicks, current opacity (maybe useful?)
{
dodt = -.01*t; //change in opacity (between 0 and 1) over change in time (fadeTicks)
oi = 1.0;      //initial o
return self.noteOpacityCutoff;
}
this.noteBottomOffset = 10;  // pixels between bottom of bounding box and note/editBox
this.maxNoteWidth = 200; // width of note before it wraps in pixels
this.maxNoteWidthThreshold = 30; // if a note has more than these chars, then increase its width to the max size. prevents skinny long notes
this.defaultNoteWidth = 0; // default width of newly created note
this.shadowCorner = 10; // width/height of corner of shadow
this.noteEditBoxWidth = 200; 
this.noteEditBoxHeight = 185;
this.msgDivHeight = 30;   // dimensions of message box
this.msgDivWidth = 180;
this.isIdle = true;
this.imgLoadingSrc = "http://g-ec2.images-amazon.com/images/G/01/x-locale/common/narrowtimer_transparent.gif";
this.imgLoading = new Image(); //preload 'loading...' image for message box
this.imgLoading.src = this.imgLoadingSrc;
if (oStrings != null) {
this.addParams(oStrings);
}
if (oImages != null) {
this.addParams(oImages);
}
this.initialized = true;    
}
ciuAnnotationConfig.prototype.addParams = function(oParams) {
for (var i in oParams) {
this[i] = oParams[i];
}
}
ciuAnnotationConfig.prototype.getDynUpdateObj = function() {   
if (!this.duObj) {
var ciuDU = new N2DynUpObject('ciuDU');
ciuDU.cacheResponses(false);
ciuDU.setHandler('/gp/customer-images/save-annotation', 'xdfs');        
this.duObj = ciuDU;
}
return this.duObj;
}
window.ciuoAnnotationContainer = function(imgID, imgTagID, width, height, bIsEditable, hide, name, top, left, displayAddNote, displayRollOverMsg) {
if (!gciuAnnotationConfig.initialized) {
;
return false;
}
this.imageID = imgID;        // image ID as stored in db
this.imageTagID = imgTagID;  // unique element ID of the <img> tag
this.imgHeight = height;     // width/height of image discounting any padding added by image server
this.imgWidth = width;
this.name = name;            // the javascript variable name of this instance
this.bIsEditable = bIsEditable;
this.bInEditMode = false;
this.annotations = new Array();
this.annotations.length = 0; // keep track of # of annotations
if(gciuAnnotationConfig.useProductLinks)
{
this.productLinks = {};  //set by .addProductLinks(.);
this.wasWrappedInA = false;
}
this.imgDiv = document.createElement("div");
this.imgDiv.className = "ciuImgDiv";
this.imgLeft = left;
this.imgTop = top;
this.imgRight = this.imgWidth;
this.imgBottom = this.imgHeight;
this.teaseTimeout = null;
this.topOrder = 0; 
this.topNoteTextOrder = 0;
var containerRef = this;
if (bIsEditable) {
this.defaultWidth = gciuAnnotationConfig.defaultDimension;
this.defaultHeight = gciuAnnotationConfig.defaultDimension;
this.defaultTop = gciuAnnotationConfig.defaultTop;
this.defaultLeft = gciuAnnotationConfig.defaultLeft;
var overshoot = (this.defaultWidth + this.defaultLeft) - this.imgWidth;
if (overshoot > 0) {
var quarter = Math.round(this.imgWidth/4);
this.defaultWidth = 2 * quarter;
this.defaultLeft = quarter;
}
overshoot = (this.defaultHeight + this.defaultTop) - this.imgHeight;
if (overshoot > 0) {
var quarter = Math.round(this.imgHeight/4);
this.defaultHeight = 2 * quarter;
this.defaultTop = quarter;
}
if (displayAddNote) {
var addNoteButton = new ciuoAddNoteButton(containerRef);
goN2U.addClass(addNoteButton, "ciuAddNoteButton");
this.imgDiv.appendChild(addNoteButton);
}
this.showingLoadingMessage = false;
var self = this;
goN2U.addHandler(this.imgDiv, 'mousedown', function(e) {
if (!e) var e = window.event;                
var target = (e.target) ? e.target : e.srcElement;
if (self.showingLoadingMessage) {
return;
}
if (target != null && (target.tagName == 'A'|| target.parentNode.tagName == 'A')) {
setTimeout( function() { self.hideMessages() }, 2000);
}
else {
self.hideMessages();
}
});
this.ne = new ciuoDragHandle("ne");
this.nw = new ciuoDragHandle("nw");
this.se = new ciuoDragHandle("se");
this.sw = new ciuoDragHandle("sw");
this.editBox = null;        
}
var msgDiv = document.createElement("div");
msgDiv.className = "ciuJSFmsgDiv";
msgDiv.id = this.name + "JSFmsgs";
this.imgDiv.appendChild(msgDiv);
goN2U.shiftTo(msgDiv, this.imgLeft + ((this.imgWidth - gciuAnnotationConfig.msgDivWidth) / 2), this.imgTop + ((this.imgHeight - gciuAnnotationConfig.msgDivHeight) / 2));
this.msgDiv = msgDiv;
goN2U.hide(msgDiv);
if (displayRollOverMsg) {
this.rollOverMsg = document.createElement("div");
this.rollOverMsg.className = "ciuRollOverMsg";
this.rollOverMsg.innerHTML = gciuAnnotationConfig.strRollOver;
this.bShowRollOverMsg = false;
}
this.hidden = true;
if (!hide) {
this.show();
}
this.showingAnnotations = false;
goN2U.addHandler(this.imgDiv, 'mouseover', function(e) {
if (!(containerRef.bInEditMode)) {                
if (containerRef._hiddingTimer) {
clearTimeout(containerRef._hiddingTimer);
containerRef._hiddingTimer = false;
}
containerRef.showAnnotations();
}
});
goN2U.addHandler(this.imgDiv, 'mouseout', function(e) {
if (!containerRef.bInEditMode && gciuAnnotationConfig.isIdle) {              
containerRef._hiddingTimer = setTimeout( function() { containerRef.hideAnnotations(); }, 100);
}
});
}
ciuoAnnotationContainer.prototype.showLoadingMessage = function(message) {
this.clearMessages();
this.showingLoadingMessage = true;
var msgDiv = this.msgDiv;
goN2U.show(msgDiv);
msgDiv.style.display = 'block';
var loadingImg = document.createElement('img');;
loadingImg.src = gciuAnnotationConfig.imgLoadingSrc;
if (loadingImg.style) {
loadingImg.style.borderWidth = '0px';
}
else {
loadingImg.border = 0;
}
var content = document.createElement('div');
msgDiv.appendChild(content);
content.appendChild( document.createTextNode( message ) );
content.appendChild( document.createElement('br') );
content.appendChild( loadingImg );
}
ciuoAnnotationContainer.prototype.hideMessages = function() {
goN2U.hide(this.msgDiv);
this.clearMessages();
}
ciuoAnnotationContainer.prototype.clearMessages = function() {
if(this.msgDiv.childNodes != null) {
for( var i = 0; this.msgDiv.childNodes[i]; i++ ) {
var kid =  this.msgDiv.childNodes[i];
this.msgDiv.removeChild(kid);
}
}
this.showingLoadingMessage = false;
}
ciuoAnnotationContainer.prototype.showErrorMessage = function(message) {
this.clearMessages();
var messageDiv = document.createElement('div');
messageDiv.innerHTML = message;
this.msgDiv.appendChild(messageDiv);
}
ciuoAnnotationContainer.prototype.showAnnotations = function() {
this.cancelTease();
if (! this.showingAnnotations) {
this.showingAnnotations = true;
for (var i in this.annotations) {
this.annotations[i].show();
}
}
}
ciuoAnnotationContainer.prototype.hideAnnotations = function() {
this.showingAnnotations = false;
for (var i in this.annotations) {
this.annotations[i].hide();
}
}
ciuoAnnotationContainer.prototype.addAnnotation = function(annotation) {
if (annotation && annotation.id) {
this.annotations[annotation.id] = annotation;
this.annotations.length++;
if (annotation.order > this.topOrder) {
this.topOrder = annotation.order;
}
if (!this.hidden && this.showingAnnotations) {
annotation.show();
}
}
this.showRollOverMsg();
}
ciuoAnnotationContainer.prototype.removeAnnotation = function(annotation) {
annotation.hide();
delete this.annotations[annotation.id];
this.annotations.length--;
if (this.annotations.length == 0) this.hideRollOverMsg();
this.imgDiv.removeChild(annotation.annotationDiv);
if (annotation.order == this.topOrder) {
this.topOrder = 0;
for (var i in this.annotations) {
if (this.annotations[i].order > this.topOrder) {
this.topOrder = this.annotations[i].order;
}
}
}
}
ciuoAnnotationContainer.prototype.detachEditBox = function() 
{
this.editBox.detach(this.imgDiv);
}
ciuoAnnotationContainer.prototype.setProductLinks = function(productLinks)
{
if(gciuAnnotationConfig.useProductLinks)    //for the weblab switch
{
this.productLinks = productLinks;
}
}
ciuoAnnotationContainer.prototype.addProductLink = function(asin)
{
if(gciuAnnotationConfig.useProductLinks)  //for the weblab switch
{
if(asin.match(/\w{10}/) && !this.productLinks[asin])
{
this.productLinks[asin] = '/gp/product/' + asin;
this.productLinks[asin] += '/ref=cm_ciu_pl_' + asin + '_' + this.imageID;
}
}
}
ciuoAnnotationContainer.prototype.showRollOverMsg = function() {
if (this.rollOverMsg && !this.bShowRollOverMsg && this.annotations.length > 0 && !this.hidden) {
var parent = this.imgDiv.parentNode;
if (!parent) return;
var sibling = this.imgDiv.nextSibling;
if (sibling) {
parent.insertBefore(this.rollOverMsg, sibling);
} else {
parent.appendChild(this.rollOverMsg);
}
this.bShowRollOverMsg = true;
}
}
ciuoAnnotationContainer.prototype.hideRollOverMsg = function() {
if (this.rollOverMsg && this.bShowRollOverMsg && !this.hidden) {
var parent = this.imgDiv.parentNode;
if (!parent) return;
parent.removeChild(this.rollOverMsg);
this.bShowRollOverMsg = false;
}
}
ciuoAnnotationContainer.prototype.show = function() 
{
if (this.hidden) 
{
var image = goN2U.getElement(this.imageTagID);
if (image) 
{
goN2U.setHeight(this.imgDiv, image.height);
goN2U.setWidth(this.imgDiv, image.width);
if(gciuAnnotationConfig.useProductLinks)
{
var topA = null;
for(var node = image; node != null; node = node.parentNode)   //climb up the tree
{
if('tagName' in node && node.tagName == 'A')
{
topA = node;
}
}
if(topA)
{
while(topA.hasChildNodes())
{
topA.removeChild(topA.firstChild);
}
topA.parentNode.replaceChild(this.imgDiv, topA);    
this.imgDiv.appendChild(topA);
topA.appendChild(image);    //put the image under topA
this.wasWrappedInA = true;
}
else
{
image.parentNode.insertBefore(this.imgDiv, image);            
image.parentNode.removeChild(image);
this.imgDiv.appendChild(image);
this.wasWrappedInA = false;
}
}
else
{
var parent = image.parentNode;
parent.insertBefore(this.imgDiv, image);
parent.removeChild(image);
this.imgDiv.appendChild(image);
if(goN2U.bIsIE && parent.nodeName == "A" && !this.bIsEditable) 
{
this.imgDiv.style.cursor = "pointer";
goN2U.addHandler(this.imgDiv, 'mousedown', function(e) {
window.location = parent.href;
});
}
}
goN2U.show(this.imgDiv);
this.hidden = false;
this.showRollOverMsg();
}
}
}
ciuoAnnotationContainer.prototype.hide = function() 
{
if (!this.hidden) 
{
var image = goN2U.getElement(this.imageTagID);
if (image) 
{
this.hideRollOverMsg();
if(gciuAnnotationConfig.useProductLinks && this.wasWrappedInA)
{
var node = this.imgDiv.firstChild;
while(node != null && !('tagName' in node && node.tagName == 'A')) 
{
node = node.nextSibling;
}
this.imgDiv.removeChild(node);
this.imgDiv.parentNode.replaceChild(node, this.imgDiv); 
this.wasWrappedInA = false;
}
else
{
var parent = image.parentNode.parentNode;
this.imgDiv.removeChild(image);
parent.insertBefore(image, this.imgDiv);
parent.removeChild(this.imgDiv);
}
this.hidden = true;
for (var i in this.annotations) 
{
this.annotations[i].contentBox.hide();
if (this.bIsEditable && this.annotations[i].bInEditMode) 
{
this.annotations[i].cancelAnnotation();
}
} 
}
if (!this.showingLoadingMessage) 
{
this.hideMessages();
}
}
}
ciuoAnnotationContainer.prototype.cancelTease = function() {
if (this.teaseTimeout != null) {
this.hideAnnotations();
clearTimeout(this.teaseTimeout);
this.teaseTimeout = null;
this.setBorderOpacity(1.0);
}
}
ciuoAnnotationContainer.prototype.setBorderOpacity = function(opacity) {
for (var i in this.annotations) { 
this.annotations[i].setBorderOpacity(opacity);
}
}
ciuoAnnotationContainer.prototype.teaseAnnotations = function() {
if (!this.hidden && (this.teaseTimeout == null) && (gciuAnnotationConfig.isIdle) && (!this.bInEditMode)) {
var container = this;
var opacity = 0.0;
if (this.annotations.length == 0) {
return;
}
this.setBorderOpacity(0.0);
this.showAnnotations();
var tickTime = 100;
var decreaseOpacityTick = function() {
if (opacity < 0.11) {
container.cancelTease();
}
else {
opacity -= 0.10;
container.setBorderOpacity(opacity);
container.teaseTimeout = setTimeout(decreaseOpacityTick, tickTime/2);
}
}
var increaseOpacityTick = function() {
if (opacity > 0.80) {
container.teaseTimeout = setTimeout(decreaseOpacityTick, 300);
}
else {
container.setBorderOpacity(opacity);
opacity += 0.10;
container.teaseTimeout = setTimeout(increaseOpacityTick, tickTime);
}
}
this.teaseTimeout = setTimeout(function() { container.teaseTimeout = setTimeout(increaseOpacityTick, tickTime); }, 100);
}
}
function ciuoDragHandle(direction) {
var handle = document.createElement('div');
handle.className = "ciuDragHandle";
handle.cursorStyle = direction + "-resize";
handle.style.cursor = handle.cursorStyle;
if (goN2U.bIsIE) {
goN2U.setWidth(handle, gciuAnnotationConfig.handleWidth);
goN2U.setHeight(handle, gciuAnnotationConfig.handleWidth);        
}
return handle;
}
function ciuoContentBox(annotation) {
this.annotation = annotation;
}
function ciuoEditBox() {
this.annotation = null;
this.editBoxDiv = null;
}
ciuoEditBox.prototype.attachButtons = function(annotationObj) {
this.saveButton.attach(annotationObj);
this.cancelButton.attach(annotationObj);
this.deleteButton.attach(annotationObj);
}
ciuoEditBox.prototype.detachButtons = function() {
this.saveButton.detach();
this.cancelButton.detach();
this.deleteButton.detach();
}
ciuoEditBox.prototype.move = function() {
goN2U.shiftTo(this.editBoxDiv, this.annotation.left, this.annotation.bottom + gciuAnnotationConfig.noteBottomOffset);
}
function ciuoAnnotationButton(name, img, id) 
{
if (img) 
{
var button = document.createElement("img");
button.id = id;
button.className = "ciuAnnotationButton";
button.src = img;
button.alt = name;
this.button = button;
}
}
ciuoAnnotationButton.prototype.attach = function(annotationObj) {
this.annotation = annotationObj;
}
ciuoAnnotationButton.prototype.detach = function() {
this.annotation = null;
}
window.ciuoAddNoteButton = function(container) {
var addNoteButton = new ciuoAnnotationButton(gciuAnnotationConfig.strAddNote, gciuAnnotationConfig.addNoteButton);
goN2U.addHandler(addNoteButton.button, "mousedown", function() {
if(gciuAnnotationConfig.isIdle) {          
new ciuoNote(container);
}
});
return addNoteButton.button;
}
function ciuoSaveAnnotationButton(editBox) {
this.base = ciuoAnnotationButton;
var name = gciuAnnotationConfig.strSave;
var img = gciuAnnotationConfig.saveButton;
var id = 'ciuSaveButton';
this.base(name, img, id);
this.disabled = false;
var buttonRef = this;
goN2U.addHandler(this.button, "mousedown", function(evt) 
{
if (!evt) evt = window.event;
evt.cancelBubble = true;
if (evt.stopPropagation) {
evt.stopPropagation();
}
if (evt.preventDefault) {
evt.preventDefault();
}
if (buttonRef.annotation.saveAnnotation && !buttonRef.disabled) 
{
buttonRef.annotation.saveAnnotation();
}
});
}
ciuoSaveAnnotationButton.prototype = new ciuoAnnotationButton;
ciuoSaveAnnotationButton.prototype.disable = function()
{
this.disabled = true;
var saveButton = document.getElementById('ciuSaveButton');
if(saveButton)
{
saveButton.src = gciuAnnotationConfig.ghostedSaveButton;
saveButton.style.cursor = 'default';
}
}
ciuoSaveAnnotationButton.prototype.enable = function()
{
this.disabled = false;
var saveButton = document.getElementById('ciuSaveButton');
if(saveButton)
{
saveButton.src = gciuAnnotationConfig.saveButton;
saveButton.style.cursor = 'pointer';
}
}
function ciuoCancelAnnotationButton(editBox) {
this.base = ciuoAnnotationButton;
var name = gciuAnnotationConfig.strCancel;
var img = gciuAnnotationConfig.cancelButton;
this.base(name, img, 'ciuCancelButton');
var buttonRef = this;    
goN2U.addHandler(this.button, "mousedown", function(evt) {
if (!evt) evt = window.event;
evt.cancelBubble = true;
if (evt.stopPropagation) {
evt.stopPropagation();
}
if (evt.preventDefault) {
evt.preventDefault();
}
if (buttonRef.annotation.cancelAnnotation) {
buttonRef.annotation.cancelAnnotation();
}
});
}
ciuoCancelAnnotationButton.prototype = new ciuoAnnotationButton;
function ciuoDeleteAnnotationButton(editBox) {
this.base = ciuoAnnotationButton;
var name = gciuAnnotationConfig.strDelete;
var img = gciuAnnotationConfig.deleteButton;    
this.base(name, img, 'ciuDeleteButton');
var buttonRef = this;
goN2U.addHandler(this.button, "mousedown", function(evt) {
if (!evt) evt = window.event;
evt.cancelBubble = true;
if (evt.stopPropagation) {
evt.stopPropagation();
}
if (evt.preventDefault) {
evt.preventDefault();
}
if (buttonRef.annotation.deleteAnnotation) {
buttonRef.annotation.deleteAnnotation();
}
});
}
ciuoDeleteAnnotationButton.prototype = new ciuoAnnotationButton;
function ciuoAnnotation(id, type, bIsEditable, containerObj) {
this.id = id;
this.type = type;
this.bIsEditable = bIsEditable;
this.container = containerObj;
this.bInEditMode = false;
this.fStartDrag = this.returnHandler('_startDrag');
this.fDrag = this.returnHandler('_drag');
this.fStopDrag = this.returnHandler('_stopDrag');
}
ciuoAnnotation.prototype.createAnnotationArea = function(top, left, width, height, order) {
if (!this.isNew) {
this.top = Math.round(this.container.imgTop
+ this.container.imgHeight * top);
this.left = Math.round(this.container.imgLeft
+ this.container.imgWidth * left);
this.height = Math.floor(this.container.imgHeight * height)
this.width =  Math.floor(this.container.imgWidth * width);
this.order = order;
} // else default values are already populated, order of new note is already set to topOrder
this.right = this.left + this.width;
this.bottom = this.top + this.height;
var highlightDiv = document.createElement("div");
highlightDiv.className = "ciuOuterAnnotation";
goN2U.setZIndex(highlightDiv, this.order);
if (this.bIsEditable) {
highlightDiv.style.cursor = "pointer";
this.cursorStyle = "move";
}
this.container.imgDiv.appendChild(highlightDiv);
var blackDiv = document.createElement("div");
blackDiv.className = "ciuBlackAnnotation";
var whiteDiv = document.createElement("div");
whiteDiv.className = "ciuWhiteAnnotation";
var innerDiv = document.createElement("div");
innerDiv.className = "ciuInnerAnnotation";
whiteDiv.appendChild(innerDiv);
blackDiv.appendChild(whiteDiv);
highlightDiv.appendChild(blackDiv);
this.annotationDiv = highlightDiv;
this.blackDiv = blackDiv;
this.whiteDiv = whiteDiv;
this.innerDiv = innerDiv;
return highlightDiv;
}
ciuoAnnotation.prototype.setBorderOpacity = function(pct) {
var arry = new Array(this.blackDiv, this.whiteDiv);
for (var i in arry) {
arry[i].style["filter"] = "alpha(opacity=" + pct*100 + ")";
arry[i].style["-moz-opacity"] = pct;
arry[i].style["opacity"] = pct 
arry[i].style["-khtml-opacity"] = pct;
}
}
ciuoAnnotation.prototype.highlight = function() {
goN2U.addClass(this.noteDiv, "ciuHighlightAnnotation");
}
ciuoAnnotation.prototype.unhighlight = function() {
goN2U.removeClass(this.noteDiv, "ciuHighlightAnnotation");
}
ciuoAnnotation.prototype.updateID = function(id) {
this.id = id;
this.contentBox.updateID();
}
ciuoAnnotation.prototype.returnHandler = function(methodName) {
var o = {obj:this, method:methodName};
var fn = function(e) {
if (!e) e = window.event;
o.obj[o.method](e);
}
return fn;
}
ciuoAnnotation.prototype._startDrag = function(evt) {
evt = (evt) ? evt : window.event;
var target = (evt.target) ? evt.target : evt.srcElement;   
var mouseDownX = goN2U.isDefined(evt.clientX) ? evt.clientX : evt.pageX;
var mouseDownY = goN2U.isDefined(evt.clientY) ? evt.clientY : evt.pageY;
var dragObj = null;
var bMove = false;
if (goN2U.elementIsContainedBy(target, this.se)) {
dragObj = this.se;
this.moveResize = this.resizeSE;
} else if (goN2U.elementIsContainedBy(target, this.sw)) {
dragObj = this.sw;
this.moveResize = this.resizeSW;
} else if (goN2U.elementIsContainedBy(target, this.ne)) {
dragObj = this.ne;
this.moveResize = this.resizeNE;
} else if (goN2U.elementIsContainedBy(target, this.nw)) {
dragObj = this.nw;
this.moveResize = this.resizeNW;
} else if (goN2U.elementIsContainedBy(target, this.annotationDiv)) {
if(this.container.topOrder == this.order) {
dragObj = this.annotationDiv;
this.moveResize = this.move;
bMove = true;
} else {
return true;
}
} else {
return true;
}
var docBody = document.body;
if (docBody && docBody.setCapture) {
docBody.setCapture();
}
if (bMove) {
this.dragOffsetX = mouseDownX - this.left;
this.dragOffsetY = mouseDownY - this.top;
} else {
this.dragOffsetX = mouseDownX - goN2U.getElementLeft(dragObj);
this.dragOffsetY = mouseDownY - goN2U.getElementTop(dragObj);
}
this.isButtonDown = true;
evt.cancelBubble = true;
if (evt.stopPropagation) {
evt.stopPropagation();
}
if (evt.preventDefault) {
evt.preventDefault();
}
if (!goN2U.bIsIE) {
var cursor = dragObj.style.cursor;
this.ne.style.cursor = '';
this.nw.style.cursor = '';
this.se.style.cursor = '';
this.sw.style.cursor = '';
this.annotationDiv.style.cursor = '';
this.container.imgDiv.style.cursor = cursor;
}
return false;
}
ciuoAnnotation.prototype._drag = function(evt) {
evt = (evt) ? evt : window.event;
if (!this.isButtonDown) {
return true;
}
var nX = goN2U.isDefined(evt.clientX) ? evt.clientX : evt.pageX;
var nY = goN2U.isDefined(evt.clientY) ? evt.clientY : evt.pageY;
nY -= this.dragOffsetY;
nX -= this.dragOffsetX;
this.moveResize(nX, nY);
this.moveHandles();
this.editBox.move();
evt.cancelBubble = true;
if (evt.stopPropagation) {
evt.stopPropagation();
}
if (evt.preventDefault) {
evt.preventDefault();
}
return false;
}
ciuoAnnotation.prototype._stopDrag = function(evt) {
if (!this.isButtonDown) {
return true;
}
evt = (evt) ? evt : window.event;
var target = (evt.target) ? evt.target : evt.srcElement;
var docBody = document.body;
if (docBody && docBody.releaseCapture) {
docBody.releaseCapture();
}
this.isButtonDown = false;
evt.cancelBubble = true;
if (evt.stopPropagation) {
evt.stopPropagation();
}
if (evt.preventDefault) {
evt.preventDefault();
}
if (!goN2U.bIsIE) {
this.container.imgDiv.style.cursor = "";
this.ne.style.cursor = this.ne.cursorStyle;
this.se.style.cursor = this.se.cursorStyle;
this.sw.style.cursor = this.sw.cursorStyle;
this.nw.style.cursor = this.nw.cursorStyle;
this.annotationDiv.style.cursor = this.cursorStyle;
}
return false;
}
ciuoAnnotation.prototype.hookEvents = function() {
goN2Events.addEventHandler('mousedown', this.fStartDrag);
goN2Events.addEventHandler('mousemove', this.fDrag);
goN2Events.addEventHandler('mouseup', this.fStopDrag);
}
ciuoAnnotation.prototype.unhookEvents = function() {
goN2Events.removeEventHandler('mousedown', this.fStartDrag);
goN2Events.removeEventHandler('mousemove', this.fDrag);
goN2Events.removeEventHandler('mouseup', this.fStopDrag);  
}
ciuoAnnotation.prototype.attachHandles = function() {
this.sw = this.container.sw;
this.nw = this.container.nw;
this.se = this.container.se;
this.ne = this.container.ne;
this.moveHandles();
this.container.imgDiv.appendChild(this.sw);
this.container.imgDiv.appendChild(this.nw);
this.container.imgDiv.appendChild(this.se);
this.container.imgDiv.appendChild(this.ne);
}
ciuoAnnotation.prototype.detachHandles = function() {
this.container.imgDiv.removeChild(this.sw);
this.container.imgDiv.removeChild(this.se);
this.container.imgDiv.removeChild(this.nw);
this.container.imgDiv.removeChild(this.ne);
this.sw = null;
this.nw = null;
this.se = null;
this.ne = null;
}
ciuoAnnotation.prototype.moveHandles = function() {
var left = this.left - gciuAnnotationConfig.dragOffset;
var top = this.top - gciuAnnotationConfig.dragOffset;
goN2U.shiftTo(this.sw, left, this.bottom);
goN2U.shiftTo(this.nw, left, top);
goN2U.shiftTo(this.se, this.right, this.bottom);
goN2U.shiftTo(this.ne, this.right, top);   
}
ciuoAnnotation.prototype.makeStatic = function() {
this.blackDiv.style.borderStyle = "solid";
this.whiteDiv.style.borderStyle = "solid";
this.annotationDiv.style.cursor = "pointer";
this.detachHandles();
this.container.detachEditBox();
this.unhookEvents();
this.container.bInEditMode = false;
this.bInEditMode = false;
}
ciuoAnnotation.prototype.makePositionable = function() {
this.hookEvents();
this.contentBox.hide();
this.whiteDiv.style.borderStyle = "dashed";
this.blackDiv.style.borderStyle = "dashed";    
this.annotationDiv.style.cursor = this.cursorStyle;
this.unhighlight();
this.attachHandles();
}
ciuoAnnotation.prototype.move = function(nX, nY){
if (nX < 0) {
nX = 0;
} else if (nX + this.width > this.container.imgRight) {
nX = this.container.imgRight - this.width;
}
this.left = nX;
if (nY < 0) {
nY = 0;
} else if( nY + this.height > this.container.imgBottom) {
nY = this.container.imgBottom - this.height;
}
this.top = nY;
this.right = this.left + this.width;
this.bottom = this.top + this.height;
goN2U.shiftTo(this.annotationDiv, this.left, this.top);    
goN2U.shiftTo(this.contentBox.noteTextDiv, this.left, this.bottom + gciuAnnotationConfig.noteBottomOffset);    
}
ciuoAnnotation.prototype.resizeNE = function(nX, nY){
nY += gciuAnnotationConfig.dragOffset;
if (nX < this.left + gciuAnnotationConfig.handleWidth2) {
nX = this.left + gciuAnnotationConfig.handleWidth2;
} else if (nX > this.container.imgRight) {
nX = this.container.imgRight;
}
this.width = nX - this.left;
this.right = this.left + this.width;
if (nY < 0) {
nY = 0;
} else if( nY > this.bottom - gciuAnnotationConfig.handleWidth2) {
nY = this.bottom - gciuAnnotationConfig.handleWidth2;
}
this.top = nY;
this.height = this.bottom - nY;
this.reposition();    
}
ciuoAnnotation.prototype.resizeNW = function(nX, nY) {
nX += gciuAnnotationConfig.dragOffset;
nY += gciuAnnotationConfig.dragOffset;
if (nX < 0) {
nX = 0;
} else if (nX > this.right - gciuAnnotationConfig.handleWidth2) {
nX = this.right - gciuAnnotationConfig.handleWidth2;
}
this.width = this.right - nX;
this.left = nX;
if (nY < 0) {
nY = 0;
} else if( nY > this.bottom - gciuAnnotationConfig.handleWidth2) {
nY = this.bottom - gciuAnnotationConfig.handleWidth2;
}
this.top = nY;
this.height = this.bottom - nY;
this.reposition();    
}
ciuoAnnotation.prototype.resizeSE = function(nX, nY) {
if (nX < this.left + gciuAnnotationConfig.handleWidth2) {
nX = this.left + gciuAnnotationConfig.handleWidth2;
} else if (nX > this.container.imgRight) {
nX = this.container.imgRight;
}
this.width = nX - this.left;           
if (nY < this.top + gciuAnnotationConfig.handleWidth2) {
nY = this.top + gciuAnnotationConfig.handleWidth2;
} else if( nY > this.container.imgBottom) {
nY = this.container.imgBottom;
}
this.height = nY - this.top;
this.reposition();   
}
ciuoAnnotation.prototype.resizeSW = function(nX, nY) {
nX += gciuAnnotationConfig.dragOffset;
if (nX < 0) {
nX = 0;
} else if (nX > this.right - gciuAnnotationConfig.handleWidth2) {
nX = this.right - gciuAnnotationConfig.handleWidth2;
}
this.width = this.left + this.width - nX;
this.left = nX;
if (nY < this.top + gciuAnnotationConfig.handleWidth2) {
nY = this.top + gciuAnnotationConfig.handleWidth2;
} else if( nY > this.container.imgBottom) {
nY = this.container.imgBottom;
}
this.height = nY - this.top;
this.reposition();
}
ciuoAnnotation.prototype.reposition = function() {
this.right = this.left + this.width;
this.bottom = this.top + this.height;
if (this.right > this.container.imgWidth + this.container.imgLeft) {
this.right = this.container.imgWidth + this.container.imgLeft;
this.width = this.right - this.left;
}
if (this.bottom > this.container.imgHeight + this.container.imgTop) {
this.bottom = this.container.imgHeight + this.container.imgTop;
this.height = this.bottom - this.top;
}
if (this.top < this.container.imgTop) {
this.top = this.container.imgTop;
}
if (this.left < this.container.imgLeft) {
this.left = this.container.imgLeft;
}
var clamp = function(x) { return (x >= 0) ? x : 1 };
goN2U.setWidth(this.annotationDiv, clamp(this.width));
goN2U.setHeight(this.annotationDiv, clamp(this.height));
goN2U.setWidth(this.blackDiv, clamp(this.width - 2));
goN2U.setHeight(this.blackDiv, clamp(this.height - 2));
goN2U.setWidth(this.whiteDiv, clamp(this.width - 4));
goN2U.setHeight(this.whiteDiv, clamp(this.height - 4));
goN2U.setWidth(this.innerDiv, clamp(this.width - 4));
goN2U.setHeight(this.innerDiv, clamp(this.height - 4));
goN2U.shiftTo(this.annotationDiv, clamp(this.left), clamp(this.top));    
goN2U.shiftTo(this.contentBox.noteTextDiv, clamp(this.left), clamp(this.bottom + gciuAnnotationConfig.noteBottomOffset));
}
ciuoAnnotation.prototype.saveOldValues = function() {
this.oldOrder = this.order;
this.oldTop = this.top;
this.oldLeft = this.left;
this.oldWidth = this.width;
this.oldHeight = this.height;
this.oldContent = this.content;
}
ciuoAnnotation.prototype.revertValues = function() {
this.order = this.oldOrder;
goN2U.setZIndex(this.annotationDiv, this.order);
this.top = this.oldTop;
this.left = this.oldLeft;
this.width = this.oldWidth;
this.height = this.oldHeight;
this.content = this.oldContent;
if (this.contentBox) {
this.contentBox.update(this.oldContent);
}
this.reposition();
}
ciuoAnnotation.prototype.moveToTop = function() {
if (this.order < this.container.topOrder) {
this.order = this.container.topOrder + 1;
this.container.topOrder = this.order;
goN2U.setZIndex(this.annotationDiv, this.order);
} // else already at the top, do nothing.
}
ciuoAnnotation.prototype.attachEditBox = function() {
this.editBox.attach(this);
goN2U.shiftTo(this.editBox.editBoxDiv, this.left, this.bottom + gciuAnnotationConfig.noteBottomOffset);
this.container.imgDiv.appendChild(this.editBox.editBoxDiv);
}
function ciuoNoteEditBox(containerObj) 
{
var neb = this;
this.container = containerObj;
this.base = ciuoEditBox;
this.base();
var editBoxDiv = document.createElement("div");
editBoxDiv.className = "ciuNoteEditBoxDiv";
var width = gciuAnnotationConfig.noteEditBoxWidth;
var height = gciuAnnotationConfig.noteEditBoxHeight;
editBoxDiv.innerHTML = this.getNoteEditBoxHtml();
this.editBoxDiv = editBoxDiv;
var editBoxForm = document.createElement("form");
editBoxForm.id = 'ciuNoteEditBoxForm';
editBoxForm.className = 'ciuNoteEditBoxForm';
editBoxForm.method = 'post';
var bIsSafari_1_3 = goN2U.bIsSafari && navigator.userAgent.match(/312/);
if(gciuAnnotationConfig.useProductLinks && !bIsSafari_1_3)
{
var asinInjector = document.createElement('div');
asinInjector.className = "ciuAsinInjectorDiv";
var asinInjectorA = document.createElement('a');
asinInjectorA.name = "addwysiasin|zz|aa";
asinInjectorA.href = "#";
asinInjectorA.style.marginBottom = "20px";
var asinInjectorImg = document.createElement('img');
asinInjectorImg.width = "113";
asinInjectorImg.height = "17";
asinInjectorImg.alt = "";
asinInjectorImg.src = gciuAnnotationConfig.asinInjectorButton;
asinInjector.appendChild(asinInjectorA);
asinInjectorA.appendChild(asinInjectorImg);
editBoxForm.appendChild(asinInjector);
}
var textarea;
if(goN2U.bIsIE) 
{
textarea = document.createElement('<textarea name="content">');
textarea.createTextRange = true;
} 
else 
{
textarea = document.createElement('textarea');
textarea.createTextRange = false;
}
textarea.name = "content";
textarea.id = "ciuEditTextArea";
textarea.style.fontSize = '8pt';
textarea.editBox = this;
this.textarea = textarea;
goN2U.addHandler(textarea, 'click', function(e)
{
neb.clearDefaultText();
neb.updateCharCount();
});
goN2U.addHandler(textarea, 'keyup', 
function()
{
neb.saveCursorPos();
neb.updateCharCount();
}
);   //Nice for pasting
if (goN2U.bIsSafari) 
{
textarea.onpaste = function(){neb.updateCharCount();};
}
goN2U.addHandler(textarea, 'keydown', function(){neb.updateCharCount();}); 
if(goN2U.bIsIE) 
{
goN2U.addHandler(textarea, 'click', function(){neb.saveCursorPos();});
}
editBoxForm.appendChild(textarea);
this.paramName = ['action',
'imageID',
'noteID',
'top',
'left',
'height',
'width',
'order',
'container'];
this.param = {};
for (var p in this.paramName) {
var name = this.paramName[p];
if (goN2U.bIsIE) {
var e = '<input name="' + name + '" />';
this.param[name] = document.createElement(e);
} else {
this.param[name] = document.createElement('input');
this.param[name].name = name;
}
this.param[name].type = 'hidden';
this.param[name].value = '';
editBoxForm.appendChild(this.param[name]);
};
var td = this.editBoxDiv.getElementsByTagName('td')[1];
td.appendChild(editBoxForm);
if (this.container) {
this.saveButton = new ciuoSaveAnnotationButton(this);
this.cancelButton = new ciuoCancelAnnotationButton(this);
this.deleteButton = new ciuoDeleteAnnotationButton(this);
var editNoteButtonsTable = document.createElement('table');
var editNoteButtonsBody = document.createElement('tbody');
editNoteButtonsTable.className = 'ciuEditNoteButtons';
var buttonsRow = document.createElement('tr');
var saveButtonCell = document.createElement('td');
saveButtonCell.className = 'ciuEditNoteSaveButton';
var nonSaveButtonsCell = document.createElement('td');
nonSaveButtonsCell.className = 'ciuEditNoteNonSaveButtons';
saveButtonCell.appendChild(this.saveButton.button);
nonSaveButtonsCell.appendChild(this.cancelButton.button);
nonSaveButtonsCell.appendChild(this.deleteButton.button);
buttonsRow.appendChild(saveButtonCell);
buttonsRow.appendChild(nonSaveButtonsCell);
editNoteButtonsBody.appendChild(buttonsRow);
editNoteButtonsTable.appendChild(editNoteButtonsBody);
td.appendChild(editNoteButtonsTable);
}
if (goN2U.bIsIE) 
{
ciuAttachShadow(this.editBoxDiv, width + 13, height + 1);
}
else 
{
ciuAttachShadow(this.editBoxDiv, width, height);
}
}
ciuoNoteEditBox.prototype = new ciuoEditBox;
ciuoNoteEditBox.prototype.attach = function(annotationObj) {
this.annotation = annotationObj;
this.attachButtons(annotationObj);
this.textarea.value = annotationObj.content; 
}
ciuoNoteEditBox.prototype.detach = function(parentDiv)
{
parentDiv.removeChild(this.editBoxDiv);
}
ciuoNoteEditBox.prototype.resetParams = function() {
for (var p in this.paramName) {
var name = this.paramName[p];
this.param[name].value = '';
};
}
ciuoNoteEditBox.prototype.saveCursorPos = function() 
{
if(this.textarea.createTextRange)
{
this.textarea.cursorPos = document.selection.createRange().duplicate();
}
}
ciuoNoteEditBox.prototype.updateCharCount = function()
{    
var charCountDiv = document.createElement('div');
charCountDiv.id = 'charCountDiv';
var charCountText;
if(this.textarea.value == gciuAnnotationConfig.strNew)
{
charCountText = ' ';
charCountDiv.className = 'ciuCharCountOK';
}
else     //this contains user-generated text
{
var charCount = this.textarea.value.length;
var diff = gciuAnnotationConfig.maxChars - charCount;
if(diff >= 0)
{
charCountDiv.className = 'ciuCharCountOK';
charCountText = gciuAnnotationConfig.strCharsLeft;
charCountText = charCountText.replace(/%d/, diff);
if(this.saveButton.disabled)
{
this.saveButton.enable();
}
}
else
{
charCountDiv.className = 'ciuCharCountNotOK';
charCountText = gciuAnnotationConfig.strCharsOverMax;
charCountText = charCountText.replace(/%d/, Math.abs(diff));
if(!this.saveButton.disabled)
{
this.saveButton.disable();
}
}
}
charCountDiv.appendChild(document.createTextNode(charCountText));
var oldCharCountDiv = document.getElementById('charCountDiv'); 
if(oldCharCountDiv)
{
oldCharCountDiv.parentNode.replaceChild(charCountDiv, oldCharCountDiv);
}
else
{
this.textarea.parentNode.appendChild(charCountDiv);
}
}
ciuoNoteEditBox.prototype.clearDefaultText = function()
{
if (this.textarea.value == gciuAnnotationConfig.strNew) 
{
this.textarea.value = "";
}
}
ciuoNoteEditBox.prototype.getNoteEditBoxHtml = function() 
{
var strHtml = '<table class="ciuNoteEditBox">';
strHtml +=    '<tr>'
+        '<td class="topLeft">&nbsp;&nbsp;&nbsp;&nbsp;</td>'
+        '<td class="topCenter">'
+        '</td>'
+        '<td class="topRight">&nbsp;</td>'
+     '</tr>'
+     '<tr>'
+        '<td class="bottomLeft">&nbsp;</td>'
+        '<td class="bottomCenter">&nbsp;</td>'
+        '<td class="bottomRight">&nbsp;</td>'
+     '</tr>'
+  '</table>';
return strHtml;
}
function ciuAttachShadow(obj, width, height) {
if (obj.shadow) return;
if (width == null)
width = goN2U.getElementWidth(obj);
if (height == null)
height = goN2U.getElementHeight(obj);
var shadowDiv = document.createElement("div");
shadowDiv.className = "ciuDropShadow";
var corner = gciuAnnotationConfig.shadowCorner; // width/height of corner image
var halfCorner = corner / 2;
var right = -halfCorner;
var bottom = -halfCorner;    
var top = 0;
var left = 0;
var shadowHeight = height - 3*halfCorner;
var shadowWidth = width - 3*halfCorner;
if (goN2U.bIsIE) {
shadowHeight--;
}
goN2U.setWidth(shadowDiv, width);
goN2U.setHeight(shadowDiv, height);
var oStyle = { width: corner, height: corner, top: top, right: right };
var strHtml = ciuGetShadowImgTag('tr', oStyle);
oStyle = { width: corner, height: corner, left: left, bottom: bottom };
strHtml += ciuGetShadowImgTag('bl', oStyle);
oStyle = { width: corner, height: corner, right: right, bottom: bottom };
strHtml += ciuGetShadowImgTag('br',  oStyle);
oStyle = { width: corner, height: shadowHeight, top: corner, right: right };
strHtml += ciuGetShadowImgTag('rc', oStyle);
oStyle = { width: shadowWidth, height: corner, left: corner, bottom: bottom };
strHtml += ciuGetShadowImgTag('bc', oStyle);
shadowDiv.innerHTML = strHtml;
obj.appendChild(shadowDiv);
obj.shadow = shadowDiv;
}
function ciuGetShadowImgTag (position, oStyle) {
var strStyle = 'visibility:visible; ';
for (var prop in oStyle) {
strStyle += prop + ': ' + oStyle[prop] + 'px; ';
}
var imgHtml = "";
if (goN2U.bIsIE) {
imgHtml = '<span class="ciuDropShadowImg" style="' + strStyle + 'filter:progid:DXImageTransform.Microsoft.AlphaImageLoader\
(src=\'http://g-images.amazon.com/images/G/01/x-locale/communities/customerimage/box-shdw-' + position + '.png\', sizingMethod=\'scale\');"></span>';
} else {
imgHtml = '<img src="http://g-images.amazon.com/images/G/01/x-locale/communities/customerimage/box-shdw-' + position + '.png" class="ciuDropShadowImg" border="0" style="' + strStyle + '"/ >';
}
return imgHtml;
}
function ciuDetachShadow(obj) {
if (!obj.shadow) return;
obj.removeChild(obj.shadow);
if (goN2U.bIsIE) {
obj.shadow = false;
} else {
delete obj.shadow;
}
}
function ciuoNoteTextBox(note, content) {
this.note = note;
this.content = content;
this.base = ciuoContentBox;
this.base(note);
this.opacity = 1.0;
this.fadeTicks = 0;
this.displayOrder = 0;  
var noteTextDiv = document.createElement("div");
noteTextDiv.className = "ciuNoteTextDiv";
noteTextDiv.innerHTML = this.getNoteTextBoxHtml(gciuAnnotationConfig.defaultNoteWidth, 1);
this.note.container.imgDiv.appendChild(noteTextDiv);
this.noteTextDiv = noteTextDiv;
this.updateID();
this.insertContent(content);
var textBoxRef = this;
if (note.bIsEditable) {
goN2U.addHandler(noteTextDiv, 'mousedown', function(e) {
if (!e) var e = window.event;                
var target = (e.target) ? e.target : e.srcElement;
if(target == null || target.tagName != 'A')
{
note.makeEditable();
}
});
}
goN2U.addHandler(noteTextDiv, 'mouseover', function(e) { 
if (!e) var e = window.event;                
var target = (e.target) ? e.target : e.srcElement;
if ((goN2U.bIsIE && target.tagName != 'SPAN') || (!goN2U.bIsIE && target.tagName != 'IMG'))  {
textBoxRef.show();
}
}); 
goN2U.addHandler(noteTextDiv, 'mouseout', function(e) {
textBoxRef.waitToHide();
});
this.contentUpdated = true;
}
ciuoNoteTextBox.prototype = new ciuoContentBox;
ciuoNoteTextBox.prototype.getNoteTextBoxHtml = function(width, height) 
{
var strHtml = '<table ';
if (width) {
strHtml += 'width="' + width + '" ';
}
if (height) {
strHtml += 'height="' + height + '" ';
}
strHtml += 'border="0" cellpadding="0" cellspacing="0" class="ciuNoteBox">'
+     '<tr>'
+        '<td class="topLeft">&nbsp;&nbsp;&nbsp;&nbsp;</td>'
+        '<td class="topCenter">'
+        '</td>'
+        '<td class="topRight">&nbsp;</td>'
+     '</tr>'
+     '<tr>'
+        '<td class="bottomLeft">&nbsp;</td>'
+        '<td class="bottomCenter">&nbsp;</td>'
+        '<td class="bottomRight">&nbsp;</td>'
+     '</tr>'
+  '</table>';
return strHtml;
}
ciuoNoteTextBox.prototype.insertContent = function(content) 
{
if (this.noteTextDiv) 
{
var td = this.noteTextDiv.getElementsByTagName('td')[1];
if(!gciuAnnotationConfig.useProductLinks)
{
var contentNode = document.createTextNode(content);
if (td.firstChild == null) 
{
td.appendChild(contentNode);
}
else 
{
td.firstChild.nodeValue = content;
}
}
else
{
var contentDiv = document.createElement('div');
contentDiv.className = 'ciuNoteContentDiv';
var splitPattern = /\[\[ASIN:\w{10}\s.*?\]\]/;
var pattern = /\[\[ASIN:(\w{10})\s(.*?)\]\]/g;    
var texts = content.split(splitPattern);
if(texts[0] == '')  
{
texts.shift();
}
var lastIndex = 0; //same as pattern.lastIndex in the beginning
var results;
while((results = pattern.exec(content)) != null)
{
var text = document.createTextNode(results[2]);
var child = null;
var containerRef = this.note.container;
var asin = results[1];
if(asin in containerRef.productLinks)
{
var link = document.createElement('a');
link.href = containerRef.productLinks[asin];
if(gciuAnnotationConfig.openProductLinksInNewWindow)
{
link.target = "_blank";
}
link.appendChild(text);
child = link;
}
else
{
child = text;
}
if(results.index == lastIndex)
{
contentDiv.appendChild(child);
}
else
{
var nextText = texts.shift();
if(nextText)
{
contentDiv.appendChild(document.createTextNode(nextText));
}
contentDiv.appendChild(child);
}
lastIndex = pattern.lastIndex;
}
contentDiv.appendChild(document.createTextNode(texts.join('')));
if (td.firstChild == null) 
{
td.appendChild(contentDiv);
} 
else 
{
while(td.firstChild)
{
td.removeChild(td.firstChild);
}
td.appendChild(contentDiv);
}
}
this.contentUpdated = true;
}
}
ciuoNoteTextBox.prototype.update = function(content) 
{
this.insertContent(content);
}
ciuoNoteTextBox.prototype.updateID = function() {
this.hide();
this.noteTextDiv.id = this.note.id + this.note.container.imageTagID;   
}
ciuoNoteTextBox.prototype.setOpacity = function(pct)
{
this.opacity = pct;
this.noteTextDiv.style["-moz-opacity"] = pct;
this.noteTextDiv.style["opacity"] = pct 
this.noteTextDiv.style["-khtml-opacity"] = pct;
}
ciuoNoteTextBox.prototype.show = function() {
if (this.hideTimeout) {
clearTimeout(this.hideTimeout);
this.hideTimeout = false;
}
if(this.note.container.topNoteTextOrder < this.note.container.topOrder)
{
this.note.container.topNoteTextOrder = this.note.container.topOrder;
}
if(this.displayOrder < this.note.container.topNoteTextOrder)
{
this.displayOrder = ++this.note.container.topNoteTextOrder;
}
goN2U.setZIndex(this.noteTextDiv, this.displayOrder);
goN2U.show(this.noteTextDiv);
this.noteTextDiv.style.display = 'block';
this.setOpacity(1.0);
if (this.contentUpdated) 
{
this.contentUpdated = false;
ciuDetachShadow(this.noteTextDiv);
goN2U.setWidth(this.noteTextDiv, 'auto');
var table = this.noteTextDiv.getElementsByTagName('table')[0];    
table.width = (gciuAnnotationConfig.defaultNoteWidth != 0) ? gciuAnnotationConfig.defaultNoteWidth : '';
table.height = "1";
if ( (goN2U.getElementWidth(this.noteTextDiv) > gciuAnnotationConfig.maxNoteWidth) ||
( (this.note.content != null) && (this.note.content.length > gciuAnnotationConfig.maxNoteWidthThreshold))) 
{
goN2U.setWidth(this.noteTextDiv, gciuAnnotationConfig.maxNoteWidth);
table.width = "100%";
table.height = "100%";            
}
ciuAttachShadow(this.noteTextDiv, table.offsetWidth, table.offsetHeight);
}
}
ciuoNoteTextBox.prototype.hide = function() {
if(this.displayOrder == this.note.container.topNoteTextOrder)
{
this.note.container.topNoteTextOrder = this.note.container.topOrder;
}
this.displayOrder = 0;
this.noteTextDiv.style.display = 'none';
}
ciuoNoteTextBox.prototype.waitToHide = function() {
if (this.hideTimeout) {
clearTimeout(this.hideTimeout);
}
this.setOpacity(1.0);
this.fadeTicks = 0;
var ntb = this;    
var fadeToHide = function()
{
if(ntb.opacity <= gciuAnnotationConfig.noteOpacityCutoff)
{
ntb.setOpacity(0.0);
ntb.hide();
}
else
{
var newOpacity = gciuAnnotationConfig.noteFadeFunction(ntb.fadeTicks++, 
ntb.opacity);
ntb.setOpacity(newOpacity);
ntb.hideTimeout = setTimeout(function(){fadeToHide();}, 
gciuAnnotationConfig.noteFadeTick);
}
}
this.hideTimeout = setTimeout(function() { fadeToHide(); }, 
gciuAnnotationConfig.noteTimeOut);
}
window.ciuoNote = function(containerObj, id, top, left, width, height, order, content, bIsEditable) {
if (containerObj.bInEditMode) return; // prevent adding another note while already editing one.
this.base = ciuoAnnotation; // inherit from ciuoAnnotation
this.type = "Note";
if (!id) {
id = "new";
this.isNew = true;
this.content = gciuAnnotationConfig.strNew;
this.top = containerObj.defaultTop;
this.left = containerObj.defaultLeft;
this.width = containerObj.defaultWidth;
this.height = containerObj.defaultHeight;
this.order = containerObj.topOrder + 1;
bIsEditable = true;
} else {
this.content = content;
this.isNew = false;
}
this.base(id, this.type, bIsEditable, containerObj);
this.noteDiv = this.createAnnotationArea(top, left, width, height, order);
this.contentBox = new ciuoNoteTextBox(this, this.content);
this.saveOldValues();
this.reposition();
var noteRef = this;
if (bIsEditable) {
goN2U.addHandler(noteRef.annotationDiv, 'mousedown', function(e) {
noteRef.makeEditable();
});
}
var showAnnoText = function(e) {                
if (!noteRef.container.bInEditMode) 
{
noteRef.contentBox.show();
noteRef.highlight();
}
};
goN2U.addHandler(noteRef.annotationDiv, 'mouseover', showAnnoText);
if (goN2U.bIsSafari) {
goN2U.addHandler(noteRef.annotationDiv, 'mousemove', showAnnoText);
}
goN2U.addHandler(noteRef.annotationDiv, 'mouseout', function(e) {                
if (!noteRef.container.bInEditMode) {
noteRef.contentBox.waitToHide();
noteRef.unhighlight();
}
});
this.container.addAnnotation(this);
if (this.isNew) {
for (var i in this.container.annotations) {
this.container.annotations[i].show();
}
this.makeEditable();
}
}
ciuoNote.prototype = new ciuoAnnotation;
ciuoNote.prototype.getEditBox = function() {
if (this.container[this.type + "EditBox"] != null) {
this.editBox = this.container[this.type + "EditBox"];
} else {
this.editBox = new ciuoNoteEditBox(this.container);        
this.container[this.type + "EditBox"] = this.editBox;           
}
this.container.editBox = this.editBox;
}
ciuoNote.prototype.makeEditable = function() {
if (!this.container.bInEditMode && !this.bInEditMode && gciuAnnotationConfig.isIdle) {
this.show();
this.moveToTop();
this.getEditBox();
this.attachEditBox();
this.editBox.saveButton.enable();
this.makePositionable();
var text = this.editBox.textarea.value;
this.editBox.textarea.innerHTML = "";
this.editBox.textarea.value = "";
if(goN2U.bIsIE) {
goN2U.setWidth(this.editBox.textarea, gciuAnnotationConfig.noteEditBoxWidth);
}
this.editBox.textarea.value = text;
this.editBox.updateCharCount(this.editBox.textarea);
this.bInEditMode = true;
this.container.bInEditMode = true;
}
}
ciuoNote.prototype.show = function() {
this.noteDiv.style.display = 'block';
}
ciuoNote.prototype.hide = function() {
this.noteDiv.style.display = 'none';
this.contentBox.hide();
}
ciuoNote.prototype.saveAnnotation = function() {
if(! gciuAnnotationConfig.isIdle) return;
var newContent = this.editBox.textarea.value;
if (newContent == "" || newContent == gciuAnnotationConfig.strNew) {
return false;
}
gciuAnnotationConfig.isIdle = false;
this.content = newContent;
this.editBox.resetParams();
var params = this.editBox.param;
params.action.value = 'saveanno';
if (this.isNew) {
params.imageID.value = this.container.imageID;
params.noteID.value = '';
} else { 
params.imageID.value = '';
params.noteID.value = this.id;
}
params.top.value = (this.top - this.container.imgTop)
/ this.container.imgHeight;
params.left.value = (this.left - this.container.imgLeft)
/ this.container.imgWidth;
params.height.value = this.height / this.container.imgHeight;
params.width.value = this.width / this.container.imgWidth;
params.order.value = this.order;
params.container.value = this.container.name;
var ciuDU = gciuAnnotationConfig.getDynUpdateObj();
var noteRef = this;
this.container.showLoadingMessage(gciuAnnotationConfig.strSaving);
ciuDU.onRequestSuccess = function(dataArray, fnArray, nStatus, sRequestID) {
if (nStatus == 0) {
gciuAnnotationConfig.isIdle = true;
if (noteRef.isNew) {
delete noteRef.container.annotations["new"];
var id = dataArray[0].replace(/\s+/g, ""); // JSF appends whitespace, get rid of that
noteRef.updateID(id);
noteRef.container.annotations[id] = noteRef;
noteRef.isNew = false;
}
noteRef.contentBox.update(newContent);
noteRef.saveOldValues();
noteRef.container.hideMessages();
} else {
gciuAnnotationConfig.isIdle = true;
var errorMessage = (nStatus == 2) ? gciuAnnotationConfig.strBadNote : gciuAnnotationConfig.strError;
noteRef.container.showErrorMessage(errorMessage);
noteRef.makeEditable();
}           
}
ciuDU.onRequestFailure = function(sMessage, nStatus) {
gciuAnnotationConfig.isIdle = true;
noteRef.container.showErrorMessage( gciuAnnotationConfig.strError );
noteRef.makeEditable();
}
ciuDU.hookForm('ciuNoteEditBoxForm', params.action.value);
ciuDU.submitForm(params.action.value);
this.makeStatic();
}
ciuoNote.prototype.deleteAnnotation = function() {
if (this.isNew) {
this.cancelAnnotation();
return;
}
gciuAnnotationConfig.isIdle = false;
this.editBox.resetParams();
var params = this.editBox.param;
params.action.value = 'deleteanno';
params.noteID.value = this.id;
params.container.value = this.container.name;
var ciuDU = gciuAnnotationConfig.getDynUpdateObj();
var noteRef = this;
noteRef.container.showLoadingMessage( gciuAnnotationConfig.strSaving );
ciuDU.onRequestSuccess = function(dataArray, fnArray, nStatus, sRequestID) {
if (nStatus == 0) {
noteRef.container.removeAnnotation(noteRef);
noteRef.container.hideMessages();
gciuAnnotationConfig.isIdle = true;
} else {
noteRef.container.showErrorMessage(gciuAnnotationConfig.strError );
gciuAnnotationConfig.isIdle = true;
noteRef.makeEditable();       
}
}
ciuDU.onRequestFailure = function(sMessage, nStatus) {
gciuAnnotationConfig.isIdle = true;
noteRef.container.showErrorMessage(gciuAnnotationConfig.strError );
noteRef.makeEditable();
}
ciuDU.hookForm('ciuNoteEditBoxForm', params.action.value);
ciuDU.submitForm(params.action.value);
this.makeStatic();
}
ciuoNote.prototype.cancelAnnotation = function() {
this.container.hideMessages();
this.makeStatic();
if (this.isNew) {
this.container.removeAnnotation(this);
} else {
this.revertValues();
this.editBox.textarea.value = this.content;
}
}
window.ciuLoadAnnotations = function(containers, oParams, strings, callback) {
var ciuDU = new N2DynUpObject('ciuLoadDU');
ciuDU.cacheResponses(true);    
ciuDU.setHandler('/gp/customer-images/load-annotations', 'sd');
var foreachContainer = function(f) {
for (var i in containers) {
f(containers[i]);
}
}
foreachContainer(function(c) { c.showLoadingMessage(strings.strLoading)});
ciuDU.onRequestSuccess = function(dataArray, fnArray, nStatus, sRequestID) {
if (nStatus == 0) {
foreachContainer(function(c) { c.hideMessages() });
}
else {
foreachContainer(function(c) { c.showErrorMessage(strings.strLoadFailed) });
setTimeout(function() { foreachContainer(function(c) { c.hideMessages() }) }, 2000);
}
}
ciuDU.onRequestFailure = function(sMessage, nStatus) {
foreachContainer(function(c) { c.showErrorMessage(strings.strLoadFailed) });
setTimeout(function() { foreachContainer(function(c) { c.hideMessages() }) }, 2000);
}
if (callback != null) {
var oldSuccessCallback = ciuDU.onRequestSuccess;
var oldFailureCallback = ciuDU.onRequestFailure;
ciuDU.onRequestSuccess = function(dataArray, fnArray, nStatus, sRequestID) {
oldSuccessCallback(dataArray, fnArray, nStatus, sRequestID);
callback();
}
ciuDU.onRequestFailure = function(sMessage, nStatus) {
oldFailureCallback(sMessage, nStatus);
callback();
}
} 
ciuDU.requestUpdate(null, null, null, oParams);
}
window.insertText = function(text, taName, inserter) 
{
if (inserter) {
inserter.hide();
}
text = text.replace(/&amp;/gi, "&");
text = text.replace(/&lt;/gi, "<");
text = text.replace(/&gt;/gi, ">");
var ta = document.getElementById(taName);
ta.focus();
ta.editBox.clearDefaultText();
if (ta.createTextRange && ta.cursorPos) {
var range = ta.cursorPos;
range.text = text;
range.select();
}
else if (ta.selectionStart || ta.selectionStart == '0') {
var scrollPos = ta.scrollTop;
var startPos = ta.selectionStart;
var endPos = ta.selectionEnd;
ta.value = ta.value.substring(0, startPos)
+ text
+ ta.value.substring(endPos, ta.value.length);
ta.selectionStart = endPos + text.length;
ta.selectionEnd = endPos + text.length;
ta.scrollTop = scrollPos;
ta.focus();
} else {
ta.value += text;
}
ta.editBox.updateCharCount(ta, false);
var results;
if(results = text.match(/\[\[ASIN:(\w{10})\s.*?\]\]/))
{
ta.editBox.container.addProductLink(results[1]);
}
}
window.gciuAnnotationConfig = new ciuAnnotationConfig();
if (window.goN2LibMon) 
{ 
goN2LibMon.endLoad('ciuAnnotations'); 
}
} // END library code wrapper
n2RunIfLoaded("dynupdate", ciuAnnotationsInitLibrary, "ciuJavaScriptLibs");