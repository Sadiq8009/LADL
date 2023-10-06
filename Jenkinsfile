pipeline {
	agent any
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
					bat 'npm test'
				}
		}
		stage('Publish HTML Report'){
				steps{
					publishHTML([allowMissing: false, alwaysLinkToLastBuild: false, keepAll: false, reportDir: 'cypress/reports/mochareports', reportFiles: 'report.html', reportName: 'HTML Report', reportTitles: ''])
				}
		}
	}
}