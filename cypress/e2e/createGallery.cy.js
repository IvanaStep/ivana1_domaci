/// reference types="Cypress" />

import { login } from "../page_objects/loginPage";
import { createGallery } from "../page_objects/createGalleryPage";
import { allGalleries } from "../page_objects/allGalleriesPage";
import{faker} from "@faker-js/faker";

let credentials={
    email: "testing@gmail.com",
    password: "nekonesto11",
};

let galleryData = {
    title: "nesto",
    titleShort: faker.lorem.word(1),
    description: faker.lorem.paragraph(),
    imageUrl: faker.image.imageUrl()+".jpg",
    wrongImageUrl: faker.image.imageUrl()+" .gif",
}
describe("Create gallery test", () => {
    beforeEach("visit app and log in", () => {
        cy.visit("/login");
        login.login(credentials.email,credentials.password);
        login.login.submitButton.click();
        cy.url().should("not.include","/login");
    });

    it("Create gallery", () => {
        createGallery.creteGalleryLink.click();
        createGallery.createGalleryHeading
           .should("be.visible")
           .and("have.text","Create Gallery");
        createGallery.createGallery(
            galleryData.title,
            galleryData.description,
            galleryData.imageUrl
        );   
        createGallery.submitBtn.click();
        allGalleries.singleGallery.find("h2");
        })

    it("Create gallery with wrong URL extension", () => {
      createGallery.creteGalleryLink.click();
        createGallery.createGalleryHeading
           .should("be.visible")
           .and("have.text","Create Gallery");

        createGallery.createGallery(
            galleryData.title,
            galleryData.description,
            galleryData.wrongImageUrl
        )   
        createGallery.submitBtn.click();
        createGallery.errorMessage
           .should("be.visible")
           .and("have.text","Wrong format of image")
           .and("have.css","background-color","rgb(248, 215, 218)")
    })

    it("Create gallery with short title",()=>{
        createGallery.creteGalleryLink.click();
        createGallery.createGalleryHeading
           .should("be.visible")
           .and("have.text","Create Gallery")

        createGallery.createGallery(
            galleryData.titleShort,
            galleryData.description,
            galleryData.imageUrl
        )   
        createGallery.submitBtn.click();
        createGallery.errorMessage
           .should("be.visible")
           .and("have.text","The title must be at least 2 characters.")
           .and("have.css", "background-color","rgb(248, 215, 218)")
    })    
 })    
