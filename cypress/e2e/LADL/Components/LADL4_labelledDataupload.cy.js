
import labelData from "../../../support/pageObjects/LADL_LabelledDataSectionPage";


describe("Validate the fields and components of labelled data 1st section",function(){



    beforeEach(function(){
        cy.fixture('example.json').as('data');
        cy.visit(Cypress.env("project_url"));
        cy.url().should('include','project/116');
        cy.wait(2000)
        cy.contains("Next").should('be.visible').click();
        labelData.labelledDataTitle.should('be.visible');
    })

    it("Validate is_user able to select valid csv file",{tags:"@regression"},function(){
           cy.SelectFileToProceed(this.data.validCSV,this.data.validCSV)
           labelData.proceedBtn.click(); 
      
    });

    it("Validate alert message raised when invalid csv file selected",{tags:"@regression"},function(){
            cy.SelectFileToProceed(this.data.invalidCSV,this.data.invalidCSV)
            labelData.proceedBtn.click();
            cy.on("window:alert",function(str){
            expect(str).eq("Invalid column names - Column names can only contain alphanumeric characters, underscores and hyphens")
                })
            
        
    });
    

    it("Validate error message raised when invalid file types are selected",{tags:"@regression"},function(){
        this.data.invalidTypeFiles.forEach((fileType)=>{
            cy.InvalidTypeFile(fileType)
        })
    })

    it("Validate cancel and proceed buttons are disabled before selecting file in labelled upload box",()=>{
            labelData.fileDeleteIcon.if('visible').then(()=>{
            labelData.fileDeleteIcon.click({force:true})
            });
            labelData.uploadBoxText.if('visible').then(()=>{
                labelData.cancelBtn.should('be.disabled')
                labelData.proceedBtn.should('be.disabled')
             })    

    });

    it("Validate cancel and proceed buttons are enabled afore selecting file in labelled upload box",function(){
        labelData.fileDeleteIcon.if('visible').then(()=>{
            labelData.fileDeleteIcon.click({force:true})
            });
            labelData.uploadBoxText.if('visible').then(()=>{
            labelData.uploadBoxText.attachFile(this.data.validCSV,{subjectType:"drag-n-drop"});
            labelData.selectedFileName.should('contain',this.data.validCSV)
                labelData.cancelBtn.should('be.enabled');
                labelData.proceedBtn.should('be.enabled');  
             })     
    })

    it("Validate the delimiter is comma",function(){
        labelData.delimiter.should('have.value','comma') 
    })

    it("Validate text in the document upload box",function(){
        labelData.fileDeleteIcon.if('visible').then(()=>{
            labelData.fileDeleteIcon.click({force:true})
            });
            labelData.uploadBoxText.if('visible').then(()=>{
                labelData.uploadBoxText.should('contain','Click to select files or drag and drop .csv file up to 6MB')
            })    
    });

    it("Validate error raised for uploading file exceeding 6MB",{tags:"@regression"},function(){
        labelData.fileDeleteIcon.if('visible').then(()=>{
            labelData.fileDeleteIcon.click({force:true})
            }); 
            this.data.inalidFilesize.forEach((fileName)=>{
                labelData.uploadBoxText.if('visible').then(()=>{
                    labelData.uploadBoxText.attachFile(fileName,{subjectType:"drag-n-drop"});
                    cy.wait(2000)
                    labelData.labelledDataErrorMsg.if('visible').then(()=>{
                        labelData.labelledDataErrorMsg.should('contain','File size cannot exceed 6MB limit') 
                    })
                    labelData.selectedFileName.if('visible').then(()=>{
                        labelData.selectedFileName.should('contain',fileName);
                    })
                
            })

    })
})
})

describe("Validate the fields and components of labelled data 2nd section",function(){

    let retrivedDataColumnNames=[];
    let labelledDataOptions=[];
    beforeEach(function(){
        cy.fixture('example.json').as('data');
        cy.visit(Cypress.env("project_url"));
        cy.url().should('include','project/116');
        cy.wait(3000)
        cy.contains("Next").should('be.visible').click();
        labelData.labelledDataTitle.should('be.visible');
    })

    it("Validate is_user able to select valid csv file",function(){

        cy.SelectFileToProceed(this.data.validCSV,this.data.validCSV)
            labelData.proceedBtn.click();   
      
    });

    it("Validate proceed and cancel button visibility post selecting the file",function(){

            cy.SelectFileToProceed(this.data.validCSV,this.data.validCSV)
            labelData.proceedBtn.click();
            labelData.proceedBtn.should('be.disabled');
            labelData.cancelBtn.should('be.enabled').click().then(()=>{
                labelData.uploadBoxText.should('be.visible');
            })
              
    });

    it("Validate the column names present in csv file and select data columns matching",{tags:"@regression"},function(){
            cy.SelectFileToProceed(this.data.testCSV,this.data.testCSV)
            labelData.proceedBtn.click();
            labelData.dataColumnsNames.each(($ele)=>{
             let columnNames=$ele.text();
                retrivedDataColumnNames.push(columnNames);
            }).then(()=>{
                cy.task('readCsv',this.data.testCSV).then((result)=>{
                    expect(result[0]).to.deep.eq(retrivedDataColumnNames);
                })
            })
            
           

    })
          


    it("Validate multiple options can be checked in select data column section",function(){
            cy.SelectFileToProceed(this.data.validCSV,this.data.validCSV)
            labelData.proceedBtn.click(); 
           labelData.dataLabelsCheckBox.check(this.data.actualColumns).should('be.checked');
    })

    it("Validate user selects the option from select labelled data section",function(){
             cy.SelectFileToProceed(this.data.validCSV,this.data.validCSV)
            labelData.proceedBtn.click(); 
            labelData.selectLabelledColumnDIv.click();
            labelData.optionFromLabelledColumn.contains(this.data.labelledOption).click();
            labelData.selectedLabelledOptionName.should('have.text',this.data.labelledOption)
    })

    it("Validate alert raised when none of the options select from data column",{tags:"@regression"},function(){
        cy.SelectFileToProceed(this.data.validCSV,this.data.validCSV)
        labelData.proceedBtn.click(); 
        
        cy.on("uncaught:exception",(err,runnable)=>{
            return false;
        })
        cy.on("window:alert",function(alertText){
        expect(alertText).to.be.eq("Please select Data Columns")
        }) 
        labelData.labelledUploadBtn.click();
    })

    it("Validate alert raised when none of the options select from labelled data column",{tags:"@regression"},function(){
        cy.SelectFileToProceed(this.data.validCSV,this.data.validCSV)
        labelData.proceedBtn.click();
        labelData.dataLabelsCheckBox.check(this.data.actualColumns).should('be.checked');
        labelData.labelledUploadBtn.click();
        cy.on("uncaught:exception",(err,runnable)=>{
            return false;
        })
        cy.on("window:alert",function(alertText){
        expect(alertText).to.be.eq("Please select labelled column")
        })
    })

    it("Validate labelled section fields are disabled post uploading file",{tags:"@regression"},function(){
        cy.SelectFileToProceed(this.data.validCSV,this.data.validCSV);
        labelData.proceedBtn.click(); 
        labelData.dataLabelsCheckBox.check(this.data.actualColumns).should('be.checked');
        labelData.selectLabelledColumnDIv.click();
        labelData.optionFromLabelledColumn.contains(this.data.labelledOption).click();
        labelData.labelledUploadBtn.click();  
        labelData.lablleduploadConfirmBtn.click();
        labelData.cancelBtn.should('be.disabled');
        labelData.delimiter.should('be.disabled');
        labelData.dataLabelsCheckBox.should('be.disabled');
        labelData.labelledUploadBtn.should('be.disabled');
        cy.get("div[class*='css-lf2l8a']").should('have.class','Mui-disabled');
        labelData.labelledUploadBtn.should('be.disabled');
     })
      
 });

 describe("Validate the column names",function(){
    let retrivedDataColumnNames=[];
    let labelledDataOptions=[];
    beforeEach(function(){
        cy.fixture('example.json').as('data');
        cy.visit(Cypress.env("project_url"));
        cy.url().should('include','project/116');
        cy.wait(3000)
        cy.contains("Next").should('be.visible').click();
        labelData.labelledDataTitle.should('be.visible');
    })
    it("Validate column names from select_data_column section matching with labelled column section",{tags:"@regression"},function(){
        this.data.validFiles.forEach((file)=>{
            cy.SelectFileToProceed(file,file)
                labelData.proceedBtn.click();
                labelData.dataColumnsNames.each(($ele)=>{
                 let columnNames=$ele.text();
                    retrivedDataColumnNames.push(columnNames);
                }).then(()=>{
                    labelData.selectLabelledColumnDIv.click();
                    labelData.optionFromLabelledColumn.each(($ele)=>{
                        let lebelledOption=$ele.text();
                        labelledDataOptions.push(lebelledOption)
                    }).then(()=>{
                        expect(retrivedDataColumnNames).to.be.deep.eq(labelledDataOptions);
                    })
                })
        })
    })
 })

 
