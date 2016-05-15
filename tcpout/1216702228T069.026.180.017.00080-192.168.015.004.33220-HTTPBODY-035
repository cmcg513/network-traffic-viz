/*       Source:  Local Cache                                                                 */
/*     Location:  rsrc:110249:/html/js/friend_guess.js                                        */
/*      Machine:  10.16.139.102                                                               */
/*    Generated:  July 21st 2008 8:54:33 PM PDT                                               */
/*    HTTP Host:  static.ak.fbcdn.net                                                         */


function pymkGrid(grid_id){copy_properties(this,{used_ids:[],boxes_displayed:0,payload_timeouts:0,grid_id:null,pymk_more_link:null});if(grid_id&&ge(grid_id)){this.grid_obj=$(grid_id);var id_divs=DOM.scry(this.grid_obj,'div.friend_grid_col');for(i=0;i<id_divs.length;i++){this.used_ids.push(parseInt(id_divs[i].getAttribute('id').substring(3)));this.boxes_displayed++;}
var more_link=DOM.scry(this.grid_obj,'a.show_more');if(more_link){this.pymk_more_link=more_link[0];}}else{Util.error('pymkGrid: Either the grid you have specified is invalid or is not detectable in the DOM.');}}
copy_properties(pymkGrid.prototype,{addFriend:function(uid){this.modifyFriendship(uid,'add');return;},hideFriend:function(uid,page,pymk_score,is_from_whitelist){this.modifyFriendship(uid,'blacklist',null,page,pymk_score,is_from_whitelist);return;},modifyFriendship:function(uid,action_type,home_panel,page,pymk_score,is_from_whitelist){var friend_data=this.getGridData($('fg_'+uid));this._removeID(uid);var asyncData={used:this.used_ids,replace:uid,get:1};if(action_type=='blacklist'){asyncData.blacklist=true;asyncData.blacklist_type='blacklist';asyncData.page=page;asyncData.pymk_score=pymk_score;asyncData.is_from_whitelist=is_from_whitelist;}
new AsyncRequest().setURI('/ajax/friend_guess.php').setData(asyncData).setHandler(bind(this,this.asyncHandleModify)).send();var friend_box=$('fg_'+uid);friend_box.style.height=Vector2.getElementDimensions(friend_box).y+'px';animation(friend_box).from('opacity',1).to('opacity',0).duration(300).go();if(home_panel){home_panel.addTo('outgoing',home_panel.constructGridItem(friend_data));}
return;},asyncHandleRefresh:function(async){payload=async.getPayload();if(payload.victim&&payload.victim.length>0){for(i=0;i<payload.victim.length;i++){if(this.used_ids[i]){animation($('fg_'+this.used_ids[i])).from('opacity',1).to('opacity',0).duration(300).go();}}
for(i=0;i<payload.victim.length;i++){if(this.used_ids[i]){this.replaceItem(this.used_ids[i],payload.victim[i]);}}
for(i=0;i<payload.victim.length;i++){this.used_ids.unshift(payload.victim[i].uid);}}
if(!payload.more){this._hideMoreLink();}},asyncHandleModify:function(async){payload=async.getPayload();if(payload.victim&&payload.victim.length>0){this.replaceItem(payload.replace,payload.victim[0]);}
return;},replaceItem:function(replace,victim){var replace_id='fg_'+replace;var box_id='fg_'+victim.uid;if(!ge(box_id)){$(replace_id).setAttribute('id',box_id);var newMarkup='<div class="fg_img"><img src="'+victim.profile_image_src+'" alt="'+tx('shm02')+'" /></div>'
+'<div class="fg_links"><div class="fg_name">'+victim.profile_link+'</div>'
+'<div class="fg_action_add">'+victim.add_friends_link+'</div>';if(victim.view_friends_link){newMarkup+='<div class="fg_action_view">'+victim.view_friends_link+'</div>';}
$(box_id).innerHTML=victim.box_content;animation($(box_id)).from('opacity',0).to('opacity',1).duration(400).go();this.used_ids.push(victim.uid);}else{this.payload_timeouts++;$(replace_id).style.visibility='hidden';if(ge('fg_add_'+replace)){hide($('fg_add_'+replace));}
var replace_height=Vector2.getElementDimensions($(replace_id)).y;animation($(replace_id)).from('height',replace_height).to('height',0).duration(550).hide().go();this._hideMoreLink();}},constructGridItem:function(grid_data){return this.constructRawGridItem(grid_data.uid,grid_data.content);},constructRawGridItem:function(uid,item_content){var gridItem=document.createElement('div');CSS.addClass(gridItem,'friend_grid_col');gridItem.setAttribute('id','friend_'+uid);gridItem.innerHTML=item_content;return gridItem;},getGridData:function(grid_object){if(CSS.hasClass(grid_object,'friend_grid_col')){var gridData={content:grid_object.innerHTML,uid:grid_object.getAttribute('id').toString().slice(3)}
return gridData;}},_removeID:function(uid){for(i=0;i<this.used_ids.length;i++){if(this.used_ids[i]==uid){this.used_ids.splice(i,1);}}
return;},_hideMoreLink:function(){if(this.pymk_more_link){this.pymk_more_link.style.visibility='hidden';this.pymk_more_link=null;}}});function pymk_add_friend(uid,existingGrid){if(!existingGrid){existingGrid=new pymkGrid('pymk_ajax_grid');}
existingGrid.addFriend(uid);}
function pymk_hide_friend(uid,existingGrid,page,pymk_score,is_from_whitelist){if(!existingGrid){existingGrid=new pymkGrid('pymk_ajax_grid');}
if(!pymk_score){pymk_score=null;}
if(!is_from_whitelist){is_from_whitelist=0;}
existingGrid.hideFriend(uid,page,pymk_score,is_from_whitelist);}
if(window.Bootloader){Bootloader.done(1);}