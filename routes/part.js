/**
 * Created by romain on 2016-11-30.
 */
var Part = require('../models/part.js').model;

var Round = require('../models/round.js').model;
var Player = require('../models/player.js').model;

exports.allParts = function (req, res) {
    Part.find({}, function (err, datas) {
            if (!err) {
                var parts = [];
                for (var i = 0; i < datas.length; i++) {
                    parts.push(datas[i]);
                }
                res.status(200).send(parts);
            } else {
                console.error(err);
                res.status(500).send(err);
            }
        }
    );
};

exports.findById = function (req, res) {
    try {
        Part.findById(req.params.id, function (err, part) {
            if (!err) {
                if (part) {
                    res.status(200).send(part);
                } else {
                    res.status(404).send({
                        errorCode: 'PART_NOT_FOUND',
                        message: 'Part ' + req.params.id + ' was not found'
                    });
                }
            } else {
                console.error(err);
                if (err.name === 'CastError') {
                    res.status(404).send({
                        errorCode: 'PART_NOT_FOUND',
                        message: 'PART ' + req.params.id + ' was not found'
                    });
                } else {
                    res.status(500).send(err);
                }
            }
        });
    } catch (e) {
        console.log(e);
        res.send(500);
    }
};

exports.deleteById = function (req, res) {
    Part.findByIdAndRemove(req.params.id, req.body, function (err, part) {
        if (err) return console.log(err);
        Part.find({}, function (err, datas) {
                if (!err) {
                    var parts = [];
                    for (var i = 0; i < datas.length; i++) {
                        parts.push(datas[i]);
                    }
                    res.status(200).send(parts);
                } else {
                    console.error(err);
                    res.status(500).send(err);
                }
            }
        );
    });
}

exports.createPart = function (req, res) {
    if (req.body) {
        var part = new Part(req.body);

        for (var i = 0; i < req.body.playersNames.length; i++) {
            var player = new Player();

            player.name = req.body.playersNames[i];
            part.ranking.push(player)
        }

        part.save();
        res.status(200).send(part);
    } else {
        console.log("error");
    }
}

exports.addRoundToPartById = function (req, res) {
    Part.findById(req.params.id, function (err, part) {
        if (!err) {
            if (part) {
                if (req.body) {
                    var round = new Round(req.body)

                    part.rounds.push(round);

                    for (var i = 0; i < part.ranking.length; i++) {
                        var position;

                        for (var j = 0; j < round.result.length; j++) {
                            if (part.ranking[i].name == round.result[j]) {
                                position = j
                            }
                        }
                        part.ranking[i].score += part.scoresValues[position];
                        console.log("player: "+part.ranking[i].name+", position: "+position+", point: "+part.scoresValues[position]+", score: "+part.ranking[i].score+"\n");
                    }
                    part.save();
                    res.status(200).send(part);
                } else {
                    res.status(412).send({
                        errorCode: 'REQUEST_BODY_REQUIRED',
                        message: 'Request body is missing'
                    });
                }
            } else {
                console.log(err)
            }
        } else {
            console.log(err)
        }
    });
};

