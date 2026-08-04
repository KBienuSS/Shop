import axios from 'axios';

export const getOrder = (state) => state.orders.order;
export const getOrderSendingStatus = (state) => state.orders.sending;
export const getOrderSendingError = (state) => state.orders.error;

const createActionName = (actionName) => `app/order/${actionName}`;

const CHANGE_QUANTITY = createActionName('CHANGE_QUANTITY');
const DELETE_PRODUCT = createActionName('DELETE_PRODUCT');
const CHANGE_COMMENT = createActionName('CHANGE_COMMENT');
const ADD_PRODUCT = createActionName('ADD_PRODUCT');
const CLEAR_ORDER = createActionName('CLEAR_ORDER');
const SEND_ORDER_START = createActionName('SEND_ORDER_START');
const SEND_ORDER_SUCCESS = createActionName('SEND_ORDER_SUCCESS');
const SEND_ORDER_ERROR = createActionName('SEND_ORDER_ERROR');

export const changeQuantity = (productId, newQuantity) => ({
  type: CHANGE_QUANTITY,
  payload: { productId, newQuantity },
});

export const deleteProduct = (productId) => ({
  type: DELETE_PRODUCT,
  payload: productId,
});

export const changeComment = (productId, newComment) => ({
  type: CHANGE_COMMENT,
  payload: { productId, newComment },
});

export const addProduct = (product, quantity) => ({
  type: ADD_PRODUCT,
  payload: { product, quantity },
});

export const clearOrder = () => ({
  type: CLEAR_ORDER,
});

export const sendOrderStart = () => ({
  type: SEND_ORDER_START,
});

export const sendOrderSuccess = () => ({
  type: SEND_ORDER_SUCCESS,
});

export const sendOrderError = (error) => ({
  type: SEND_ORDER_ERROR,
  payload: error,
});

export const sendOrder = (orderData, contactData) => {
  return async (dispatch) => {
    dispatch(sendOrderStart());

    try {
      await axios.post('/api/orders', { order: orderData, contactData });
      dispatch(sendOrderSuccess());
      dispatch(clearOrder());
    } catch (error) {
      dispatch(sendOrderError(error.message));
    }
  };
};

const initialState = {
  order: {
    id: null,
    products: [],
  },
  sending: 'idle', // 'idle' | 'pending' | 'success' | 'error'
  error: null,
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_QUANTITY: {
      const { productId, newQuantity } = action.payload;

      return {
        ...state,
        order: {
          ...state.order,
          products: state.order.products.map((product) =>
            product.id === productId
              ? { ...product, quantity: newQuantity }
              : product
          ),
        },
      };
    }

    case CHANGE_COMMENT: {
      const { productId, newComment } = action.payload;

      return {
        ...state,
        order: {
          ...state.order,
          products: state.order.products.map((product) =>
            product.id === productId
              ? { ...product, comment: newComment }
              : product
          ),
        },
      };
    }

    case ADD_PRODUCT: {
      const { product, quantity } = action.payload;
      const existingProduct = state.order.products.find(
        (p) => p.id === product.id
      );

      const updatedProducts = existingProduct
        ? state.order.products.map((p) =>
            p.id === product.id
              ? { ...p, quantity: p.quantity + quantity }
              : p
          )
        : [
            ...state.order.products,
            {
              id: product.id,
              name: product.title,
              price: product.minPrice,
              quantity,
              comment: '',
            },
          ];

      return {
        ...state,
        order: {
          ...state.order,
          products: updatedProducts,
        },
      };
    }

    case DELETE_PRODUCT: {
      const productId = action.payload;

      return {
        ...state,
        order: {
          ...state.order,
          products: state.order.products.filter(
            (product) => product.id !== productId
          ),
        },
      };
    }

    case CLEAR_ORDER: {
      return {
        ...state,
        order: {
          ...state.order,
          products: [],
        },
      };
    }

    case SEND_ORDER_START: {
      return {
        ...state,
        sending: 'pending',
        error: null,
      };
    }

    case SEND_ORDER_SUCCESS: {
      return {
        ...state,
        sending: 'success',
      };
    }

    case SEND_ORDER_ERROR: {
      return {
        ...state,
        sending: 'error',
        error: action.payload,
      };
    }

    default:
      return state;
  }
};

export default orderReducer;