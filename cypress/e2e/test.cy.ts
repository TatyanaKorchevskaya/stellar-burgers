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
        })
    })
})