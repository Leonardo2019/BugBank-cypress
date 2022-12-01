/// <reference types='cypress'/>

// import { slowCypressDown } from 'cypress-slow-down'
// slowCypressDown(500)

describe('Automação BugBank - Cypress', () => {
    beforeEach(() => {
        cy.visit('https://bugbank.netlify.app/')
        cy.reload()

    })
        let email = 'teste@silva.com.br'
        let passwordNumber = '97251617'

    it('Acessar Home e validar title', () => {
        cy.title().should('be.equal', 'BugBank | O banco com bugs e falhas do seu jeito')
    })

    it('Registrar Usuário',  () => {
        
        cy.get('.ihdmxA').should('be.visible').click()
        cy.get('div[class="styles__ContainerBackButton-sc-7fhc7g-1 jokugX"]')
            .parent('form').find('input[type="email"]').type('teste@silva.com.br',{force:true})
            
        cy.get('input[type="name"]').type('Nome teste', {force:true})
        cy.get(':nth-child(4) > .style__ContainerFieldInput-sc-s3e9ea-0 > .input__default')
            .type(`${passwordNumber}`, {force:true})
        cy.get(':nth-child(5) > .style__ContainerFieldInput-sc-s3e9ea-0 > .input__default')
            .type(passwordNumber, {force:true})
        cy.get('#toggleAddBalance').click({force:true})
        cy.contains('Cadastrar').click({force:true})
        cy.get('#modalText').should('contain', 'criada com sucesso').should('be.visible')
        cy.get('#btnCloseModal').should('be.visible').click()
    })

    it('Link - Conheça nossos requisitos', () => {
        cy.get('.styles__Link-sc-osobjw-0').click()
        cy.get('[id="accordionLogin"]').should('have.text', 'Login').click()
        cy.get('#textAccordionLogin').should('contain', '- Email e Senha são campos obrigatórios.')
        cy.get('[id="accordionLogin"]').click()

        cy.get('#accordionCadastro').should('have.text', 'Cadastro').click()
        cy.get('#textAccordionCadastro').should('contain', '- Os campos Nome, Email, Senha e Confirmação de senha são de preenchimento obrigatório')
        cy.get('#accordionCadastro').should('have.text', 'Cadastro').click()

        cy.get('#accordionTransferência').should('have.text', 'Transferência').click()
        cy.get('#textAccordionTransferência').should('contain', '- Só é permitido transferência para contas válidas')
        cy.get('#accordionTransferência').should('have.text','Transferência').click()

        cy.get('#accordionPagamento').should('have.text', 'Pagamento').click()
        cy.get('#textAccordionPagamento').should('contain', '- Em desenvolvimento')
        cy.get('#accordionPagamento').should('have.text', 'Pagamento').click()

        cy.get('#accordionExtrato').should('have.text', 'Extrato').click()
        cy.get('#textAccordionExtrato').should('contain', '- Deve exibir o saldo disponível no momento')
        cy.get('#accordionExtrato').should('have.text', 'Extrato').click()

        cy.get('#accordionSaque').should('have.text', 'Saque').click()
        cy.get('#textAccordionSaque').should('contain', '- Em desenvolvimento')
        cy.get('#accordionSaque').should('have.text', 'Saque').click()

        cy.get('.requirements__Footer-sc-bu3ztf-7 > .requirements__Text-sc-bu3ztf-8')
            .should('have.text', 'Obrigado por escolher o nosso banco')

        cy.get('.requirements__ContentImage-sc-bu3ztf-4 > .requirements__Text-sc-bu3ztf-8')
            .should('have.text', 'Gostou do projeto e quer contribuir?')

        cy.get('#btnBack').should('have.text', 'Voltar').click()

    })

    it('Altera texto - invoke', () => {
        cy.get('.pages__Title-sc-1ee1f2s-4').invoke('text', 'Teste altera texto home')
    })

    it('Validar mascara campo password', () => {
        let pass = passwordNumber

        cy.get('.ihdmxA').should('be.visible').click()
        cy.get('input[type="email"]').eq(1).type( email, {force:true})
            // .parent('form').find('input[type="email"]')
            
        cy.get('input[type="name"]').type('Leonardo Teste', {force:true})
        cy.get('input[type="password"]').eq(1)
            .type(passwordNumber,{force:true}).then(() => {
                expect(pass).be.equal(passwordNumber)
            })
            
        cy.get('input[type="password"]').eq(2)
            .type(passwordNumber, {force:true})

        cy.contains('Cadastrar').click({force:true})
        cy.get('#modalText').should('contain', 'criada com sucesso').should('be.visible')
        cy.get('#btnCloseModal').should('be.visible').click()
    })

    it('Logar com usuário cadastrado',() => {
        cy.get('input[type="email"]').eq(0).type(email)
        cy.get('input[type="password"]').eq(0).type(passwordNumber)
        cy.get('button[class="style__ContainerButton-sc-1wsixal-0 otUnI button__child"]').click()
        cy.get('#btnCloseModal').should('be.visible').click()
    })

    
})