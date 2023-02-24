class RegisterPage {
    get registerLink() {
        return cy.get("a[href='/register']");
    }
    get firstName() {
        return cy.get("#first-name");
    }
    get lastName() {
        return cy.get("#last-name");
    }
    get emailInput() {
        return cy.get("#email");
    }
    get passwordInput() {
        return cy.get("#password");
    }
    get passwordConfirmation() {
        return cy.get("#password-confirmation");
    }
    get tosCheckbox() {
        return cy.get(":checkbox");
    }
    get submitButton() {
        return cy.get("button")
    }

    get errorMessage(){
        return cy.get(".alert");
    }

    
    registerWithValidData(firstName, lastName, email, password) {
        this.firstName.type(firstName);
        this.lastName.type(lastName);
        this.emailInput.type(email);
        this.passwordInput.type(password);
        this.passwordConfirmation.type(password);
        this.tosCheckbox.check();
        this.submitButton.click();
    }
    registerWithoutAcceptingTos(firstName,lastName,email,password){
        this.firstName.type(firstName);
        this.lastName.type(lastName);
        this.emailInput.type(email);
        this.passwordInput.type(password);
        this.passwordConfirmation.type(password);
        this.submitButton.click();
    }
    registerWithoutAnyInputFilled(){
        this.submitButton.click()
    }
    registerWithoutFirstName(lastName,email,password,passwordConfirmation){
        this.lastName.type(lastName);
        this.emailInput.type(email);
        this.passwordInput.type(password);
        this.passwordConfirmation.type(password);
        this.tosCheckbox.check();
        this.submitButton.click();
    }
}
export const registerPage = new RegisterPage();