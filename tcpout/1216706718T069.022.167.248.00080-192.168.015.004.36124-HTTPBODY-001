//<!--
//1@@m2

ebay.oDocument.oPage.init=function()
{var oD=ebay.oDocument;oD._registerListener(oD._getEvent("load"),oD.EVENT_AFTER,"iFrameAutoResize");oD.iFrameAutoResize=function()
{var ifW=ifH=0;var cl=ebay.oDocument.oPage.oGlobals.oClient;var oDoc=document?document:contentDocument
if(cl.bSafari||cl.bFirefox)
{var oh=oDoc.body.offsetHeight;ifW=oDoc.width;ifH=ebay.oDocument.win.parent.ebay.oDocument.doc.doctype!=null?oDoc.height+15:oDoc.height+1;}
else if(cl.bWin||cl.bOpera)
{ifW=oDoc.body.scrollWidth;ifH=cl.bNav&&ebay.oDocument.win.parent.ebay.oDocument.doc.doctype!=null?oDoc.body.scrollHeight+30:oDoc.body.scrollHeight;}
if(typeof(ebay.oDocument.win.parent)=="unknown")
return false;if(typeof(ebay.oDocument.win.parent.ebay.oDocument)!="undefined")
{var co=ebay.oDocument.win.parent.ebay.oDocument._getControl("IFrame_AutoResize");if(co)
{var o=co.getElement(ebay.oDocument.oPage.oGlobals.oEnvironment.sThisPageRaw);if(o)
co.resizeWithSize(o,ifW,ifH);}}}}
ebay.oDocument.oPage.init();

//2@@m10

function EbayHTMLAnchor(pParent,pName,pDisabled,pCfg)
{if(!this.objType)
this.objType="EbayHTMLAnchor";this.base=EbayHTML;this.base(pParent,pName,pName,pDisabled,pCfg);this.getElem=ebHTMLAnchorGetElem;this.enableBase=this.enable;this.enable=ebHTMLAnchorEnable;this.subscribeEvents("onclick");}
function ebHTMLAnchorGetElem(pName)
{var d=this.oDocument.doc,l=null;l=d.links[pName];if(l)return l;if(d.getElementById)
l=d.getElementById(pName);if(l)return l;if(d.all)
l=d.all[pName];if(l)return l;if(d.layers)
{var lyrs=d.layers;var len=lyrs.length;for(var i=0;i<len;i++)
{l=this.getElem(lyrs[i].document,pName);if(l)
return l;}}
for(var j=0;j<d.links.length;j++)
{l=d.links[j];if(typeof(l.name)=="undefined")
{if(l.onclick)
{var oc=l.onclick.toString();if(oc.indexOf("{#"+pName+"#}")!=-1)
return l;}}
else
{if(l.name==pName)
return l;}
l=null;}
return l;}
function ebHTMLAnchorEnable(pEnable)
{var cur=(pEnable)?"hand":"default";var el=this.eElem;if(el&&el.style)
{el.style.cursor=cur;el.style.color=pEnable?"":"gray";}
this.enableBase(pEnable);}
function setEbayLink(pS)
{return true;}

//3@@m3

ebay.oDocument.doc.onclick=function(e)
{var c=ebay.oDocument.getConfig("MyeBay.Tracking");if(c)
{ebay.oDocument.oPage.MyeBayDDTracking(e);}}
ebay.oDocument.oPage.MyeBayDDTracking=function(e)
{var pEvent=window.event?window.event:e;var elem=pEvent.srcElement||pEvent.target;if(elem==null||elem==undefined){return;}
var c=ebay.oDocument.getConfig("MyeBay.Tracking");if(c)
{var paramVal=elem.getAttribute(c.sParamVal);if(paramVal==null||paramVal==undefined||paramVal==""){return;}
var paramName=c.sParamName;}
var sUrl=elem.href;if((sUrl.charAt(sUrl.length-1)=="/"||sUrl.charAt(sUrl.length-1)=="l"||sUrl.charAt(sUrl.length-1)=="m"||sUrl.indexOf('&')==-1)&&sUrl.indexOf('?')==-1)
{elem.href=elem.href+"?"+paramName+"="+paramVal;}
else
elem.href=elem.href+"&"+paramName+"="+paramVal;}
// b=6879737 -->