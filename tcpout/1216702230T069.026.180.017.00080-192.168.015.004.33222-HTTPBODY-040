/*       Source:  Local Cache                                                                 */
/*     Location:  rsrc:94453:/html/js/video/requests.js                                       */
/*      Machine:  10.16.140.105                                                               */
/*    Generated:  July 21st 2008 8:54:35 PM PDT                                               */
/*    HTTP Host:  static.ak.fbcdn.net                                                         */


function motion_resolve_pending_tags(video_id,checkbox_div){inputs=$(checkbox_div).getElementsByTagName('input');approve_list=[];deny_list=[];for(i=0;i<inputs.length;i++){if(inputs[i].type!='checkbox')continue;tagged_id=inputs[i].value;if(inputs[i].checked){approve_list.push(inputs[i].value);}else{deny_list.push(inputs[i].value);}}
new AsyncRequest().setURI('/ajax/motion.php').setData({approve_pending:approve_list.join(','),clear_pending:deny_list.join(','),v:video_id}).setHandler(function(response){handle_async_response('video_tag',video_id,response.getPayload());}).send();}
function motion_clear_all_pending_tags(video_id,checkbox_div){inputs=$(checkbox_div).getElementsByTagName('input');for(i=0;i<inputs.length;i++){if(inputs[i].type=='checkbox'){inputs[i].checked=false;}}
motion_resolve_pending_tags(video_id,checkbox_div);}
if(window.Bootloader){Bootloader.done(1);}