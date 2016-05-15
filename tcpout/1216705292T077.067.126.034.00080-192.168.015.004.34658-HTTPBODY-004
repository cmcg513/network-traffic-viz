var AgentQueue = "|";
var myImg1 = new Image(1,1);
var myImg2 = new Image(1,1);
var myImg3 = new Image(1,1);
var myImg4 = new Image(1,1);

//var gImg = new Image(1,1);
//gImg.src = 'http://iaor.' + d_domain + '/iaor.gif?pid=' + PropertyID + '1&ss=mlt&sty=Z&dm=' + escape(unescape(DomainUrl)) + '&gp=' + escape(unescape(Group)) + '&loc=1';


function CountMLTRequest(key)
{

	if(AgentQueue == "" || AgentQueue.indexOf("|" + key + "|") == -1)
	{
		src = 'http://iaor.' + d_domain + '/iaor.gif?pid=' + PropertyID + '&ss=' + escape(unescape(IASearchString)) + '&sty=' + IAStyle[key-1] + '&dm=' + escape(unescape(DomainUrl)) + '&gp=' + escape(unescape(Group)) + '&loc=' + key;
			eval("myImg" + key).src = src;		
	}

	AgentQueue += key + "|";
}

	
function CountRequest(key)
{
}


function CleanQuote(ss)
{
    var r1,r2,r3,re1,re2,re3; 
    re1 = /\'/ig;
    r1 = ss.replace(re1, "&#39");
		
    re2 = /\<\</ig;
    r2 = r1.replace(re2, "&#171");
		
    re3 = /\>\>/ig;
    r3 = r2.replace(re3, "&#187");
		
    return(r3); 
}


	

	

	