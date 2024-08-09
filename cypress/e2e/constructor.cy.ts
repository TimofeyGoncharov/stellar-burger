import * as orderFixture from '../fixtures/order.json';

describe('E2E test construcror burger', () => {
  const dataIngredientSelector = '[data-ingredient="bun"]';
  const dataIngredientSelectorFirstType = `${dataIngredientSelector}:first-of-type`;
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients' });

    cy.visit('/');
  });

  it('Array ingredients for select', () => {
    cy.get(dataIngredientSelector).should('have.length.at.least', 1);
    cy.get('[data-ingredient="main"],[data-ingredient="sauce"]').should(
      'have.length.at.least',
      1
    );
  });

  describe('Check work modal description ingredients', () => {
    describe('Check open modal', () => {
      it('open card modal', () => {
        cy.get(dataIngredientSelectorFirstType).click();
        cy.get('#modals').children().should('have.length', 2);
      });

      it('modal in ingredients open -> reload page', () => {
        cy.get(dataIngredientSelectorFirstType).click();
        cy.reload(true);
        cy.get('#modals').children().should('have.length', 2);
      });
    });

    describe('Check close modal', () => {
      it('Click button "x"', () => {
        cy.get(dataIngredientSelectorFirstType).click();
        cy.get('#modals button:first-of-type').click();
        cy.wait(500);
        cy.get('#modals').children().should('have.length', 0);
      });

      it('Click overlay', () => {
        cy.get(dataIngredientSelectorFirstType).click();
        cy.get('#modals>div:nth-of-type(2)').click({ force: true });
        cy.wait(500);
        cy.get('#modals').children().should('have.length', 0);
      });

      it('Click Escape', () => {
        cy.get(dataIngredientSelectorFirstType).click();
        cy.get('body').type('{esc}');
        cy.wait(500);
        cy.get('#modals').children().should('have.length', 0);
      });
    });
  });

  describe('Process registration order', () => {
    beforeEach(() => {
      cy.setCookie('accessToken', 'EXAMPLE_ACCESS_TOKEN');
      localStorage.setItem('refreshToken', 'EXAMPLE_REFRESH_TOKEN');

      cy.intercept('GET', 'api/auth/user', { fixture: 'user' });
      cy.intercept('POST', 'api/orders', { fixture: 'order' });
      cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients' });

      cy.visit('/');
    });

    it('Registration after auth', () => {
      cy.get('[data-order-button]').should('be.disabled');
      cy.get(`${dataIngredientSelector}:first-of-type button`).click();
      cy.get('[data-order-button]').should('be.disabled');
      cy.get('[data-ingredient="main"]:first-of-type button').click();
      cy.get('[data-order-button]').should('be.enabled');

      cy.get('[data-order-button]').click();

      cy.get('#modals').children().should('have.length', 2);

      cy.get('#modals h2:first-of-type').should(
        'have.text',
        orderFixture.order.number
      );

      cy.get('[data-order-button]').should('be.disabled');
    });

    afterEach(() => {
      cy.clearCookie('accessToken');
      localStorage.removeItem('refreshToken');
    });
  });
});
