/// reference types="Cypress"/>

import { login } from "../page_objects/loginPage";
import { allGalleries } from "../page_objects/allGalleriesPage";

const credentials={
    email:"testing@gmail.com",
    password: "nekonesto11"
};
describe("all galleries page test",()=>{
    beforeEach("visit app and login",()=>{
        cy.visit("/login");
        login.login(credentials.email,credentials.password);
        cy.url().should("not.include","/login")
    });
    it("loads page succesfuly",()=>{
        cy.url().should("include","/");
        allGalleries.AllGalleriesHeading
           .should("contain.text","All Galleries")
           .and("be.visible")
           .and("exist")
        allGalleries.allGalleries
           .should("be.visible")
           .and("have.length",10)
        allGalleries.singleGallery
           .find("img")
           .should("be.visible")
        allGalleries.filterButton
           .should("be.visible")
           .and("not.be.disabled")
           .and("have.text", "Filter")
        allGalleries.searchInput
           .should("not.be.hidden")
           .and("have.class","form-control")
        allGalleries.loadMoreButton
           .should("be.visible")
           .and("have.css","background-color","rgb(72, 73, 75)")         
        
    })

    it("test search",()=>{
        let searchTerm="Gallery with 2 images";
        allGalleries.search(searchTerm);
        allGalleries.allGalleries
           .should("be.visible")
           .and("have.length",6)
        allGalleries.singleGallery
           .find("a")
           .first()
           .click();
        cy.get("h1")
           .should("be.visible")
           .and("have.text", searchTerm)   
           
    })

    it("test pagination",()=>{
        allGalleries.allGalleries
          .should("be.visible")
          .and("have.length",10);
        allGalleries.loadMoreButton.click();
        allGalleries.allGalleries
          .should("be.visible")
          .and("have.length",20);
        allGalleries.loadMoreButton.click();
        allGalleries.allGalleries
          .should("be.visible")
          .and("have.length",30);
    })

    it("click on gallery title redirects to single gallery page",()=>{
        allGalleries.singleGallery
          .find("a")
          .first()
          .click();
    })
    it("click on gallery author redirects to authors page",()=>{
        allGalleries.singleGallery
          .find("a")
          .eq(1)
          .click();
    })
})