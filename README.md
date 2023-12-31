# LADL
LADL Automation

Jenkins Integration steps:

Download jenkins generic java package war file from - https://www.jenkins.io/download/
To start jenkins from terminal of your computer exec the command ====> java -jar PATH_TO_JENKINS_WAR_FILE/jenkins.war

If you are running jenkins for first time, you would get an admin password in the console, copy it, open localhost:8080 in browser and paste the admin password. Install all the default plugins and create a new user.

1. Run Cypress Tests present Locally and publish MOCHAWESOME HTML Report
        a. Create a Freestyle Project
        b. In General click Advanced button, select Use custom workspace and mention the project directory, for example
                C:\Cypress-Jenkins\Local\cypress-jenkins-demo-master
        c. Go to Build, Click on Add build step, select "Execute Window Batch Command" and add "npm test"
        d. Go to Post-build Actions, Click on Add post-build action, select "Publish HTML reports", 
                Install PUBLISH HTML REPORT plugin(https://plugins.jenkins.io/htmlpublisher/), if not already done
                Set 
                    HTML directory to archive = cypress/reports/mochareports
                    Index pages[s] = report.html
            
            
2. Fetch Cypress project from GitHub, run and publish MOCHAWESOME HTML Report
        a. Create a Freestyle Project
        b. In General, select 
            GitHub project
                https://github.com/qaboxletstest/cypress-jenkins-demo.git
            click Advanced button, select "Use custom workspace" and mention the project directory, for example
                C:\Cypress-Jenkins\GitHub
        c. Go to Source Code Management, select "Git"
                Set 
                    Repositories =====> Repository URL = https://github.com/qaboxletstest/cypress-jenkins-demo.git
        d. Go to Build, Click on Add build step, select "Execute Window Batch Command" and add "npm install && npm test"
        e. Go to Post-build Actions, Click on Add post-build action, select "Publish HTML reports", 
                Install PUBLISH HTML REPORT plugin(https://plugins.jenkins.io/htmlpublisher/), if not already done
                Set 
                    HTML directory to archive = cypress/reports/mochareports
                    Index pages[s] = report.html
                    
3. Run Cypress Tests present Locally and Build Project with Parameters
        a. Create a Freestyle Project
        b. In General click Advanced button, 
                a. select "This project is parameterized", provide choice parameters
                        Set
                                Name = Options
                                Choices = 
                                                test
                                                cy:chrome
                                                cy:firefox
                                Description = Select your option to run tests on specific browser
                b. select "Use custom workspace" and mention the project directory, for example
                        C:\Cypress-Jenkins\Local\cypress-jenkins-demo-master
        c. Go to Build, Click on Add build step, select "Execute Window Batch Command" and add "npm run %Options%"
        d. Go to Post-build Actions, Click on Add post-build action, select "Publish HTML reports", 
                Install PUBLISH HTML REPORT plugin(https://plugins.jenkins.io/htmlpublisher/), if not already done
                Set 
                    HTML directory to archive = cypress/reports/mochareports
                    Index pages[s] = report.html                 
                    
 4. Fetch Cypress project from GitHub, Build Jenkins Pipeline and publish MOCHAWESOME HTML Report
        a. Create a Pipeline Project
        b. Go to Pipeline 
            Set
                Definition = Pipeline script from SCM
                SCM = Git
                Repositories =====> Repository URL = https://github.com/qaboxletstest/cypress-jenkins-demo.git
                Script Path = Jenkinsfile

NOTE - CSS is stripped out because of the Content Security Policy in Jenkins. The default rule is set to:
sandbox; default-src 'none'; img-src 'self'; style-src 'self';

This rule set results in the following:

        No JavaScript allowed at all
        No plugins (object/embed) allowed
        No inline CSS, or CSS from other sites allowed
        No images from other sites allowed
        No frames allowed
        No web fonts allowed
        No XHR/AJAX allowed, etc.

To relax this rule, go to Manage Jenkins -> Tools and Actions -> Script Console -> System.setProperty("hudson.model.DirectoryBrowserSupport.CSP", "")

and Press Run. If you see the output as 'Result:' below "Result" header then the protection disabled. Re-Run your build and you can see that the new HTML files archived will have the CSS enabled.
