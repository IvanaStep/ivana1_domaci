// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("loginViaBackend",() =>{
    cy.request({
        method:"POST",
        url:"https://gallery-api.vivifyideas.com/api/auth/login",
        body:{
            email: Cypress.env("validEmail"),
            password: Cypress.env("validPass"),
        },
    })
    .its("body")
    .then((response) =>{
        window.localStorage.setItem("token", response.access_token);
    })
})

Cypress.Commands.add("RegisterViaBackend",(firstNameParam,lastNameParam,emailParam,passwordParam)=>{
    cy.request({
        method: "POST",
        url: "https://gallery-api.vivifyideas.com/api/auth/register",
        body:{
          email:Cypress.env("emailParam"),
          first_name : Cypress.env("firstNameParam"),
          last_name : Cypress.env("lastNameParam"),
          password : Cypress.env("passwordParam"),
          password_confirmation : Cypress.env("passwordParam"),
          terms_and_conditions : true
        }
      })
      .its("body")
      .then((response) => {
        window.localStorage.setItem("userId",response.user_id)
      })
})

Cypress.Commands.add("CreateGalleryViaBackend",(titleParam,descParam,imageUrlParam) => {
    cy.request({
        method: "POST",
        url: "https://gallery-api.vivifyideas.com/api/galleries",
        body: {
            title: Cypress.env("titleParam"),
            description: Cypress.env("descParam"),
            imageUrl: Cypress.env("imageUrlParam"),
        }
})
.its("body")
.then((response) => {
    setItem("galleryId",response.body.id)
})

Cypress.Commands.add("UpdateGalleryViaBackend",(titleParam,descParam,imageUrlParam) => {
    cy.request({
        method: "GET",
        url: "https://gallery-api.vivifyideas.com/api/galleries/1452/edit",
        body: {
            title: titleParam,
            description: descParam,
            imageUrl: imageUrlParam
        }
    })
})

Cypress.Commands.add("DeleteGalleryViaBackend",() => {
    cy.request({
        method: "DELETE",
        url: "https://gallery-api.vivifyideas.com/api/galleries/1482"
    })
})
})
