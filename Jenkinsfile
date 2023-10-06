pipeline {
	agent any

    parameters{
        string(name:'SPEC',defaultValue:'cypress/e2e/**/**',description:"Execute the scripts")
        choice(name:'BROWSER',choices:['chrome','edge','firefox'],description:"Select the browser to execute the scripts")
    }
    options{
        ansicolor('xterm')
    }
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
                    bat  'npx cypress run --browser ${BROWSER} --spec ${SPEC}'
				}
		}
		post('Publish HTML Report'){
				always{
					publishHTML([allowMissing: false, alwaysLinkToLastBuild: false, keepAll: true, reportDir: 'cypress/Report/Mochawesome_Reports', reportFiles: 'index.html', reportName: 'HTML Report', reportTitles: '', useWrapperFileDirectly: true])
				}
		}
	}
}