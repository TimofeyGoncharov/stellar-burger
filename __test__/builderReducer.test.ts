import {
  setBun,
  addIngredient,
  removeIngredient,
  moveIngredient,
  resetConstructor,
  constructorInitialState
} from '../src/services/slices';

import reducer from '../src/services/slices/builder';

const bulkaMock = {
  _id: '643d69a5c3f7b9001cfa093c',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
  __v: 0
};

const ingredientFirstMock = {
  _id: '643d69a5c3f7b9001cfa093e',
  id: '1234567890',
  name: 'Филе Люминесцентного тетраодонтимформа',
  type: 'main',
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  price: 988,
  image: 'https://code.s3.yandex.net/react/code/meat-03.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
  __v: 0
};

const ingredientSecondMock = {
  _id: '643d69a5c3f7b9001cfa093e',
  id: '0987654321',
  name: 'Филе Люминесцентного тетраодонтимформа',
  type: 'main',
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  price: 988,
  image: 'https://code.s3.yandex.net/react/code/meat-03.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
  __v: 0
};

describe('builderReducer', () => {
  describe('work bulk`s', () => {
    test('setBun', () => {
      const state = reducer(constructorInitialState, setBun(bulkaMock));

      expect(state.bun).toEqual(bulkaMock);

      expect(state.ingredients).toHaveLength(0);
    });

    test('addIngredient', () => {
      const state = reducer(constructorInitialState, addIngredient(bulkaMock));

      const updatedObject = { ...state.bun } as Record<string, any>;
      delete updatedObject.id;

      expect(updatedObject).toEqual(bulkaMock);
      expect(state.ingredients).toHaveLength(0);
    });
  });

  describe('work ingedients', () => {
    test('add ingedient', () => {
      const state = reducer(
        constructorInitialState,
        addIngredient(ingredientFirstMock)
      );

      expect(state.ingredients).toHaveLength(1);

      const updatedObject = { ...state.ingredients[0] } as Record<string, any>;
      delete updatedObject.id;

      const initialObject = { ...ingredientFirstMock } as Record<string, any>;
      delete initialObject.id;

      expect(updatedObject).toEqual(initialObject);

      expect(state.bun).toBeNull();
    });

    test('delete ingedient', () => {
      const _initialState = {
        bun: null,
        ingredients: [ingredientFirstMock, ingredientSecondMock]
      };

      const state = reducer(
        _initialState,
        removeIngredient(ingredientFirstMock.id)
      );

      expect(state.ingredients).toHaveLength(1);
      expect(state.ingredients[0]).toEqual(ingredientSecondMock);
      expect(state.bun).toBeNull();
    });

    describe('move ingedients', () => {
      test('move down', () => {
        const _initialState = {
          bun: null,
          ingredients: [ingredientFirstMock, ingredientSecondMock]
        };

        const state = reducer(
          _initialState,
          moveIngredient({ index: 0, upwards: false })
        );

        expect(state.ingredients).toHaveLength(2);
        expect(state.ingredients[0]).toEqual(ingredientSecondMock);
        expect(state.ingredients[1]).toEqual(ingredientFirstMock);
        expect(state.bun).toBeNull();
      });

      test('move up', () => {
        const _initialState = {
          bun: null,
          ingredients: [ingredientFirstMock, ingredientSecondMock]
        };

        const state = reducer(
          _initialState,
          moveIngredient({ index: 1, upwards: true })
        );

        expect(state.ingredients).toHaveLength(2);
        expect(state.ingredients[0]).toEqual(ingredientSecondMock);
        expect(state.ingredients[1]).toEqual(ingredientFirstMock);
        expect(state.bun).toBeNull();
      });
    });
  });

  test('clear constructor', () => {
    const _initialState = {
      bun: bulkaMock,
      ingredients: [ingredientFirstMock, ingredientSecondMock]
    };

    const state = reducer(_initialState, resetConstructor());

    expect(state.ingredients).toHaveLength(0);
    expect(state.bun).toBeNull();
  });
});
