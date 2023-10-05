import labelData from "../../../support/pageObjects/LADL_LabelledDataSectionPage";
import unlabel from "../../../support/pageObjects/LADL-UnlabelledDataSectionPage";
import homePage from "../../../support/pageObjects/LADL_homePage";
import reviewPage from "../../../support/pageObjects/LADL_ReviewConfigPage";
import createProject from "../../../support/pageObjects/LADL_createProjectPage";


describe("Validate the review configuration section", function () {
  let labelDataFileds = [];
  let unlabelDataFileds = [];
  beforeEach(function () {
    cy.fixture("example").as("data");
    cy.wait(4000)
    cy.visit("https://qa.datalabeler.lilly.com/", { timeout: 10000 });
    homePage.createProjectBtnInGrid.should("be.visible", { timeout: 10000 });
    cy.SelectProject("0wfu3l");
    cy.debug();
    cy.contains("Next").should("be.visible").click({ force: true });
    labelData.labelledDataTitle.should("have.text", "Labelled data upload");
    cy.contains("Next").should("be.visible");
    cy.wait(4000);
    cy.contains("Next").click({ force: true });
    unlabel.getUnlablledTitle().should("have.text", "Unlabelled data upload");
    cy.contains("Next").should("be.visible");
    cy.wait(2000);
    cy.contains("Next").click({ force: true });
    reviewPage.reviewPageLabel.should("have.text", "Review Configurations");
  });

  it("Validate the labelled data section fields within review page", function () {
    reviewPage.labelledDataFieldsInReviewConfig
      .each(($ele, index, list) => {
        let filedsName = $ele.text();
        labelDataFileds.push(filedsName);
      })
      .then(() => {
        expect(labelDataFileds).to.be.deep.eq(
          this.data.expecteddatalabelFileds
        );
      });
  });
  it("Validate the unlabelled data section fields in review page", function () {
    reviewPage.unlabelledDataFieldsInReviewConfig
      .each(($ele, index, list) => {
        let filedsName = $ele.text();
        unlabelDataFileds.push(filedsName);
      })
      .then(() => {
        expect(unlabelDataFileds).to.be.deep.eq(
          this.data.expectedUnlabelDataFileds
        );
      });
  });
  
});

describe.skip("Validate data in Review config page by creating new project and uploading data",function(){
  let randomProjectName= require("../Components/LADL1_projectGrid.cy")
  let SelectedLabelledData=[];
  let selectedUnlabelledData=[];
  let selectedPreprocessorData=[];
  beforeEach(function () {
    cy.fixture('example.json').as('data');
    cy.visit("/");
    
  });
  it("Validate selected labelled data in review config",function(){
    //create project
    homePage.createProjectBtnInGrid.click({force: true} );
    createProject.inputTextField
      .type(Cypress.env("randomProjectName"))
      .should("have.value", Cypress.env("randomProjectName"));
    createProject.saveBtn.should('not.have.class','Mui-disabled').should("be.enabled").click({force:true}); 
    cy.wait(2000)
    createProject.successMessage.should('contain','Project Created Successfully!')
    cy.wait(2000)
    cy.contains('Next').click();
    cy.SelectFileToProceed(this.data.testCSV,this.data.testCSV)
    labelData.proceedBtn.click(); 
    labelData.dataLabelsCheckBox.check(this.data.testingCSVDataColumsCheck).should('be.checked');
    labelData.selectLabelledColumnDIv.click();
    labelData.optionFromLabelledColumn.contains(this.data.testingCSVLabeledColumsCheck).click();
    labelData.selectedLabelledOptionName.should('have.text',this.data.testingCSVLabeledColumsCheck)
    labelData.labelledUploadBtn.click();  
    labelData.lablleduploadConfirmBtn.click();
    labelData.nextBtn.click();
    unlabel.getDocUploadBox().attachFile(this.data.validCSV,{subjectType:"drag-n-drop"});
    unlabel.getFileName().should('contain',this.data.validCSV);
    unlabel.getProceedBtn().click();
    unlabel.getDataColumnCheckBox().check(this.data.checkedColumn).should('be.be.checked');
    unlabel
      .getSliderBar()
      .invoke("attr", "style", "left: 0%; width: 2%;")
      .trigger("change");
    unlabel
      .getSliderThumb()
      .invoke("attr", "style", "left: 2%;")
      .trigger("change");
    cy.get("span[class*='css-ov3vxh'] input")
      .invoke("val", "2")
      .trigger("change", { force: true }).click({force:true});
    cy.get("span[class='MuiSlider-valueLabelCircle'] span")
      .click({ force: true })
      .should("have.text", 2);
      unlabel.getUploadBtn().click();
      unlabel.getUpldConfirmBtn().click();
      cy.wait(3000);
      unlabel.getUploadConfirmMessage().should("contain", "Success");
      cy.wait(3000);
      cy.contains("Next").should("be.visible").click({ force: true });

      reviewPage.dataColumnInReviewConfig
      .each(($ele, index, list) => {
        let dataValue = $ele.text();
        SelectedLabelledData.push(dataValue);
      })
      .then(() => {
        expect(SelectedLabelledData).to.be.deep.eq(
          this.data.testingCSVDataColumsCheck
        );
      });
      //cy.get(':nth-child(1) > .MuiBox-root > .MuiList-root > :nth-child(3) > .MuiListItemText-root > .MuiTypography-body2 > .MuiChip-root > .MuiChip-label').
      //should('contain',this.data.testingCSVDataColumsCheck);
     // reviewPage.labelledColomnInReviewConfig.should('have.text',this.data.testingCSVDataColumsCheck);
      reviewPage.labelledDataDelimiter.should('have.text','comma')

//Unlabelled section
      reviewPage.unlabelledDataOptionsInReviewConfig
      .each(($ele, index, list) => {
        let unlabelledData = $ele.text();
        selectedUnlabelledData.push(unlabelledData);
      })
      .then(() => {
        expect(selectedUnlabelledData).to.be.deep.eq(
          this.data.checkedColumn
        );
      });

      reviewPage.preprocessorOptionsInReviewConfig
      .each(($ele, index, list) => {
        let prepocessorData = $ele.text();
        selectedPreprocessorData.push(prepocessorData);
      })
      .then(() => {
        expect(selectedPreprocessorData).to.be.deep.eq(
          this.data.uncheckPreprocessor
        );
      });

      reviewPage.unlabelledDataDelimiter.should('have.text','comma')
      reviewPage.thresholdValueInReviewConfig.should('have.text','2%')
  })
})
