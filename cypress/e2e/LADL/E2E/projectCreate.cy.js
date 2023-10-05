import homePage from "../../../support/pageObjects/LADL_homePage";
import accessManagement from "../../../support/pageObjects/LADL_AccMgtPage";
const randomProject=Math.random().toString(36).substring(7);
describe("Create new Project",function(){
    beforeEach(function(){
        cy.visit("/");
        //cy.get("div[class='MuiBox-root css-71tqxi'] button").as("createProjectBtn")
        //cy.wait('@createProjectBtn').should("be.visible");
    })

    it("User create new project and validate created project in project grid",function(){
        Cypress.config('pageLoadTimeout:8000')
        homePage.createProjectBtnInGrid.should("be.visible").click({force:true});
        //validate the landing page
        cy.url().should('include','project/create');
        cy.CreateProject(randomProject);
        accessManagement.homePageIcon.first().click({force:true});
        //validate user land to homepage grid
        homePage.createProjectBtnInGrid.should("be.visible");
        //Verify the project name created in grid
        findValue(randomProject);
    })

    function findValue(value){
    
        let found=false;
        cy.get("tr[class='MuiTableRow-root css-eo5kcp'] td:nth-child(2)",{timeout:10000}).each(($ele,index,list)=>{
            if($ele.text()===value){
                let project=$ele.text();
                expect(project).to.eq(value)
                cy.wrap($ele).next().next().then((str)=>{
                    let projectCreatorRole=str.text();
                    expect(projectCreatorRole).to.eq("Admin")
                }) 
                found=true;
                return false;
            }
         })
        .then(()=>{
            if(!found){
                cy.get("div[class='MuiBox-root css-1zye22'] button:nth-child(3) svg[class='MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv']").click({force:true})
                findValue(value);
            }
        })
    }
    
})
