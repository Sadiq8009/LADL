let projectId=require("../API/TC_02_createProject.cy")


describe("Add user to the created project",function(){
    
    it("Add Analyst to the project",function(){
        
           
        cy.request({
            method:"POST",
            url:Cypress.env("apiBaseUrl")+"/QA/users/add",
            headers:{
                Authorization: "Bearer "+Cypress.env("token"),
                "Content-Type":"application/json"
            },
            body:[
                {
                    "name": "Shaik Sadiq - Network",
                    "id": "0d0aacba-d7c1-442c-ade1-67dee4ae145a",
                    "systemId": "L037409",
                    "mail": "sadiq_shaik@network.lilly.com",
                    "userRoleMasterId": 2,
                    projectMasterId:Cypress.env("projectId")
                }
            ]
        }).then((Response)=>{
            expect(Response.status).to.be.eq(200);
            expect(Response.body.messsage).to.eq("Users Added Successfully")
           cy.log(JSON.stringify(Response.body));
        })
    })
})
