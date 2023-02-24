import { login } from "../page_objects/loginPage";
import { registerPage } from "../page_objects/registerPage";
import {faker} from "@faker-js/faker";

describe("Register Form Tests", () => {
  let userData = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.random.alphaNumeric(8),
  }

    beforeEach("Visit App and click on Register link", () => {
        cy.visit("/register");
        registerPage.registerLink.click();
        cy.url().should("contain", "/register");
    })

    it("register through backend", () => {
      cy.intercept({
        method : "POST",
        url: "https://gallery-api.vivifyideas.com/api/auth/register",
      }).as("successfulRegistration");

      cy.visit("/register");
      registerPage.registerWithValidData(
        userData.firstName,
        userData.lastName,
        userData.email,
        userData.password
      );
      cy.wait("@successfulRegistration").then((interception) => {
        expect(interception.response.statusCode).eq(200);

      cy.visit("/login");
      cy.loginViaBackend();
      });
    })

    it("Register with short pass",() => {

    cy.intercept({
      method: "POST",
      url: "https://gallery-api.vivifyideas.com/api/auth/register",
    }).as("shortPassRegistration");

    cy.visit("/register");

    registerPage.registerWithValidData(
     Cypress.env("firstNameParam"),  
     Cypress.env("lastNameParam"),
     Cypress.env("emailParam"),
     Cypress.env("shortPassword")
   );

   registerPage.tosCheckbox.check();

   registerPage.tosCheckbox
      .should("be.checked")
      .and("not.be.disabled");

    cy.wait("@shortPassRegistration").then((interception) => {
      expect(interception.response.statusCode).eq(422)
    });

    cy.url().should("contain", "/register");

    registerPage.submitButton
           .should("be.visible")
           .and("not.be.disabled");
    registerPage.submitButton.click();
  });

  it("Register with email without dot",() => {
    cy.intercept({
      method: "POST",
      url: "https://gallery-api.vivifyideas.com/api/auth/register",
    }).as("emailWithoutDot");

    cy.visit("/register");

   registerPage.registerWithValidData(
    Cypress.env("firstNameParam"),  
    Cypress.env("lastNameParam"),
    Cypress.env("mailWithoutDot"),
    Cypress.env("passwordParam")
   );

    registerPage.tosCheckbox.check();

    registerPage.tosCheckbox
       .should("be.checked")
       .and("not.be.disabled");

    cy.wait("@emailWithoutDot").then((interception) => {
      expect(interception.response.statusCode).eq(422);
    });

    cy.url().should("contain", "/register");
  });

  it("Register with password without number",() => {
    cy.intercept({
      method: "POST",
      url: "https://gallery-api.vivifyideas.com/api/auth/register",
    }).as("passWithoutNumber");

    cy.visit("/register");

    registerPage.registerWithValidData(
     Cypress.env("firstNameParam"),  
     Cypress.env("lastNameParam"),
     Cypress.env("emailParam"),
     Cypress.env("passwordWithoutNumber")
    );

    registerPage.tosCheckbox.check();

    registerPage.tosCheckbox
      .should("be.checked")
      .and("not.be.disabled");

    cy.wait("@passWithoutNumber").then((interception) => {
     expect(interception.response.statusCode).eq(422);
    });

    cy.url().should("contain", "/register");

    registerPage.submitButton
      .should("be.visible")
      .and("not.be.disabled");

    registerPage.submitButton.click();

    registerPage.errorMessage
       .should("be.visible")
  });
})
