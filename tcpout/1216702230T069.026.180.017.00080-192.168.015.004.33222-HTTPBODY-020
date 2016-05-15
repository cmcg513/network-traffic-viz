/*       Source:  Local Cache                                                                 */
/*     Location:  rsrc:108938:/html/js/lib/ui/typeaheadpro/search_typeaheadpro.js             */
/*      Machine:  10.16.140.106                                                               */
/*    Generated:  July 21st 2008 8:53:40 PM PDT                                               */
/*    HTTP Host:  static.ak.fbcdn.net                                                         */


function search_typeaheadpro(obj,source,properties){this.anchor_block=true;this.parent.construct(this,obj,source,properties);}
search_typeaheadpro.extend(typeaheadpro);search_typeaheadpro.prototype.auto_select=false;search_typeaheadpro.prototype.less_than_n_chars=false;search_typeaheadpro.prototype.show=function(){if(!this.less_than_n_chars){this.parent.show();this.dropdown.style.width='148px';}else{this.hide();}}
search_typeaheadpro.prototype.hide=function(){this.parent.hide();remove_css_class_name(ge('qsearch_wrapper'),'typeahead_border');}
search_typeaheadpro.prototype.found_suggestions=function(suggestions,text,fake_data){var auto_select=ADVANCED_SEARCH_TYPEAHEAD&&suggestions&&suggestions.length==1;if(auto_select){suggestions.push({t:text,i:text.trim().replace(/ /g,'+'),ty:'search'});}
this.parent.found_suggestions(suggestions,text,fake_data);if(this.suggestion_count>0){add_css_class_name(this.list.firstChild.firstChild,'blue_top_border');remove_css_class_name(this.list,'no_border_list');add_css_class_name(this.list.lastChild.lastChild,'blue_bottom_border');add_css_class_name(ge('qsearch_wrapper'),'typeahead_border');}else{remove_css_class_name(ge('qsearch_wrapper'),'typeahead_border');add_css_class_name(this.list,'no_border_list');}
if(auto_select){this.set_suggestion(0);}}
function search_typeahead_onsubmit(friend){if(friend){if(SEARCH_TYPEAHEAD_ONCLICK){if(!search_friend_source.already_logged){eval(SEARCH_TYPEAHEAD_ONCLICK);search_friend_source.already_logged=true;}}
var url=friend.u;if(!url){var type_info=search_friend_source.url_templates[friend.ty];if(type_info){url=sprintf(type_info.default_url,friend.i);}}
if(!url){return undefined;}else if(url.indexOf('?')!=-1){goURI(url+'&ref=ts');}else{goURI(url+'?ref=ts');}
bind(this,this.blur).defer();return false;}};window.ADVANCED_SEARCH_TYPEAHEAD=false;
if(window.Bootloader){Bootloader.done(1);}