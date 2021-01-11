const reducer = (state = "", action) => {
  switch (action.type) {
    case "SET_FILTER": {
      const content = action.content;
      return content;
    }
    default:
      return state;
  }
};

export const set_filter = (content) => {
  return {
    type: "SET_FILTER",
    content,
  };
};

export default reducer;
