# Basic Exercise

## What we're looking for

The purpose of this basic task is for us to see how you write code.

The key things we are looking for are:

* Good quality code: readable, maintainable, structured and simple
* Code that runs
* Attention to detail

**Please don't spend more than 30 minutes on this task.**

## Instructions

We've provided three JSON files in the `/data` folder:

* `students.json` - an array of students
* `teams.json` - an array of sport teams
* `student-teams.json` - an array of objects linking students with teams

We'd like you to write a basic Node.js program that outputs an array of teams, each containing an array of their corresponding students in a `students` property. Each student should have a `fullName` property (matching their first and last name, concatenated), rather than `firstName` and `lastName`. The student list should be sorted alphabetically based on their full name. If a student is injured, they should not be included in the team. Teams should be ordered in ascending order of ID.

The data should look like this example:

```json
{
  "teams": [
    {
      "id": 1,
      "name": "Team #1",
      "sport": "Football",
      "students": [
        {
          "id": 315,
          "fullName": "Hilliard Aubury"
        },
        {
          "id": 215,
          "fullName": "Shelby De Francisci"
        },
        {
          "id": 203,
          "fullName": "Trudy Wynett"
        },
        {
          "id": 99,
          "fullName": "Ward Brekonridge"
        }
      ]
    },
    ...
  ]
}
```

The output should be written to a file, `result.json`.

#### Reading and Writing
If you are not familiar with the Node.js `fs` library, see the docs [here](https://nodejs.org/api/fs.html). In particular you may want to use `readFileSync` and `writeFileSync`.
