
describe("Create new Project and get the created project",function(){
    let randomProjectName=Math.random().toString(36).substring(7);
    let body={"ProjectName":randomProjectName};
    
    Cypress.env("projectName",randomProjectName);

 
    let projectId;

it("Create new project",function(){
    cy.request({
        method:"POST",
        url:Cypress.env("apiBaseUrl")+"/QA/projects/create",
        headers:{
            Authorization: "Bearer "+Cypress.env("token"),
            "Content-Type":"application/json"
        },
        body:body
    }).then((response)=>{
        expect(response.status).to.eq(200);
        expect(response.body.messsage).to.eq("OK")
        expect(response.headers).to.have.property("content-type","application/json")
        let jsonData=JSON.parse(JSON.stringify(response.body))
         projectId=jsonData.data.ProjectMasterId
        Cypress.env("projectId",jsonData.data.ProjectMasterId);

    })
})
})