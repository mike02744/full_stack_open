import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { upvote } from "../reducers/anecdoteReducer";
import { notice, clear } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes);
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const upvoteAnecdote = (id, content) => {
    dispatch(upvote(id));
    dispatch(notice(content));
    setTimeout(()=>dispatch(clear()), 3000);
  };

  return (
    <>
      {anecdotes
        .sort((a, b) => (a.votes <= b.votes ? 1 : -1))
        .filter(anecdote=> anecdote.content.toLowerCase().includes(filter.toLowerCase()))
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button
                onClick={() => upvoteAnecdote(anecdote.id, anecdote.content)}
              >
                vote
              </button>
            </div>
          </div>
        ))}


    </>
  );
};

export default AnecdoteList;
