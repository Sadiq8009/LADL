
import homePage from "../../../support/pageObjects/LADL_homePage";
const randomProject = Math.random().toString(36).substring(7);

describe("Upload data set", function () {
  beforeEach(function () {
    cy.fixture("example").as("data");
    cy.visit("https://qa.datalabeler.lilly.com/");
    cy.wait(3000)
    homePage.createProjectBtnInGrid.should("be.visible").click({ force: true });
    //validate the landing page
    cy.url().should("include", "project/create");
    cy.CreateProject(randomProject);
    cy.wait(4000);
    cy.contains("Next").should("be.visible").click({ force: true });
  });

  it("Upload the csv file in the labelled and unlabelled data management page", function () {

     //Upload Labelled csv
     cy.Upload_Labelled_CSV(this.data.validCSV,this.data.validCSV,this.data.checkedColumn,this.data.labelledColumn);
      
     //unlabelled data upload
     cy.Upload_Unlabelled_CSV(this.data.validCSV,this.data.validCSV,this.data.actualColumns,this.data.thresholdValue,this.data.uncheckPreprocessor,
     this.data.checkPreprocessor);

  });
});
