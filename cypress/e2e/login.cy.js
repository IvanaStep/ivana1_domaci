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

describe("login tests",()=>{
    beforeEach("visit app and click the login link",()=>{   
        cy.visit("/");
        login.loginLink.click();
        cy.url().should("include","/login");
        login.loginPageHeading
          .should("be.visible")
          .and("have.text","Please login");
    })

    it("login with valid credentials",()=>{
        login.login(credentials.validEmail,credentials.validPass);
        cy.url().should("contain","/login")    
    })

    it("login with invalid email adress",()=>{
        login.login(credentials.invalidEmail,credentials.validPass);
        login.errorMessage
          .should("be.visible")
          .and("have.text", "Bad Credentials")
          .and("have.css","background-color","rgb(248, 215, 218)")
          .and("have.class","alert-danger");
    })

    it("login with invalid password",()=>{
        login.login(credentials.validEmail,credentials.invalidPass);
        login.errorMessage
        .should("be.visible")
        .and("have.text", "Bad Credentials")
        .and("have.class","alert alert-danger");
    })

    it("login without credentials",()=>{
        login.loginLink.click();
        login.submitButton.click();
        cy.url().should("include","/login");
    })

    it("login with incomplete email",()=>{
        login.login(credentials.incompleteEmail,credentials.validPass);
        login.submitButton.click();
        cy.url().should("include","/login")
    })

    it("login with incomplete password",()=>{
        login.login(credentials.validEmail,credentials.incompletePass);
        login.errorMessage
          .should("be.visible")
          .and("have.text", "Bad Credentials")
          .and("have.class","alert alert-danger")
          .and("have.css","border-color","rgb(245, 198, 203)");
    })
    it("login with email without dot",()=>{
        login.login(credentials.mailWithoutDot,credentials.validPass);
        login.errorMessage
          .should("be.visible")
          .and("have.text", "Bad Credentials")
          .and("have.class","alert alert-danger")
    })
})