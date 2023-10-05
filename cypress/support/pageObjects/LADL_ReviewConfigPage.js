class ReviewPage{

    get reviewPageLabel(){
        return cy.get("p[class*='css-6xfw4x']")
    }

    get labelledDataFieldsInReviewConfig(){
        return cy.get("div[class='MuiBox-root css-druo4k'] ul[class*='css-1ontqvh'] li span[class='MuiTypography-root MuiTypography-body1 MuiListItemText-primary css-apm55m']");
    }

    get unlabelledDataFieldsInReviewConfig(){
        return cy.get("div[class='MuiBox-root css-omukb7'] li span[class='MuiTypography-root MuiTypography-body1 MuiListItemText-primary css-apm55m']")
    }

    get dataColumnInReviewConfig(){
        return cy.get("div[class='MuiBox-root css-druo4k'] ul[class='MuiList-root MuiList-padding css-1ontqvh'] li:nth-child(1) span[class*='css-9iedg7']");
    }

    get labelledColomnInReviewConfig(){
        return cy.get("div[class='MuiBox-root css-druo4k'] ul[class='MuiList-root MuiList-padding css-1ontqvh'] li:nth-child(3) span[class*='css-9iedg7']");
    }

    get labelledDataDelimiter(){
        return cy.get("div[class='MuiBox-root css-druo4k'] ul[class='MuiList-root MuiList-padding css-1ontqvh'] li:nth-child(5) span[class*='css-9iedg7']");
    }

    get unlabelledDataOptionsInReviewConfig(){
            return cy.get("div[class='MuiBox-root css-omukb7'] li:nth-child(1) span[class*='css-9iedg7']");
    }

    get preprocessorOptionsInReviewConfig(){
        return cy.get("div[class='MuiBox-root css-omukb7'] li:nth-child(3) span[class*='css-9iedg7']");
    }

    get unlabelledDataDelimiter(){
        return cy.get("div[class='MuiBox-root css-omukb7'] li:nth-child(5) span[class*='css-9iedg7']");
    }

    get thresholdValueInReviewConfig(){
        return cy.get("div[class='MuiBox-root css-omukb7'] li:nth-child(7) span[class*='css-9iedg7']");
    }
}

const reviewPage= new ReviewPage();
export default reviewPage;