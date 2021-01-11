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

export const notice = (content) => {
  return {
    type: "NOTICE",
    data: {
      content,
    },
  };
};

export const clear = () => {
  return {
    type: "CLEAR",
  };
};

export default reducer;
