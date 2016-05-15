

function ebAd_1009543()
{
	this.strDefaultImage = ebResourcePath + "Site-1418/Type-0/e7fa8d02-1a82-406b-a3fa-ff1dac58cb78.jpg";
	this.strDefaultFlash = "Site-1418/Type-2/cd7ce693-3549-4973-a699-6b177218ad19.swf";
	if (this.strDefaultFlash != "")
	{
		this.strDefaultFlash = ebResourcePath + this.strDefaultFlash;
		this.nDefaultFlashWidth = 300;
		this.nDefaultFlashHeight = 250;
	}
	
	this.strRichFlash = "Site-1418/Type-2/6935e535-30a9-43b3-b4c9-edca33183d66.swf";
	this.RichFlashStreaming = null;
	if (this.strRichFlash != "")
	{
		this.strRichFlash = ebResourcePath + this.strRichFlash;
		this.nRichFlashWeight = 53779;
		this.nRichFlashWidth = 300;
		this.nRichFlashHeight = 250;

		if ("1" == "1")
		{
			this.RichFlashStreaming = new Object();
			this.RichFlashStreaming.fAutoBuffer = "0";
			this.RichFlashStreaming.nMovieDuration = "0";
			this.RichFlashStreaming.nHighBWBuffer = "50";
			this.RichFlashStreaming.nLowBWBuffer = "100";
		}
	}
	this.fWaitForFlashCommand = ("0" == "1");
	this.fPreloader = ("0" == "1");
	this.flFlashVer = 7;
		
// Full-page skin URL

	// Default Skin
	this.strFSSkinURL = ebBigS + "/Res/EBFullScreenNone" + ebFullPageSkinVer + ".swf";
	this.nFSSkinWidth = 1024;
	this.nFSSkinHeight = 768;

this.nFSMute = 3;
this.fEnableFS = 0;
// Additional assets

this.arrAdditionalRes = new Array(); // backward compatibility - can be removed after upload to REL
this.additionalAssets = new Object();

	var asset = this.additionalAssets["ebMovie1"] = new Array();
	asset[0] = new Array();	// WMV assets
	asset[1] = new Array();	// FLV8 assets
	asset[2] = new Array(); // FLV7 assets
	asset[3] = new Array(); // SWF assets
	asset[4] = new Array();	// H.264 assets
		
	
		// regular asset	
		
		var info = asset[2][0] = new Object;
		info.strURL = "Site-1418/Type-12/2e1bfed3-d23f-4832-a8a3-ae6520a65af8.flv";
		info.nWidth = 444;
		info.nHeight = 250;
		info.fEnableFS = 1;
		info.nBitRate = -1;
		info.nAssetID = 1400206;

		// Backward compatibility - can be removed after upload to REL
		this.arrAdditionalRes[0] = new Object();
		this.arrAdditionalRes[0].name = "ebMovie1";
		this.arrAdditionalRes[0].url = "Site-1418/Type-12/2e1bfed3-d23f-4832-a8a3-ae6520a65af8.flv";

	


	//	Update Remote Servers
	this.playRS = new ebCRemoteServers();
	
	//	Update Interactions
	this.interactions = new Object();
	
	//set the Default Interaction - "_eyeblaster"
	setDefaultInteraction(this);
	setInteractions(this);
	
	//		TODO ...
	//if (linkFlag.toLowerCase() == "true")
	//	gebInteractionBuffer[0].jumpURL = "http://www.staples.com/office/supplies/StaplesCategoryDisplay?jspStoreDir=Staples&catalogId=10051&productId=164732&cmArea=SEARCH&interceptedCatEntryId=164732&keyword=Microsoft-Office-Suites-2007&identifier=BI64972&langId=-1&storeId=10001&ddkey";
	//else
	//gebInteractionBuffer[0].jumpURL = "";

	function setDefaultInteraction(objRef)
	{
		objRef.interactions["_eyeblaster"] = new ebCInteraction("_eyeblaster");
		var inter = objRef.interactions["_eyeblaster"];
	
		inter.fCloseFlag = 1;
		inter.strJumpUrl = "http://www.staples.com/office/supplies/StaplesCategoryDisplay?jspStoreDir=Staples&catalogId=10051&productId=164732&cmArea=SEARCH&interceptedCatEntryId=164732&keyword=Microsoft-Office-Suites-2007&identifier=BI64972&langId=-1&storeId=10001&ddkey";
		if (inter.strJumpUrl != "")
			objRef.fLink = true;
		else
			objRef.fLink = false;
		inter.strTarget = "_blank";
		inter.RS.strNUrl = "";
		inter.RS.strAUrl = "http://clk.atdmt.com/MRT/go/105232083/direct;at.mrtinf00046929;ct.1/01/?ord=[timestamp]";
		inter.fCountAsClick = 1;
		inter.jumpWin.strPosX = "";
		inter.jumpWin.strPosY = "";
		inter.jumpWin.strWidth = "";
		inter.jumpWin.strHeight = "";
		inter.jumpWin.strAddressBar = "1";
		inter.jumpWin.strMenuBar = "1";
	}
	


	//function setInteractions
	//	this function build all the interactions that came from the admin as objects
	//	in the interactions object.
	//	the interactions data that come from the admin is set in array in the folowing order:
	///////////////////////////
	//	0 : InteractionName
	//	1 : CloseFlag
	//	2 : JumpURL
	//	3 : JumpWinPosX
	//	4 : JumpWinPosY
	//	5 : JumpWinWidth
	//	6 : JumpWinHeight
	//	7 : JumpWinAddressBar
	//	8 : JumpWinMenuBar
	//	9 : NetworkTrackingURL
	// 10 :	AgencyTrackingURL
	// 11 : JumpTarget
	// 12 : CountAsClick
	// 13 : nType
	/////////////////////////////
	function setInteractions(objRef)
	{
		
	}
	
	function buildIntList(objRef,name,fClose,jumpURL,XPos,YPos,width,height,fAddress,fMenu,NUrl,AUrl,target,fClick,type,nInitiated)
	{
		//create a new interaction object and set all its properties.
			
		//inter[0] -> interaction name.
		objRef.interactions[name] = new ebCInteraction(name,type);
		var tempInter = objRef.interactions[name];
			
		tempInter.fCloseFlag = fClose;
		tempInter.strJumpUrl = jumpURL;

		tempInter.jumpWin.strPosX = XPos;
		tempInter.jumpWin.strPosY = YPos;
		tempInter.jumpWin.strWidth = width;
		tempInter.jumpWin.strHeight = height;
		tempInter.jumpWin.strAddressBar = fAddress;
		tempInter.jumpWin.strMenuBar = fMenu;
			
		tempInter.RS.strNUrl = NUrl;
		tempInter.RS.strAUrl = AUrl;
			
		var target = parseInt(target);
		switch (target)
		{
			case 0 :
				tempInter.strTarget = "_self";		// same window
				break;
			case 1 :
				tempInter.strTarget = "_blank";		// New window
				break;
			case 2 :
				tempInter.strTarget = "_top";		// Break the frameset
				break;
			default :
				tempInter.strTarget = "_blank";
		}

		tempInter.fCountAsClick = fClick;
		tempInter.nInitiated = nInitiated;		//0 - auto initiated;1 - user initiated
		//tempInter.print();		
	}
		
	
	
}

//	Mark this ad as loaded
if(typeof(gnEbAd_1009543WasLoaded) == "undefined")
	gnEbAd_1009543WasLoaded = 1;
else
	gnEbAd_1009543WasLoaded++;

if (typeof(ebScriptLoaded) != "undefined")
	ebScriptLoaded("ebAd_1009543");
if (typeof(ebDoOnBannerScriptLoad) != "undefined")
	ebDoOnBannerScriptLoad();
