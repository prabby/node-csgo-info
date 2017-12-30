var Steam = require("steam"),
	fs = require("fs"),
	util = require("util"),
    csgo = require("csgo"),
    readlineSync = require("readline-sync"),
    crypto = require("crypto");
    var logger = fs.createWriteStream('output.txt', {
  	            flags: 'a'
  	            })

    function getinfo(username,password){
    	var bot = new Steam.SteamClient(),
    	steamUser = new Steam.SteamUser(bot),
    	steamGC = new Steam.SteamGameCoordinator(bot, 730),
    	CSGOCli = new csgo.CSGOClient(steamUser, steamGC, false),
    	logOnDetails = {
    					"account_name": username,
    					"password": password,
    				};
		
		bot.connect();
		var onSteamLogOn = function onSteamLogOn(response){
        	var rank;
        	var wins;
        	var p_rank;
        	var steamlink ="http://steamcommunity.com/profiles/"+bot.steamID;
        	if (response.eresult != Steam.EResult.OK) {
            	result ='Error in logging in!';
        	}
        	else{
        		console.log("------------------------------------------");
        		util.log("Login for "+username+" Successfull");
        	}
    
        	CSGOCli.launch();
        		util.log("Fetching info for "+username+" . . . . ");
	        CSGOCli.on("ready", function() {
    	        CSGOCli.playerProfileRequest(CSGOCli.ToAccountID(bot.steamID));
        	    CSGOCli.on("playerProfile", function(profile) {
            	    rank = CSGOCli.Rank.getString(profile.account_profiles[0].ranking.rank_id);
                	wins = profile.account_profiles[0].ranking.wins;
                	p_rank = profile.account_profiles[0].player_level;
	                logger.write(username+" "+password+" "+rank+" "+wins+" "+p_rank+" "+steamlink+"\r\n"); //Change newline character depending on OS
	                util.log("Successfull fetched info for " + username);
	                console.log("------------------------------------------");
            	    bot.disconnect();
                    });                
            });
    	}
		bot.on("logOnResponse", onSteamLogOn)
   		   .on('connected', function(){
        		steamUser.logOn(logOnDetails);
				});
	}
	var args = process.argv.slice(2);
	getinfo(args[0],args[1]);
	



    
