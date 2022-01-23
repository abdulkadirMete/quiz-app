const reducer = (state, action) => {
  switch (action.type) {
    case 1:
      return { ...state, isLoading: false };
    default:
      throw new Error(`no mathching "${action.type}" action type`);
  }
};
export default reducer;
