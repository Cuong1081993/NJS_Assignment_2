const error = (store) => (next) => (action) => {
  if (action.type === "showError") {
    return next(action);
  }
  next(action);
};

export default error;
