/**
 * Created by romain on 2016-11-30.
 */
var mongoose = require('mongoose');

var roundSchema = require('./round').schema;
var playerSchema = require('./player').schema;

var partSchema = new mongoose.Schema();
partSchema.add({
    name: String,
    players: Number,
    ranking: [playerSchema],
    rounds: [roundSchema],
    scoresValues: [Number],
    create_at: { type: Date, default: Date.now },
    over: {
        type: Boolean,
        default: false
    },
    winner: {
        type: String,
        default: ""
    }
});

var Part = mongoose.model('Part', partSchema);

exports.schema = partSchema;
exports.model = Part;