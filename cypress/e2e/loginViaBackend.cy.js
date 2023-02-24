///  <reference types="Cypress" />

import { login } from "../page_objects/loginPage";
import { Faker } from "@faker-js/faker";

const credentials = {
    validEmail:"iivanastepanovic1@gmail.com",
    validPass:"poludicu12",
    incompleteEmail:"iivanastepanovic1.com",
    mailWithoutDot: "iivanastepanovic1@mailcom", 
    incompletePass:"poludicu",
    invalidEmail: "zasto@gmail.com",
    invalidPass: "zato0123",
};

describe("Login tests",() => {
    beforeEach("visit app and click the login link",() => {   
        cy.visit("/");
        login.loginLink.click();
        cy.url().should("include","/login");
        login.loginPageHeading
          .should("be.visible")
          .and("have.text","Please login");
    });

    it("Login through backend",() => {
        cy.intercept({
            method:"POST",
            url:"https://gallery-api.vivifyideas.com/api/auth/login",
        }).as("successfulLogin");

        cy.visit("/login")

        login.login(credentials.validEmail,credentials.validPass);

        cy.wait("@successfulLogin").then((interception) => {
            expect(interception.response.statusCode).eq(200);
        });

        cy.url().should("contain","/login")    
    });

    it("Login with invalid email adress",() => {
        cy.intercept({
            method: "POST",
            url: "https://gallery-api.vivifyideas.com/api/auth/login",
        }).as("loginWithInvalidEmail");

        login.login(credentials.invalidEmail,credentials.validPass);

        cy.visit("/login");

        cy.wait("@loginWithInvalidEmail").then((interception) => {
            expect(interception.response.statusCode).eq(401);
        });
    });

    it("Login with invalid password",() => {
        cy.intercept({
            method: "POST",
            url: "https://gallery-api.vivifyideas.com/api/auth/login",
        }).as("loginWithInvalidPass");

        login.login(credentials.validEmail,credentials.invalidPass);

        cy.wait("@loginWithInvalidPass").then((interception) => {
            expect(interception.response.statusCode).eq(401)
        });

        login.errorMessage
        .should("be.visible")
        .and("have.text", "Bad Credentials")
        .and("have.class","alert alert-danger");
    })

    it("Login with incomplete password",() => {
        cy.intercept({
            method: "POST",
            url: "https://gallery-api.vivifyideas.com/api/auth/login",
        }).as("loginWithIncompletePass");

        login.login(credentials.validEmail,credentials.incompletePass);

        cy.wait("@loginWithIncompletePass").then((interception) => {
            expect(interception.response.statusCode).eq(401)
        });

        login.errorMessage
          .should("be.visible")
          .and("have.text", "Bad Credentials")
          .and("have.class","alert alert-danger")
          .and("have.css","border-color","rgb(245, 198, 203)");
    })

    it("Login with email without dot",() => {
        cy.intercept({
            method: "POST",
            url: "https://gallery-api.vivifyideas.com/api/auth/login",
        }).as("loginWithEmailWithoutDot");

        login.login(credentials.mailWithoutDot,credentials.validPass);

        cy.wait("@loginWithEmailWithoutDot").then((interception) => {
            expect(interception.response.statusCode).eq(401)
        });
        
        login.errorMessage
          .should("be.visible")
          .and("have.text", "Bad Credentials")
          .and("have.class","alert alert-danger")
    })
})
