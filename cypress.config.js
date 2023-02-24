const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl:"https://gallery-app.vivifyideas.com/",
    env:{
      validEmail:"iivanastepanovic1@gmail.com",
      validPass:"poludicu12",
      incompleteEmail:"iivanastepanovic1.com",
      mailWithoutDot: "iivanastepanovic1@mailcom", 
      incompletePass:"poludicu",
      invalidEmail: "svasta@gmail.com",
      invalidPass: "jupiska12",

      firstNameParam: "Ivana",
      lastNameParam: "Stepanovic",
      emailParam: "iivanastepanovic1@gmail.com",
      passwordParam: "poludicu12",
      password_confirmation: "poludicu12",
      shortPassword: "polu",
      passwordWithoutNumber: "poludicu",
      mailWithoutDot: "iivanastepanovic1@gmailcom",
      mailWithoutSign: "iivanastepanovic1gmail.com", 
      terms_and_conditions: true,

      titleParam:"more",
      descParam:" ljeto",
      imageUrlParam: "https://www.mrdjenovic.com/m/wp-content/uploads/2015/05/drobnipijesak.jpg",
    }
  },
});
