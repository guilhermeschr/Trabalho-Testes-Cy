describe('Testes de Listagem de Produtos - SauceDemo', () => {

  beforeEach(() => {
    // arrange
    cy.visit('https://www.saucedemo.com/')
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('secret_sauce')

    // act
    cy.get('[data-test="login-button"]').click()
  })

  it('Deve finalizar um pedido com sucesso', () => {
    // arrange
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    cy.get('.shopping_cart_link').click()
    cy.get('[data-test="checkout"]').click()

    // act
    cy.get('[data-test="firstName"]').type('Guilherme')
    cy.get('[data-test="lastName"]').type('Horstmann')
    cy.get('[data-test="postalCode"]').type('12345')
    cy.get('[data-test="continue"]').click()
    cy.get('[data-test="finish"]').click()

    // assert
    cy.contains('Thank you for your order!').should('be.visible')
  })

  it('Deve ordenar os produtos por preço (do menor para o maior)', () => {
    // assert (confirma que está na página correta)
    cy.url().should('include', '/inventory.html')

    // assert (garante que os produtos carregaram)
    cy.get('.inventory_item', { timeout: 10000 }).should('have.length.at.least', 1)

    // act
    cy.get('body').then($body => {
      if ($body.find('[data-test="product_sort_container"]').length) {
        cy.get('[data-test="product_sort_container"]').select('lohi')
      } else if ($body.find('select.product_sort_container').length) {
        cy.get('select.product_sort_container').select('lohi')
      } else {
        cy.log('⚠️ Dropdown de ordenação não encontrado!')
        cy.screenshot('dropdown-nao-encontrado')
      }
    })

    // assert
    cy.get('.inventory_item_price').then($prices => {
      const priceTexts = [...$prices].map(el => parseFloat(el.innerText.replace('$', '')))
      const sortedPrices = [...priceTexts].sort((a, b) => a - b)
      expect(priceTexts).to.deep.equal(sortedPrices)
    })
  })

})
