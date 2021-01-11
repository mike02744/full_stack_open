import anecdotesService from "../services/anecdotes";

const initialState = [];

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
      return action.data;
    }
    default:
      return state;
  }
};

export const initializeAnecdote = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesService.getAll();
    dispatch({
      type: "INIT_ANECDOTES",
      data: anecdotes,
    });
  };
};
export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdotesService.createNew(content);
    dispatch({
      type: "NEW_ANECDOTE",
      anecdote: newAnecdote,
    });
  };
};

export const upvote = (anecdote) => {
  return async (dispatch) => {
    const newAnecdote = await anecdotesService.upvoteAnecdote(anecdote);
    dispatch({
      type: "UPVOTE",
      data: {
        id: newAnecdote.id,
      },
    });
  };
};

export default reducer;
