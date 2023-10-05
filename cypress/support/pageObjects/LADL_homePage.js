class HomePage{

get applicationName(){
    return cy.get("h6[class='MuiTypography-root MuiTypography-h6 MuiTypography-noWrap css-11shd7s']");
}

get allProjectText(){
    return cy.get("h1[class*='css-70v092']");
}

get projectGridColumns(){
    return cy.get("tr[class='MuiTableRow-root MuiTableRow-head css-1983giy'] th")
}

get noDataAvailableText(){
    return cy.get("h3[class='MuiTypography-root MuiTypography-h3 css-1nh8lee']");
}

get createProjectBtn(){
    return cy.get("span[class='MuiTouchRipple-root css-w0pj6f']");
}


get createProjectBtnText(){
    return cy.get("span[class='MuiTouchRipple-root css-w0pj6f']").parent();
}

get loggedInUserId(){
    return cy.get("div[class='MuiBox-root css-130f8nx']")
}


get createProjectBtnInGrid(){
    return cy.get("div[class='MuiBox-root css-71tqxi'] span[class='MuiTouchRipple-root css-w0pj6f']")
}

get homeBtn(){
    return cy.get("button[class*='css-fpvl4g']")
}

}

const homePage=new HomePage();
export default homePage;