/**
 * Created by romain on 2016-11-30.
 */
exports.toJSON = function() {
    var obj = this.toObject();

    obj.id = obj._id;
    delete obj._id;
    delete obj.__v;

    return obj;
};