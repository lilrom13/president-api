/**
 * Created by romain on 2016-11-30.
 */
var mongoose = require('mongoose');

var playerSchema = new mongoose.Schema();
playerSchema.add({
    name: String,
    score: {
        type: Number,
        default: 0
    }
});

var Player = mongoose.model('Player', playerSchema);

exports.schema = playerSchema;
exports.model = Player;