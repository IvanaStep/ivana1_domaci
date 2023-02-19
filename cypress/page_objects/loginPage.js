class Login{
    get loginLink(){
        return cy.get("a[href='/login']");
    }
    get loginPageHeading(){
        return cy.get("h1");
    }
    get emailInput(){
        return cy.get("#email");
    }
    get passwordInput(){
        return cy.get("#password");
    }
    get submitButton(){
        return cy.get("button");
    }
    get errorMessage(){
        return cy.get(".alert");
    }

    login(email,password) {
        this.emailInput.type(email);
        this.passwordInput.type(password);
        this.submitButton.click();
    }
}

export const login = new Login();