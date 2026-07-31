import order from './orderData';

export const getOrder = (state) => state.order.order;

const initialState = {
  order,
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default orderReducer;