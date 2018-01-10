var Steam = require("steam"),
    fs = require("fs"),
    util = require("util"),
    csgo = require("csgo"),
    csv = require("fast-csv"),
    community = require('steam-community'),
    communityClient = community(),
    steamUserInventory = require('steam-user-inventory'),
    logger = fs.createWriteStream('output.csv', {
        flags: 'a'
    })

function getinfo(username, password) {
    console.log("----------------------------------------------------");
    util.log("Logging into " + username + " . . . .");
    var botInstance = new Steam.SteamClient(),
        steamU = new Steam.SteamUser(botInstance),
        steamF = new Steam.SteamFriends(botInstance),
        s_level,
        hours,
        csgoGameCoordinator = new Steam.SteamGameCoordinator(botInstance, 730),
        gameCoordinatorHandle = new csgo.CSGOClient(steamU, csgoGameCoordinator, false),
        logOnDetails = {
            "account_name": username,
            "password": password,
        };

    botInstance.connect();
    var onLoginSuccess = function onLoginSuccess(response) {
        var rank;
        var wins;
        var p_rank;
        var hours;
        var coins = "";
        var medals = "";
        steam64 = botInstance.steamID;
        var steamlink = "http://steamcommunity.com/profiles/" + steam64;

        steamF.getSteamLevel([steam64], function(result) {
            s_level = result[steam64];

        });


        communityClient.games(steam64, function(err, games) {
            if (Array.isArray(games))
                hours = games[0].hoursOnRecord
            else
                hours = games.hoursOnRecord;
        });




        if (response.eresult != Steam.EResult.OK) {
            result = 'Error in logging in!';
        } else {
            util.log("Login for " + username + " Successfull");
        }

        steamUserInventory(steam64).then(data => {
            for (var i = 0; i < data.length; i++) {
                if (data[i].tradable == 0 && data[i].marketable == 0) {
                    var item = JSON.stringify(data[i].name);
                    if (item.indexOf("Medal") > -1)
                        medals = medals + item.replace(/\"/g, "") + " ";
                    if (item.indexOf("Coin") > -1)
                        coins = coins + item.replace(/\"/g, "") + " ";
                }
            }
        });
        gameCoordinatorHandle.launch();
        util.log("Fetching info for " + username + " . . . . ");
        gameCoordinatorHandle.on("ready", function() {
            gameCoordinatorHandle.playerProfileRequest(gameCoordinatorHandle.ToAccountID(botInstance.steamID));
            gameCoordinatorHandle.on("playerProfile", function(profile) {
                rank = gameCoordinatorHandle.Rank.getString(profile.account_profiles[0].ranking.rank_id);
                wins = profile.account_profiles[0].ranking.wins;
                p_rank = profile.account_profiles[0].player_level;
                // logger.write(username+" "+password+" "+rank+" "+wins+" "+p_rank+" "+steamlink+"\r\n");
                gameCoordinatorHandle.exit();
                botInstance.disconnect();
                csv.write([
                    [rank, p_rank, username, password, wins, hours, s_level, steamlink, coins, medals]
                ], {
                    headers: true
                }).pipe(logger);
                logger.write("\r\n");
                util.log("Successfully fetched info for " + username);
                console.log("----------------------------------------------------");

            });
        });
    }
    botInstance.on("logOnResponse", onLoginSuccess)
        .on('connected', function() {
            steamU.logOn(logOnDetails);
        });
}
var args = process.argv.slice(2);
getinfo(args[0], args[1]);