var mongoose = require('mongoose');
var Schema = mongoose.Schema;

sessionSchema = new Schema( {
	name: String,
	comments: String,
	taskAssignment: String,
	sessionDay: Number,
	sessionMonth: Number,
	sessionYear: Number,
	subject: String,
	attendance: String,
	hours: Number,
	user_id: Schema.ObjectId,
	is_delete: { type: Boolean, default: false },
	date : { type : Date, default: Date.now }
}),
session = mongoose.model('session', sessionSchema);

module.exports = session;