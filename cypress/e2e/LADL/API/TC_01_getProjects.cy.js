
describe("Get the project details using user_id",function(){
    
    it("Get Projects",function(){
        cy.request({
            method:"GET",
            url:Cypress.env("apiBaseUrl")+"/QA/projects/",
            headers:{
                Authorization: "Bearer "+Cypress.env("token"),
            },
            qs:{
                userId:Cypress.env("userId")
            }
        }).then((response)=>{
            expect(response.status).to.eq(200);
            expect(response.body.messsage).to.be.eq("Fetched Assigned Users Successfully")
        })
    })
})