var req = null;

$(document).ready(function(){
	if(document.location.pathname == '/bookmarks/add') {
		$.get("/bookmarks/getjavascriptaddform", function (data) {			
			$('.submit_action').hide();
			$('.submit_action').after(data);
	
				$('input#submit').parent('p').parent('form').submit(function () {
					if ($('p').find('.second_submit').length > 0) {
						if (!(data = $("input#url").val())) {
							data = '';
						}
						$.post(
							"/bookmarks/add", 
							"url="+data, 
							function (json) {
								if (json != true) {
									$.each(json['url'], function(key, value) {
										$("input#url").parent('span').next().remove();
										$("input#url").parent('span').after('<span class="validate incorrect">'+value+'</span>');
									});
									return false;
								} else {
									getBookmarkInformation(true, true);
								} 
							}, 
							"json"
						);
					} else {
						return true;
					}
					return false;
				});
		});
		$.each($('.disabled'), function (key, element) {
			$(element).parent('span').parent('p').css('display', 'none');
		});
	} else if (document.location.pathname == '/bookmarks/add/') {
		getBookmarkInformation(false, false);
	} else if (document.location.pathname.search(/bookmarks\/edit.*/) > 0) {
		getBookmarkInformation(false, false);
	} else if (document.location.pathname.search(/linkadd.*/) > 0) {
		getBookmarkInformation(true, false);
	}
	
	if ($('#linkadd-body #content div.notification').hasClass('positive')) {
		setTimeout('closeLinkadd()', 1500);
	}
		
	$('a.foldswitch').click(function() {
		$(this).toggleFolder();
		return false;
	});
	
	$('a.open-all-folders').click(function() {
		$.each($('a.foldswitch'), function() {
			$(this).parent('li').openFolder();
		});
		return false;
	});
	
	$('#filter_submit').css('display', 'none');
	
	$('#bm-filter').change(function() {
		document.getElementById('filter_form').submit(); 
	});
});

function closeLinkadd() {
	self.close();
}

$.fn.toggleFolder = function() {
	status = $(this).parent('li').attr('class');
	if (status == 'open') {
		$(this).parent('li').closeFolder();
	} else {
		$(this).parent('li').openFolder();
	}
}

$.fn.openFolder = function() {
	$(this).addClass('open');
}

$.fn.closeFolder = function() {
	$(this).removeClass('open');
}

String.prototype.trim = function() {
	return this.replace(/^\s+|\s+$/g,"");
}

function removeElement() {
	$('#urlNotFound').fadeOut('middle');
}


Array.prototype.deleteByKey = function(key) {
    for (var x = 0; x < this.length; ++x) {
        if (x >= key) {
            this[x] = this[x + 1];
        }
    } this.pop();
};

function getBookmarkInformation(overwrite, gather) {
	$.get("/bookmarks/gatherinformation", function (data) {
		if (overwrite && gather) {
			$('.first').parent('span').parent('p').after(data);
		
			$("input#url").parent('span').next().remove();
			document.location.href = '#save';
			$('.second_submit').parent('p').remove();
			$('.gatherinformation').hide();
			$('.gatherinformation').slideDown();
		}
				
		req = $.ajax({
			type: "POST",
			url: "/bookmarks/gatherinformation", 
			data: "url="+$('input#url').val(), 
			success: function (json, textStatus) {
				checkReq = $.ajax({
					type: "POST",
					url: "/bookmarks/checkurl",
					data: "url="+$('input#url').val(),
					success: function (text, textStatus) {
						if (text != true && overwrite) {
							element = $('input#url').parent('span').parent('p').before(text);
							setTimeout("removeElement()", 5000);
						}
					},
					timeout: 5000,
					dataType: "html"
				});
				$('.gatherinformation').slideUp('fast');
				$('.gatherinformation').remove();
				
				if (overwrite) {
					$.each($('.disabled'), function (key, element) {
						$(element).parent('span').parent('p').slideDown('slow');
					});
					
					$.each(json, function(key, value) {
						formName = "#"+key;
						$(formName).val(value);
					});
					$('.submit_action').show();
				}
				$('input#tags').tagSuggest({'tags' : json['keywords'], 'separator' : ', ', 'sort' : false});
				$('input#groups').tagSuggest({'tags' : json['group'], 'separator' : ', ', 'sort' : false});
				
				$('input#tags').parent('span').after(json['tagSuggestion']);
				$('input#groups').parent('span').after(json['groupSuggestion']);
				req = null;
			}, 
			error: function (request, textStatus, error) {
				$('.gatherinformation').slideUp('fast');
				$('.gatherinformation').remove();
				
				$.each($('.disabled'), function (key, element) {
					$(element).parent('span').parent('p').slideDown('slow');
				});
				$('.submit_action').show();
			},
			timeout: 5000,
			dataType: "json"
		});	
		return false;
	});
			
	$.getJSON(
		'/folders/getaddfolder',
		function (data) {
			$('#folders').parent('span').append(data['msg']);
			$('#folders').parent('span').parent('p').after(data['folder']);
			$('#display-folder').css('display', 'none');
			
			$('#add-folder').click(function() {
				$('#display-folder').css('display', 'block');
				$('#folders').parent('span').parent('p').css('display', 'none');
				return false;
			});
			
			$('#close-folder').click(function() {
				$('#display-folder').css('display', 'none');
				$('#folder-name').attr('value', '');
				$('#folders').parent('span').parent('p').css('display', 'block');
				return false;
			});
		}
	);
}


function addTag(element) {
	tags = $('input#tags').val().split(',');
	tag = $.trim(element.innerHTML);
	trimedTags = [];
	tagString = '';
	
	$.each(tags, function (key, value) {
		trimedTags.push(jQuery.trim(value));		
	});
		
	index = jQuery.inArray(tag, trimedTags);
	if (index != -1 && trimedTags.length > 1) {
		$(element).removeClass('linkactive');
		trimedTags.deleteByKey(index);
	} else {
		$(element).addClass('linkactive');
		trimedTags.push(tag);
	}
	
	trimedTags = $.unique(trimedTags);
	
	$.each(trimedTags, function (key, value) {
		if (value != '') {
			tagString += value + ', ';
		}
	});
	
	$('input#tags').val(tagString);    
	$('input#tags').focus();    
}

function addElement(element, name) {
	inputElement = 'input#' + name;
	tags = $(inputElement).val().split(',');
	tag = $.trim(element.innerHTML);
	trimedTags = [];
	tagString = '';
	
	$.each(tags, function (key, value) {
		trimedTags.push(jQuery.trim(value));		
	});
		
	index = jQuery.inArray(tag, trimedTags);
	if (index != -1 && trimedTags.length > 1) {
		$(element).removeClass('linkactive');
		trimedTags.deleteByKey(index);
	} else {
		$(element).addClass('linkactive');
		trimedTags.push(tag);
	}
	
	trimedTags = $.unique(trimedTags);
	
	$.each(trimedTags, function (key, value) {
		if (value != '') {
			tagString += value + ', ';
		}
	});
	
	$(inputElement).val(tagString);    
	$(inputElement).focus();
}

function checkIfCheckExists(element) {
	tags = $('input#tags').val().split(',');
	tag = $.trim(element.innerHTML);
	trimedTags = [];
	tagString = '';
	
	$.each(tags, function (key, value) {
		trimedTags.push(jQuery.trim(value));		
	});
		
	index = jQuery.inArray(tag, trimedTags);
	if (index != -1 && trimedTags.length > 1) {
		$(element).addClass('linkactive');
	} else {
		$(element).removeClass('linkactive');
	}
}


function toggleNotice() {
	if ($('#bm-manager-notification').css('height') != '0px') {
		overflowVal = 'hidden';
		paddingVal = '0px';
		heightVal = '0px';
		topVal = '38px';
	} else {
		overflowVal = 'auto';
		paddingVal = '5px';
		heightVal = '18px';
		topVal = '10px';
	}
	$('#bm-manager-notification').css('overflow', overflowVal);
	$('#bm-manager-notification').animate({
		    paddingTop: paddingVal,   
		    paddingBottom: paddingVal, 
		    height: heightVal,
		    top: topVal
	}, 'middle');
}

function editBookmarkBar() {
	speed = 300;
	if ($('.bookmark .edit').css('width') == '0px') {
		bookmark_edit = '66px';
		bookmark_details = '50px';
		bookmark_right = '10px';
		$('#manager').removeClass('editmodeoff');
		if (!checkBrowserName('MSIE')) {
			$('#manager').addClass('editmode-on');
			$('#edit-drawer').animate({width: '375px'});
			$('.edit-actions').animate({width: '264px'});
			$('.edit-actions').css('left', '0');
		}
	} else {
		bookmark_edit = '0px';
		bookmark_details = '0px';
		bookmark_right = '0';		
		$('#manager').addClass('editmodeoff');
		
		if (!checkBrowserName('MSIE')) {
			$('#manager').removeClass('editmode-on');
			$('.edit-actions').animate({width: '0'});
			$('#edit-drawer').animate({width: '105px'});
			$('.bookmark .details').draggable('destroy');
		}
	}

	
	if (checkBrowserName('MSIE') == false) {
		$('.bookmark .edit').animate({
			width: bookmark_edit
		}, speed);
		$('.bookmark .details').animate({
			marginRight: bookmark_details
		}, speed);
		$('.bookmark .right').animate({
			marginRight: bookmark_right
		}, speed);
	}
	
	$.get('/bookmarks/edit');
}