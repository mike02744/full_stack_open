import React from "react";

const Total = ({ course }) => {
  const sum = course.parts.reduce((result, part) => result + part.exercises, 0);

  return (
    <>
      <p>Number of exercises {sum}</p>
    </>
  );
};

export default Total;
