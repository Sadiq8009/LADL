import homePage from "../../../support/pageObjects/LADL_homePage";


describe("HomePage projects grid",function(){
let columnNames=[];

beforeEach(function(){
    cy.fixture('example').as('data');
    Cypress.config("pageLoadTimeout:8000")
    cy.visit("/");
})


it("Find project name using pagination functionality",{tags:'@regression'},function(){
    this.data.projects.forEach((project)=>{
        cy.FindProject(project,"Admin")
    })
})

it("Validate homepage_view for the users who has access to/created any peoject_instances",{tags :'@regression'},function(){
    homePage.allProjectText.should('have.text','All Projects');
    homePage.projectGridColumns.each(($ele)=>{
        let columnName=$ele.text();
        columnNames.push(columnName);
    }).then(()=>{
        expect(columnNames).to.be.deep.eq(this.data.ProjectGridColumns);
    })
})
})

