class UnlabelledData {

    constructor(){
        this.unlabelledTitle="p[class*='css-128e1ie']";
        this.delimiter="#delimiter"
        this.uploadBox="p[class='MuiTypography-root MuiTypography-body1 css-13gt4hn']"
        this.selectedFileName="p[class='text-slate-500']";
        this.cancelBtn="button[class*='css-vyc289']"
        this.ProceedBtn="button[class*='css-1hkrohu']";
        this.backBtn="button[class*='css-eqw5s4']:nth-child(1)"
        this.nextBtn="button[class*='css-eqw5s4']:nth-child(3)"
        this.documentUploadInfo="p[class*='css-1wzou4d'] svg[class*='css-a8fky']"
        this.delimiterInfo="p[class*='css-13gt4hn'] svg[class*='css-a8fky']"
        this.dataColumnsNames="div[class='MuiFormGroup-root css-1h7anqn'] span[class='MuiTypography-root MuiTypography-body1 MuiFormControlLabel-label css-9l3uo3']";
        this.dataColumnCheckBoxes="div[class='MuiFormGroup-root css-1h7anqn'] ul label span:nth-child(1) input"
        this.sliderBar="span[class='MuiSlider-track css-1t2bqnt']"
        this.sliderThumb="span[class*='css-ov3vxh']"
        this.preprocessor="div[class='MuiBox-root css-126n10b'] button"
        this.preprocessorOptions="div[class='MuiBox-root css-126n10b'] ul:nth-child(6) input"
        this.selectdPreprocessor="div[id='demo-simple-select']"
        this.uploadBtn="button[class*='css-b8esbo']"
        this.uplConfrmBtn="button[class*='css-2zrf9a']"
        this.uploadMessage="div[class='MuiAlert-message css-1xsto0d']",
        this.preprocessorNames="ul[class='MuiList-root MuiList-padding css-1ontqvh']:nth-child(6) span[class*='css-9l3uo3']"
        this.deleteIcon="svg[class*='css-gf1rb6']",
        this.fileExceedErrorMsg="div[class*='MuiAlert-message css-1xsto0d']"
    }


    getUnlablledTitle(){
        return cy.get(this.unlabelledTitle);
    }

    getUploadBoxText(){
        return cy.get("div[class='MuiBox-root css-1fqx4y1'] div p")
    }

    getDelimiter(){
        return cy.get(this.delimiter);
    }

    getCancelBtn(){
        return cy.get(this.cancelBtn);
    }

    getDocumentUploadInfo(){
        return cy.get(this.documentUploadInfo)
    }

    getNextBtn(){
        return cy.get(this.nextBtn);
    }

    getBackBtn(){
        return cy.get(this.backBtn)
    }
    getDelimiterInfo(){
        return cy.get(this.delimiterInfo)
    }

    getDocUploadBox(){
        return cy.get(this.uploadBox).prev();
    }

    getFileName(){
        return cy.get(this.selectedFileName);
    }

    getProceedBtn(){
        return cy.get(this.ProceedBtn)
    }

    getDataColumnNames(){
        return cy.get(this.dataColumnsNames)
    }

    getDataColumnCheckBox(){
        return cy.get(this.dataColumnCheckBoxes)
    }

    getSliderBar(){
        return cy.get(this.sliderBar)
    }

    getSliderThumb(){
        return cy.get(this.sliderThumb)
    }

    getPreprocessorfield(){
        return cy.get(this.preprocessor)
    }

    getPreprocessorOptions(){
        return cy.get(this.preprocessorOptions)
    }

    getPreprocessorNames(){
        return cy.get(this.preprocessorNames)
    }

    getSelectedPreprocessor(){
        return cy.get(this.selectdPreprocessor)
    }

    getUploadBtn(){
        return cy.get(this.uploadBtn)
    }

    getUpldConfirmBtn(){
        return cy.get(this.uplConfrmBtn)
    }

    getUploadConfirmMessage(){
        return cy.get(this.uploadMessage)
    }

    getDeleteFileIcon(){
        return cy.get(this.deleteIcon)
    }

    getUnabelledDataErrorMsg(){
        return cy.get(this.fileExceedErrorMsg)
    }
}
const unlabel= new UnlabelledData();
export default unlabel;