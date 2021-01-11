import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { upvote } from "../reducers/anecdoteReducer";
import { setNotice } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes);
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const upvoteAnecdote = (anecdote) => {
    console.log(anecdote);
    const content = anecdote.content;
    const anecdoteToUpdate = anecdote;
    dispatch(upvote(anecdoteToUpdate));
    dispatch(setNotice(content, 3));
  };

  return (
    <>
      {anecdotes
        .sort((a, b) => (a.votes <= b.votes ? 1 : -1))
        .filter((anecdote) =>
          anecdote.content.toLowerCase().includes(filter.toLowerCase())
        )
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => upvoteAnecdote(anecdote)}>vote</button>
            </div>
          </div>
        ))}
    </>
  );
};

export default AnecdoteList;
