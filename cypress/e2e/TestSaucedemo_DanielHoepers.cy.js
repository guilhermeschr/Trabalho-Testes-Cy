describe('Autenticação', () => {
    beforeEach(() => {
      cy.visit('https://www.saucedemo.com/');
    });
  
    it('Deve exibir mensagem de erro ao tentar logar com usuário bloqueado', () => {
      cy.get('[data-test="username"]').type('locked_out_user');
      cy.get('[data-test="password"]').type('secret_sauce');
      cy.get('[data-test="login-button"]').click();
  
      cy.get('[data-test="error"]')
        .should('be.visible')
        .and('contain', 'Sorry, this user has been locked out.');
    });
  });
  
  describe('Inventário – Validando Lista e Ordenação por Nome', () => {
    beforeEach(() => {
      cy.visit('https://www.saucedemo.com/');
      cy.get('[data-test="username"]').type('standard_user');
      cy.get('[data-test="password"]').type('secret_sauce');
      cy.get('[data-test="login-button"]').click();
      cy.url().should('include', '/inventory.html');
      cy.get('.inventory_item', { timeout: 10000 }).should('have.length.at.least', 1);
    });
  
    it('Deve exibir exatamente 6 produtos na página', () => {
      cy.get('.inventory_item').should('have.length', 6);
    });
  });
  
  describe('Detalhes do Produto', () => {
    beforeEach(() => {
      cy.visit('https://www.saucedemo.com/');
      cy.get('[data-test="username"]').type('standard_user');
      cy.get('[data-test="password"]').type('secret_sauce');
      cy.get('[data-test="login-button"]').click();
      cy.url().should('include', '/inventory.html');
    });
  
    it('Deve abrir a página de detalhes de um produto e voltar', () => {
      cy.contains('.inventory_item_name', 'Sauce Labs Bolt T-Shirt').click();
      cy.url().should('include', '/inventory-item.html');
      cy.get('.inventory_details_name').should('have.text', 'Sauce Labs Bolt T-Shirt');
      cy.get('.inventory_details_desc').should('contain.text', 'Get your testing superhero on');
      cy.get('.inventory_details_price').should('have.text', '$15.99');
  
      cy.get('[data-test="back-to-products"]').click();
      cy.url().should('eq', 'https://www.saucedemo.com/inventory.html');
      cy.contains('Products').should('be.visible');
    });
  });
  
  describe('Compra Simples de Produto', () => {
    beforeEach(() => {
      cy.visit('https://www.saucedemo.com/');
      cy.get('[data-test="username"]').type('standard_user');
      cy.get('[data-test="password"]').type('secret_sauce');
      cy.get('[data-test="login-button"]').click();
      cy.url().should('include', '/inventory.html');
    });
  
    it('Deve comprar uma Bolt T-Shirt com sucesso', () => {
      cy.get('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
      cy.get('.shopping_cart_link').click();
      cy.get('[data-test="checkout"]').click();
  
      cy.get('[data-test="firstName"]').type('Carlos');
      cy.get('[data-test="lastName"]').type('Pereira');
      cy.get('[data-test="postalCode"]').type('98765');
      cy.get('[data-test="continue"]').click();
  
      cy.get('[data-test="finish"]').click();
  
      cy.url({ timeout: 10000 }).should('include', '/checkout-complete.html');
      cy.get('.complete-header', { timeout: 10000 })
        .should('be.visible')
        .and('have.text', 'Thank you for your order!');
    });
  });
  