import createProject from "../../../support/pageObjects/LADL_createProjectPage";
import accessManagement from "../../../support/pageObjects/LADL_AccMgtPage";

let userArray=[];
describe("Validate Access Management screen components",function(){


    let randomProjectName = Math.random().toString(36).substring(5);
   
   
    beforeEach(function () {
        cy.fixture("example.json").as("data");
        cy.visit("/" + Cypress.env("create_project_url"));
        cy.url().should("include", "project/create");
        randomProjectName= Math.random().toString(36).substring(5);
      });
  
  


  //Accessmanagement screen validations
it("Validate user navigates to AccessManagement page upon creation of New Project",{tags:'@regression'},function(){
    cy.CreateProject(randomProjectName);
    accessManagement.accessManagementPageLabel.should('have.text',randomProjectName+'Access Management')
})

it("Validate is_labelled_unlabelled data section disabled when user is in access mangt screen",{tags:'@regression'},function(){
    cy.CreateProject(randomProjectName); 
    accessManagement.accessManagementPageLabel.should('have.text',randomProjectName+'Access Management')
    accessManagement.labelledDataMgtSection.eq(0).should("have.class","Mui-disabled");
    accessManagement.unlabelledDataMgtSection.eq(1).should("have.class","Mui-disabled");
})

it("Validate the text entered in the search field is correctly displaying in the field",function(){
    cy.CreateProject(randomProjectName);
    accessManagement.searchField.type(this.data.username).should("have.value",this.data.username)
})

it("Validate the entered user name is selected in search input field",{tags:'@regression'},function(){
    cy.CreateProject(randomProjectName);
    cy.Select_User(this.data.username,this.data.actualName)
})

it("Select multiple users to grant access for the project and validate the role assigned",{tags:'@regression'},function(){
    cy.CreateProject(randomProjectName);
    this.data.userNames.forEach((userName)=>{
        cy.Select_User(userName,userName);
    })
    accessManagement.UserInGrid.each(($ele,index)=>{
        userArray.push($ele.text());
    }).then(()=>{
       expect(userArray).to.deep.eq(this.data.users);     
    })
    accessManagement.usersRole.each(($ele,index)=>{
        let role=$ele.text();
        expect(role).to.be.eq('Analyst')
      })
})

it("Validate is user can be deleted in access management",{tags:'@regression'},function(){
    cy.CreateProject(randomProjectName);
        cy.Select_User(this.data.username,this.data.actualName);
    
    cy.get("svg[class='MuiSvgIcon-root MuiSvgIcon-fontSizeInherit css-1cw4hi4'] path").as('deleteIcons');
    //cy.pause();
    cy.get('@deleteIcons').should('be.visible').each(($ele,index)=>{
        
        cy.wrap($ele).as("btn");
        cy.get('@btn').click({force:true});
            accessManagement.userDeleteMsg.should('contain','Deleted User Successfully')
        
    })

})


})