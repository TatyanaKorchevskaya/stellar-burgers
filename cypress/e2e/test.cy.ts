const API_URL = 'https://norma.nomoreparties.space/api';
beforeEach(() => {
    window.localStorage.setItem('refreshToken', 'testRefreshToken');
    cy.setCookie('accessToken', 'testAccessToken');

    cy.fixture('user.json').then((user) => {
        cy.intercept(
            {
                method: 'GET',
                url: `${API_URL}/auth/user`
            }, user
        ).as('getUser');
    });

    cy.visit('http://localhost:4000');
    cy.wait('@getUser')
})

afterEach(() => {
    cy.clearAllCookies();
    cy.clearAllLocalStorage();
});

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

        cy.get('[data-cy="modalIngredient"]', { timeout: 10000 });
        cy.get('[data-cy=modalCloseBtn]').click();
    });

    it('testing orders', () => {
        cy.reload();

        cy.fixture('orders.json').then((orders) => {
            cy.intercept(
                {
                    method: 'GET',
                    url: `${API_URL}/orders/all`
                }, orders
            ).as('getOrders');
        });

        cy.visit('http://localhost:4000');

        cy.wait('@getOrders');

        cy.get('[data-cy="bun_0"] + button').click({ force: true });
        cy.get('[data-cy="ingredient_0"] + button').click({ force: true, multiple: true });

        cy.get('[data-cy="newOrderBtn"]').click({ force: true });

        cy.fixture('newOrder.json').then((order) => {
            cy.intercept(
                {
                    method: 'POST',
                    url: `${API_URL}/orders`
                }, order
            ).as('newOrder');
        });

        cy.wait('@newOrder');

        cy.fixture('newOrder.json').then((order) => {
            cy.get('[data-cy="newOrderNumber"]').contains(order.order.number);
            cy.get('[data-cy=modalCloseBtn]').click();

            cy.get('[data-cy="bunConstructor"]').contains('Выберите булки');
            cy.get('[data-cy="ingredientConstructor"]').contains('Выберите начинку');
        });



    });


})