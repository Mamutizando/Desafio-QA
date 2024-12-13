const faker = require("faker-br");

describe('Carrinho de compra', () => {
    it('Preenche o carrinho de compras de forma funcional (com dados válidos), incluindo vários produtos e após o cupom e finalizando a compra', () => {
        cy.visit('/')
        cy.wait(1000)

        cy.contains('span', 'QA Store Desafio').should('be.exist')
        cy.contains('span', 'QA Store Desafio').click()
        cy.contains('strong', 'Categoria Nível 1').should('be.visible')
        cy.contains('strong', 'Categoria Nível 1').click()

        cy.get('ul.row-fluid').find('li.span3').should('have.length', 3)
        cy.get('[data-id="118475039"]')
            .find('#Componente_22_3')
            .invoke('removeAttr', 'disabled', 'disabled')
            .invoke('css', 'display', 'inline-block')
            .click()

        cy.wait(500)
        cy.contains('a', 'Continuar comprando').should('be.visible')
        cy.contains('a', 'Continuar comprando').click()

        cy.get('[data-id="118475040"]')
            .find('#Componente_22_3')
            .invoke('removeAttr', 'disabled', 'disabled')
            .invoke('css', 'display', 'inline-block')
            .click()

        cy.wait(500)
        cy.contains('a', 'Continuar comprando').should('be.visible')
        cy.contains('a', 'Continuar comprando').click()

        cy.get('[data-id="118475038"]')
            .find('#Componente_22_3')
            .invoke('removeAttr', 'disabled', 'disabled')
            .invoke('css', 'display', 'inline-block')
            .click()

        cy.get('#usarCupom').should('be.visible')
        const optionsCupom = ["10OFF", "30REAIS", "AJJFLWBHH"];
        const randomCupom = optionsCupom[Math.floor(Math.random() * optionsCupom.length)];
        cy.get('#usarCupom').type(randomCupom);
        cy.contains('button', 'Usar cupom').should('be.visible')
        cy.contains('button', 'Usar cupom').click()

        cy.get('#calcularFrete').should('be.visible')
        cy.get('#calcularFrete').type(faker.address.zipCodeValid())
        cy.get('#btn-frete').should('be.enabled')
        cy.get('#btn-frete').click()

        cy.get('div.formas-envio').find('[name="formaEnvio"]').last().click()
        cy.contains('button', 'Finalizar compra').should('be.enabled').should('be.visible')
        cy.contains('button', 'Finalizar compra').click()

        cy.get('#id_email_login').type(faker.internet.email())
        cy.contains('a', 'Continuar').should('be.visible')
        cy.contains('a', 'Continuar').click()

        cy.wait(1000)
        cy.get('#id_nome').should('be.enabled')
        cy.get('#id_nome').type(faker.name.findName())
        cy.get('#id_cpf').should('be.enabled')
        cy.get('#id_cpf').type(faker.br.cpf())

        cy.get('#id_telefone_celular').should('be.enabled')
        const celNumbers = ["55996909991", "54999152386", "11987241830"];
        const randomCelNumbers = celNumbers[Math.floor(Math.random() * celNumbers.length)];
        cy.get('#id_telefone_celular').type(randomCelNumbers);

        cy.get('#id_telefone_principal').should('be.enabled')
        const telNumbers = ["5537395020", "5435901486", "1120106080"];
        const randomTelNumbers = telNumbers[Math.floor(Math.random() * telNumbers.length)];
        cy.get('#id_telefone_principal').type(randomTelNumbers);

        cy.get('#id_numero').should('exist')
        cy.get('#id_numero').type('805e')
        cy.get('#id_complemento').should('exist')
        cy.get('#id_complemento').type('Supermercado Tricolor')
        cy.get('#id_referencia').should('exist')
        cy.get('#id_referencia').type('Entrada a esquerda do supermercado')

        cy.get('#pagamento_erro').should('contain.text', 'Não existem formas de pagamento configuradas na loja.')

        cy.get('#finalizarCompra').should('be.enabled').should('be.visible')
        cy.get('#finalizarCompra').click({force: true})
        cy.get('div.fancybox-outer')
            .contains('h5', 'Selecione uma forma de pagamento')
            .should('be.visible')
            .should('contain.text', 'Selecione uma forma de pagamento')
        cy.get('a.fancybox-close').should('exist')
        cy.get('a.fancybox-close').click()
    })
})