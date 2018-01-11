var Steam = require("steam"),
    events = require('events'),
    eventEmitter = new events.EventEmitter(),
    eventEmitter1 = new events.EventEmitter(),
    fs = require("fs"),
    util = require("util"),
    csgo = require("csgo"),
    csv = require("fast-csv"),
    community = require('steam-community'),
    communityClient = community(),
    //steamUserInventory = require('steam-user-inventory'),
    SteamWebLogOn = require('steam-weblogon'),
    getSteamAPIKey = require('steam-web-api-key'),
    SteamTradeOffers = require('steam-tradeoffers'),
    logger = fs.createWriteStream('output.csv', {
        flags: 'a'
    });



function getinfo(username, password) {

    console.log("----------------------------------------------------");
    util.log("Logging into " + username + " . . . .");
    var botInstance = new Steam.SteamClient(),
        steamU = new Steam.SteamUser(botInstance),
        steamF = new Steam.SteamFriends(botInstance),
        steamWebLogOn = new SteamWebLogOn(botInstance, steamU),
        offers = new SteamTradeOffers(),
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
            if (games != null) {
                if (Array.isArray(games))
                    hours = games[0].hoursOnRecord
                else
                    hours = games.hoursOnRecord;
            }
        });




        if (response.eresult != Steam.EResult.OK) {
            result = 'Error in logging in!';
        } else {
            util.log("Login for " + username + " Successfull");
        }
        var writeResults = function() {
            csv.write([
                [rank, p_rank, username, password, wins, hours, s_level, steamlink, coins, medals]
            ], {
                headers: true
            }).pipe(logger);
            logger.write("\r\n");
            util.log("Write to Sheet Successfull for " + args[0]);
            console.log("----------------------------------------------------");
            botInstance.disconnect();
        }
        const waitForAll = require('wait-for-event').waitForAll;
        waitForAll('got', [eventEmitter, eventEmitter1], writeResults);

        function getItems() {
            util.log("Getting inventory Details");
            offers.loadMyInventory({
                appId: 730,
                contextId: 2,
                tradableOnly: false
            }, function(err, data) {
                got = 1;
                if (data.length == 0)
                    return;
                for (var i = 0; i < data.length; i++) {
                    var name = JSON.stringify(data[i].name);
                    name = name.replace(/\"/g, "");
                    if (name.indexOf("Medal") > -1)
                        medals = medals + name + " ";
                    else if (name.indexOf("Coin") > -1)
                        coins = coins + name + " ";
                }
                util.log("Successfully got inventory Details");
                eventEmitter.emit('got');
            });

        }
        steamWebLogOn.webLogOn(function(sessionID, newCookie) {
            getSteamAPIKey({
                sessionID: sessionID,
                webCookie: newCookie
            }, function(err, APIKey) {
                offers.setup({
                    sessionID: sessionID,
                    webCookie: newCookie,
                    APIKey: APIKey
                });
                getItems();
            });
        });

        gameCoordinatorHandle.launch();
        util.log("Fetching info for " + username + " . . . . ");
        gameCoordinatorHandle.on("ready", function() {
            gameCoordinatorHandle.playerProfileRequest(gameCoordinatorHandle.ToAccountID(botInstance.steamID));
            gameCoordinatorHandle.on("playerProfile", function(profile) {
                util.log("Fetched Community Link");
                rank = gameCoordinatorHandle.Rank.getString(profile.account_profiles[0].ranking.rank_id);
                util.log("Fetched Matchmaking Rank");
                wins = profile.account_profiles[0].ranking.wins;
                util.log("Fetched Matchmaking Wins");
                p_rank = profile.account_profiles[0].player_level;
                util.log("Fetched Private Rank");
                // logger.write(username+" "+password+" "+rank+" "+wins+" "+p_rank+" "+steamlink+"\r\n");
                eventEmitter1.emit('got');
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