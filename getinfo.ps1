foreach($line in Get-Content .\usernames.txt) {
	$a,$b = $line.split()
	node bot.js $a $b
}
