/// reference types="Cypress"/>

import { login } from "../page_objects/loginPage";
import {faker} from "@faker-js/faker";

const credentials={
    validEmail:"nekonesto@gmail.com",
    validPass:"nekonesto11",
    incompleteEmail:"nekonesto.com",
    mailWithoutDot: "nekonesto@mailcom", 
    incompletePass:"nekonesto",
    invalidEmail: faker.internet.email(),
    invalidPass: faker.lorem.word(),

}

describe("Login tests",()=>{
    beforeEach("visit app and click the login link",()=>{   
        cy.visit("/");
        login.loginLink.click();
        cy.url().should("include","/login");
        login.loginPageHeading
          .should("be.visible")
          .and("have.text","Please login");
    })

    it.only("Login with valid credentials",()=>{
        cy.intercept({
            method:"POST",
            url:"https://gallery-api.vivifyideas.com/api/auth/login",
        }).as(("succesfulLogin"))

        login.login(credentials.validEmail,credentials.validPass);
        cy.wait("@succesfulLogin").then((interception)=>{
            console.log("INTERCEPTION",interception);
            expect(interception.response.statusCode).eq(200);
        });
        cy.url().should("contain","/login")    
    })

    it("Login with invalid email adress",()=>{
        login.login(credentials.invalidEmail,credentials.validPass);
        login.errorMessage
          .should("be.visible")
          .and("have.text", "Bad Credentials")
          .and("have.css","background-color","rgb(248, 215, 218)")
          .and("have.class","alert-danger");
    })

    it("Login with invalid password",()=>{
        login.login(credentials.validEmail,credentials.invalidPass);
        login.errorMessage
        .should("be.visible")
        .and("have.text", "Bad Credentials")
        .and("have.class","alert alert-danger");
    })

    it("Login without credentials",()=>{
        login.loginLink.click();
        login.submitButton.click();
        cy.url().should("include","/login");
    })

    it("Login with incomplete email",()=>{
        login.login(credentials.incompleteEmail,credentials.validPass);
        login.submitButton.click();
        cy.url().should("include","/login")
    })

    it("Login with incomplete password",()=>{
        login.login(credentials.validEmail,credentials.incompletePass);
        login.errorMessage
          .should("be.visible")
          .and("have.text", "Bad Credentials")
          .and("have.class","alert alert-danger")
          .and("have.css","border-color","rgb(245, 198, 203)");
    })
    it("Login with email without dot",()=>{
        login.login(credentials.mailWithoutDot,credentials.validPass);
        login.errorMessage
          .should("be.visible")
          .and("have.text", "Bad Credentials")
          .and("have.class","alert alert-danger")
    })
})
