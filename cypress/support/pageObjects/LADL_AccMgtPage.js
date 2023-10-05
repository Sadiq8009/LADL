class AccessManagement{


get accessManagementPageLabel(){
    return cy.get("div[class='MuiBox-root css-wgxglg']").prev();
}

get labelledDataMgtSection(){
    return cy.get("span[class='MuiStepLabel-label Mui-disabled css-2fdkz6']");
}

get unlabelledDataMgtSection(){
    return cy.get("span[class='MuiStepLabel-label Mui-disabled css-2fdkz6']");
}

get searchField(){
    return cy.get("div[class='MuiFormControl-root MuiTextField-root css-1mokeyk'] input[class*='MuiInputBase-input']");
}

get matchUserList(){
    return cy.get("li[class='MuiListItem-root MuiListItem-gutters css-qn008e'] div");
}

get UserInGrid(){
    return cy.get("tr[class='MuiTableRow-root css-eo5kcp'] td:nth-child(2)");
}

get usersRole(){
    return cy.get("tr[class='MuiTableRow-root css-eo5kcp'] td:nth-child(2)").next();
}

get addUserBtn(){
    return cy.get("div[class='MuiBox-root css-h5i085'] button")
}

get userAddedSuccessMsg(){
    return cy.get("div[class='MuiAlert-message css-1xsto0d'] div")
}

get userDeleteMsg(){
    return cy.get("div[class='MuiAlert-message css-1xsto0d']")
}

get deleteUserIcon(){
    return cy.get("svg[class='MuiSvgIcon-root MuiSvgIcon-fontSizeInherit css-1cw4hi4'] path")
}

get homePageIcon(){
    return cy.get("div[class='MuiBox-root css-111wug5'] svg[class*='css-fvlhhb']")
}
}

const accessManagement= new AccessManagement();
export default accessManagement;