// Use `fs` for reading data files and writing the result to `result.out`
const fs = require("fs");
const students = require("./data/students.json");
const teams = require("./data/teams.json");
const studentTeams = require("./data/student-teams.json");

/**
 * The main program function.
 */
function executeProgram() {
  // TODO: implement
  var result = [];
  var finalResult = {};
  for (var i = 0; i < teams.length; i++) {
    result.push(teams[i]);
    result[i].students = [];
    var filteredstudentIds = studentTeams
      .filter(entry=> {return entry.teamId == teams[i].id})
      .map(relation=> {
        return relation.studentId;
      });

    var filteredStudents = students
      .filter(student=> {
        return (
          filteredstudentIds.indexOf(student.id) !== -1 &&
          student.injured == false
        );
      })
      .map(student=> {
        var obj = {};
        obj.id = student.id;
        obj.fullName = student.firstName + " " + student.lastName;
        return obj;
      });

    result[i].students = result[i].students.concat(filteredStudents);
    finalResult.teams = [];
    finalResult.teams = finalResult.teams.concat(result);
  }
  var resultJson = JSON.stringify(finalResult);
  resultJson = resultJson.replace(/,/g, ",\n");
  resultJson = resultJson.replace(/}/g, "\n}");
  resultJson = resultJson.replace("{", "\n{");


  fs.writeFile("./data/result.json", resultJson, "utf-8", (err) => {
    if (err) throw err
    console.log("created result.json file data folder");
  });
}

// Run the program
executeProgram();