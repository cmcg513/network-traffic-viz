// JScript source code
var EncDec =
{
    mPassw : "",
    
    init : function ()
    {
        mPassw = "6394715";
    },

    setPassw : function (pPassw)
    {
        mPassw = pPassw;
    },
    
    doEncode : function (pTxt)
    {
        if(mPassw=='')
			return encodeURIComponent(pTxt);

        var i,c=0,lBuff='';
        var re;
        for(i=0;i<pTxt.length;i++)
        {
            c = pTxt.charCodeAt(i) + parseInt(mPassw.charAt(i%mPassw.length));
            lBuff = lBuff + String.fromCharCode(c);
        }
        lBuff=encodeURIComponent(lBuff);

        lBuff=lBuff.replace(/%80/g,"%C2%80");
        lBuff=lBuff.replace(/%81/g,"%C2%81");
        lBuff=lBuff.replace(/%82/g,"%C2%82");
        lBuff=lBuff.replace(/%83/g,"%C2%83");
        lBuff=lBuff.replace(/%84/g,"%C2%84");
        lBuff=lBuff.replace(/%85/g,"%C2%85");
        lBuff=lBuff.replace(/%86/g,"%C2%86");
        lBuff=lBuff.replace(/%87/g,"%C2%87");
        lBuff=lBuff.replace(/%88/g,"%C2%88");
        lBuff=lBuff.replace(/%C2%C2/g,"%C2");

        //'->%27 and (->%28 and )->%29 and "->%22 and +->%2B
        re=new RegExp("'", "g");    lBuff=lBuff.replace(re,"%27");
        re=new RegExp('""', "g");	lBuff=lBuff.replace(re, "%22");
        lBuff=lBuff.replace(/\+/g, "%2B");
        lBuff=lBuff.replace(/\(/g, "%28");
        lBuff=lBuff.replace(/\)/g, "%29");
        return lBuff;
    },
    doDecode : function (pTxt)
    {
        pTxt = decodeURIComponent(pTxt);
        if(mPassw=='')
			return pTxt;

        var i,c=0,lBuff='';
        for(i=0;i<pTxt.length;i++)
        {
            c = pTxt.charCodeAt(i) - parseInt(mPassw.charAt(i%mPassw.length));
            lBuff = lBuff + String.fromCharCode(c);
        }
        return lBuff;
    }
}

EncDec.init();
