describe('Autenticação', () => {
  beforeEach(() => {
    // arrange
    cy.visit('https://www.saucedemo.com/');
  });

  it('Deve exibir mensagem de erro ao tentar logar com usuário bloqueado', () => {
    // arrange
    cy.get('[data-test="username"]').type('locked_out_user');
    cy.get('[data-test="password"]').type('secret_sauce');

    // act
    cy.get('[data-test="login-button"]').click();

    // assert
    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain', 'Sorry, this user has been locked out.');
  });
});

describe('Inventário – Validando Lista', () => {
  beforeEach(() => {
    // arrange
    cy.visit('https://www.saucedemo.com/');
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce');

    // act
    cy.get('[data-test="login-button"]').click();

    // assert
    cy.url().should('include', '/inventory.html');
    cy.get('.inventory_item', { timeout: 10000 }).should('have.length.at.least', 1);
  });

  it('Deve exibir exatamente 6 produtos na página', () => {
    // assert
    cy.get('.inventory_item').should('have.length', 6);
  });
});

describe('Detalhes do Produto', () => {
  beforeEach(() => {
    // arrange
    cy.visit('https://www.saucedemo.com/');
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce');

    // act
    cy.get('[data-test="login-button"]').click();

    // assert
    cy.url().should('include', '/inventory.html');
  });

  it('Deve abrir a página de detalhes de um produto e voltar', () => {
    // act
    cy.contains('.inventory_item_name', 'Sauce Labs Bolt T-Shirt').click();

    // assert
    cy.url().should('include', '/inventory-item.html');
    cy.get('.inventory_details_name').should('have.text', 'Sauce Labs Bolt T-Shirt');
    cy.get('.inventory_details_desc').should('contain.text', 'Get your testing superhero on');
    cy.get('.inventory_details_price').should('have.text', '$15.99');

    // act
    cy.get('[data-test="back-to-products"]').click();

    // assert
    cy.url().should('eq', 'https://www.saucedemo.com/inventory.html');
    cy.contains('Products').should('be.visible');
  }); 
});

