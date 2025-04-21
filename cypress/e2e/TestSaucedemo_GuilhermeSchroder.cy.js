describe('Login', ()=>{
    //Sempre antes de um teste rodar executa isso,
    //Abre o site
    beforeEach(() => {
        cy.visit('https://www.saucedemo.com/')
    })

    it('Deve realizar o login com sucesso',() => {
        //Arrage
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        //act
        cy.get('[data-test="login-button"]').click()
        //Assert
        cy.url().should('eq', 'https://www.saucedemo.com/inventory.html')
        cy.contains('Products').should('be.visible')
    })

    it('Deve realizar o logout',() => {
        //Arrage
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()
        cy.get('#react-burger-menu-btn').click()
        //act
        cy.get('[data-test="logout-sidebar-link"]').click()
        //Assert
        cy.url().should('eq', 'https://www.saucedemo.com/')
        cy.contains('Login').should('be.visible')
    })
})

describe('Carrinho', ()=>{
    //Sempre antes de um teste rodar executa isso,
    //Abre o site e loga
    beforeEach(() => {
        cy.visit('https://www.saucedemo.com/')
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()
    })

    it('Deve adicionar produto ao carrinho',() => {
        //act
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('[data-test="shopping-cart-link"]').click()
        //Assert
        cy.contains('1').should('be.visible')
        cy.contains('Sauce Labs Backpack').should('be.visible')
    })

    it('Deve retirar produto ao carrinho',() => {
        //arrange
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('[data-test="shopping-cart-link"]').click()
        //act
        cy.get('[data-test="remove-sauce-labs-backpack"]').click()
        //Assert
        cy.contains('Sauce Labs Backpack').should('not.exist')
    })


})