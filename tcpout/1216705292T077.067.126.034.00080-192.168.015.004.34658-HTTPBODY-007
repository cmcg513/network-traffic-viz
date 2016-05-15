var i = 0;

function IAMLTClick(key, adCount)
{
	if (eval(document.getElementById("ddTitle"+adCount)) != null)
	{
		eval(document.getElementById("ddTitle"+adCount)).onclick = IA_Click;
	}

	if (eval(document.getElementById("ddDesc"+adCount)) != null)
	{
		eval(document.getElementById("ddDesc"+adCount)).onclick = IA_Click;
	}

	if (eval(document.getElementById("ddUrl"+adCount)) != null)
	{
		eval(document.getElementById("ddUrl"+adCount)).onclick = IA_Click;
	}

	if (eval(document.getElementById("ddHover"+adCount)) != null)
	{
		eval(document.getElementById("ddHover"+adCount)).onclick = IA_Click;
	}


	if (eval(document.getElementById("clk"+adCount)) != null)
	{
		eval(document.getElementById("clk"+adCount)).onclick = IA_Click;
	}

	if (eval(document.getElementById("imgClk"+adCount)) != null)
	{
		eval(document.getElementById("imgClk"+adCount)).onclick = IA_Click;
	}

	if (eval(document.getElementById("IAClick"+(adCount-1))) != null)
	{
		eval(document.getElementById("IAClick"+(adCount-1))).onclick = IA_Click;
	}
       
	function IA_Click()
	{
		i++;
		var mltClick = new Image(1,1);
		mltClick.src = key + "&i=" + i;
	}
}