"use client";

import { Dispatch, SetStateAction } from "react";

const Input = ({
  todo,
  setTodo,
}: {
  todo: string;
  setTodo: Dispatch<SetStateAction<string>>;
}) => {
  const handleChange = (event: any) => {
    setTodo(event.target.value);
  };
  return (
    <div>
      <input
        className="p-2 text-black focus:border-transparent focus:outline-none"
        placeholder="Enter your task ..."
        value={todo}
        type="text"
        onChange={handleChange}
      />
    </div>
  );
};

export default Input;
