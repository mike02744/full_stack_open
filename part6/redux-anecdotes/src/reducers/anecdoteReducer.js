const initialState = []

const reducer = (state = initialState, action) => {
  console.log("state now: ", state);
  console.log("action", action);
  switch (action.type) {
    case "UPVOTE": {
      const id = action.data.id;
      const anecdoteToChange = state.find((n) => n.id === id);
      const changedAnecdotes = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1,
      };
      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : changedAnecdotes
      );
    }
    case "NEW_ANECDOTE": {
      return [...state, action.anecdote];
    }
    case "INIT_ANECDOTES": {
      return  action.data;
    }
    default:
      return state;
  }
};
export const initializeAnecdote = (anecdotes) => {
  return {
    type: "INIT_ANECDOTES",
    data: anecdotes,
  };
};

export const createAnecdote = (anecdote) => {
  return {
    type: "NEW_ANECDOTE",
    anecdote,
  };
};

export const upvote = (id) => {
  return {
    type: "UPVOTE",
    data: {
      id,
    },
  };
};

export default reducer;
