describe('Autenticação', () => {
    beforeEach(() => {
        cy.visit('https://www.saucedemo.com/')
    })

    it('Deve realizar o login com sucesso', () => {
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()

        cy.url().should('eq', 'https://www.saucedemo.com/inventory.html')
        cy.contains('Products').should('be.visible')
    })

    it('Deve realizar o logout', () => {
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()
        cy.get('#react-burger-menu-btn').click()
        cy.get('[data-test="logout-sidebar-link"]').click()

        cy.url().should('eq', 'https://www.saucedemo.com/')
        cy.contains('Login').should('be.visible')
    })

    it('Deve exibir mensagem de erro ao tentar logar com usuário bloqueado', () => {
        cy.get('[data-test="username"]').type('locked_out_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()

        cy.get('[data-test="error"]').should('be.visible')
            .and('contain', 'Sorry, this user has been locked out.')
    })
})