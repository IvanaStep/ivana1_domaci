class AllGalleries{
    get AllGalleriesHeading(){
       return cy.get("h1")
    }

    get searchInput(){
        return cy.get("input");
    }

    get filterButton(){
        return cy.get("button").first();
    }

    get loadMoreButton(){
        return cy.get("button").last();
    }

    get allGalleries(){
        return cy.get(".grid").children();
    }

    get singleGallery(){
        return cy.get(".title-style");
    }
    
    get singleGalleryHeading(){
        return this.singleGallery.find("h2");
    }

    search(searchTerm){
        this.searchInput.type(searchTerm);
        this.filterButton.click()
    }
}

export const allGalleries=new AllGalleries();