describe("Testes de Listagem de Produtos - SauceDemo", () => {

  beforeEach(() => {
    // arrange
    cy.visit("https://www.saucedemo.com/");
  });

  it("Deve mostrar erro ao realizar login com campos não preenchidos", () => {
    // arrange

    // act
    cy.get("[data-test=\"login-button\"]").click();

    // assert
    cy.get("[data-test=\"error\"]")
      .should("be.visible")
      .contains("Username is required");
  });

  it("Deve remover itens do carrinho ao restaurar estado da aplicação", () => {
    // arrange
    cy.get("[data-test=\"username\"]").type("standard_user");
    cy.get("[data-test=\"password\"]").type("secret_sauce");
    cy.get("[data-test=\"login-button\"]").click();
    cy.get("[data-test=\"add-to-cart-sauce-labs-backpack\"]").click();
    cy.get("[data-test=\"add-to-cart-sauce-labs-bike-light\"]").click();
    cy.get("[data-test=\"shopping-cart-link\"]").click();
    cy.get("#react-burger-menu-btn").click();

    // act
    cy.get("[data-test=\"reset-sidebar-link\"]").click();

    // assert
    cy.get("[data-test=\"inventory-item\"]").then($items => {
      expect($items.length).to.equal(0, "O carrinho deve estar vazio");
    });
  });
});
