console.log("Hello server");

Meteor.publish('thePlayers', function(){
    var currentUserId = this.userId;
    return PlayersList.find({createdBy: currentUserId});
});

Meteor.methods({
    'insertPlayerData': function(playerNameVar, playerScoreVar){
        var currentUserId = Meteor.userId();
        PlayersList.insert({
            name: playerNameVar,
            score: playerScoreVar,
            createdBy: currentUserId
        });
        console.log("Added " + playerNameVar + " (" + playerScoreVar + ")");
    },

    'removePlayerData': function(selectedPlayer){
        console.log("Removing " + PlayersList.findOne(selectedPlayer).name);
        PlayersList.remove(selectedPlayer);
    },

    'modifyPlayerScore': function(selectedPlayer, scoreValue){
        PlayersList.update(selectedPlayer, {$inc: {score: scoreValue} });
    }
});