pipeline {
	agent any

    parameters{
        //string(name:'SPEC',defaultValue:'cypress/e2e/**/**',description:"Execute the scripts")
        choice(name:'BROWSER',choices:['chrome','edge','firefox'],description:"Select the browser to execute the scripts")
        choice(name:'TEST',choices:['regression-test','LADL-API-test','components-test'],description:'Select scripts to execute')
    }
    // options{
    //     ansicolor('xterm')
    // }
	stages {
		stage('Clone Git Repo'){
				steps{
					git 'https://github.com/Sadiq8009/LADL.git'
		    }
		}
		stage('Install Dependencies'){
				steps{
					bat 'npm install'
				}
		}
		stage('Run Tests'){
				steps{
					//bat 'npm run regression-test'
                  //  bat  'npx cypress run --browser ${BROWSER} --spec ${SPEC}'
                  bat 'npm run %TEST%'
				}
		}
		stage('Publish HTML Report'){
				steps{
					publishHTML([allowMissing: false, alwaysLinkToLastBuild: false, keepAll: true, reportDir: 'cypress/reports/mochareports', reportFiles: 'index.html', reportName: 'HTML Report', reportTitles: '', useWrapperFileDirectly: true])
				}
		}
	}
}