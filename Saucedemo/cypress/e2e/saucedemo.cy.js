///<reference types="cypress"/>

describe('Login/Logout Test', () => {
    before(() => {
      cy.clearAllCookies()
      cy.clearAllLocalStorage
      cy.visit('https://www.saucedemo.com/'),
      cy.url().should('include', 'saucedemo.com')
    })

// Invalid Login
  it('Should invalid login', () => {
  cy.fixture("user.json").then((data) => {
    const admin = data.find(user => user.username === "locked_out_user")

    const username = admin.username;
    const password = admin.password;
  //commands
  cy.login(username, password);   
  // Verifikasi gagal login login
  cy.get('[data-test="error"]').should ('be.visible').and('contain.text', 'Epic sadface: Sorry, this user has been locked out.')
});
});

// Username Empty
  it('Should show error when Username is empty', () =>{
  cy.get('#user-name').clear()
  cy.get('#password').clear().type("secret_sauce")
  cy.get('#login-button').click()

  cy.get('[data-test="error"]').should("be.visible")
  .and("contain.text", "Epic sadface: Username is required");

})
// Password Empty
  it('Should show error when Password is empty', () =>{
  cy.get('#user-name').clear().type("standard_user")
  cy.get('#password').clear()
  cy.get('#login-button').click()

  cy.get('[data-test="error"]').should("be.visible")
  .and("contain.text", "Epic sadface: Password is required");
})
// Password and username empty
  it('Should show error when Password is empty', () =>{
    cy.get('#user-name').clear()
    cy.get('#password').clear()
    cy.get('#login-button').click();


  cy.get('[data-test="error"]').should("be.visible")
  .and("contain.text", "Epic sadface: Username is required");
})
// valid Login
    it('Should valid login', () => {
      cy.fixture("user.json").then((users) => {
        const admin = users.find(user => user.username === "standard_user")
        const username = admin.username;
        const password = admin.password;
          //commands
        cy.login(username, password); 
          // Verifikasi berhasil login
        cy.url().should('include', '/inventory.html');
      })
    })

// Logout    
  it('Should log out', () => {
      //cy.visit ('https://www.saucedemo.com/inventory.html')
      cy.logout();
      cy.url().should('include', 'saucedemo.com')
  })
})

describe('Sorting Test', () => {
  before(() => {
    cy.visit('https://www.saucedemo.com/'),
    cy.url().should('include', 'saucedemo.com')
})
  it('Should valid login', () => {
    //login
    cy.fixture("user.json").then((users) => {
      const admin = users.find(user => user.username === "standard_user")
      const username = admin.username;
      const password = admin.password;
      cy.login(username, password); 
    })
  })
  it('Should name (A-Z) Search', () => {
    cy.get('.product_sort_container').select('Name (A to Z)')
    cy.get('.inventory_item_name').first().should('contain.text', 'Sauce Labs Backpack')
  })

  it('Should name (Z-A) Search', () => {
    cy.get('.product_sort_container').select('Name (Z to A)')
    cy.get('.inventory_item_name').first().should('contain.text', 'Test.allTheThings() T-Shirt (Red)')
  })

  it('Should price low to high Search', () => {
    cy.get('.product_sort_container').select('Price (low to high)')
    cy.get('.inventory_item_price').first().should('contain.text', '$7.99')
  })

  it('Should price high to low Search', () => {
    cy.get('.product_sort_container').select('Price (high to low)')
    cy.get('.inventory_item_price').first().should('contain.text', '$49.99')
  })
})

describe('add to cart Test', () => {
  before(() => {
    cy.visit('https://www.saucedemo.com/'),
    cy.url().should('include', 'saucedemo.com')
})

  it('Should valid login', () => {
  //login
    cy.fixture("user.json").then((users) => {
    const admin = users.find(user => user.username === "standard_user")
    const username = admin.username;
    const password = admin.password;
    cy.login(username, password); 
  })
})

  it('should add to cart', () =>{
    cy.get('#add-to-cart-sauce-labs-backpack').click()
    cy.get('.shopping_cart_link').click()
    cy.get('.inventory_item_name').should("contain.text", "Sauce Labs Backpack")

  })
  it('Should Check out', () => {
    cy.checkOut()
    cy.url().should("include", "/checkout-step-one.html")
    cy.form()
    cy.url().should("include", "/checkout-step-two.html")
    cy.get('#finish').click()
    cy.url().should("include", "/checkout-complete.html")
})      
})

describe('Burger Test', () => {
  before(() => {
    cy.visit('https://www.saucedemo.com/'),
    cy.url().should('include', 'saucedemo.com')
})

  it('Should valid login', () => {
  //login
    cy.fixture("user.json").then((users) => {
    const admin = users.find(user => user.username === "standard_user")
    const username = admin.username;
    const password = admin.password;
    cy.login(username, password); 
  })
})
it('Should All Item Menu ', () => {
  cy.get('#react-burger-menu-btn').click()
  cy.contains('All Items').click()
  cy.url().should("include", "/inventory.html")
})
  it('Should About Menu ', () => {
    cy.get('#react-burger-menu-btn').click()
    cy.contains('About').click()
    cy.get('h1').should("contain.text", "MuiTypography-root MuiTypography-h1 css-152qxt")
  })
})
