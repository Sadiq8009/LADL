class LabelledData{
    
    get labelledDataTitle(){
        return cy.get("div[class='MuiPaper-root MuiPaper-outlined MuiPaper-rounded mt-5 css-1cy6rd'] p[class*='css-6xfw4x']");
    }

    get uploadFileBox(){
        return cy.get("div[class='MuiBox-root css-1fqx4y1'] div:nth-child(2)");
    }

    get selectedFileName(){
        return cy.get("p[class='text-slate-500']")
    }

    get proceedBtn(){
        return cy.get("div[class='MuiBox-root css-n4rzf0']").contains("Proceed")
    }


    get dataColumnsNames(){
        return cy.get("span[class='MuiTypography-root MuiTypography-body1 MuiFormControlLabel-label css-9l3uo3']");
    }

    get dataLabelsCheckBox(){
        return cy.get("div[class='MuiFormGroup-root css-1h7anqn'] ul label span:nth-child(1) input");
    }

    get selectLabelledColumnDIv(){
        return cy.get("div[class*='css-lf2l8a']")
    }
    get delimiter(){
        return cy.get("#delimiter")
    }

    get uploadBoxText(){
        return cy.get("div[class='MuiBox-root css-1fqx4y1'] div:nth-child(2) p")
    }

    get optionFromLabelledColumn(){
        return cy.get("li[class*='css-16a6ot9']")
    }

    get labelledUploadBtn(){
        return cy.get("button[class*='css-b8esbo']")
    }

    get lablleduploadConfirmBtn(){
        return cy.get("button[class*='css-2zrf9a']");
    }

    get labeledDataUploadSuccessMsg(){
        return cy.get("div[class*='MuiAlert-message css-1xsto0d']")
    }
    get labelledDataErrorMsg(){
        return cy.get("div[class*='MuiAlert-message css-1xsto0d']")
    }
    get nextBtn(){
        return cy.get("button[class*='css-eqw5s4']").contains("Next")
    }

    get cancelBtn(){
        return cy.get("button[class*='css-vyc289']")
    }

    get fileDeleteIcon(){
        return cy.get("svg[class='MuiSvgIcon-root MuiSvgIcon-fontSizeSmall css-gf1rb6']")
    }
    get selectedLabelledOptionName(){
        return cy.get("#demo-simple-select")
    }
}

const labelData= new LabelledData();
export default labelData;
