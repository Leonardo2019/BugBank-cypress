/// <reference types='cypress'/>

import { faker } from '@faker-js/faker';

describe('Automação BugBank - Cypress', () => {
    beforeEach(() => {
        cy.visit('https://bugbank.netlify.app/')
    })

    it('Acessar Home e validar title', () => {
        cy.title().should('be.equal', 'BugBank | O banco com bugs e falhas do seu jeito')
    })

    it('Registrar usuário', () => {
        cy.get('.ihdmxA').should('be.visible').click()
        cy.get('div[class="styles__ContainerBackButton-sc-7fhc7g-1 jokugX"]')
            .parent('form').find('input[type="email"]').type(faker.internet.email(),{force:true})
        
        cy.get('input[type="name"]').type(faker.name.fullName(), {force:true})
        cy.get(':nth-child(4) > .style__ContainerFieldInput-sc-s3e9ea-0 > .input__default')
            .type('123456', {force:true})
        cy.get(':nth-child(5) > .style__ContainerFieldInput-sc-s3e9ea-0 > .input__default')
            .type('123456', {force:true})
        cy.contains('Cadastrar').click({force:true})
        cy.get('#modalText').should('contain', 'criada com sucesso').should('be.visible')
        cy.get('#btnCloseModal').should('be.visible').click()
    })
})