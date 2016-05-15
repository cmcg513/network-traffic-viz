/*       Source:  Local Cache                                                                 */
/*     Location:  rsrc:108062:/html/js/simple_reg.js                                          */
/*      Machine:  10.16.139.102                                                               */
/*    Generated:  July 21st 2008 8:53:34 PM PDT                                               */
/*    HTTP Host:  static.ak.fbcdn.net                                                         */


onafterloadRegister(function(){height=Vector2.getElementDimensions($('reg_form_box')).y;$('reg_progress').style.height=height+'px';$('reg_captcha').style.height=height+'px';});function onRegBoxKeypress(e){e=event_get(e);if(e.keyCode==13&&shown($('reg_form_box'))){get_captcha();}}
function onCaptchaBoxKeypress(e){e=event_get(e);if(e.keyCode==13&&shown($('reg_captcha'))){finish_captcha();}}
function get_captcha(){if($('captcha_response').value){return finish_captcha();}
var name=get_full_name(),month=$('birthday_month').value,day=$('birthday_day').value,year=$('birthday_year').value,email=normalize_email($("reg_email__").value),pwd=normalize_password($('reg_passwd__').value),pwd2=ge('reg_passwd2__')?normalize_password($('reg_passwd2__').value):undefined;error_code='';if(((!validate_name(name))&&(error_code='name'))||((!validate_birthday(month,day,year))&&(error_code='birthday'))||((!validate_email(email))&&(error_code='email'))||((!validate_password(pwd,pwd2))&&(error_code='password'))){if(error_code){data={'error_code':error_code,'name':name,'month':month,'email':email,'pwd':pwd,'pwd2':pwd2};new AsyncSignal('/ajax/register/logging.php',data).send();}
return;}
hide_error();show_captcha();}
function finish_captcha(){if($('captcha_response').value){register();}else{show_error('captcha_response',tx('sre02'));return;}}
function register(){show_progress();$('sreg').submit();}
function register_link_button_popup(URL){day=new Date();id=day.getTime();eval("page"+id+" = window.open(URL, '"+id+"');");}
function show_captcha(){hide_reg_form();create_captcha();show('reg_captcha');try{$('captcha_response').focus();}catch(ignore){}}
function hide_captcha(){hide('reg_captcha');hide_error();}
function show_progress(){hide_error();hide_reg_form();hide_captcha();show("reg_progress");}
function hide_progress(){hide("reg_progress");}
function show_error(field,msg){var reg_error=$('reg_error');if(field){if(field=='captcha_response'){show_captcha();}
else{show_reg_form();}
try{$(field).focus();}catch(ignore){}}else{try{if(ge('name')){$('name').focus();}else{$('firstname').focus();}}catch(ignore){}
show_reg_form();}
if(typeof animation=='function'){if(shown(reg_error)){reg_error.innerHTML=msg;if(get_opacity(reg_error)==0){animation(reg_error).show().from('opacity',0).to('opacity',1).duration(500).go();}}else{reg_error.innerHTML=msg;set_opacity(reg_error,0);animation(reg_error).show().from('height','0').to('height','15').duration(100).checkpoint().from('opacity',0).to('opacity',1.0).duration(400).go();}}else{show(reg_error);}}
function hide_error(){if(shown($('reg_error'))&&get_opacity($('reg_error'))>0){animation($('reg_error')).from('opacity',1.0).to('opacity',0).duration(400).go();}}
function show_reg_form(){show("reg_form_box");}
function hide_reg_form(){hide("reg_form_box");}
function normalize_name(name){name=name.replace(/^\s+|\s+$/g,"");name=name.replace(/\s+/g," ");return name;}
function normalize_email(email){return email;}
function normalize_password(pwd){return pwd;}
function validate_name(name,allow_empty_name){var kMinWords=2;var kMaxWords=4;var words=name?name.split(" "):[];var error=null;if(!name){if(allow_empty_name){return true;}
error=tx('sre05');}else if(ge('firstname')&&(!$('firstname').value||!$('lastname').value)){error=tx('sre06');}else if(words.length==2&&words[0]==words[1]){error=tx('sre06');}else if(words.length>kMaxWords){error=tx('sre07');}
if(!error){for(word in words){len=word.length
if(len==1){continue;}
c=word[len-1];if(c>='A'&&c<='Z'){error=tx('sre11');}}}
if(error){show_error("name",error);}
return!error;}
function validate_email(email){var error=null;if(!email)
error=tx('sre15');else if(email.indexOf("@")==-1)
error=tx('sre16');if(error)
show_error("reg_email__",error);return!error;}
function validate_password(pwd,pwd2){var kMinLength=6;var kDisallowedWords=["password","facebook"];var error=name=null;if(!pwd){error=tx('sre17');}else if(pwd.length<kMinLength){error=tx('sre19');}else if(pwd2!=undefined&&pwd!=pwd2){error=tx('sre21');}else{var name=get_full_name();var names=name.toLowerCase().split(" ");var disallowed=names.concat(kDisallowedWords);for(var i=0;i<disallowed.length;++i){if(pwd.toLowerCase()==disallowed[i]){error=tx('sre18');break;}}}
if(error)
show_error("reg_passwd__",error);return!error;}
function get_full_name(){if(ge('name')){return normalize_name($('name').value);}
return normalize_name($('firstname').value+' '+$('lastname').value);}
function validate_birthday(month,day,year){var error=null;if(month==-1||day==-1||year==-1){error=tx('sre01');}else if(year<=1910){error=tx('sre20');}
if(error)
show_error('birthday_month',error);return!error;}
function show_birthday_help(){birthday_popup=new pop_dialog('birthday_warning_popup');html='<div class="dialog_body">'
+tx('sre22')+'<br /><br />'+tx('sre23')+' <a href="/pages/create.php" title="Create a Page">'+tx('sre24')+'</a>.'
+'</div>'
+'<div id="dialog_buttons" class="dialog_buttons">'
+'<input type="button" class="inputsubmit" id="dialog_button1" onclick="birthday_popup.hide();" value="'+tx('sre26')+'"/></div>';birthday_popup.show_prompt(tx('sre25'),html);}
if(window.Bootloader){Bootloader.done(1);}