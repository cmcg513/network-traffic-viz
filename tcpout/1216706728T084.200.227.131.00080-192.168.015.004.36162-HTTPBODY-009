$(document).ready(function(){
	$('.switch-header-style').click(function() {
		if ($('#head').hasClass('head-is-small')) {
			$.get('/index/sethead/normal', function(data){
				$('#head').removeClass('head-is-small');
			});
		} else {
			$.get('/index/sethead/small', function(data){
				$('#head').addClass('head-is-small');
			});
		}
		return false;
	});
	
	$('.message_subject').click(function() {
		element = $(this);
		$(this).next('p').toggle();
		
		id = $(this).attr('rel');
		
		if ($(this).hasClass('message-unread')) {
			$.get('/community/messages/markasread/' + id, function(data){
				element.removeClass('message-unread');
			});
		}
		
		return false;
	});
	
	$('.message-delete').click(function() {
		element = $(this);
		
		id = element.attr('rel');
		sure = confirm('Diese Nachricht löschen?');	
		if(sure) {
			$.get('/community/messages/deletemsg/' + id, function(data){
				$('#message-frame-' + id).remove();
			});
		}
		
		return false;
	});
	
	$('.message-delete-outbox').click(function() {
		element = $(this);
		
		id = element.attr('rel');
		sure = confirm('Diese Nachricht löschen?');	
		if(sure) {
			$.get('/community/messages/deleteoutboxmsg/' + id, function(data){
				$('#message-frame-' + id).remove();
			});
		}
		
		return false;
	});
	
	$('.setAdHit').click(function() {
		element = $(this);
		
		id = element.attr('rel');
		$.get('/index/setadhit/' + id, function(data){
			//
		});
		
		return;
	});
	
	$('.addBookmarksToQuick').click(function() {
		element = $(this);
		
		id = element.attr('rel');
		src = element.attr('src');
		$.get('/index/setquickbookmark/' + id, function(data){
			element.attr('src', '/images/quick-' + data + '.gif');
		});
		
		return false;
	});
	
	$('#addLASearchEngine').click(function() {
		InstallSearchPlugin('firefox');		
		return false;
	});
	
	$('.addRecip').click(function() {
		addReceipient(this);		
		return false;
	});
	
	if(document.location.pathname.search(/community\/messages\/new.*/) > 0) {
		$.getJSON('/community/messages/getfriends',function (json) {
			$('input#recipients').tagSuggest({'tags' : json['username'], 'separator' : ', ', 'sort' : false});
			$('input#recipients').parent('span').after(json['displayFriends']);
		});
	}
	
	$('.showGroupPassword').click(function() {
		reqUrl = $(this).attr('href');
		already = $('#showPw').html();
		if(already.length > 3) {
			$('#showPw').empty();	
		} else {
			$.get(reqUrl,function (data) {
				if(data) {	
					$('#showPw').empty();	
					$('#showPw').append(data);
				}				
			});
		}
		return false;
	});
	
	$('.leaveGroupNow').click(function() {
		reqUrl = $(this).attr('href');
		reqText = $(this).attr('rel');
		confirmer = confirm(reqText);
		if(confirmer) {
			document.location.href=reqUrl;	
		}
		return false;
	});
	
	if(document.location.pathname.search(/community\/groups\/create/) > 0) {		
		$('input#name').keydown(function() {
			namespace = $('input#name').val();
			namespace = namespace + ' ';
			if(namespace.length > 2) {
				$.get('/community/groups/getsimilargroupsbyname/' + namespace,function (data) {
					$('#listSimilarGroups').empty();
					if(data) {
						$('#listSimilarGroups').append(data);
					}				
				});
			}
		});
	}
	
	if(document.location.pathname.search(/tags\/edit.*/) > 0) {		
		$('input#newname').keyup(function() {
			if ($(this).val() != '') {
				$('#delete-tag').attr('disabled', 'disabled');
				$('#delete-tag').addClass('button-disable');
			} else {
				$('#delete-tag').removeAttr('disabled');
				$('#delete-tag').removeClass('button-disable');
			}
		});
	}
	
	
	if(document.location.pathname.search(/community\/groups\/create/) > 0 || document.location.pathname.search(/community\/groups\/edit/) > 0) {		
		$.getJSON('/community/messages/getfriends',function (json) {
			$('input#recipients').tagSuggest({'tags' : json['username'], 'separator' : ', ', 'sort' : false});
			$('input#recipients').parent('span').after(json['displayFriends']);
		});

		$.getJSON('/community/groups/getuserstag',function (json) {
			$('input#tags').tagSuggest({'tags' : json['tags'], 'separator' : ', ', 'sort' : false});
			$('input#tags').parent('span').after(json['displayTags']);
		});

	}
	
	$('.searchPageButton').click(function() {
		element = $(this);
		
		page = element.attr('rel');
		$query = $("#searchQuerySafe").html();
		
		$(".searchPageButton").removeClass('selected');
		
		$.ajax({
			type: "get",
			url: "/search/buildresults",
			data: "p=" + page + "&q=" + $query,   
			beforeSend: function() {
				$(".loadingNewPageIndicator").show();
				$("#ShowWhichPageIsLoading").empty();
				$("#ShowWhichPageIsLoading").append(page);
			},
			success: function(data) {
				$("#linkarena-results").empty();
				$("#linkarena-results").append(data);
				$(element).addClass('selected');
				$("#ShowWhichPageIsLoading").empty();
				$(".loadingNewPageIndicator").hide();
				document.location.href='#head';
			}
		});
		
		return false;
	});
	
	if(document.location.pathname.search(/search\/results.*/) > 0) {
		$(".moreSemagerLink").hide();
		$(".loadingNewPageIndicator").hide();
	}
	
	$('.linkarena-results').click(function() {
		$(".pagination").show();	
	});
	
	$('.own-results').click(function() {
		$(".pagination").hide();	
	});
	$('.yahoo-results').click(function() {
		$(".pagination").hide();	
	});
	$('.google-results').click(function() {
		$(".pagination").hide();	
	});
});

function checkBrowserName(name){  
   var agent = navigator.userAgent.toLowerCase();  
   if (agent.indexOf(name.toLowerCase())>-1) {  
     return true;  
   }  
   return false;  
} 

function addReceipient(element) {
	tags = $('input#recipients').val().split(',');
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
	
	$('input#recipients').val(tagString);    
	$('input#recipients').focus();    
}

function InstallSearchPlugin(browser) {
	if(!browser || browser == 'firefox') {
		if ((typeof window.sidebar == "object") && (typeof window.sidebar.addSearchEngine == "function")) {
			window.sidebar.addSearchEngine(
				"http://linkarena.com/plugins/firefox/linkarena.src",
				"http://linkarena.com/plugins/firefox/linkarena.png",
				"LinkARENA Suche",
				"LinkARENA"
			);
		}
	} else if(browser == 'iexplorer') {
		alert('Die SuMa für den IE ist noch nicht fertig!');
	} else {
		alert('Es wurde kein Browser ausgewählt!');
		return false;
	}
}