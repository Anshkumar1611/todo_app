"use client"
const Button = ({ todo }: { todo: string }) => {
  return (
    <button
      disabled={todo.length === 0}
      type="submit"
      className={`bg-orange-500  hover:bg-orange-600 text-black font-bold py-2 px-4 rounded-r-lg placeholder:text-slate-500 `}
    >
      Add Task
    </button>
  );
};

export default Button;
