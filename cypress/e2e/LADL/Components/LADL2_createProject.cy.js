import homePage from "../../../support/pageObjects/LADL_homePage";
import createProject from "../../../support/pageObjects/LADL_createProjectPage";
import accessManagement from "../../../support/pageObjects/LADL_AccMgtPage";

describe("Validate the components of Create Project page", function () {
  const randomProjectName = Math.random().toString(36).substring(5);
  Cypress.env("randomProjectName",randomProjectName);
  beforeEach(function () {
    cy.visit("/" + Cypress.env("create_project_url"));
    cy.url().should("include", "project/create");
    
  });

  it("Validate label of the input field section", function () {
    createProject.labelOfCreateProjectSection.should("have.text", "Create Project");
  });

  it("Validate the user_entered_text properly display in the input field",{tags:'@regression'}, function () {
    createProject.inputTextField
      .type(randomProjectName)
      .should("have.value", randomProjectName);
  });

  it("Validate cancle button navigates back to the homepage of LADL",function(){
    createProject.cancelBtn.click({force: true});
    homePage.createProjectBtn.should("be.visible");
});

it("Validate save button is disabled for blank input field",{tags:'@regression'},function(){
    createProject.saveBtn.should('have.class','Mui-disabled').should("be.disabled");
})

it("Validate save button is enabled upon text is entered in create project input field",{tags:'@regression'},function(){
    createProject.inputTextField
      .type(randomProjectName)
      .should("have.value", randomProjectName);
      createProject.saveBtn.should('not.have.class','Mui-disabled').should("be.enabled");
})

it("Validate success message upon creation of new project",{tags:'@regression'},function(){
    createProject.inputTextField
    .type(randomProjectName)
    .should("have.value", randomProjectName);
    createProject.saveBtn.should('not.have.class','Mui-disabled').should("be.enabled").click({force:true}); 
    cy.wait(4000)
    createProject.successMessage.should('contain','Project Created Successfully!');
    accessManagement.accessManagementPageLabel.should('have.text',randomProjectName+'Access Management')
});

it("Validate error raised when duplicate project is created",{tags:'@regression'},function(){
  let projectName = Math.random().toString(36).substring(5);
  createProject.inputTextField
    .type(projectName)
    .should("have.value", projectName);
    createProject.saveBtn.should('not.have.class','Mui-disabled').should("be.enabled").click({force:true}); 
    cy.wait(4000)
    createProject.successMessage.should('contain','Project Created Successfully!')
    homePage.homeBtn.click();
    cy.FindProject(projectName,"Admin")
    cy.get("button[class*='css-1p12xxq']").click();
    cy.get("input[class*='css-1x5jdmq']")
    .type(projectName)
    .should("have.value", projectName);
    createProject.saveBtn.should('not.have.class','Mui-disabled').should("be.enabled").click({force:true});
    createProject.errorToastMessag.should('contain','Project Name already exists')
})
});

