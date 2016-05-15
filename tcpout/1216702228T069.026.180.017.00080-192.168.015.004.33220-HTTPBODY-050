/*       Source:  Local Cache                                                                 */
/*     Location:  rsrc:106241:/html/js/reqs.js                                                */
/*      Machine:  10.16.140.105                                                               */
/*    Generated:  July 21st 2008 8:53:35 PM PDT                                               */
/*    HTTP Host:  static.ak.fbcdn.net                                                         */


function ignore_all_requests_dialog(){var async=new AsyncRequest().setURI('/ajax/reqs_dialog.php');var dialog=new Dialog().setAsync(async).setHandler(function(button){return handle_ignore_button(this,button);}).show();return false;}
function handle_ignore_button(dialog,button){if(button.name=='ignore_button'){dialog.setButtons([]).setCloseHandler(function(){window.location.reload();}).setBody(tx('rq16')+'<img src="/images/upload_progress.gif" />');dialog._submitForm('POST','/ajax/reqs_dialog.php',button);return false;}else{return true;}}
function block_app_dialog(app_id,source){var dialog=new pop_dialog();if(!source){source='';}
dialog.show_form_ajax(tx('rq07'),'/ajax/block_app.php?app_id='+app_id+'&source='+source,tx('rq08'),true);return false;}
function block_user_requests_dialog(app_id,blockee_uid,blockee_name){var dialog=new pop_dialog();dialog.show_form_ajax(tx('rq12',{'name':blockee_name}),'/ajax/block_user_requests.php?app_id='+app_id+'&blockee_uid='+blockee_uid,tx('rq13'),true);return false;}
function get_additional_request_params(obj_type,obj_id,action){switch(obj_type){case'event_invite':var rsvp_obj_id='rsvp_msg_'+obj_id;var rsvp_obj=ge(rsvp_obj_id);var rsvp_msg=rsvp_obj?rsvp_obj.value:'';return{event_rsvp_msg:rsvp_msg};case'event_confirm':case'group_confirm':var components=obj_id.split(/_/);return{uid:components.pop(),id:components.pop()}
case'friend_add':var friend_list_widget=add_to_friend_list_widget.dict[obj_id];if(friend_list_widget){data=friend_list_widget.get_form_data();return{flids:data.flids,flid_name:data.flid_name};}
return{};case'phonebook':return{mobile_num:$('mobile_num').value,other_num:$('other_num').value};default:return{};}}
function handle_confirm_to_school_click(friend_id){var hs_div=ge('hs_confirm_box_'+friend_id);if(!hs_div){console.error("No hs_div found for friend ",friend_id);return;}
var hs_text=hs_div.innerHTML;function get_confirm_school_async_response_handler(action){return function(button){new AsyncRequest().setURI('/ajax/verify_user.php').setData({'id':friend_id,'action':action,'confirm_to':'high_school'}).send();}}
var buttons=[{name:'confirm',label:tx('reqs:hs_confirm'),handler:get_confirm_school_async_response_handler('confirm')},{name:'reject',label:tx('reqs:hs_reject'),handler:get_confirm_school_async_response_handler('reject')},{name:'idontknow',label:tx('reqs:hs_idontknow')}];new Dialog().setBody(hs_text).setButtons(buttons).show();}
function handle_confirm_age_click(friend_id){var age_div=ge('age_confirm_box_'+friend_id);if(!age_div){var error='No age_div found for friend '+friend_id;Util.log(error);return;}
var age_text=age_div.innerHTML;function get_confirm_age_async_response_handler(action){return function(button){new AsyncRequest().setURI('/ajax/verify_user.php').setData({'id':friend_id,'action':action,'confirm_to':'age'}).send();}}
var buttons=[{name:'confirm',label:tx('reqs:age_confirm'),handler:get_confirm_age_async_response_handler('confirm')},{name:'reject',label:tx('reqs:age_reject'),handler:get_confirm_age_async_response_handler('reject')},{name:'idontknow',label:tx('reqs:age_idontknow')}];new Dialog().setBody(age_text).setButtons(buttons).show();}
function handle_request_click(obj_type,obj_id,action){var params=get_additional_request_params(obj_type,obj_id,action);update_request_status_msg(obj_type,obj_id,tx('sh:loading'));new AsyncRequest().setURI('/ajax/reqs.php').setData({'type':obj_type,'id':obj_id,'action':action,params:params}).setHandler(function(response){handle_async_response(obj_type,obj_id,response.getPayload());}).send();}
function click_add_platform_app(req_id,app_id,type_index,from_id,is_invite,req_type,url){var obj_type='app_'+app_id+'_'+type_index;update_request_status_msg(obj_type,req_id,tx('sh:loading'));new AsyncRequest().setURI('/ajax/reqs.php').setData({'type':'platform_request','id':req_id,'action':(url?'accept':'reject'),'params':{'from_id':from_id,'req_type':req_type,'app_id':app_id,'is_invite':is_invite}}).setHandler(function(response){if(url){document.location.href=url;}else{handle_async_response(obj_type,req_id,response.getPayload());}}).send();}
function handle_async_response(obj_type,obj_id,payload){if(payload.request_labels){update_request_labels(obj_type,obj_id,payload.request_labels);}
if(payload.msg){update_request_status_msg(obj_type,obj_id,payload.msg,true);}
if(payload.new_list){add_to_friend_list_widget.add_new_list(payload.new_list['name'],payload.new_list['flid']);}
if(payload.has_no_remaining_requests){setTimeout("function() { "
+"if (!window.adding_friend_details) {"
+"  document.location.href=\'home.php?\'} }",5000);}}
function update_request_labels(obj_type,id,request_labels){if(request_labels['main']){var label_span=$(obj_type+'_label');set_inner_html(label_span,request_labels['main']);}
if(request_labels['sidebar']){var sidebar_text_div=$(obj_type+'_sidebar_text');set_inner_html(sidebar_text_div,request_labels['sidebar']);}else{var sidebar_div=$(obj_type+'_sidebar');hide(sidebar_div);}}
function update_request_status_msg(obj_type,obj_id,msg,opt_use_animation){var div_id=obj_type+'_'+obj_id;update_request_status_msg_div(div_id,msg,opt_use_animation);}
function update_request_status_msg_div(div_id,msg,opt_use_animation){var use_animation=opt_use_animation||false;var status_box=ge(div_id);if(status_box&&msg){if(msg=='default'){hide(status_box);}else{status_box.style.display='block';status_box.className='status_confirm';status_box.innerHTML=msg;if(use_animation){status_box.style.backgroundColor='#FFF8CC';status_box.style.borderColor='#FFE222';animation(status_box).duration(500).checkpoint().to('background','#F7F7F7').to('borderColor','#CCC').duration(750).go();}}}}
function show_remove_event_dialog(eid,ename){var dialog=new pop_dialog();dialog.show_choice(tx('rq03'),tx('rq04',{'event-name':htmlize(ename)}),tx('rq05'),function(){handle_request_click('event_invite',eid,'remove');generic_dialog.get_dialog(this).fade_out(100)},tx('rq06'),function(){generic_dialog.get_dialog(this).fade_out(100)});return false;}
function reqs_play_video(req_id){container=ge(req_id);if(container){container.className+=' playing';}
return false;}
function hide_mobile_confirmation(){var dialog=new pop_dialog();dialog.show_choice(tx('rq09'),tx('rq10'),tx('sh:hide-link'),bind(null,dynamic_post,'/confirmphone.php',{hidepending:true}),tx('sh:cancel-button'),bind(dialog,dialog.hide,false));return false;}
function hide_phonebook_confirmation(){var dialog=new pop_dialog();dialog.show_choice(tx('rq09'),tx('rq10'),tx('sh:hide-link'),confirm_handler,tx('sh:cancel-button'),bind(dialog,dialog.hide,false));return false;function confirm_handler(){var async=new AsyncRequest();async.setURI('/mobile/ajax.php');async.setData({hide_request:1,post_form_id:$('post_form_id').value});async.setHandler(bind(this,onResponse));async.setErrorHandler(function(response){ErrorDialog.showAsyncError(response);});async.send();function onResponse(asyncResponse){generic_dialog.get_dialog(this).fade_out(100);window.location.href=window.location.href;}}}
if(window.Bootloader){Bootloader.done(1);}