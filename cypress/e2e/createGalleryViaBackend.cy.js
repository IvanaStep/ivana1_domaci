/// reference types="Cypress" />

import { createGallery } from "../page_objects/createGalleryPage";
import{faker} from "@faker-js/faker";


let galleryData = {
    title: faker.lorem.word(5),
    titleShort: faker.lorem.word(1),
    titleLong: faker.lorem.words(260),
    description: faker.lorem.paragraph(),
    imageUrl: faker.image.imageUrl()+".jpg",
    wrongImageUrl: faker.image.imageUrl()+" .gif",
}
let galleryId;

describe("Create gallery test", () => {
    beforeEach("visit app and log in", () => {
        cy.loginViaBackend();
    });

    it("Create gallery", () => {
        cy.intercept({
            method: "POST",
            url: "https://gallery-api.vivifyideas.com/api/galleries",
        }).as("galleryCreation")
        
        cy.visit("/create");
        createGallery.createGalleryHeading
           .should("be.visible")
           .and("have.text","Create Gallery");

        createGallery.createGallery(
            galleryData.title,
            galleryData.description,
            galleryData.imageUrl
        );
        
        cy.wait("@galleryCreation").then((interception) => {
            galleryId = interception.response.body.id;
        });

        cy.visit("/galleries/"+ galleryId);
        });

        it("Create gallery with wrong URL extension", () => {
            cy.intercept({
                method: "POST",
                url: "https://gallery-api.vivifyideas.com/api/galleries",
            }).as("wrongURL")
            cy.visit("/create")
            createGallery.createGalleryHeading
               .should("be.visible")
               .and("have.text","Create Gallery");
    
            createGallery.createGallery(
                galleryData.title,
                galleryData.description,
                galleryData.wrongImageUrl
            )   
            cy.wait("@wrongURL").then((interception) => {
                expect(interception.response.statusCode).eq(422)
            });
            createGallery.submitBtn.click();
            createGallery.errorMessage
               .should("be.visible")
               .and("have.text","Wrong format of image")
               .and("have.css","background-color","rgb(248, 215, 218)")
        });

        it("Create gallery with short title",()=>{
            cy.intercept({
                method: "POST",
                url: "https://gallery-api.vivifyideas.com/api/galleries",
            }).as("shortTitle");

            cy.visit("/create");

            createGallery.createGalleryHeading
               .should("be.visible")
               .and("have.text","Create Gallery");

            createGallery.createGallery(
                galleryData.titleShort,
                galleryData.description,
                galleryData.imageUrl
            );  

            cy.wait("@shortTitle").then((interception) => {
                expect(interception.response.statusCode).eq(422)
            });

            createGallery.submitBtn.click();
            createGallery.errorMessage
               .should("be.visible")
               .and("have.text","The title must be at least 2 characters.")
               .and("have.css", "background-color","rgb(248, 215, 218)")
        });    

        it("Create gallery with too long title", () => {
            cy.intercept({
                method: "POST",
                url: "https://gallery-api.vivifyideas.com/api/galleries",
            }).as("tooLongTitle")
            cy.visit("/create")
            createGallery.createGalleryHeading
               .should("be.visible")
               .and("have.text","Create Gallery");
    
            createGallery.createGallery(
                galleryData.titleLong,
                galleryData.description,
                galleryData.imageUrl
            )   
            cy.wait("@tooLongTitle").then((interception) => {
                expect(interception.response.statusCode).eq(422)
            })
            createGallery.submitBtn.click();
            createGallery.errorMessage
               .should("be.visible")
               .and("have.text","The title may not be greater than 255 characters.")
               .and("have.css","background-color","rgb(248, 215, 218)")
        });
    });
