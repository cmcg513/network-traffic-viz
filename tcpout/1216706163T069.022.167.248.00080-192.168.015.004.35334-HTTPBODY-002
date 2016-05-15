//<!--
//1@@m6

function EbayHTMLForm(pParent,pName,pCfg)
{if(!this.objType)
this.objType="EbayHTMLForm";this.base=EbayHTML;this.base(pParent,pName,pName,false,pCfg);this.getElem=function(){return this.getDocElem(arguments[0],'forms');};this.enable=function(){};this.getElementValue=ebHTMLFormGetElementValue;this.setElementValue=ebHTMLFormSetElementValue;this.getElements=ebHTMLFormGetElements;this.getElement=ebHTMLFormGetElement;this.setAction=ebHTMLFormSetAction;this.getAction=ebHTMLFormGetAction;this.setTarget=ebHTMLFormSetTarget;this.getTarget=ebHTMLFormGetTarget;this.submit=ebHTMLFormSubmit;this.clear=ebHTMLFormClear;this.subscribeEvents("onsubmit");this.onBeforeSubmit=null;this.onAfterSubmit=null;}
function ebHTMLFormGetElements()
{var e=this.eElem;return e?e.elements:new Array;}
function ebHTMLFormGetElement(pName)
{var elems=this.getElements();return elems[pName]?elems[pName]:null;}
function ebHTMLFormGetElementValue(pName)
{var elems=this.getElements();if(elems[pName]&&elems[pName].value)
return elems[pName].value;return"";}
function ebHTMLFormSetElementValue(pName,pValue)
{var elems=this.getElements(),elem=elems[pName];if(elem)
{if(elem.length)
{for(var i=0,len=elem.length;i<len;i++)
elem[i].value=pValue;}
else
elem.value=pValue;}}
function ebHTMLFormSetAction(pAction)
{var e=this.eElem;if(e)
e.action=pAction;}
function ebHTMLFormGetAction()
{var e=this.eElem;if(e)
return e.action;}
function ebHTMLFormSetTarget(pTarget)
{var e=this.eElem;if(e)
e.target=pTarget;}
function ebHTMLFormGetTarget()
{var e=this.eElem;if(e)
return e.target;}
function ebHTMLFormSubmit()
{if(this.onBeforeSubmit)
this.onBeforeSubmit();var e=this.eElem;if(e)
{e.submit();if(this.onAfterSubmit)
this.onAfterSubmit();}
else
this.throwError("Element '"+this.sElemName+"' does not exist on the page","submit");}
function ebHTMLFormClear()
{var elems=this.getElements();for(i=0;i<elems.length;i++)
{var elem=elems[i];var type=elem.type;switch(type)
{case"text":case"textarea":elem.value="";break;case"checkbox":elem.checked=false;break;case"select-one":elem.selectedIndex=0;}}}

//2@@m13

function EbayHTMLBaseCheckboxRadio(pParent,pName,pDisabled,pCfg)
{if(!this.objType)
this.objType="EbayHTMLBaseCheckboxRadio";this.base=EbayHTMLFormElem;this.base(pParent,pName,pDisabled,pCfg);this.bGroup=false;this.bindHTML=ebHTMLBaseCheckboxRadioBindHTML;this.bindEvents=ebHTMLBaseCheckboxRadioBindEvents;this.check=ebHTMLBaseCheckboxRadioCheck;this.selectByIndex=ebHTMLBaseCheckboxRadioSelectByIndex;this.selectByValue=ebHTMLBaseCheckboxRadioSelectByValue;this.isCheckedByValue=ebHTMLBaseCheckboxRadioIsCheckedByValue;this.getValueByIndex=ebHTMLBaseCheckboxRadioGetValueByIndex;this.getIndexByValue=ebHTMLBaseCheckboxRadioGetIndexByValue;this.getValue=null;this.enableBase=this.enable;this.enable=ebHTMLBaseCheckboxRadioEnable;this.setValue=this.selectByValue;this.onBeforeCheck=null;this.onAfterCheck=null;this.subscribeEvents("onclick");}
function ebHTMLBaseCheckboxRadioBindHTML()
{with(this)
{eElem=getElem(sElemName);if(eElem)
{if(eElem.length)
{bGroup=true;for(var i=0;i<eElem.length;i++)
assignJSObject(eElem[i]);cleanupMemory=ebHTMLBaseCheckboxRadioCleanupMemory;}
else
{bGroup=false;assignJSObject(eElem);}}
if(bDisabled)
enable(false);}}
function ebHTMLBaseCheckboxRadioCleanupMemory()
{var e=this.eElem;if(e)
{for(var j=0;j<e.length;j++)
{for(var i in e[j].jsObjs)
{e[j].jsObjs[i]=null;}
e[j].jsObjs=null;}
this.eElem=null;}}
function ebHTMLBaseCheckboxRadioBindEvents()
{with(this)
{if(!eElem)
return;var e=aBindEvents,len=e.length,fStr;for(var i in e)
{if(eElem.length&&eElem.length>0)
{for(var ii=0;ii<eElem.length;ii++)
eval("eElem[ii]."+e[i]+" = function(){"+this.bindEventString(e[i],ii)+"}");}
else
{eval("eElem."+e[i]+" = new Function(this.bindEventString(e[i],0))");}}}}
function ebHTMLBaseCheckboxRadioCheck(pChecked,pIndex)
{if(pIndex<0)
return;with(this)
{if(eElem)
{if(bGroup&&typeof(pIndex)=='undefined')
{var len=eElem.length;for(var i=0;i<len;i++)
eElem[i].checked=pChecked;}
else if(bGroup&&eElem[pIndex])
eElem[pIndex].checked=pChecked;else if(!bGroup)
eElem.checked=pChecked;}}}
function ebHTMLBaseCheckboxRadioSelectByIndex(pIdx,pCheck)
{var chx=typeof pCheck!='undefined'?pCheck:true;with(this)
{if(onBeforeCheck)
onBeforeCheck();var e=bGroup?eElem[pIdx]:eElem;if(e)
{e.checked=chx;if(onAfterCheck)
onAfterCheck();}}}
function ebHTMLBaseCheckboxRadioSelectByValue(pVal,pCheck)
{var chx=typeof pCheck!='undefined'?pCheck:true;with(this)
{if(onBeforeCheck)
onBeforeCheck();var e=eElem;if(!e)
return;if(bGroup)
{for(var i=0;i<e.length;i++)
{if(e[i].value==pVal)
{e[i].checked=chx;if(onAfterCheck)
onAfterCheck();return;}}}
else
{if(e.value==pVal)
{e.checked=chx;if(onAfterCheck)
onAfterCheck();}}}}
function ebHTMLBaseCheckboxRadioIsCheckedByValue(pValue)
{with(this)
{var e=eElem;if(e&&bGroup)
{var len=e.length;for(var i=0;i<len;i++)
{if(e[i].value==pValue)
return isChecked(i);}}}}
function ebHTMLBaseCheckboxRadioGetValueByIndex(pIndex)
{with(this)
{var e=eElem;if(e&&bGroup)
return e[pIndex].value;return null;}}
function ebHTMLBaseCheckboxRadioGetIndexByValue(pValue)
{with(this)
{var e=eElem;if(e&&bGroup)
{var len=e.length;for(var i=0;i<len;i++)
{if(e[i].value==pValue)
return i;}}
return-1;}}
function ebHTMLBaseCheckboxRadioEnable(pEnable)
{with(this)
{enableBase(pEnable);if(bGroup)
{var v=pEnable?"true":"false",e=eElem,len=e.length;if(e)
{for(var i=0;i<len;i++)
{e[i].onfocus=new Function("return "+v+";");e[i].disabled=!pEnable;}}}}}

//3@@m7

function EbayHTMLCheckbox(pParent,pName,pDisabled,pCfg)
{if(!this.objType)
this.objType="EbayHTMLCheckbox";this.base=EbayHTMLBaseCheckboxRadio;this.base(pParent,pName,pDisabled,pCfg);this.getElem=ebHTMLCheckboxGetElem;this.isChecked=ebHTMLCheckboxIsChecked;this.getValue=ebHTMLCheckboxGetValue;this.setValue=this.selectByValue;}
function ebHTMLCheckboxGetElem(pName)
{return this.oDocument.getFormElem(pName,"checkbox");}
function ebHTMLCheckboxIsChecked(pIndex)
{with(this)
{if(eElem)
{if(bGroup&&eElem[pIndex])
return eElem[pIndex].checked;else if(!bGroup)
return eElem.checked;}}
return false;}
function ebHTMLCheckboxGetValue(pUnCheckedValue)
{var e=this.eElem,rv="";if(this.bGroup)
{rv=[];for(var i=0;i<e.length;i++)
{if(e[i].checked)
rv[rv.length]=e[i].value;}
if(!rv.length)rv="";}
else
{if(pUnCheckedValue)
return e.value;if(e.checked)
return e.value;}
return rv;}

//4@@m21

function EbayHTMLSelect(pParent,pName,pDisabled,pCfg)
{if(!this.objType)
this.objType="EbayHTMLSelect";this.base=EbayHTMLFormElem;this.base(pParent,pName,pDisabled,pCfg);this.iSelIndex=-1;this.createOption=ebHTMLSelectCreateOption;this.clearOptions=ebHTMLSelectClearOptions;this.getValueByIndex=ebHTMLSelectGetValueByIndex;this.getSelectedIndex=ebHTMLSelectGetSelectedIndex;this.getSelectedValue=ebHTMLSelectGetSelectedValue;this.getSelectedText=ebHTMLSelectGetSelectedText;this.getOptionsLength=ebHTMLSelectGetOptionsLength;this.setOption=ebHTMLSelectSetOption;this.insertOption=ebHTMLSelectInsertOption;this.deleteOption=ebHTMLSelectDeleteOption;this.selectByIndex=ebHTMLSelectSelectByIndex;this.selectByValue=ebHTMLSelectSelectByValue;this.selectByText=ebHTMLSelectSelectByText;this.doSelect=ebHTMLSelectDoSelect;this.getIndexByValue=ebHTMLSelectGetIndexByValue;this.getValue=this.getSelectedValue;this.setValue=this.selectByValue;this.subscribeEvents("onchange");}
function ebHTMLSelectClearOptions()
{var e=this.eElem;if(e)
{var opts=e.options;while(opts.length>0)
opts[opts.length-1]=null;}}
function ebHTMLSelectCreateOption(pName,pText)
{if(this.eElem)
{var nOpt=new Option(pText,pName,false,false),opts,lo,oC=ebay.oGlobals.oClient;opts=this.eElem.options;opts[opts.length]=nOpt;idx=opts.length-1;return idx;}}
function ebHTMLSelectGetValueByIndex(pIdx,pTextOnly)
{if(pIdx>-1)
{opt=this.eElem.options[pIdx];if(opt)
return pTextOnly?opt.text:opt.value;}
this.throwError("Invalid index","get");return"";}
function ebHTMLSelectGetSelectedIndex()
{return this.eElem.selectedIndex;}
function ebHTMLSelectGetSelectedValue()
{return this.getValueByIndex(this.eElem.selectedIndex);}
function ebHTMLSelectGetSelectedText()
{return this.getValueByIndex(this.eElem.selectedIndex,true);}
function ebHTMLSelectGetOptionsLength()
{return this.eElem.options.length;}
function ebHTMLSelectSelectByIndex(pIndex)
{this.eElem.selectedIndex=this.iSelIndex=pIndex;}
function ebHTMLSelectDoSelect(pVal,pIsText)
{if(this.eElem)
{var e=this.eElem,o,rv=false,opts=e.options,len=opts.length;for(var i=0;i<len&&!rv;i++)
{o=opts[i];if(((pIsText||(o.value==""))&&(pVal==o.text))||(!pIsText&&(o.value==pVal)))
{e.selectedIndex=this.iSelIndex=i;rv=true;}}}
else
this.throwWarning("HTML element '"+this.name+"' not found","selectByValue");return rv;}
function ebHTMLSelectSelectByValue(pVal)
{return this.doSelect(pVal);}
function ebHTMLSelectSelectByText(pVal)
{return this.doSelect(pVal,true);}
function ebHTMLSelectSetOption(pVal,pText,pInd)
{if(this.eElem)
{if((pInd!=null)&&(pInd>-1))
{var o=this.eElem.options[pInd];o.value=pVal;o.text=pText;}
else
this.createOption(pVal,pText);}
else
this.throwWarning("HTML element '"+this.name+"' not found","selectByValue");}
function ebHTMLSelectInsertOption(pVal,pText,pInd)
{with(this)
{var e=eElem,opts=e.options,len=opts.length;var inOpt=new Array(pText,pVal),tmpOpt=new Array(2);var sel=getSelectedValue();len++;if(pInd>=len)
return;for(i=pInd;i<len;i++)
{if(i<len-1)
tmpOpt=[e.options[i].text,e.options[i].value];opts[i]=new Option(inOpt[0],inOpt[1]);inOpt=tmpOpt;}
selectByValue(sel);}}
function ebHTMLSelectDeleteOption(pInd)
{if(typeof(pInd)!='undefined')
{var opts=this.eElem.options;if(opts[pInd])
opts[pInd]=null;}}
function ebHTMLSelectGetIndexByValue(pVal,pIsText)
{var opts=this.eElem.options,len=opts.length,i=0;for(;i<len;i++)
{o=opts[i];if((o.value==pVal)||(pIsText&&(o.text==pVal)))
return i;}
return-1;}

//5@@m10

function EbayHTMLText(pParent,pName,pDisabled,pCfg,bHidden)
{if(!this.objType)
this.objType="EbayHTMLText";this.base=EbayHTMLFormElem;this.base(pParent,pName,pDisabled,pCfg);this.value=ebHTMLTextValue;this.getValue=ebHTMLTextGetValue;this.setValue=ebHTMLTextSetValue;this.select=ebHTMLTextSelect;if(bHidden!=true)
this.subscribeEvents("onchange","onblur","onfocus","onkeydown","onkeyup");}
function ebHTMLTextValue(pVal)
{var e=this.eElem;if(e)
{if(typeof(pVal)=="undefined")
return e.value;else
e.value=pVal;}}
function ebHTMLTextGetValue()
{return this.value();}
function ebHTMLTextSetValue(pVal)
{return this.value(pVal);}
function ebHTMLTextSelect()
{var e=this.eElem;if(e)
e.select();}

//6@@m7

function EbayHTMLRadio(pParent,pName,pDisabled,pCfg)
{if(!this.objType)
this.objType="EbayHTMLRadio";this.base=EbayHTMLBaseCheckboxRadio;this.base(pParent,pName,pDisabled,pCfg);this.getElem=ebHTMLRadioGetElem;this.getValue=ebHTMLRadioGetValue;this.getSelectedIndex=ebHTMLRadioGetSelectedIndex;}
function ebHTMLRadioGetElem(pName)
{return this.oDocument.getFormElem(pName,"radio");}
function ebHTMLRadioGetValue()
{var e=this.eElem;if(!e){return"";}
if(this.bGroup)
{for(var i=0;i<e.length;i++)
{if(e[i].checked)
return e[i].value;}}
else
{if(e.checked)
return e.value;}
return"";}
function ebHTMLRadioGetSelectedIndex()
{var e=this.eElem;if(!this.bGroup)
return 0;else
{for(var i=0;i<e.length;i++)
{if(e[i].checked)
return i;}}
return-1;}

//7@@m10

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

//8@@m28

var searchBaseURL,searchActionURL,searchTitleURL,searchDescURL,searchCompletedURL,searchBase,searchTitle,searchDesc,searchCompleted;function FindPool(pName,pHost,pUrl){this.name=pName;this.host=pHost;this.url=pUrl;this.fullUrl=this.host+this.url;}
function findURL(myForm){searchBase=new FindPool('searchBase','',searchBaseURL);if(searchActionURL==null||searchActionURL==''){searchActionURL=searchBaseURL;}
searchTitle=new FindPool('searchTitle',searchTitleURL,searchActionURL);searchDesc=new FindPool('searchDesc',searchDescURL,searchActionURL);searchCompleted=new FindPool('searchCompleted',searchCompletedURL,searchActionURL);if(typeof searchBase.fullUrl!="undefined"&&searchBase.fullUrl.indexOf("http://")==0)
myForm.action=searchBase.fullUrl;else
{if(typeof searchDesc.host!="undefined"&&typeof searchTitle.host!="undefined"&&typeof searchCompleted.host!="undefined")
{if(myForm.elements["fis"]!=null&&myForm.elements["fis"].checked==true)
myForm.action=searchCompleted.fullUrl;else if(myForm.elements["fts"]!=null&&myForm.elements["fts"].checked==true)
myForm.action=searchDesc.fullUrl;else if(myForm.srchdesc!=null&&myForm.srchdesc.checked==true)
myForm.action=searchDesc.fullUrl;else myForm.action=searchTitle.fullUrl;}}}
function doFindingFormSubmit(myForm,pUseEncoding)
{if(typeof zip_element!='undefined'&&zip_element!=null){updateZipCode(zip_element);}
synchInputs(myForm.elements['sascs']);findURL(myForm);if(typeof myForm.satitle!='undefined'){if(myForm.sofocus.value=='pf')
myForm.satitle.value=myForm.pf_query.value;else if(myForm.sofocus.value=='mppf')myForm.satitle.value=myForm.elements["mppfqy"].value;if(typeof myForm.pf_query!='undefined'){myForm.pf_query.value=myForm.satitle.value;}
if(typeof myForm.elements["mppfqy"]!='undefined'){myForm.elements["mppfqy"].value=myForm.satitle.value;}
if(myForm.sofocus.value=='pf')myForm.satitle.value=myForm.pf_query.value;else if(myForm.sofocus.value=='bs'){if(typeof myForm.pf_query!='undefined'){myForm.pf_query.value=myForm.satitle.value;}}}
if(myForm.sofocus.value=='bs'&&myForm.elements["ddo"]!=null)
myForm.elements["ddo"].value="";myForm.submit();return false;}
function doProductFindingFormSubmit(myForm,pUseEncoding){myForm.submit();return true;}

//9@@m13

function SeoForm(form){this.form=form;this.overrideOptionValues=new Array();this.overrideOptions=new Array();this.droppedOptions=new Array();this.aElem=new Array();this.shortQuery="?";this.url="";this.abort=false;this.submit=function(){this.getUrl();if(!this.abort)this.form.action="javascript: document.location='"+this.url+"'";return true;}
this.link=function(baseUrl,originalUrl){this.getUrl();if(this.abort)return originalUrl;else return baseUrl+this.shortQuery;}
this.getUrl=function(){this.getFormElementArray();this.buildShortQuery();for(var j=0;j<this.overrideOptions.length;j++){var opt=this.overrideOptions[j];this.shortQuery+="&"+opt.name+"="+this.escapeVal(opt.value);}
var query=this.shortQuery;if(this.form.action.indexOf("?")>-1){if(this.form.action.charAt(this.form.action.length-1)=='&')query=query.substring(1);else query="&"+query.substring(1);}
this.url=this.form.action+query;return this.url;}
this.getFormElementArray=function(){this.aElem=new Array();for(var i=0;i<this.form.elements.length;i++){var element=this.form.elements[i];if(this.isSplitable(element))this.splitOverloadedParams(element);else this.aElem[this.aElem.length]=element;}
this.removeUnwantedParams();}
this.isSplitable=function(element){switch(element.type){case"text":return false;case"checkbox":case"radio":return element.checked;case"select-one":case"select-multiple":return(element.selectedIndex>-1);default:return false;}}
this.splitOverloadedParams=function(element){var string=element.name+"="+element.value;var pairs=string.split('&');if(pairs.length<=1)this.aElem[this.aElem.length]=element;else{for(var i=0;(i<pairs.length);i++){var pair=pairs[i].split('=');var sType=(i==0)?"text":"hidden";this.aElem[this.aElem.length]={type:sType,name:pair[0],value:pair[1]};}}}
this.removeUnwantedParams=function(){var a=new Array();for(var i=0;i<this.aElem.length;i++){var element=this.aElem[i];if(this.isOverride(element))continue;if(this.isDropped(element))continue;a[a.length]=element;}
this.aElem=a;}
this.isOverride=function(pObj){return(typeof this.overrideOptionValues[pObj.name]!="undefined");}
this.isDropped=function(pObj){return(typeof this.droppedOptions[pObj.name]!="undefined");}
this.buildShortQuery=function(){for(var i=0;i<this.aElem.length;i++){var obj=this.aElem[i];if((this.isArray(obj)&&(typeof obj.type=='undefined'))){for(var j=0;j<obj.length;j++)this.concatShortQuery(obj[j].name,this.getElementValue(obj[j]),i+j);}else if(typeof obj.type!='undefined'){if(obj.type=='select-multiple'){var strVal=this.getElementValue(obj);var arrValues=strVal.split(",");for(var k=0;k<arrValues.length;k++)this.concatShortQuery(obj.name,arrValues[k],i);}else this.concatShortQuery(obj.name,this.getElementValue(obj),i);}}}
this.concatShortQuery=function(objName,objValue,objNum){var param="";if(objValue!=null&&objValue.length>0&&typeof objValue!='undefined'){if(objNum>0)param+="&";param+=objName+"="+this.escapeVal(objValue);}
this.shortQuery+=param;}
this.getElementValue=function(pObj){switch(pObj.type)
{case"button":return null;break;case"submit":return null;break;case"reset":return null;break;case"text":return(pObj.value=="")?null:pObj.value;break;case"textarea":return(pObj.value=="")?null:pObj.value;break;case"hidden":return(pObj.value=="")?null:pObj.value;break;case"file":return pObj.value;break;case"checkbox":return(pObj.checked)?pObj.value:null;break;case"radio":if(pObj.checked)return pObj.value;else return null;break;case"select-one":if(pObj.selectedIndex<0)return null;else{var paramValue=pObj.options[pObj.selectedIndex].value;var index=paramValue.indexOf("&");if(index!=-1)paramValue=paramValue.substring(0,index);return pObj.options[pObj.selectedIndex].value;}
break;case"select-multiple":var multiArray=new Array();for(var i=0;i<pObj.options.length;i++)
{if(pObj.options[i].selected)
multiArray[multiArray.length]=pObj.options[i].value;}
return multiArray.join(',');break;}}
this.isArray=function(pObj)
{if(typeof pObj=='object')
return(typeof pObj.length=='undefined')?false:true;else return false;}
this.escapeVal=function(v){var re=new RegExp("[']","g");v=v.toString();if(v.indexOf('%')>-1)this.abort=true;if(v.indexOf('\\x')>-1)this.abort=true;if(v.indexOf('\\u')>-1)this.abort=true;v=v.replace(re,"\\'");return v;}
this.addOverride=function(pName,pValue){this.overrideOptions[this.overrideOptions.length]={name:pName,value:pValue};this.overrideOptionValues[pName]=pValue;}
this.addDrop=function(pName){this.droppedOptions[pName]=true;}}

//10@@m1

ebay.oDocument.oPage.iAutoLoadCookieBit=19;ebay.oDocument.oPage.hasAutoLoadCookieBit=function()
{var oCJ=ebay.oDocument.oCookieJar,sbf=oCJ.readCookielet('ebay','sbf'),iBit=0;if(sbf)
{iBit=oCJ.getBitFlag(sbf,this.iAutoLoadCookieBit);}
return(iBit)?true:false;}
ebay.oDocument.oPage.setAutoLoadCookieBit=function(pValue)
{var oCJ=ebay.oDocument.oCookieJar,sbf=oCJ.readCookielet('ebay','sbf');sbf=oCJ.setBitFlag(sbf,this.iAutoLoadCookieBit,pValue);oCJ.writeCookielet('ebay','sbf',sbf);}

//11@@m59

var SEO={TEXT_SEARCHED:"sotextsearched",FIND_TYPE:"sofindtype",LISTING_CURRENCY_ID:"sacur",LOCATION_SELECTOR:"fls",LOCATED_IN_COUNTRY_ID:"salic",AVAILABLE_TO_COUNTRY_ID:"saatc",LISTING_REGION_ID:"sargn",LOCATED_IN_COUNTRY_ID:"salic",PARENT_CATEGORY:"sacat",SPOT_ZIP_CODE:"fpos",TIME:"ft",DATE_FILTER:"dff",TR_TRY:"ftrt",TR_VALUE:"ftrv",DATE_FILTER_START_DATE:"dfs",DATE_FILTER_START_TIME:"dfts",DATE_FILTER_END_DATE:"dfe",DATE_FILTER_END_TIME:"dfte",PAYMENT:"fpay",PAY_METHOD:"fpaym",PRICE_HIGH:"saprchi",PRICE_LOW:"saprclo",SELLER_TYPE_FILTER:"fslt",SELLER_TYPE:"saslt",AD_FORMAT:"fadf",BIN_FORMAT:"sascs",SIF_ONLY:"sasif",INCLUDE_SIF:"fasi",BUYING_FORMAT_CHECKBOX:"fbfmt",OTHER_BUYING_FORMAT_CHECKBOX:"fobfmt",BUYING_FORMAT_SELECT:"fbfmts",OTHER_BUYING_FORMAT_SELECT:"fobfmts"};var Affil_DIV_ID={PROVIDER_LIST:"affilProviderList",SHOW:"showProviderList",HIDE:"hideProviderList",PROVIDER_CJ:"afcj",PROVIDER_MP:"afmp",PROVIDER_TD:"aftd",PROVIDER_AN:"afan",PROVIDER_AD:"afad",PROVIDER_ST:"afst",PROVIDER_EPN:"afepn"}
var Affil_Select={PROVIDER_CJ_VALUE:"afcj",PROVIDER_MP_VALUE:"afmp",PROVIDER_TD_VALUE:"aftd",PROVIDER_AN_VALUE:"afan",PROVIDER_AD_VALUE:"afad",PROVIDER_ST_VALUE:"afst",PROVIDER_EPN_VALUE:"afepn",PROVIDER_DEFAULT_VALUE:"afdefault"}
var Buying_Format_Options={ALl_FORMAT:"bfall",AUCTIONS:"bfauctions",BIN:"bfbin"}
var Other_Buying_Format_Options={INCLUDE_SIF:"insif",EXCLUDE_SIF:"exsif",ONLY_SIF:"sifonly",CLASSIFIED_ADS:"classified"}
function EbayAdvSearch(pParent,pName)
{if(!this.objType)
this.objType="EbayAdvSearch";this.base=EbayBaseControl;this.base(pParent,pName);this.SearchType=searchType;this.SiteId=siteId;var eFrm=null;this.domain=ebay.oGlobals.oEnvironment.sCountryDomain;this.searchHost="http://"+ebay.oGlobals.oEnvironment.sThisPageHost+"/";if(this.searchHost.indexOf("sandbox")>-1)this.domain=".sandbox"+this.domain;this.motorsSearchHost="http://motors.search"+this.domain;this.host=(this.SiteId==100)?this.motorsSearchHost:this.searchHost;this.base="ws/search/AdvSearch";this.searchBase="ws/search/SaleSearch";this.searchTitleURL=this.searchHost+this.searchBase;this.searchDescURL="http://search-desc"+this.domain+this.searchBase;this.searchCompletedURL="http://search-completed"+this.domain+this.searchBase;this.searchProductURL="http://product"+this.domain+this.searchBase;this.searchMotorsURL=this.motorsSearchHost;this.searchStoreItemsURL="http://search.stores"+this.domain+"ws/search/StoreItemSearch";this.searchStoreNameURL="http://storenamesearch"+this.domain+"search/search.dll";this.searchStoreMatchingItemURL="http://stores"+this.domain+"stores/shopstores";var cl=this.oGlobals.oClient;this.nav4up=(cl.bNav&&(cl.iVer>4));this.ie4up=(cl.bIE&&(cl.iVer>4));this.nav6up=(cl.bNav&&(cl.iVer>6));this.ffox=(cl.bFirefox);this.priClient=((this.ie4up)||(this.nav6up)||(this.ffox));this.secClient=(this.nav4up);this.bEncodeClient=(!cl.bWebTV&&(this.priClient||this.secClient));this.bOptimizeClient=(!cl.bWebTV&&(this.priClient));this.bUtfSite=(this.SiteId==223||this.SiteId==196||this.SiteId==203||this.SiteId==201);this.bDoubleByteSite=(this.SiteId==223||this.SiteId==196||this.SiteId==201);this.bFindItems=(this.SearchType=='StoreItemSearch'||this.SearchType=='ItemSearch'||this.SearchType=='ItemSpecificsSearch'||this.SearchType=='SellerSearch');this.bEncodedSearch=(this.SearchType=='ItemSearch'||this.SearchType=='ItemSpecificsSearch'||this.SearchType=='SellerSearch');this.encode=false;this.optimize=(!this.bDoubleByteSite&&this.bFindItems&&this.bOptimizeClient)?true:false;this.showVisible=false;var oD=this.oDocument.doc;this.doAdvSearchLinkSubmit=function(findtype,href){var dForm=new SeoForm(document.forms[eFrm.name],this.DefaultValues);dForm.addOverride(SEO.FIND_TYPE,findtype);dForm.addOverride("pfid","");dForm.addDrop("satitle");var satitleVal=(typeof(document.forms[eFrm.name].satitle)!='undefined')?"&satitle="+escape(document.forms[eFrm.name].satitle.value):"";return dForm.link(this.host+this.base,href)+satitleVal;}
this.formParam=function(n,v,t){fp=new Object();fp.name=n;fp.value=v;fp.type=t;return fp;}
this.onAnchorAdvSearchLinkSubmit=function(pEvent){var anchor=pEvent.parent.parent.eElem;if(this.parent.optimize)anchor.href=this.parent.doAdvSearchLinkSubmit(this.linkSubmitValue,anchor.href);return true;}
this.doAdvSearchFormSubmit=function(){if(this.parent.SiteId==100&&this.parent.bEncodedSearch){eFrm.setAction(this.parent.searchMotorsURL);}
if(this.parent.SearchType=='ItemSpecificsSearch'){eFrm.setAction(this.parent.searchMotorsURL);}
if(searchType=='StoreNameSearch'&&typeof(eFrm.getElement("rd"))!="undefined"){if((eFrm.getElement("rd"))[0].checked)eFrm.setAction(this.parent.searchStoreMatchingItemURL);else eFrm.setAction(this.parent.searchStoreNameURL);}else if(this.parent.SiteId==100&&(document.forms[eFrm.name].action.indexOf("/ebaymotors")>=0)){eFrm.setAction(document.forms[eFrm.name].action.substring(0,document.forms[eFrm.name].action.indexOf("/ebaymotors"))+document.forms[eFrm.name].action.substring(document.forms[eFrm.name].action.indexOf("/ebaymotors")+11));}else if(eFrm.getElementValue("sacat")=="productsearch"){eFrm.setAction(this.parent.searchProductURL);eFrm.getElement("sacat").disabled=false;}
return true;}
this.changeCurrencyNSite=function(){if(eFrm.getElement(SEO.LISTING_CURRENCY_ID).selectedIndex!=0&(eFrm.getElement(SEO.LOCATION_SELECTOR))[0].checked==true){(eFrm.getElement(SEO.LOCATION_SELECTOR))[2].checked=true;this.parent.setCountryToDefault(3);}}
this.showToggle=function(pEvent){var element=this.parent.getStyleObject(Affil_DIV_ID.PROVIDER_LIST);var showLinkElement=this.parent.getStyleObject(Affil_DIV_ID.SHOW);var hideLinkElement=this.parent.getStyleObject(Affil_DIV_ID.HIDE);if(showLinkElement.display=='none')
this.parent.showVisible=true;if(this.parent.showVisible){element.display='none';showLinkElement.display='inline';hideLinkElement.display='none';this.parent.showVisible=false;}
else{element.display='block';showLinkElement.display='none';hideLinkElement.display='inline';this.parent.changeAffiliateInfo(pEvent);this.parent.showVisible=true;}}
this.changeAffiliateInfo=function(pEvent){var id=pEvent.parent.parent.linkSubmitValue;var affil=(id==0)?this.parent:this;var element=eFrm.getElement("saaff");var st="none";var selectedOptVal=element.options[element.selectedIndex].value;var display=new Array(7);var y=0;for(y=0;y<display.length;y++)
display[y]=st;switch(selectedOptVal)
{case Affil_Select.PROVIDER_CJ_VALUE:display[0]='';affil.displayValues(display);break;case Affil_Select.PROVIDER_MP_VALUE:display[1]='';affil.displayValues(display);break;case Affil_Select.PROVIDER_TD_VALUE:display[2]='';affil.displayValues(display);break;case Affil_Select.PROVIDER_AN_VALUE:display[3]='';affil.displayValues(display);break;case Affil_Select.PROVIDER_AD_VALUE:display[4]='';affil.displayValues(display);break;case Affil_Select.PROVIDER_ST_VALUE:display[5]='';affil.displayValues(display);break;case Affil_Select.PROVIDER_EPN_VALUE:display[6]='';affil.displayValues(display);break;case Affil_Select.PROVIDER_DEFAULT_VALUE:affil.displayValues(display);break;}}
this.displayValues=function(display){var commissionJunction=this.getStyleObject(Affil_DIV_ID.PROVIDER_CJ);var mediaPlex=this.getStyleObject(Affil_DIV_ID.PROVIDER_MP);var tradeDoubler=this.getStyleObject(Affil_DIV_ID.PROVIDER_TD);var affilinet=this.getStyleObject(Affil_DIV_ID.PROVIDER_AN);var ad4all=this.getStyleObject(Affil_DIV_ID.PROVIDER_AD);var smartrade=this.getStyleObject(Affil_DIV_ID.PROVIDER_ST);var epn=this.getStyleObject(Affil_DIV_ID.PROVIDER_EPN);commissionJunction.display=display[0];mediaPlex.display=display[1];tradeDoubler.display=display[2];affilinet.display=display[3];ad4all.display=display[4];smartrade.display=display[5];epn.display=display[6];}
this.getStyleObject=function(objectId){if(oD.getElementById&&oD.getElementById(objectId)){return oD.getElementById(objectId).style;}else if(oD.all&&oD.all(objectId)){return oD.all(objectId).style;}else if(oD.layers&&oD.layers[objectId]){return oD.layers[objectId];}else{return false;}}
this.locationFocus=function(pEvent){var id=pEvent.parent.parent.linkSubmitValue;if((eFrm.getElement(SEO.LOCATION_SELECTOR))[0].checked==true){if(id==0)this.setCurrencyToDefault();else this.parent.setCurrencyToDefault();}
if(id==0)
this.setCountryToDefault(id);else
this.parent.setCountryToDefault(id);}
this.locationSelector=function(pEvent){(eFrm.getElement(SEO.LOCATION_SELECTOR))[0].checked=true;this.parent.locationFocus(pEvent);}
this.fromSellersSelect=function(pEvent){var id=pEvent.parent.parent.linkSubmitValue;}
this.fromSellersSpecific=function(pEvent){(eFrm.getElement("fss"))[1].checked=true;this.parent.fromSellersSelect(pEvent);}
this.fromSellersIds=function(pEvent){(eFrm.getElement("fss"))[1].checked=true;this.parent.fromSellersSelect(pEvent);}
this.setCountryToDefault=function(id){if(id==0){this.setDefaultSelection(eFrm.getElement(SEO.LOCATED_IN_COUNTRY_ID));this.setDefaultSelection(eFrm.getElement(SEO.AVAILABLE_TO_COUNTRY_ID));}else if(id==1){this.setDefaultSelection(eFrm.getElement(SEO.AVAILABLE_TO_COUNTRY_ID));if(eFrm.getElement(SEO.LISTING_REGION_ID))this.setDefaultSelection(eFrm.getElement(SEO.LISTING_REGION_ID));}else if(id==2){this.setDefaultSelection(eFrm.getElement(SEO.LOCATED_IN_COUNTRY_ID));if(eFrm.getElement(SEO.LISTING_REGION_ID))this.setDefaultSelection(eFrm.getElement(SEO.LISTING_REGION_ID));}else if(id==3){if(eFrm.getElement(SEO.LISTING_REGION_ID))this.setDefaultSelection(eFrm.getElement(SEO.LISTING_REGION_ID));}else{this.setDefaultSelection(eFrm.getElement(SEO.LOCATED_IN_COUNTRY_ID));this.setDefaultSelection(eFrm.getElement(SEO.AVAILABLE_TO_COUNTRY_ID));if(eFrm.getElement(SEO.LISTING_REGION_ID))this.setDefaultSelection(eFrm.getElement(SEO.LISTING_REGION_ID));}}
this.setDefaultSelection=function(dropdown){if(typeof(dropdown)!='undefined'&&dropdown!=null){dropdown.options[0].selected=true;for(var i=0;i<dropdown.options.length;i++)if(dropdown.options[i].defaultSelected==true)dropdown.options[i].selected=true;}}
this.setCurrencyToDefault=function(){(eFrm.getElement(SEO.LISTING_CURRENCY_ID)).options[0].selected=true;}
this.updateLocation=function(){var e=eFrm.getElement("sopr");var location_dropdown=new Array(eFrm.getElement(SEO.LOCATED_IN_COUNTRY_ID),eFrm.getElement(SEO.AVAILABLE_TO_COUNTRY_ID),eFrm.getElement(SEO.LISTING_CURRENCY_ID));var location_radio=eFrm.getElement(SEO.LOCATION_SELECTOR);if(e.checked)location_radio[0].checked=true;this.disable(eFrm.getElement(SEO.PARENT_CATEGORY),e.checked);for(var i=0;i<location_radio.length;i++)this.disable(location_radio[i],e.checked);for(var i=0;i<location_dropdown.length;i++)this.disable(location_dropdown[i],e.checked);}
this.updateDropdowns=function(){eFrm.getElement("fmmk").options[0].selected=true;eFrm.getElement("fmmd").options[0].selected=true;}
this.onClickUpdateLocation=function(){this.parent.updateLocation();}
this.disable=function(e,disable){if(disable)e.className="fielddisabled";else e.className="fieldenabled";e.disabled=disable;}
this.focusText=function(form){var elems=form.getElements();for(var i=0;i<elems.length;i++)
{if(elems[i].type=="text")
{elems[i].focus(true);break;}}}
this.toggleFilter=function(pEvent){this.parent.toggleField(this.pToggle,this.pValue);return this.parent.doAdvSearchLinkSubmit(this.linkSubmitValue);}
this.toggleField=function(pToggle,pValue){if(pToggle==null||pToggle=="")
pToggle="ftg";if(pValue==null||pValue=="")
pValue="1";if(typeof(document.forms[eFrm.name].elements[pToggle])=="undefined"){var oNew;oNew=document.createElement("input");oNew.setAttribute("type","hidden");oNew.setAttribute("name",pToggle);oNew.setAttribute("value",pValue);document.forms[eFrm.name].appendChild(oNew);}else{document.forms[eFrm.name].elements[pToggle].value=pValue;}}
this.setCheckbox=function(pEvent){var checkbox=eFrm.getElement(pEvent.parent.parent.pName);if(checkbox)checkbox.checked=pEvent.parent.parent.pState;}
this.setSpotCityPref=function(pEvent){this.parent.setCheckbox(pEvent);this.parent.clearZipCode(pEvent);}
this.setSpotZipPref=function(pEvent){this.parent.setCheckbox(pEvent);this.parent.resetSPOTCity(pEvent);}
this.clearZipCode=function(pEvent){eFrm.getElement(SEO.SPOT_ZIP_CODE).value="";}
this.resetSPOTCity=function(pEvent){eFrm.getElement("fsct").options[0].selected=true;}
function checkCheckBox(pSel){pSel.pChk1.enable(true);pSel.pChk1.check(true);pSel.pChk2.enable(true);pSel.pChk2.check(true);}
function checkMutualCheckBox(pChk,pChkEvent){if(pChk&&pChkEvent.isChecked())
{pChk.enable(false);pChk.check(false);}
else if(pChk)
{pChk.enable(true);}}
this.setBuyingFormat=function(pEvent){var oPro=pEvent.parent.parent;var selVal=oPro.getSelectedValue();var oSel=oPro.pSel;if(oSel)
{checkCheckBox(oSel);if(selVal=="0")
{oSel.selectByValue("exsif");var oChkAd=oPro.pChkAd;if(oChkAd)
{oChkAd.enable(true);}
var oChkSif=oPro.pChkSif;if(oChkSif)
{oChkSif.enable(true);}}
else if(selVal=="1")
{oSel.selectByValue("exsif");var oChkAd=oPro.pChkAd;if(oChkAd)
{oChkAd.check(false);oChkAd.enable(false);}
var oChkSif=oPro.pChkSif;if(oChkSif)
{oChkSif.check(false);oChkSif.enable(false);}}
else if(selVal=="2")
{oSel.selectByValue("insif");var oChkAd=oPro.pChkAd;if(oChkAd)
{oChkAd.check(false);oChkAd.enable(false);}
var oChkSif=oPro.pChkSif;if(oChkSif)
{oChkSif.check(false);oChkSif.enable(false);}}}}
this.setOtherBuyingFormat=function(pEvent){var oPro=pEvent.parent.parent;var selVal=oPro.getSelectedValue();var oSel=oPro.pSel;if(oSel)
{checkCheckBox(oSel);if(selVal!="pifs"){oSel.selectByValue("0");}}}
this.setAdFormatCheckbox=function(pEvent){var checkbox=eFrm.getElement(pEvent.parent.parent.pName);if(checkbox)checkbox.checked=pEvent.parent.parent.pState;var oPro=pEvent.parent.parent;var oSel=oPro.pSel;var oChk=oPro.pChk;var oChkSif=oPro.pChkSif;if(oSel&&pEvent.parent.parent.isChecked())
{oSel.selectByValue("0");}
checkMutualCheckBox(oChk,pEvent.parent.parent);checkMutualCheckBox(oChkSif,pEvent.parent.parent);}
this.setSifCheckbox=function(pEvent){var oPro=pEvent.parent.parent;var oSel=oPro.pSel;var oChk=oPro.pChk;var oChkAd=oPro.pChkAd;if(oSel&&pEvent.parent.parent.isChecked())
{oSel.selectByValue("0");}
checkMutualCheckBox(oChk,pEvent.parent.parent);checkMutualCheckBox(oChkAd,pEvent.parent.parent);}
this.enableFbfmtCheckBox=function(pEvent){var oPro=pEvent.parent.parent;var oChkAd=oPro.pChkAd;var oChkSif=oPro.pChkSif;checkMutualCheckBox(oChkAd,pEvent.parent.parent);checkMutualCheckBox(oChkSif,pEvent.parent.parent);}
this.createControls=function()
{var adv_form=new EbayHTMLForm(this,"advsearch_form");adv_form._registerEvent("onsubmit","parent.doAdvSearchFormSubmit");adv_form.doAdvSearchFormSubmit=parent.doAdvSearchFormSubmit;var productMS_CB=new EbayHTMLCheckbox(this,"sopr");productMS_CB._registerEvent("onclick","parent.onClickUpdateLocation");productMS_CB._registerEvent("onload","parent.updateLocation");productMS_CB.onClickUpdateLocation=parent.onClickUpdateLocation;productMS_CB.updateLocation=parent.updateLocation;var currency_select=new EbayHTMLSelect(this,SEO.LISTING_CURRENCY_ID);currency_select._registerEvent("onchange","parent.changeCurrencyNSite");currency_select.changeCurrencyNSite=parent.changeCurrencyNSite;var affilProvider_select=new EbayHTMLSelect(this,"saaff");affilProvider_select._registerEvent("onchange","parent.changeAffiliateInfo");affilProvider_select.changeAffiliateInfo=parent.changeAffiliateInfo;affilProvider_select.linkSubmitValue=0;var region_select=new EbayHTMLSelect(this,SEO.LISTING_REGION_ID);region_select._registerEvent("onchange","parent.locationSelector");region_select.locationSelector=parent.locationSelector;region_select.linkSubmitValue=0;var locatedIn_select=new EbayHTMLSelect(this,SEO.LOCATED_IN_COUNTRY_ID);locatedIn_select.onchange=function()
{(eFrm.getElement(SEO.LOCATION_SELECTOR))[1].checked=true;if(siteId!=203)(eFrm.getElement(SEO.AVAILABLE_TO_COUNTRY_ID)).options[0].selected=true;}
var availableTo_select=new EbayHTMLSelect(this,SEO.AVAILABLE_TO_COUNTRY_ID);availableTo_select.onchange=function()
{(eFrm.getElement(SEO.LOCATION_SELECTOR))[2].checked=true;if(siteId!=203)(eFrm.getElement(SEO.LOCATED_IN_COUNTRY_ID)).options[0].selected=true;}
var location_radio=new EbayHTMLRadio(this,SEO.LOCATION_SELECTOR)
location_radio._registerEvent("onclick","parent.locationFocus");location_radio.linkSubmitValue=999;var sellers_radio=new EbayHTMLRadio(this,"fss")
sellers_radio._registerEvent("onclick","parent.fromSellersSelect");sellers_radio.linkSubmitValue=999;var sellers_select=new EbayHTMLSelect(this,"saslop");sellers_select._registerEvent("onchange","parent.fromSellersSpecific");sellers_select.locationSelector=parent.sellersSelector;sellers_select.linkSubmitValue=0;var sellersIds=new EbayHTMLText(this,"sasl");sellersIds._registerEvent("onkeydown","parent.fromSellersIds");sellersIds.pName=sellers_radio.sElemName;sellersIds.pState=true;var ft_mf=(searchType=='ItemSearch')?0:5;var affilShow_anchor=new EbayHTMLAnchor(this,"AffilShow");affilShow_anchor._registerEvent("onclick","parent.showToggle");affilShow_anchor.showToggle=parent.showToggle;affilShow_anchor.linkSubmitValue=999;var aAnchors={"ItemSearch":expandedIS,"ItemSpecificSearch":21,"SellerSearch":2,"BidderSearch":3,"ItemNumberSearch":4,"StoreItemSearch":5+expandedSS,"StoreNameSearch":7,"MemberSearch":8,"ContactSearch":9,"UserID":10,"moreso":ft_mf+1,"fewerso":ft_mf,"TradingAssistantSearch":27};for(var i in aAnchors)
{var oA=new EbayHTMLAnchor(this,i);oA._registerEvent("onclick","parent.onAnchorAdvSearchLinkSubmit");oA.linkSubmitValue=aAnchors[i];}
var exp=1;var tfcb=new EbayHTMLCheckbox(this,SEO.TIME);var dfcb=new EbayHTMLCheckbox(this,SEO.DATE_FILTER);var sfcb=new EbayHTMLCheckbox(this,"fspt");var stfcb=new EbayHTMLCheckbox(this,SEO.SELLER_TYPE_FILTER);var tfType=new EbayHTMLSelect(this,SEO.TR_TRY);tfType._registerEvent("onchange","parent.setCheckbox");tfType.pName=tfcb.sElemName;tfType.pState=true;var tfValue=new EbayHTMLSelect(this,SEO.TR_VALUE);tfValue._registerEvent("onchange","parent.setCheckbox");tfValue.pName=tfcb.sElemName;tfValue.pState=true;var tfToggle=new EbayHTMLAnchor(this,"TimeFilter");tfToggle._registerEvent("onclick","parent.toggleFilter");tfToggle.pValue=dateTimeToggle;tfToggle.pToggle="ftg";tfToggle.linkSubmitValue=ft_mf+exp;var stfType=new EbayHTMLSelect(this,SEO.SELLER_TYPE);stfType._registerEvent("onchange","parent.setCheckbox");stfType.pName=stfcb.sElemName;stfType.pState=true;var dfStartDate=new EbayHTMLSelect(this,SEO.DATE_FILTER_START_DATE);dfStartDate._registerEvent("onchange","parent.setCheckbox");dfStartDate.pName=dfcb.sElemName;dfStartDate.pState=true;var dfStartTime=new EbayHTMLSelect(this,SEO.DATE_FILTER_START_TIME);dfStartTime._registerEvent("onchange","parent.setCheckbox");dfStartTime.pName=dfcb.sElemName;dfStartTime.pState=true;var dfEndDate=new EbayHTMLSelect(this,SEO.DATE_FILTER_END_DATE);dfEndDate._registerEvent("onchange","parent.setCheckbox");dfEndDate.pName=dfcb.sElemName;dfEndDate.pState=true;var dfEndtime=new EbayHTMLSelect(this,SEO.DATE_FILTER_END_TIME);dfEndtime._registerEvent("onchange","parent.setCheckbox");dfEndtime.pName=dfcb.sElemName;dfEndtime.pState=true;var dfToggle=new EbayHTMLAnchor(this,"DateFilter");dfToggle._registerEvent("onclick","parent.toggleFilter");dfToggle.pValue=dateTimeToggle;dfToggle.pToggle="ftg";dfToggle.linkSubmitValue=ft_mf+exp
var sfCityValue=new EbayHTMLSelect(this,"fsct");sfCityValue._registerEvent("onchange","parent.setSpotCityPref");sfCityValue.pName=sfcb.sElemName;sfCityValue.pState=true;var sfZipText=new EbayHTMLText(this,SEO.SPOT_ZIP_CODE);sfZipText._registerEvent("onkeydown","parent.setSpotZipPref");sfZipText.pName=sfcb.sElemName;sfZipText.pState=true;var pfcb=new EbayHTMLCheckbox(this,SEO.PAYMENT);var pfType=new EbayHTMLSelect(this,SEO.PAY_METHOD);pfType._registerEvent("onchange","parent.setCheckbox");pfType.pName=pfcb.sElemName;pfType.pState=true;var iscc=new EbayHTMLCheckbox(this,"completed");var iss=new EbayHTMLSelect(this,"since");iss._registerEvent("onchange","parent.setCheckbox");iss.pName=iscc.sElemName;iss.pState=true;var adFormat=new EbayHTMLCheckbox(this,SEO.AD_FORMAT);var binFormat=new EbayHTMLCheckbox(this,SEO.BIN_FORMAT);adFormat._registerEvent("onclick","parent.setAdFormatCheckbox");adFormat.pName=binFormat.sElemName;adFormat.pState=false;binFormat._registerEvent("onclick","parent.setCheckbox");binFormat.pName=adFormat.sElemName;binFormat.pState=false;var sif=new EbayHTMLCheckbox(this,"sif");sif._registerEvent("onclick","parent.setSifCheckbox");var buy=new EbayHTMLSelect(this,"sabfmts");var other=new EbayHTMLSelect(this,"saobfmts");var chk1=new EbayHTMLCheckbox(this,"fbfmt");var chk2=new EbayHTMLCheckbox(this,"fobfmt");buy._registerEvent("onchange","parent.setBuyingFormat");buy.pSel=other;buy.pChk1=chk1;buy.pChk2=chk2;buy.pChkAd=adFormat;buy.pChkSif=sif;other._registerEvent("onchange","parent.setOtherBuyingFormat");other.pSel=buy;other.pChk1=chk1;other.pChk2=chk2;adFormat.pSel=buy;adFormat.pChk=chk1;adFormat.pChkSif=sif;sif.pSel=buy;sif.pChk=chk1;sif.pChkAd=adFormat;chk1._registerEvent("onclick","parent.enableFbfmtCheckBox");chk1.pChkAd=adFormat;chk1.pChkSif=sif;}
this.onLoad=function()
{eFrm=this.controls["advsearch_form"];this.focusText(eFrm);if(this.controls["sopr"].eElem&&this.controls[SEO.LOCATION_SELECTOR].eElem)
{this.updateLocation();}
if(motorsDropAvailable==1)
{this.updateDropdowns();}
var saveSearchCheck=ebay.oDocument._getControl('saveon');if(!saveSearchCheck)
{saveSearchCheck=new EbayHTMLCheckbox(this,"saveon");}
saveSearchCheck.bind();saveSearchCheck.checkCookie=function()
{if(this.eElem)
{var v=this.isChecked(0)?1:0;ebay.oDocument.oPage.setAutoLoadCookieBit(v);}}
saveSearchCheck.onclick=function()
{this.checkCookie();}
saveSearchCheck.checkCookie();var oBuy=ebay.oDocument._getControl("sabfmts");var oOther=ebay.oDocument._getControl("saobfmts");var oChk1=ebay.oDocument._getControl("fbfmt");var oChk2=ebay.oDocument._getControl("fobfmt");var oChkAd=ebay.oDocument._getControl("fadf");var oChkSif=ebay.oDocument._getControl("sif");if(oBuy&&oBuy.eElem&&oChk1&&oChk1.eElem)
{var selVal1=oBuy.getSelectedValue();if((selVal1=="1"||selVal1=="2")&&oChk1.isChecked())
{if(oOther&&oOther.eElem&&oChk2&&oChk2.eElem)
{var selVal2=oOther.getSelectedValue();if(selVal2=="sifonly"||selVal2=="classified")
{oChk2.check(false);}}
if(oChkAd&&oChkAd.eElem)
{oChkAd.enable(false);oChkAd.check(false);}
if(oChkSif&&oChkSif.eElem)
{oChkSif.enable(false);oChkSif.check(false);}}}
if(oOther&&oOther.eElem&&oChk2&&oChk2.eElem)
{var selVal2=oOther.getSelectedValue();if((selVal2=="sifonly"||selVal2=="classified")&&oChk2.isChecked())
{if(oBuy&&oBuy.eElem&&oChk1&&oChk1.eElem)
{var selVal1=oBuy.getSelectedValue();if(selVal1=="1"||selVal1=="2")
{oChk1.check(false);}}}}
if(oChkAd&&oChkAd.eElem&&oChkAd.isChecked())
{if(oBuy&&oBuy.eElem&&oChk1&&oChk1.eElem)
{oBuy.selectByValue("0");oChk1.enable(false);oChk1.check(false);}
if(oChkSif&&oChkSif.eElem)
{oChkSif.enable(false);oChkSif.check(false);}}
if(oChkSif&&oChkSif.eElem&&oChkSif.isChecked())
{if(oBuy&&oBuy.eElem&&oChk1&&oChk1.eElem)
{oBuy.selectByValue("0");oChk1.enable(false);oChk1.check(false);}
if(oChkAd&&oChkAd.eElem)
{oChkAd.enable(false);oChkAd.check(false);}}}
with(this)
{var e=oDocument._getEvent("load");_registerListener(e,EVENT_BEFORE,"createControls");_registerListener(e,EVENT_AFTER,"onLoad");}}
new EbayAdvSearch(ebay.oDocument.oPage,"advSearch",SEO);

//12@@m3

function EbaycommonSearch(pParent,pName,pConstant)
{this.Constant=pConstant;if(!this.objType)
this.objType="EbaycommonSearch";this.base=EbayBaseControl;this.base(pParent,pName);var oD=this.oDocument;this.UpdateCategoryChar=function()
{var cl=this.oGlobals.oClient;var isNav4=(cl.bNav&cl.iVer==4)?true:false;var isMacOpera7=(cl.bMac&&cl.bOpera&&cl.iVer==7)?true:false;var categories=oD.getFormElem(this.Constant.PARENT_CATEGORY).options;categories.selectedIndex=0;if(!isNav4&&!isMacOpera7){for(i=0;i<categories.length;i++){var cat=categories[i];if(cat.text.indexOf('>')==0){cat.text="\u2514"+cat.text.substr(1);categories[i]=cat;}}}}}
new EbaycommonSearch(ebay.oDocument.oPage,"commonsearch",SEO);

//13@@m2

function EbayHTMLAudioGifChallenge(pParent,pName,pDisabled,pCfg)
{if(!this.objType)
this.objType="EbayHTMLAudioGifChallenge";this.base=EbayHTML;this.base(pParent,pName,pName,pDisabled,pCfg);this.oLinkRefresh=this.oLinkListen=null;this.init=ebHTMLAudioGifChallengeInit;this.createControls=ebHTMLAudioGifChallengeCreateControls;with(this)
_registerListener(oDocument._getEvent("load"),EVENT_BEFORE,"createControls");this.init();}
function ebHTMLAudioGifChallengeCreateControls()
{with(this)
{var oP=this.parent,oD=oP.parent,c=oD.getConfig("Security.Gif.Audio.Challenge"),oR,oL,oF,oT;if(c)
{oF=new EbayHTMLFrame(this,c.sBotFrameId,c);oR=new EbayHTMLAnchor(this,c.sBotRefreshLinkId,false,c);oR.onclick=function()
{var oP=this.parent,oC=this.oConfig,oL=oP._getControl(oC.sBotListenLinkId);oL.enable(false);oT=oD.getFormElem(c.sTokenTextId);if(oT)
oT.value="";oL.eElem.href="#";oF.setSource(oC.sBotIframeUrl);var oPop=oP._getControl("audioPopup");if(oPop)
oPop.close();return false;}
oL=new EbayHTMLAnchor(this,c.sBotListenLinkId,false,c);oL.onclick=function()
{var c=this.oConfig,oPop,l,t,url=c.sAudioHelpPopupUrl,ts;l=parseInt(screen.availWidth-c.sAudioHelpPopupWidth-10);t=0;ts=this.parent.oDocument.getFormElem(c.sTokenStringId).value;url+=url.has("?")?"&":"?";url+=c.sTokenStringQueryParamName+"="+ts;oPop=new EbayHTMLPopup(this,"audioPopup",c);oPop.showEx(url,c.sAudioHelpPopupWidth,c.sAudioHelpPopupHeight,0,0,0,0,1,0,l,t);return false;}}}}
function ebHTMLAudioGifChallengeInit()
{var oD=this.parent.parent;oD._registerListener(oD._getEvent("load"),oD.EVENT_BEFORE,"createControls");}
new EbayHTMLAudioGifChallenge(ebay.oDocument.oPage,"AudioGifChallege");

//14@@m23

function EbayHTMLFrame(pParent,pName,pCfg)
{if(!this.objType)
this.objType="EbayHTMLFrame";this.base=EbayHTML;this.base(pParent,pName,pName,false,pCfg);this.eFrameElem=null;this.getElem=ebHTMLFrameGetElem;this.bindHTML=ebHTMLFrameBindHTML;this.bindEvents=this.enable=function(){};this.setSource=ebHTMLFrameSetSource;this.cleanupMemoryBase=this.cleanupMemory;this.cleanupMemory=ebHTMLFrameCleanupMemory;this.resize=ebHTMLFrameResize;this.onBeforeResize=this.onAfterResize=null;}
function ebHTMLFrameGetElem(pName)
{with(this)
{var f=null,oD=oDocument;var d=oD.doc,w=oD.win;if(w.frames)
f=eFrameElem=w.frames[pName];if(d.getElementById)
f=d.getElementById(pName);return f;}}
function ebHTMLFrameBindHTML()
{with(this)
{eElem=getElem(sElemName);if(eElem)
assignJSObject(eElem);}}
function ebHTMLFrameCleanupMemory()
{this.cleanupMemoryBase();this.eFrameElem=null;}
function ebHTMLFrameSetSource(pURL)
{if(pURL==null||pURL.trim()==''){return;}
with(this)
{oDocument.setGlobalParent(this);if(pURL.has("ej2child=true"))
pURL+="&ej2parent="+name;if(eFrameElem)
eFrameElem.location.replace(pURL);else if(eElem)
eElem.src=pURL;}}
function ebHTMLFrameResize(pMaxWidth)
{with(this)
{if(onBeforeResize)
onBeforeResize();var f=eFrameElem;if(!f||!(f.document||f.contentDocument))
f=getElem(sElemName);if(f&&typeof(f.document)!="unknown")
{var oDoc=f.document?f.document:f.contentDocument,db=oDoc.body,es=eElem.style,c=this.parent.oGlobals.oClient,w="100%",h=db.offsetHeight,oh;if(c.bSafari)
{oh=db.offsetHeight;w=oDoc.width;h=ebay.oDocument.doc.doctype!=null?oDoc.height+15:oDoc.height+1;}
else if(c.bFirefox)
{w=oDoc.width;h=oDoc.height}
else if(c.bWin||c.bOpera)
{w=db.scrollWidth;h=c.bNav&&ebay.oDocument.doc.doctype!=null?db.scrollHeight+30:db.scrollHeight;}
if(pMaxWidth&&c.bFirefox)
w="100%";if(this.oConfig)
{w=this.oConfig.iWidth||w;h=this.oConfig.iHeight||h;}
es.width=(w=="100%")?w:w+"px";es.height=h+"px";if(onAfterResize)
onAfterResize();}}}
// b=6879737 -->