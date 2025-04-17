// describe('проверяем доступность приложения', function() {
//     it('сервис должен быть доступен по адресу localhost:5173', function() {
//         cy.visit('http://localhost:4000'); 
//     });
// });

const API_URL = 'https://norma.nomoreparties.space/api';

describe('cypress test', () => {
    it('fetch ingredients', () => {
        cy.fixture('ingredients.json').then((ingredients) => {
            cy.intercept(
                {
                    method: 'GET',
                    url: `${API_URL}/ingredients`
                }, ingredients
            ).as('getIngedients');
        });
    });

    // it('testing constructor', ()=>{

    // });

    it('testing open and close modal ingredient', () => {
        cy.fixture('ingredients.json').then((ingredients) => {
            cy.intercept(
                {
                    method: 'GET',
                    url: `${API_URL}/ingredients`
                }, ingredients
            ).as('getIngedients');
        });

        cy.visit('http://localhost:4000');
        cy.wait('@getIngedients');

        const ingredientElement = cy.get('[data-cy="bun_0"]')
        ingredientElement.click({ force: true });
        // cy.screenshot('file1', { timeout: 1000 })
        cy.get('[data-cy="modalIngredient"]', { timeout: 10000 });
        cy.get('[data-cy=modalCloseBtn]').click();
    });

    it('testing orders', () => {
        cy.fixture('user.json').then((user) => {
            cy.intercept(
                {
                    method: 'GET',
                    url: `${API_URL}/auth/user`
                }, user
            ).as('getUser');
        });

        cy.fixture('orders.json').then((orders) => {
            cy.intercept(
                {
                    method: 'GET',
                    url: `${API_URL}/orders/all`
                }, orders
            ).as('getOrders');
        });

        cy.visit('http://localhost:4000');
        // cy.wait('@getUser');
        cy.wait('@getOrders');

        cy.get('[data-cy="bun_0"]').click({ force: true });
        cy.get('[data-cy="ingredient_0"]').click({ force: true, multiple: true });
        cy.screenshot('constructor', { timeout: 1000 });

    });

    // it('ждёт ответа API перед поиском элементов', () => {
    //     cy.intercept('GET', '/api/data').as('getData');
    //     cy.visit('/my-page');
    //     cy.wait('@getData');
    //     cy.get('.loaded-element').should('exist');
    //   });
})