let projectId=require("../API/TC_02_createProject.cy");
let randomProjectName=require("../API/TC_02_createProject.cy")
describe("Get new Project details by project id",function(){
    let getProjectDetail;
    //let randomProjectName=Math.random().toString(36).substring(7);

    it("Get the project details created by projectId",function(){
        cy.request({
            method:"GET",
            url:Cypress.env("apiBaseUrl")+"/QA/users/role/",
            qs:{
                projectId:Cypress.env("projectId"),
                userId:Cypress.env("userId")
            },failOnStatusCode: false,
            headers:{
                Authorization: "Bearer "+Cypress.env("token")
            },
        }).then((response)=>{
            expect(response.status).to.eq(200);
            expect(response.body.messsage).to.eq("Fetched Role and Project Status Successfully")
            getProjectDetail= JSON.parse(JSON.stringify(response.body));
            expect(getProjectDetail.data.rows[0].ProjectMasterId).to.eq(Cypress.env("projectId"));
            expect(getProjectDetail.data.rows[0].ProjectName).to.eq(Cypress.env("projectName"));
            expect(getProjectDetail.data.rows[0].UserGlobalId).to.eq(Cypress.env("userId"));
        })
    })
})
