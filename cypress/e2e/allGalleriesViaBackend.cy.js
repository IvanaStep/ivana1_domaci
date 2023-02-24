/// <reference types="Cypress"/>

import { login } from "../page_objects/loginPage";
import { allGalleries } from "../page_objects/allGalleriesPage";
import { Faker } from "@faker-js/faker";

const credentials = {
    email : "testing@gmail.com",
    password : "nekonesto11",
};

describe("All galeries page test",() => {
    beforeEach("Visit app and login", () => {
        cy.loginViaBackend();
        cy.url().should("not.include","/login")
    });

    it("Loads page succesfuly", () => {
        cy.intercept({
            method: "GET",
            url:"https://gallery-api.vivifyideas.com/api/galleries?page=1&term="
        }).as("loadingPageSuccesfuly");
        cy.visit("/");
        cy.url().should("include","/");
        cy.wait("@loadingPageSuccesfuly").then((interception) => {
            expect(interception.response.statusCode).eq(200)
        })
    })
    
    it("Test search",() => {
        let searchTerm = "neko"
        cy.intercept({
            method: "GET",
            url: "https://gallery-api.vivifyideas.com/api/galleries?page=1&term=neko",
        }).as("searchFilter");
        cy.visit("/");
        cy.url().should("include","/");
        allGalleries.search(searchTerm);
        cy.wait("@searchFilter").then((interception) => {
            expect(interception.response.statusCode).eq(200)
        })
        allGalleries.allGalleries
           .should("be.visible")          
    })
})
