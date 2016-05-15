
function ImgDomain()
{
	var imgD = "cr0." + d_domain;
	imgD = imgD.replace("cr0.ditto", "media.ditto");
	imgD = imgD.replace("cr0.vpptechnologies", "media.ditto");
	return imgD;
}
	function CleanTags(text)
	{
		//text = unescape(text.toLowerCase());	
		var textNoTags = text;
		var lDiv = document.createElement("div");
		lDiv.innerHTML = text;
		
		if(lDiv.innerText != undefined)//IE users
		{
			textNoTags = lDiv.innerText;	
		}
		else//Firefox
		{
			var reTag = /<[^>]*V?>/g;
			if(lDiv.innerHTML != undefined)
			{
				textNoTags = lDiv.innerHTML.replace(reTag,"");
			}
			else
			{
				textNoTags = text.replace(reTag,"");
			}
		}
		return textNoTags;
	}
	
	function CleanAdvertiserName(advertiser)
	{
		if (advertiser == null || advertiser == '' || advertiser.length == 0) return '';

		var regex = new RegExp('http://|https://|ww1[\.]|ww2[\.]|www[\.]','gi');
		advertiser = advertiser.replace(regex,'');
		var x = advertiser.indexOf('/');
		if(x != -1){
			advertiser = advertiser.substring(0,x);
		}
		x = advertiser.indexOf('?');
		if(x != -1){
			advertiser = advertiser.substring(0,x);
		}
		return advertiser.toLowerCase();
	}
	function CleanTitleDescription(title)
	{
		if (title == null || title == '' || title == ' ' || title.length == 0) return '';

		var spaceCharacters = new Array('\?', '%',  '#',  '\&', '|', '!', '\+', '\^', '~', '\\',  '{', '}', '\[', '\]', '=', '<', '>', '/', ';', ':', '@', '\.', '"', '(', ')', '\*', '_', ',');
		var nullCharacters = new Array('-', '\$', '`', "'");
		var titles = new Array();
		if(title != ''){
			var original = title;
			
			var tt = titles[title];
			if(tt && tt != ''){
				return tt;
			}
			
			title = unescape(title.toLowerCase());
			title = CleanTags(title);
			title = title.replace("&#39","'");

			for(var i = 0; i < spaceCharacters.length; i++){
				while(title.indexOf(spaceCharacters[i]) > -1){
					title = title.replace(spaceCharacters[i], ' ');
				}
			}

			for(var j = 0; j < nullCharacters.length; j++){
				while(title.indexOf(nullCharacters[j]) > -1){
					title = title.replace(nullCharacters[j], '');
				}
			}

			var words = new Array();
			var usedWords = new Array();
			words = title.split(' ');
			words = words.sort();

			title = "";
			for(var k = 0; k < words.length; k++){
				if(words[k].length <= 0 || (k > 0 && words[k-1] == words[k])) continue;
				else{
					usedWords.push(words[k]);
				}
			}
			title = usedWords.join(' ');
			titles[original] = title;
		}
		return title;
	}
	function CleanSearchString(searchstring)
	{
		if (searchstring == null || searchstring == '' || searchstring.length == 0) return '';

		var spaceCharacters = new Array('\?', '%',  '#',  '\&', '|', '!', '\+', '\^', '~', '\\',  '{', '}', '\[', '\]', '=', '<', '>', '/', ';', ':', '@', '\.', '"', '(', ')', '\*', '_', ',');
		var nullCharacters = new Array('-', '\$', '`', "'");
		var searchStrings = new Array();
		if(searchstring != ''){
			var original = searchstring;
			
			var ss = searchStrings[searchstring];
			if(ss && ss != ''){
				return ss;
			}
			
			searchstring = unescape(searchstring.toLowerCase());
			
			for(var i = 0; i < spaceCharacters.length; i++){
				while(searchstring.indexOf(spaceCharacters[i]) > -1){
					searchstring = searchstring.replace(spaceCharacters[i], ' ');
				}
			}

			for(var j = 0; j < nullCharacters.length; j++){
				while(searchstring.indexOf(nullCharacters[j]) > -1){
					searchstring = searchstring.replace(nullCharacters[j], '');
				}
			}

			var words = new Array();
			var usedWords = new Array();
			words = searchstring.split(' ');
			words = words.sort();

			searchstring = "";
			for(var k = 0; k < words.length; k++){
				if(words[k].length <= 0 || (k > 0 && words[k-1] == words[k])) continue;
				else{
					usedWords.push(words[k]);
				}
			}
			searchstring = usedWords.join(' ');
			searchStrings[original] = searchstring;
		}
		return searchstring;
	}
	
	function GetImageFileName(advertiser, SearchString, isBrand)
	{
		var key;
		if(!isBrand){
			key = CleanAdvertiserName(advertiser) + '|' + CleanSearchString(SearchString) + '|100|1|0';
		}else{
			key = CleanAdvertiserName(advertiser) + '||100|1|1';
		}
		var file = hex_md5(key);
		return file.substr(0,1) + '/' + file.substr(1,2) + '/' + file.substr(3,2) + '/' + file.substring(5,file.length) + '.jpg';
	}
	function GetAdImageFileName(advertiser, title, desc)
	{
		var key;
		
		key = CleanAdvertiserName(advertiser) + '|' + CleanTitleDescription(title + ' ' + desc) + '|100|1|0';
		
		var file = hex_md5(key);
		return file.substr(0,1) + '/' + file.substr(1,2) + '/' + file.substr(3,2) + '/' + file.substring(5,file.length) + '.jpg';
	}
	function ReplaceW(ss)
	{
		var r, re; 
		re = /width\s*=\s*["']?\d+["']?/ig;
		r = ss.replace(re, "");
		return(r); 
	}
	
	function GetIAProductImageDetails(searchString, title, description, advertiser, attributes, docWrite)
	{
		CountRequest(searchString);//Maria Feb 25th 2008

		//maria april 21
		if(searchString==undefined || searchString==null || searchString=='' || 
		   advertiser==undefined || advertiser==null || advertiser=='')
		{
			searchString = 'error';
			advertiser = 'error';
		}

		//temp. maria March 17th
		//if(description == undefined && args != null && args.adDesc != null)
		//{
		//	description = args.adDesc;
		//}
		//end temp March 17

		attributes = ReplaceW(attributes);
		if(docWrite == null){(docWrite = true)}
		
		if (searchString != null && searchString != '' && searchString.length > 0) 
		{
			var prod = GetImageFileName(advertiser, searchString, false);
		}
		else
		{
			var prod = GetAdImageFileName(advertiser, title, description);
		}
		var qs = 'ss=' + searchString + '&adv=' + advertiser + '&ttl=' + CleanTags(title) + '&des=' + CleanTags(description);
		var qsEnc = EncDec.doEncode(qs);
		var file = 'http://' + ImgDomain() + '/' + prod + '?pid=' + PropertyID + '&qs=' + qsEnc;
		if(docWrite)
		{
			document.write('<im'+'g src=\"' + file + '\" ' + attributes + ' />');	
		}
		return(file);
	}

	function GetIABrandImageDetails(searchString, advertiser, attributes, docWrite)
	{
		CountRequest(searchString);//Maria Feb 25th 2008

		//maria april 18
		if(searchString==undefined || searchString==null || searchString=='' || 
		   advertiser==undefined || advertiser==null || advertiser=='')
		{
			searchString = 'error';
			advertiser = 'error';
		}

		attributes = ReplaceW(attributes);
		if(docWrite == null){(docWrite = true)}

		var brand = GetImageFileName(advertiser, '', true);
		var qs = 'adv=' + advertiser;
		var qsEnc = EncDec.doEncode(qs);
		var file = 'http://' + ImgDomain() + '/' + brand + '?pid=' + PropertyID + '&qs=' + qsEnc;
		if(docWrite)
		{
			document.write('<im'+'g src=\"' + file + '\" ' + attributes + ' />');	
		}
		return(file);
	}
	
	function GetIAProductImage(searchString, advertiser, attributes, docWrite)
	{
		CountRequest(searchString);//Maria Feb 25th 2008

		attributes = ReplaceW(attributes);
		if(docWrite == null){(docWrite = true)}
		
		var prod = GetImageFileName(advertiser, searchString, false);
		var def = GetImageFileName(advertiser,'', false); 
		var file = 'http://' + ImgDomain() + '/' + prod + '?n=16&rdf=' + def; 
		if(docWrite)
		{
			document.write('<im'+'g src=\"' + file + '\" ' + attributes + ' />');	
		}
		return(file);
	}
	
	function GetIABrandImage(searchString, advertiser, attributes, docWrite)
	{
		CountRequest(searchString);//Maria Feb 25th 2008

		attributes = ReplaceW(attributes);
		if(docWrite == null){(docWrite = true)}

		var brand = GetImageFileName(advertiser, '', true);
		var file = 'http://' + ImgDomain() + '/' + brand + '?n=16';
		if(docWrite)
		{
			document.write('<im'+'g src=\"' + file + '\" ' + attributes + ' />');	
		}
		return(file);
	}