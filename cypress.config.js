const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl:"https://gallery-app.vivifyideas.com/",
    env:{
      validEmail:"testing@gmail.com",
      validPass:"nekonesto11",
      incompleteEmail:"nekonesto.com",
      mailWithoutDot: "nekonesto@mailcom", 
      incompletePass:"nekonesto",
      invalidEmail: "svasta@gmail",
      invalidPass: "jupiska12",

      firstNameParam: "Ivana",
      lastNameParam: "Stepanovic",
      emailParam: "testing@gmail.com",
      passwordParam: "nekonesto11",
      password_confirmation: "nekonesto11",
      shortPassword: "neko",
      passwordWithoutNumber: "nekonesto",
      mailWithoutDot: "testing@mailcom",
      mailWithoutSign: "testingmail.com", 
      terms_and_conditions: true,

      titleParam:"more",
      descParam:" ljeto",
      imageUrlParam: "https://www.mrdjenovic.com/m/wp-content/uploads/2015/05/drobnipijesak.jpg",
    }
  },
});
