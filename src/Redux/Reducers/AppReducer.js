import actionType from "../Actions/actionType";

let initialState = {
  dataAPI: '',
  isPending: false,
  isFulfilled: false,
  isRejected: false,
};

const AppReducer = (prevState = initialState, { type, payload }) => {
  switch (type) {
    case actionType.getAPI + "_PENDING":
      return {
        ...prevState,
        isPending: true,
      };
    case actionType.getAPI + "_REJECTED":
      return {
        ...prevState,
        isRejected: true,
        isPending: false,
      };
    case actionType.getAPI + "_FULFILLED":
      return {
        ...prevState,
        isFulfilled: true,
        isPending: false,
        isRejected: false,
        dataAPI: payload.data.ticker
      };
    default:
      return prevState;
  }
};

export default AppReducer;
