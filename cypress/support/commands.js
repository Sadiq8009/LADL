// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Create project to navigate to the Access Management screen
import createProject from "./pageObjects/LADL_createProjectPage";
import accessManagement from "./pageObjects/LADL_AccMgtPage";
import homePage from "./pageObjects/LADL_homePage";
import labelData from "./pageObjects/LADL_LabelledDataSectionPage";
import unlabel from "./pageObjects/LADL-UnlabelledDataSectionPage";

Cypress.Commands.add("CreateProject",function(projecName){
    //homePage.createProjectBtnInGrid.click({force:true});
    createProject.projectInputField
    .type(projecName)
    .should("have.value", projecName);
    createProject.saveBtn.should('not.have.class','Mui-disabled').should("be.enabled").click({force:true}); 
    createProject.successMessage.should('contain',' SuccessProject Created Successfully!')
})


//Iterate through the entered user in access management and select user
Cypress.Commands.add("Select_User",function(name,userName){
    accessManagement.searchField.type(name)
    cy.wait(1000)
    //accessManagement.matchUserList.contains(userName).click({force:true});
    cy.get("li[class='MuiListItem-root MuiListItem-gutters css-qn008e'] div").contains(userName).click({force:true});
    accessManagement.addUserBtn.click({force:true})
    cy.wait(2000)
    accessManagement.userAddedSuccessMsg.should("have.text","Success")
})

Cypress.Commands.add("SelectProject",function(projectName){
    selectProject(projectName);
})

Cypress.Commands.add("FindProject",function(projectName,role){
    findProject(projectName,role);
})

function selectProject(value){
    
    let found=false;
    cy.get("tr[class='MuiTableRow-root css-eo5kcp'] td:nth-child(2)",{timeout:10000}).each(($ele,index,list)=>{
        if($ele.text()===value){
            let project=$ele.text();
            expect(project).to.eq(value)
            cy.wrap($ele).next().next().then((str)=>{
                let projectCreatorRole=str.text();
                expect(projectCreatorRole).to.eq("Admin")
            }) 
            cy.wrap($ele).click();
            found=true;
            return false;
        }
     })
    .then(()=>{
        if(!found){
            cy.get("div[class='MuiBox-root css-1zye22'] button:nth-child(3) svg[class='MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv']").click({force:true})
            selectProject(value);
        }
    })
}

//Verify the project in the grid
function findProject(value,role){
    
    let found=false;
    cy.get("tr[class='MuiTableRow-root css-eo5kcp'] td:nth-child(2)",{timeout:10000}).each(($ele,index,list)=>{
        if($ele.text()===value){
            let project=$ele.text();
            expect(project).to.eq(value)
            cy.wrap($ele).next().next().then((str)=>{
                let projectCreatorRole=str.text();
                expect(projectCreatorRole).to.eq(role)
            }) 
            found=true;
            return false;
        }
     })
    .then(()=>{
        if(!found){
            cy.get("div[class='MuiBox-root css-1zye22'] button:nth-child(3) svg[class='MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv']").click({force:true})
            findProject(value,role);
        }
    })
}

//labelled File upload validation 
Cypress.Commands.add("InvalidTypeFile",function(filename){
    labelData.fileDeleteIcon.if('visible').then(()=>{
        labelData.fileDeleteIcon.click({force:true})
       // labelData.uploadFileBox.attachFile(filename,{subjectType:"drag-n-drop"});
    })
    cy.wait(2000)
       cy.get("div[class='MuiBox-root css-1fqx4y1'] div:nth-child(2) p span").if('visible').then(()=>{
        cy.get("div[class='MuiBox-root css-1fqx4y1'] div:nth-child(2) p span").attachFile(filename,{subjectType:"drag-n-drop"});
       })    
       labelData.labelledDataErrorMsg.should('contain','Only CSV files are supprorted');
    })
    
    //Unlabelled file upload
    Cypress.Commands.add("InvalidUnlabelledFileType",function(filename){
      unlabel.getDeleteFileIcon().if('visible').then(()=>{
          unlabel.getDeleteFileIcon().click({force:true})
         // labelData.uploadFileBox.attachFile(filename,{subjectType:"drag-n-drop"});
      })
      cy.wait(2000)
         cy.get("div[class='MuiBox-root css-1fqx4y1'] div:nth-child(2) p span").if('visible').then(()=>{
          cy.get("div[class='MuiBox-root css-1fqx4y1'] div:nth-child(2) p span").attachFile(filename,{subjectType:"drag-n-drop"});
         })    
         unlabel.getUnabelledDataErrorMsg().should('contain','Only CSV files are supprorted');
      })

        

// select file to proceed
Cypress.Commands.add("SelectFileToProceed",function(Filename,fileName){
    labelData.fileDeleteIcon.if('visible').then(()=>{
        labelData.fileDeleteIcon.click({force:true})
    })
       labelData.uploadBoxText.if('visible').then(()=>{
        labelData.uploadBoxText.attachFile(Filename,{subjectType:"drag-n-drop"});
        labelData.selectedFileName.should('contain',fileName)
       })
})

//Upload labelled csv file
Cypress.Commands.add("Upload_Labelled_CSV",function(attachFile,validateFileName,checkDataLabel,labelColumn){
    let expectColumns = [];
    labelData.labelledDataTitle.should("have.text", "Labelled data upload");
    labelData.uploadFileBox.attachFile(attachFile, {
      subjectType: "drag-n-drop",
    });
    labelData.selectedFileName.should("contain", validateFileName);
    labelData.proceedBtn.click({ force: true });
    labelData.dataColumnsNames
      .each(($ele, index, list) => {
        let columnName = $ele.text();
        expectColumns.push(columnName);
      })
      .then(() => {
        cy.task('readCsv',attachFile).then((result)=>{
          expect(result[0]).to.deep.eq(expectColumns);
      })
      });

    labelData.dataLabelsCheckBox
      .check(checkDataLabel)
      .should("be.checked");
    labelData.selectLabelledColumnDIv.click();
    labelData.optionFromLabelledColumn.contains(labelColumn).click();
    cy.get("input[class='MuiSelect-nativeInput css-1k3x8v3']").should(
      "have.value",
      labelColumn
    );
    labelData.labelledUploadBtn.click();
    labelData.lablleduploadConfirmBtn.click();
    labelData.labeledDataUploadSuccessMsg.should("be.visible", {
      timeout: 5000,
    });
    labelData.labeledDataUploadSuccessMsg.should("contain", "Success");
    labelData.nextBtn.click();
})

//upload unlabelled csv file
Cypress.Commands.add("Upload_Unlabelled_CSV",function(attacheFile,validateAttachedFile,checkDataLabel,thresholdValue,uncheckPreprocessor,checkPreprocessor){
    let expectedColumnsUnlabel = [];
    unlabel.getUnlablledTitle().should("have.text", "Unlabelled data upload");
    unlabel
      .getDocUploadBox()
      .attachFile(attacheFile, { subjectType: "drag-n-drop" });
    unlabel.getFileName().should("contain", validateAttachedFile);
    unlabel.getProceedBtn().click();
    unlabel
      .getDataColumnNames()
      .each(($ele, index, list) => {
        let dataColumns = $ele.text();
        expectedColumnsUnlabel.push(dataColumns);
      })
      .then(() => {
        cy.task('readCsv',attacheFile).then((result)=>{
          expect(result[0]).to.deep.eq(expectedColumnsUnlabel);
      })
      });

    unlabel
      .getDataColumnCheckBox()
      .check(checkDataLabel)
      .should("be.checked");
    // unlabel
    //   .getSliderBar()
    //   .invoke("attr", "style", "left: 0%; width: 62%;")
    //   .trigger("change");
    // unlabel
    //   .getSliderThumb()
    //   .invoke("attr", "style", "left: 62%;")
    //   .trigger("change");
    // cy.get("span[class*='css-ov3vxh'] input")
    //   .invoke("val", "62")
    //   .trigger("change", { force: true });
    // cy.get("span[class='MuiSlider-valueLabelCircle'] span")
    //   .click({ force: true })
    //   .should("have.text", thresholdValue);


      unlabel
      .getSliderBar()
      .invoke("attr", "style", "left: 0%; width: 62%;")
      .trigger("change");
    unlabel
      .getSliderThumb()
      .invoke("attr", "style", "left: 62%;")
      .trigger("change");
    cy.get("span[class*='css-ov3vxh'] input")
      .invoke("val", "62")
      .trigger("change", { force: true }).click({force:true});
    cy.get("span[class='MuiSlider-valueLabelCircle'] span")
      .click({ force: true })
      .should("have.text", thresholdValue);

    //unlabel.getPreprocessorfield().check(["social_text","stem_terms"]).should("be.checked");
    unlabel.getPreprocessorOptions().uncheck(uncheckPreprocessor).should('not.be.checked');
    unlabel
      .getPreprocessorOptions()
      .check(checkPreprocessor)
      .should("be.checked");
    unlabel.getUploadBtn().trigger("click");
    unlabel.getUpldConfirmBtn().click();
    cy.wait(3000);
    unlabel.getUploadConfirmMessage().should("contain", "Success");
    cy.wait(3000);
    cy.contains("Next").should("be.visible").click({ force: true });
})