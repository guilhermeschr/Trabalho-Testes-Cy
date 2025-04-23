describe('Autenticação', () => {
    beforeEach(() => {
        cy.visit('https://www.saucedemo.com/')
    })


    it('Deve exibir mensagem de erro ao tentar logar com usuário bloqueado', () => {
        cy.get('[data-test="username"]').type('locked_out_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()

        cy.get('[data-test="error"]').should('be.visible')
            .and('contain', 'Sorry, this user has been locked out.')
    })

    


    
})

describe('Página de Produtos', () => {
    beforeEach(() => {
        cy.visit('https://www.saucedemo.com/')
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()
    })

    it('Deve exibir produtos na página', () => {

        cy.url().should('eq', 'https://www.saucedemo.com/inventory.html')
        cy.contains('Products').should('be.visible')
        cy.get('.inventory_item').should('have.length.greaterThan', 0)
        cy.get('.inventory_item').each(($el) => {
        cy.wrap($el).find('[data-test="add-to-cart-sauce-labs-backpack"]').should('be.visible')
        })
    })
})