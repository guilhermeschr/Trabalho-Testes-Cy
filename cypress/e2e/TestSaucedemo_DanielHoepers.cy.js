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