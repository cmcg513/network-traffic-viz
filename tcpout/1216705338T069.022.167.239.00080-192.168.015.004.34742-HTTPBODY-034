/* iperceptionsXXX.js
	This js file is included in the client homepage.
	It generates a random number. If the number is within
	the range specified, It loads the second js file 
	which then loads the invitation page, after passing
	the 3 tests.
*/

//Generate a random number between 0 and 9
var randomNumber;
randomNumber=Math.floor ((Math.random()*10));	
//alert(randomNumber);

//If the randomNumber is less than 5 then load the script
if (randomNumber < 2)
{	
	loadIPScript();
}

//This function loads the script on the client's homepage
//and it in turn generates the invitation page.
function loadIPScript() 
{
  //get the head tag and append the script to it
  var head = document.getElementsByTagName("head")[0];
  var script = document.createElement('script');
  script.type = "text/javascript";
  script.src = "http://group13.iperceptions.com/Invitations/Javascripts/wv356redirect_3.js";
  head.appendChild(script)
  //alert("Script Loaded");
}