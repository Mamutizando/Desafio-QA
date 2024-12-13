const faker = require("faker-br");

describe('Carrinho de compra', () => {
    it('Preenche o carrinho de compras de forma funcional (com dados válidos), incluindo um produto e após o cupom e finalizando a compra', () => {
        cy.visit('/')
        cy.wait(1000)

        cy.contains('span', 'QA Store Desafio').should('be.visible')
        cy.contains('span', 'QA Store Desafio').click()
        cy.contains('strong', 'PRODUTO').should('be.visible')
        cy.contains('strong', 'PRODUTO').click()

        cy.contains('h1', 'PRODUTO')
            .should('exist')
            .should('be.visible')
        cy.get('ul.row-fluid').find('li.span3').should('have.length', 40)
        cy.contains('a', '[PESO] Produto com peso igual a 50kg').should('be.visible')
        cy.contains('a', '[PESO] Produto com peso igual a 50kg').click()

        cy.contains('span', ' Estoque: ').should('be.visible')
        cy.get('[class="comprar"]')
            .find('span.disponibilidade-produto')
            .contains('b.cor-principal', ' Disponível ')
            .should('contain.text', 'Disponível')

        cy.contains('a', 'Comprar').should('be.visible')
        cy.contains('a', 'Comprar').click()

        cy.get('#calcularFrete').should('be.visible')
        cy.get('#calcularFrete').type(faker.address.zipCodeValid())
        cy.contains('a', 'Não sei meu CEP').should('have.text', 'Não sei meu CEP')
        cy.get('#btn-frete').should('be.visible')
        cy.get('#btn-frete').click()
        cy.get('[name="formaEnvio"]').should('exist')
        cy.get('[name="formaEnvio"]').click()
        cy.contains('b.prazo', '1 dia útil').should('have.text', '1 dia útil')
        cy.contains('span.valor', 'R$ 0,00').should('have.text', 'R$ 0,00')
        cy.contains('span.nome', 'Retirar pessoalmente').should('have.text', 'Retirar pessoalmente')

        cy.get('#usarCupom').should('be.visible')
        const optionsCupom = ["10OFF", "30REAIS", "AJJFLWBHH"];
        const randomCupom = optionsCupom[Math.floor(Math.random() * optionsCupom.length)];
        cy.get('#usarCupom').type(randomCupom);
        cy.get('#btn-cupom').should('be.visible')
        cy.get('#btn-cupom').click()

        cy.contains('b', 'Cupom de desconto:').should('contain.text', 'Cupom de desconto:')
        cy.get('[title="Remover cupom"]').should('be.visible')
        cy.contains('div.cupom-valor', 'Cupom ativo').should('contain.text', 'Cupom ativo')

        cy.contains('button', 'Finalizar compra').should('be.visible')
        cy.contains('button', 'Finalizar compra').click()

        cy.get('#id_email_login').type(faker.internet.email())
        cy.contains('a', 'Continuar').should('be.visible')
        cy.contains('a', 'Continuar').click()

        cy.get('div.checkout-alerta-seguro')
            .contains('h3', 'Usamos seu e-mail de forma 100% segura para:')
            .should('contain.text', 'Usamos seu e-mail de forma 100% segura para:')

        cy.get('ul.checkout-alerta-seguro-list').then(() => {
            cy.contains('span', 'Identificar seu perfil').should('contain.text', 'Identificar seu perfil')
            cy.contains('span', 'Notificar sobre o andamento do seu pedido').should('contain.text', 'Notificar sobre o andamento do seu pedido')
            cy.contains('span', 'Gerenciar seu histórico de compras').should('contain.text', 'Gerenciar seu histórico de compras')
            cy.contains('span', 'Acelerar o preenchimento de suas informações').should('contain.text', 'Acelerar o preenchimento de suas informações')
        })

        cy.wait(1000)
        cy.get('#id_nome').should('exist')
        cy.get('#id_nome').type(faker.name.findName())
        cy.get('#id_cpf').should('exist')
        cy.get('#id_cpf').type(faker.br.cpf())

        cy.get('#id_telefone_celular').should('exist')
        const celNumbers = ["55996909991", "54999152386", "11987241830"];
        const randomCelNumbers = celNumbers[Math.floor(Math.random() * celNumbers.length)];
        cy.get('#id_telefone_celular').type(randomCelNumbers);

        cy.get('#id_telefone_principal').should('exist')
        const telNumbers = ["5537395020", "5435901486", "1120106080"];
        const randomTelNumbers = telNumbers[Math.floor(Math.random() * telNumbers.length)];
        cy.get('#id_telefone_principal').type(randomTelNumbers);

        cy.get('#id_numero').should('exist')
        cy.get('#id_numero').type('805e')
        cy.get('#id_complemento').should('exist')
        cy.get('#id_complemento').type('Supermercado Tricolor')
        cy.get('#id_referencia').should('exist')
        cy.get('#id_referencia').type('Entrada a esquerda do supermercado')

        cy.get('#finalizarCompra').should('be.visible')
        cy.get('#finalizarCompra').click({force: true})
        cy.get('div.fancybox-outer')
            .contains('h5', 'Selecione uma forma de pagamento')
            .should('be.visible')
            .should('contain.text', 'Selecione uma forma de pagamento')
        cy.get('a.fancybox-close').should('exist')
        cy.get('a.fancybox-close').click()
    })
})