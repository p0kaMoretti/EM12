/// <reference types="cypress" />
const perfil = require('../fixtures/perfil.json')
import EnderecoPage from '../support/page_objects/endereco.page';
const dadosEndereco = require('../fixtures/endereco.json')

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    /*  Como cliente 
        Quero acessar a Loja EBAC 
        Para fazer um pedido de 4 produtos 
        Fazendo a escolha dos produtos
        Adicionando ao carrinho
        Preenchendo todas opções no checkout
        E validando minha compra ao final */

    beforeEach(() => {
        cy.visit('/')
    });

    it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
        var quantidade = 1
        //TODO 
        cy.get('.icon-user-unfollow').click()
        cy.fixture('perfil').then(dados => {
            cy.get('#username').type(dados.usuario)
            cy.get('#password').type(dados.senha, {log: false})
            cy.get('.woocommerce-form > .button').click()
        })
        cy.get('#primary-menu > .menu-item-536 > .dropdown-toggle').click()
        cy.addProdutos('Ingrid Running Jacket', 'M', 'Red')
        cy.addProdutos('Autumn Pullie', 'XS', 'Red')
        cy.addProdutos('Cassia Funnel Sweatshirt', 'S', 'Orange')
        cy.addProdutos('Eos V-Neck Hoodie', 'XL', 'Green')
        cy.get('.dropdown-toggle > .text-skin > .icon-basket').click()
        cy.get('#cart > .dropdown-menu > .widget_shopping_cart_content > .mini_cart_content > .mini_cart_inner > .mcart-border > .buttons > .checkout').click()
        EnderecoPage.editarEnderecoFaturamento(
            dadosEndereco[2].nome,
            dadosEndereco[2].sobrenome,
            dadosEndereco[2].empresa,
            dadosEndereco[2].pais,
            dadosEndereco[2].endereco,
            dadosEndereco[2].numero,
            dadosEndereco[2].cidade,
            dadosEndereco[2].estado,
            dadosEndereco[2].cep,
            dadosEndereco[2].telefono,
            dadosEndereco[2].email
            )
            cy.get('#payment_method_cod').click()
            cy.get('#terms').click()
            cy.get('#place_order').click()


    });


})