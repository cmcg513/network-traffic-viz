var sb = new Array();
if (dmo.flashVersion >= 8) {
    sb[sb.length] = "<object id=\"DM\" classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\" codebase=\"http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0\" width=\"" + dmo.mediaWidth + "\" height=\"" + dmo.mediaHeight + "\">";
}
else {
    sb[sb.length] = "<object id=\"DM\" classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\" codebase=\"http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,65,0\" width=\"" + dmo.mediaWidth + "\" height=\"" + dmo.mediaHeight + "\">";
}
sb[sb.length] = "<param name=\"src\" value=\"" + dmo.objectSrc + "\">";
sb[sb.length] = "<param name=\"FlashVars\" value=\"" + dmo.flashVars + "\">";
sb[sb.length] = "<param name=\"wmode\" value=\"opaque\">";
sb[sb.length] = "<param name=\"menu\" value=\"false\">";
sb[sb.length] = "<param name=\"AllowScriptAccess\" value=\"always\">";
sb[sb.length] = "<embed name=\"DM\" wmode=\"opaque\" menu=\"false\" AllowScriptAccess=\"always\" width=\"" + dmo.mediaWidth + "\" height=\"" + dmo.mediaHeight + "\" src=\"" + dmo.objectSrc + "\" FlashVars=\"" + dmo.flashVars + " swliveconnect=\"true\" quality=\"hig\" TYPE=\"application/x-shockwave-flash\" PLUGINSPAGE=\"http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash\"></EMBED></OBJECT>";
document.write(sb.join(""));
