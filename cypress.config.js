const { defineConfig } = require("cypress");
const fastCSV= require("fast-csv");
//const eyesPlugin = require('@applitools/eyes-cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl:"https://qa.datalabeler.lilly.com/",
    defaultCommandTimeout:8000,
    screenshotsFolder: "cypress/reports/mochareports/assets",
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('@cypress/grep/src/plugin')(config),
      on("task",{
        readCsv(filename){
          return new Promise(resolve=>{
            let dataArray=[];
            fastCSV.parseFile("cypress/fixtures/"+filename,{headers:false})
            .on('data',(data)=>{
              dataArray.push(data);
            })
            .on('end',()=>{
              resolve(dataArray)
            })
          })
        }
      })
    },
  },
  env:{
    create_project_url:"project/create",
    project_url:"https://qa.datalabeler.lilly.com/project/116",
    apiBaseUrl:"https://z2rvotrk4h.execute-api.us-east-1.amazonaws.com",
     token:"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiIwY2U3NmZiOC04Mzk5LTRhZWQtOTkxZC1hMTg0ZjUzZmYzMmQiLCJpc3MiOiJodHRwczovL2xvZ2luLm1pY3Jvc29mdG9ubGluZS5jb20vMThhNTlhODEtZWVhOC00YzMwLTk0OGEtZDg4MjRjZGMyNTgwL3YyLjAiLCJpYXQiOjE2OTU3MTIzNjAsIm5iZiI6MTY5NTcxMjM2MCwiZXhwIjoxNjk1NzE3Nzg0LCJhaW8iOiJBVlFBcS84VUFBQUFiZGFlcmplY3JTV0JEajdiS2VKMDNTSFRna0U5VFp5R1h6S1ZrUE56SHFDYko3WHdIdkg2aC9xbC9mcklTSzREeE5ZRVJ6ODdxK0xKUnhERTc0Zm1BODgzeWYwaXBnK1FaSzlGWlVYa2JJbz0iLCJhenAiOiIwY2U3NmZiOC04Mzk5LTRhZWQtOTkxZC1hMTg0ZjUzZmYzMmQiLCJhenBhY3IiOiIwIiwibmFtZSI6IlNoYWlrIFNhZGlxIC0gTmV0d29yayIsIm9pZCI6IjBkMGFhY2JhLWQ3YzEtNDQyYy1hZGUxLTY3ZGVlNGFlMTQ1YSIsInByZWZlcnJlZF91c2VybmFtZSI6InNhZGlxX3NoYWlrQG5ldHdvcmsubGlsbHkuY29tIiwicmgiOiIwLkFSZ0FnWnFsR0tqdU1FeVVpdGlDVE53bGdMaHY1d3laZy0xS21SMmhoUFVfOHkwWUFKYy4iLCJzY3AiOiJMQURMQVBJIiwic3ViIjoiR0h5TFYyNmNYMmZLZTlVXzZFMzBZYnJwRFkxdW1OTXJZQ2d6ajFrNkxtQSIsInRpZCI6IjE4YTU5YTgxLWVlYTgtNGMzMC05NDhhLWQ4ODI0Y2RjMjU4MCIsInV0aSI6ImpOYUluOE84VFVTbkFCdUdpbFU1QUEiLCJ2ZXIiOiIyLjAiLCJ1aWQiOiJMMDM3NDA5IiwiZW1wbG95ZWVfaWQiOiIzMDM3NDA5In0.JsZ6eZDx1Go3L_4G2YVnXme7JsLwpVsQu0QmeCG4vqdYHffX13TXEXiwTSUIdJeBPquTxo3Q37oZyGyKZ5Ek7xZtXfiq8QOEElhQoqYDQHDufb16tzBZPao8g2aKVOAIxHKmV0YniSqnoxhYz9fsOLmzU-Ad4PtD9F3mlzfy8S4QOQedw6JX3mAmYtYRJi9N_GaWTU4JmuDx-85NwS2Soye8MIgS7mXQ-B6nKmnpUG4AR0EwLnhi3Ejs_JjOFRoZEk00hPost95U-MT9x8BVe0jl86nyX6FF9LXNpQGMSw6FYsLgtmQMl4fOBaECMVbdxJa4xudHMV_xH3xFP7HFbA",
     userId:"L037409",
     APPLITOOLS_API_KEY: '97699mOhCBp3moj7111xyZKFAuFLwrchSP97LpOmjVitkstw110'
  },
  retries:{
    openMode:0,
    runMode:1
  },
  "reporter": "cypress-multi-reporters",
    "reporterOptions": {
        "reporterEnabled": "mochawesome",
        "mochawesomeReporterOptions": {
            "reportDir": "cypress/reports/mocha",
            "quite": true,
            "overwrite": false,
            "html": false,
            "json": true
        }
    }
});


require('@applitools/eyes-cypress')(module);
