// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var friendData = require("../data/friends");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
    // API GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases when a user visits a link
    // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
    // ---------------------------------------------------------------------------

    app.get("/api/friends", function (req, res) {
        res.json(friendData);
    });

    // API POST Requests
    // Below code handles when a user submits a form and thus submits data to the server.
    // In each of the below cases, when a user submits form data (a JSON object)
    // ...the JSON is pushed to the appropriate JavaScript array
    // (ex. User fills out a reservation request... this data is then sent to the server...
    // Then the server saves the data to the tableData array)
    // ---------------------------------------------------------------------------

    app.post("/api/friends", function (req, res) {
        // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
        // It will do this by sending out the value "true" have a table
        // req.body is available since we're using the body-parser middleware
        friendData.push(req.body);
        // TODO clytle check array, then post
        res.json(friendData[0]);
    });
    // ---------------------------------------------------------------------------
    // I added this below code so you could clear out the table while working with the functionality.
    // Don"t worry about it!

    app.post("/api/clear", function () {
        // Empty out the arrays of data
        friendData = [];
    });

    function findFriend(user) {
        var goodFriendIndex = -1;
        var bestScore = 100;
        for (var i = 0; i < friendData.length; i++) {
            var thisScore = 0;
            for (var j = 0; j < 10; j++) {
                thisScore += Math.abs(user.answers[j] - friendData.answers[j]);
            }
            if (thisScore < bestScore) {
                goodFriendIndex = i;
                bestScore = thisScore;
            }
        }

        if (goodFriendIndex < 0) {
            var empty =
                {
                    friendName: "No Friends are in our data yet, you are the first.",
                    photoLink: "",
                    answers: [1, 1, 1, 1, 1, 1, 7, 8, 9, 10]
                };
            return empty;
        } else {
            return friendData[goodFriendIndex];
        }
    }
};