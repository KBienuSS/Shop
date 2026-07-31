import products from './productsData';

export const getProducts = (state) => state.products.products;
export const getProductById = (id) => (state) => state.products.products.find((product) => product.id === Number(id));

const initialState = {
  products,
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default productsReducer;