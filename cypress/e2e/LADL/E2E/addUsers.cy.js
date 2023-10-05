import accessManagement from "../../../support/pageObjects/LADL_AccMgtPage";
import homePage from "../../../support/pageObjects/LADL_homePage";

describe("Add users to the project_instance",function(){
    let userArray=[];
    let randomProjectName=Math.random().toString(36).substring(7);
    beforeEach(function () {
        cy.fixture("example.json").as("data");
        cy.visit("/",{timeout:12000});
      });

     
    it("Create projects and add users to that created project",function(){
        Cypress.config('pageLoadTimeout:10000');
        homePage.createProjectBtnInGrid.should("be.visible").click({force:true});
        cy.CreateProject(randomProjectName);
        this.data.userNames.forEach((userName)=>{
            cy.Select_User(userName,userName);
            //accessManagement.userAddedSuccessMsg.should('include','Added Users Successfully');
        })
        cy.wait(2000)
        accessManagement.UserInGrid.each(($ele,index)=>{
            userArray.push($ele.text());
        }).then(()=>{
           expect(userArray).to.deep.eq(this.data.users);    
        })
    
    })
})