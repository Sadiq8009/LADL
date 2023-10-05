

class CreateProject{


    get labelOfCreateProjectSection(){
        return cy.get(
            "h2[class='MuiTypography-root MuiTypography-h5 MuiTypography-gutterBottom css-1uoyjxc']"
          )
    }

    get inputTextField(){
        return cy.get("input[class*='css-1x5jdmq']");
    }

    get cancelBtn(){
        return cy.get("div[class='MuiBox-root css-1bvc4cc'] span[class='MuiTouchRipple-root css-w0pj6f']");
    }

    //disabled save btn cy.get("button[class*='Mui-disabled']")
    get saveBtn(){
        return cy.get("div[class='MuiBox-root css-1bvc4cc'] button[class*='MuiButton-contained']");
    }


    get successMessage(){
        return cy.get("div[class='MuiAlert-message css-1xsto0d']")
    }

    get errorToastMessag(){
        return cy.get("div[class='MuiAlert-message css-1xsto0d']")
    }

    get projectInputField(){
        return cy.get("input[class='MuiInputBase-input MuiOutlinedInput-input css-1x5jdmq']");
    }

}

const createProject = new CreateProject();
export default createProject;