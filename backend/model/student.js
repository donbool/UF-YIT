var mongoose = require('mongoose');
var Schema = mongoose.Schema;

studentSchema = new Schema( {
	name: String,
    grade: String,
	comments: String,
	benchmarks: String,
	marks: String,
    averageMark: Number,
	date : { type : Date, default: Date.now }
}),
student = mongoose.model('student', studentSchema);

module.exports = student;
/*
*TODO
-Reformat the "name" variable in sessions to be an array of strings rather than one string

	-Right now, the "name" variable is formatted as "["Name", "Name2", "Name3"]"

	-This change allows to loop through when adding a session and updating sessionsAttended variable
		-sessionsAttended variable to be added to Student Schema
		-Change name: String --> name: Array
	
	-Check to see if any formatting issues in frontend that worked around this issue 
	-now use the array instead

	-Delete the attendance part of the sessions schema bc it is not used
*/ 