import axios from 'axios';

export const getProducts = (state) => state.products.data;
export const getProductById = (id) => (state) =>
  state.products.data.find((product) => product.id === Number(id));
export const getProductsLoadingStatus = (state) => state.products.loading;
export const getProductsError = (state) => state.products.error;

const createActionName = (actionName) => `app/products/${actionName}`;

const FETCH_PRODUCTS_START = createActionName('FETCH_PRODUCTS_START');
const FETCH_PRODUCTS_SUCCESS = createActionName('FETCH_PRODUCTS_SUCCESS');
const FETCH_PRODUCTS_ERROR = createActionName('FETCH_PRODUCTS_ERROR');

export const fetchProductsStart = () => ({
  type: FETCH_PRODUCTS_START,
});

export const fetchProductsSuccess = (products) => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: products,
});

export const fetchProductsError = (error) => ({
  type: FETCH_PRODUCTS_ERROR,
  payload: error,
});

export const fetchProducts = () => {
  return async (dispatch) => {
    dispatch(fetchProductsStart());

    try {
      const response = await axios.get('/api/products');
      dispatch(fetchProductsSuccess(response.data));
    } catch (error) {
      dispatch(fetchProductsError(error.message));
    }
  };
};

const initialState = {
  data: [],
  loading: 'idle', // 'idle' | 'pending' | 'success' | 'error'
  error: null,
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_START: {
      return {
        ...state,
        loading: 'pending',
        error: null,
      };
    }

    case FETCH_PRODUCTS_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        loading: 'success',
      };
    }

    case FETCH_PRODUCTS_ERROR: {
      return {
        ...state,
        loading: 'error',
        error: action.payload,
      };
    }

    default:
      return state;
  }
};

export default productsReducer;