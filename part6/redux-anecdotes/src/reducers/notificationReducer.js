const initialState = { content: "initial state", visibility: "hidden" };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "NOTICE": {
      const content = action.data.content;
      return { content: `You voted '${content}'`, visibility: "visible " };
    }
    case "CLEAR": {
      return { content: "", visibility: "hidden" };
    }
    default:
      return state;
  }
};

export const setNotice = (content, time) => {
  return (dispatch) => {
    dispatch({
      type: "NOTICE",
      data: {
        content,
      },
    });
    setTimeout(() => {
      dispatch({
        type: "CLEAR",
      });
    }, time * 1000);
  };
};

export default reducer;
