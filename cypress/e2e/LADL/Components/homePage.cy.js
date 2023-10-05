/// <reference types='cypress'/>
import homePage from "../../../support/pageObjects/LADL_homePage";

describe("Validate LADL Homepage",function(){
    beforeEach(function(){
        cy.visit("/");
    })

    it("Validate the name of the application",function(){
        homePage.applicationName.should("have.text","Language Automatic Data Labeler")
    })

    it("Validate LADL app homepage_view for the users who does not have access to any projects_instances",function(){
        homePage.noDataAvailableText.should('have.text',"No Data Available!")
        homePage.createProjectBtn.should("be.visible");
        homePage.createProjectBtnText.should('have.text','Create New Project')
    })
    it("Validate the logged in user id in homepage",function(){
       homePage.loggedInUserId.should('have.text','Shaik Sadiq - Network')
    });

    
    it("Validate user navigeted to create project page upon clicking create new project btn",function(){
        homePage.createProjectBtn.click({force: true});
        cy.url().should('include','create');
    })
})

