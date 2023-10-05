import labelData from "../../../support/pageObjects/LADL_LabelledDataSectionPage";
import unlabel from "../../../support/pageObjects/LADL-UnlabelledDataSectionPage";

describe("Validate components of unlabelled data upload page",function(){
    let dataColumns=[];
    let preprocessors=[];
    beforeEach(function(){
        cy.fixture('example.json').as('data');
        cy.visit(Cypress.env("project_url"));
        cy.url().should('include','project/116');
        cy.wait(5000)
        cy.contains("Next").should('be.visible').click();
        labelData.labelledDataTitle.should('be.visible');
        cy.wait(3000)
        cy.contains("Next").should('be.visible').click();
        unlabel.getUnlablledTitle().should('be.visible')
    })

    it("Validate the text in the upload box in unlabelled data upload section",function(){
        unlabel.getUploadBoxText().should('contain','or drag and drop .csv file up to 6MB')
    })

    it("Validate the delimiter in the unlabelled data section",function(){
        unlabel.getDelimiter().should('have.value','comma')
    })

    it("Validate cancel and proceed btn before selecting file in the upload box",function(){
        unlabel.getCancelBtn().should('be.disabled');
        unlabel.getProceedBtn().should('be.disabled');
    })

    it("Validate document_upload and delimiter info",function(){
        unlabel.getDocumentUploadInfo().invoke("attr","aria-label").should('contain','Please select the data set file you wish to upload to act as the unlabelled data. Please note only .csv file types are currently accepted.')
        unlabel.getDelimiterInfo().invoke("attr","aria-label").should('contain','This is currently restricted to Comma as only .csv files are accepted at this time')
    })

    it("Validate back and next button before seleting the file in uploadbox",function(){
        unlabel.getBackBtn().should('be.enabled');
        unlabel.getNextBtn().should('be.disabled');
    })

    it("Validate the visibility of proceed button once the file is selected and its columns are listed",function(){
        unlabel.getDocUploadBox().attachFile(this.data.testCSV,{subjectType:"drag-n-drop"});
        unlabel.getFileName().should('contain',this.data.testCSV);
        unlabel.getProceedBtn().click();
        unlabel.getProceedBtn().should('be.disabled');
    })
    it("Validate columns listed in data column and selected file columns are matching",function(){
        unlabel.getDocUploadBox().attachFile(this.data.validCSV,{subjectType:"drag-n-drop"});
        unlabel.getFileName().should('contain',this.data.validCSV);
        unlabel.getProceedBtn().click();
        unlabel.getDataColumnNames().each(($ele)=>{
            let columns=$ele.text();
            dataColumns.push(columns);
        }).then(()=>{
            cy.task('readCsv',this.data.validCSV).then((result)=>{
            expect(result[0]).to.deep.eq(dataColumns);
            })
        })
    })

    it("Validate preprocessors options available in preprocessor section",function(){
        unlabel.getDocUploadBox().attachFile(this.data.validCSV,{subjectType:"drag-n-drop"});
        unlabel.getFileName().should('contain',this.data.validCSV);
        unlabel.getProceedBtn().click();
        unlabel.getPreprocessorNames().each(($ele)=>{
            let processor=$ele.text();
            preprocessors.push(processor);
        }).then(()=>{
            expect(this.data.preprocessors).to.be.deep.eq(preprocessors)
        })
    })

   it("Validate user able to set the threshold limit",function(){
    unlabel.getDocUploadBox().attachFile(this.data.validCSV,{subjectType:"drag-n-drop"});
    unlabel.getFileName().should('contain',this.data.validCSV);
    unlabel.getProceedBtn().click();
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
   })

   it("Validate the alert raised when user submits the upload with no options checked in data column",function(){
    unlabel.getDocUploadBox().attachFile(this.data.validCSV,{subjectType:"drag-n-drop"});
    unlabel.getFileName().should('contain',this.data.validCSV);
    unlabel.getProceedBtn().click();
    cy.on("window:alert",function(str){
        expect(str).eq("Please select Data Columns")
    })
    unlabel.getUploadBtn().click();
   })

   it("Validate the alert raised when user submits the upload with no preprocessor options checked",function(){
    unlabel.getDocUploadBox().attachFile(this.data.validCSV,{subjectType:"drag-n-drop"});
    unlabel.getFileName().should('contain',this.data.validCSV);
    unlabel.getProceedBtn().click();
    unlabel.getDataColumnCheckBox().check(this.data.checkedColumn).should('be.be.checked');
    unlabel.getPreprocessorOptions().uncheck(this.data.uncheckPreprocessor).should('not.be.checked');
    cy.on("window:alert",function(str){
        expect(str).eq("Please select atleast one preprocessor")
    })
    unlabel.getUploadBtn().click();
   })

   it("Validate user able to multi select data column options",function(){
    unlabel.getDocUploadBox().attachFile(this.data.validCSV,{subjectType:"drag-n-drop"});
    unlabel.getFileName().should('contain',this.data.validCSV);
    unlabel.getProceedBtn().click();
    unlabel.getDataColumnCheckBox().check(this.data.checkedColumn).should('be.be.checked');
   })

   it("Validate error raised for uploading file exceeding 6MB",function(){
        unlabel.getDeleteFileIcon().if('visible').then(()=>{
            unlabel.getDeleteFileIcon().click({force:true})
        })
        this.data.inalidFilesize.forEach((fileName)=>{
            unlabel.getUploadBoxText().if('visible').then(()=>{
                unlabel.getDocUploadBox().attachFile(fileName,{subjectType:"drag-n-drop"});
                cy.wait(2000)
                unlabel.getUnabelledDataErrorMsg().if('visible').then(()=>{
                    unlabel.getUnabelledDataErrorMsg().should('contain','File size cannot exceed 6MB limit') 
                })
                unlabel.getFileName().if('visible').then(()=>{
                    unlabel.getFileName().should('contain',fileName);
                })
            
        })
   })
})

it("Validate error message raised when invalid file types are selected",{tags:"@regression"},function(){
    this.data.invalidTypeFiles.forEach((fileType)=>{
        cy.InvalidUnlabelledFileType(fileType)
    })
})
});