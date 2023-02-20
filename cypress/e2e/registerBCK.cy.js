import { login } from "../page_objects/loginPage";

describe("Register Form Tests", () => {
    ("Visit App and click on Register link", () => {
        cy.visit("/register");
        registerPage.registerLink.click();
        cy.url().should("contain", "/register");
    })

it("register through backend", ()=>{
    cy.request({
      method: "POST",
      url: "https://gallery-api.vivifyideas.com/api/auth/register",
      body:{
        email:"nekonesto@nasto.mni",
        first_name: "iva",
        last_name:"step",
        password: "svasta123",
        password_confirmation:"svasta123",
        terms_and_conditions: true
      }
    })

    cy.visit("/login")
    login.login("nekonesto@nasto.mni", "svasta123")
  })
})