//Current Rank	Private Rank	Steam Account	Steam Password	Wins	Hours	Steam Level	STEAM PROFILE LINK	coins	Medal																		
	var fs = require("fs");
	var csv = require("fast-csv");
	var logger = fs.createWriteStream('output.csv', {flags: 'w'});
	csv.write([["Current Rank","Private Rank","Steam Account","Steam Password","Wins","Hours","Steam Level","Steam Profile Link","Coins","Medals"]],{headers : true}).pipe(logger);
	logger.write("\r\n");

