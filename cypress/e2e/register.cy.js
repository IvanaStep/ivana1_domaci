// <reference types="Cypress" />
import { registerPage } from "../page_objects/registerPage";
import { faker } from '@faker-js/faker';
import { login } from "../page_objects/loginPage";

describe("Register Form Tests", () => {
    let userData = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      invalidFirstName:"n",
      invalidLastName: "k",
      email: faker.internet.email(),
      password: faker.random.alphaNumeric(8),
      shortPassword: faker.random.alphaNumeric(3),
      passwordWithoutNumber: faker.random.alpha(8),
      mailWithoutDot: "test@mailcom",
      mailWithoutSign: "testmail.com", 
      }

    beforeEach("Visit App and click on Register link", () => {
      cy.visit("/register");
      registerPage.registerLink.click();
      cy.url().should("contain", "/register");
    })
    it("Register with a valid data", () => {
        registerPage.registerWithValidData(
          userData.firstName, 
          userData.lastName, 
          userData.email, 
          userData.password);
          registerPage.tosCheckbox.check();
          registerPage.tosCheckbox.should("be.checked")
                              .and("not.be.disabled");
          registerPage.submitButton
             .should("be.visible")
             .and("not.be.disabled");
          registerPage.submitButton.click();
    })
    it("Register with short pass",()=>{
      registerPage.registerWithValidData(
        userData.firstName,
        userData.lastName,
        userData.email,
        userData.shortPassword,
      )
      registerPage.tosCheckbox.check()
      registerPage.tosCheckbox.should("be.checked")
                              .and("not.be.disabled");
      cy.url().should("contain", "/register");
      registerPage.submitButton
             .should("be.visible")
             .and("not.be.disabled");
      registerPage.submitButton.click();
    });
    it("Register with password without number",()=>{
      registerPage.registerWithValidData(
        userData.firstName,
        userData.lastName,
        userData.email,
        userData.passwordWithoutNumber,
      );
      registerPage.tosCheckbox.check()
      registerPage.tosCheckbox.should("be.checked")
                              .and("not.be.disabled");
      cy.url().should("contain", "/register");
      registerPage.submitButton
             .should("be.visible")
             .and("not.be.disabled");
      registerPage.submitButton.click();
    })
  
      it ("Register with email without dot",()=>{
        registerPage.registerWithValidData(
          userData.firstName,
          userData.lastName,
          userData.mailWithoutDot,
          userData.password
        )
        registerPage.tosCheckbox.check()
        registerPage.tosCheckbox.should("be.checked")
                                .and("not.be.disabled");
        cy.url().should("contain", "/register");
        registerPage.submitButton
             .should("be.visible")
             .and("not.be.disabled");
        registerPage.submitButton.click();
      })
  
      it("Register with email without @ sign",()=>{
        registerPage.registerWithValidData(
          userData.firstName,
          userData.lastName,
          userData.mailWithoutSign,
          userData.password
        )
        registerPage.tosCheckbox.check()
        registerPage.tosCheckbox.should("be.checked")
                                .and("not.be.disabled");
        cy.url().should("contain", "/register");
        registerPage.submitButton
             .should("be.visible")
             .and("not.be.disabled");
        registerPage.submitButton.click();
      })

      it("Register only by pressing the submit button",()=>{
        cy.url().should("contain", "/register");
        registerPage.registerWithoutAnyInputFilled(
          registerPage.submitButton.click()
        )
        registerPage.submitButton
             .should("be.visible")
             .and("not.be.disabled");
       registerPage.submitButton.click();
      })

      it("Register with invalid first name",()=>{
        registerPage.registerWithValidData(
          userData.invalidFirstName,
          userData.lastName,
          userData.email,
          userData.password
        )
        registerPage.tosCheckbox.check()
        registerPage.tosCheckbox.should("be.checked")
                                .and("not.be.disabled");
        cy.url().should("contain", "/register");
        registerPage.submitButton
             .should("be.visible")
             .and("not.be.disabled");
        registerPage.submitButton.click();
        });

        it("Register with invalid last name",()=>{
          registerPage.registerWithValidData(
            userData.firstName,
            userData.invalidLastName,
            userData.email,
            userData.password
          )
          registerPage.tosCheckbox.check()
          registerPage.tosCheckbox.should("be.checked")
                                  .and("not.be.disabled");
          cy.url().should("contain", "/register");
          registerPage.submitButton
               .should("be.visible")
               .and("not.be.disabled");
          registerPage.submitButton.click();
          });

          it("Register with already used email",()=>{
            registerPage.registerWithValidData(
              userData.firstName,
              userData.lastName,
              userData.email,
              userData.password
            )
            cy.url().should("contain", "/register");
            registerPage.submitButton
                 .should("be.visible")
                 .and("not.be.disabled");
            registerPage.submitButton.click();
            registerPage.errorMessage
                 .should("be.visible")
                 .and("have.text","The email has already been taken.")
                 .and("have.css","background-color","rgb(248, 215, 218)")
          });
          it("Register without accepting terms and conditions",()=>{
            registerPage.registerWithoutAcceptingTos(
              userData.firstName,
              userData.lastName,
              userData.email,
              userData.password
            );
            cy.url().should("contain","/register");
            registerPage.submitButton.click();
            registerPage.errorMessage
               .should("be.visible")
               .and("have.text","The email has already been taken.The terms and conditions must be accepted.")
               .and("have.css", "color","rgb(114, 28, 36)")
          })
    })
    