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
    	console.log("----------------------------------------------------");
    	util.log("Logging into "+username+" . . . .");
    	var botInstance = new Steam.SteamClient(),
    	steamU = new Steam.SteamUser(botInstance),
    	csgoGameCoordinator = new Steam.SteamGameCoordinator(botInstance, 730),
    	gameCoordinatorHandle = new csgo.CSGOClient(steamU, csgoGameCoordinator, false),
    	logOnDetails = {
    					"account_name": username,
    					"password": password,
    				};
		
		botInstance.connect();
		var onLoginSuccess = function onLoginSuccess(response){
        	var rank;
        	var wins;
        	var p_rank;
        	var steamlink ="http://steamcommunity.com/profiles/"+botInstance.steamID;
        	if (response.eresult != Steam.EResult.OK) {
            	result ='Error in logging in!';
        	}
        	else{
        		util.log("Login for "+username+" Successfull");
        	}
    
        	gameCoordinatorHandle.launch();
        		util.log("Fetching info for "+username+" . . . . ");
	        gameCoordinatorHandle.on("ready", function() {
    	        gameCoordinatorHandle.playerProfileRequest(gameCoordinatorHandle.ToAccountID(botInstance.steamID));
        	    gameCoordinatorHandle.on("playerProfile", function(profile) {
            	    rank = gameCoordinatorHandle.Rank.getString(profile.account_profiles[0].ranking.rank_id);
                	wins = profile.account_profiles[0].ranking.wins;
                	p_rank = profile.account_profiles[0].player_level;
	                logger.write(username+" "+password+" "+rank+" "+wins+" "+p_rank+" "+steamlink+"\r\n");
	                util.log("Successfully fetched info for " + username);
	                console.log("----------------------------------------------------");
            	    botInstance.disconnect();
                    });                
            });
    	}
		botInstance.on("logOnResponse", onLoginSuccess)
   		   .on('connected', function(){
        		steamU.logOn(logOnDetails);
				});
	}
	var args = process.argv.slice(2);
	getinfo(args[0],args[1]);
	



    
