/**
 * Created by romain on 2016-11-30.
 */
var mongoose = require('mongoose');

var roundSchema = new mongoose.Schema();
roundSchema.add({
    result: [String]
});

var Round = mongoose.model('Round', roundSchema);

exports.schema = roundSchema;
exports.model = Round;