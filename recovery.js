function recovery(rn, bytes0x80, plain_text)
{
	var n_index = 0;
	return plain_text.replace(/[\n\x80-\uFFFD]/g, function(chr)
	{
		if (chr == "\uFFFD")
			return "\x00";
		
		if (chr == "\n")
		{
			switch (rn.charAt(n_index++))
			{
				case "r":
				case "d":
				case "1":
					return "\r";
				case "n":
				case "a":
				case "0":
					return "\n";
				default:
					return "\r\n";
			}
		}
		
		var index = bytes0x80.indexOf(chr);
		if (index >= 0)
			return String.fromCharCode(0x80 + index);
	})
}