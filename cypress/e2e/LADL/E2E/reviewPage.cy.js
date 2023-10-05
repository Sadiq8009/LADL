
import homePage from "../../../support/pageObjects/LADL_homePage";
import reviewPage from "../../../support/pageObjects/LADL_ReviewConfigPage";
const randomProject = Math.random().toString(36).substring(7);

let labelColumnsOptionsInReviewPage=[];
let UnlabelColumnsOptionsInReviewPage=[];
let preprocessorsInReviewPage=[];
describe("Review configurations", function () {
  beforeEach(function () {
    cy.fixture("example").as("data");
    cy.visit("https://qa.datalabeler.lilly.com/");
    cy.wait(3000)
    homePage.createProjectBtnInGrid.should("be.visible").click({ force: true });
    //validate the landing page
    cy.url().should("include", "project/create");
    cy.CreateProject(randomProject);
    cy.wait(5000);
    cy.contains("Next").should("be.visible").click({ force: true });
  });

  it("Review the data selected in labelled and unlabelled data section", function () {
    //Upload Labelled csv
    cy.Upload_Labelled_CSV(this.data.validCSV,this.data.validCSV,this.data.checkedColumn,this.data.labelledColumn);

    //unlabelled data upload
    cy.Upload_Unlabelled_CSV(this.data.validCSV,this.data.validCSV,this.data.actualColumns,this.data.thresholdValue,this.data.uncheckPreprocessor,
    this.data.checkPreprocessor);

    //compare the data column options in review page with data columns seleted in labelled data section
    reviewPage.dataColumnInReviewConfig.each(($ele)=>{
    let extractedData=$ele.text();
    labelColumnsOptionsInReviewPage.push(extractedData);
   }).then(()=>{
    expect(labelColumnsOptionsInReviewPage).to.deep.eq(this.data.checkedColumn);
   });

   //compare labelled data column option in review page with catogory column seleted in labelled data section
   reviewPage.labelledColomnInReviewConfig.
   should('have.text',this.data.labelledOption)

   // compare the delimiter 
   reviewPage.labelledDataDelimiter
   .should('have.text',this.data.delimiter);

   //compare the unlabelled data column in review config page
   reviewPage.unlabelledDataOptionsInReviewConfig.each(($ele)=>{
    let extractedDatacolumn=$ele.text();
    UnlabelColumnsOptionsInReviewPage.push(extractedDatacolumn)
   }).then(()=>{
    expect(UnlabelColumnsOptionsInReviewPage).to.be.deep.eq(this.data.actualColumns);
   });

   //Compare the preprocessors seleted
   reviewPage.preprocessorOptionsInReviewConfig.each(($ele)=>{
    let extractedPreprocessor=$ele.text();
    preprocessorsInReviewPage.push(extractedPreprocessor)
   }).then(()=>{
    expect(preprocessorsInReviewPage).to.be.deep.eq(this.data.checkPreprocessor);
   });

   //Delimiter seleted
   reviewPage.unlabelledDataDelimiter.should('have.text',this.data.delimiter)

   //Threshold value selected
   reviewPage.thresholdValueInReviewConfig.should('contain',this.data.thresholdValue)
  });
});