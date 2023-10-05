let projectId=require("../API/TC_02_createProject.cy")

describe("Upload file",function(){
it("Upload csv file",function(){
    cy.fixture("FormData.csv", 'binary')
    .then((file) => Cypress.Blob.binaryStringToBlob(file))
    .then((blob) => {
  
        var formdata = new FormData();
        formdata.append("file", blob, "FormData.csv");
  
        cy.request({
            url: Cypress.env("apiBaseUrl")+"/QA/dataset/upload",
            method: "POST",
            headers: {
                Authorization: "Bearer "+Cypress.env("token"),
                'content-type': 'multipart/form-data; boundary=<calculated when request is sent>'
            },
            qs:{
              projectId:Cypress.env('projectId'),
              threshold:84,
              preprocessor:"force_lowercase",
              unlabelledDataColumns:"Unique ID",
              delimiter:","
            },
            body: formdata
        }).then((response)=>{
            expect(response.status).to.eq(200);
            let responseData=JSON.stringify(response)
            cy.log(responseData)
        })
    })

})


})
  