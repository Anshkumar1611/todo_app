"use client";
import { FormEvent, useEffect, useState } from "react";
import { Header, Title, Modal, InputForm, Tasks } from "./components";
import { MdDeleteOutline } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useSearchParams } from "next/navigation";
import { Todo } from "./types";


export default function Home() {
  const [todos, setTodos] = useState<Array<Todo>>(localStorage.getItem('todos') == null ? [] : JSON.parse(localStorage.getItem('todos')));
  const [todo, setTodo] = useState("");
  const [complete, setComplete] = useState<Array<Todo>>(localStorage.getItem('complete') == null ? [] : JSON.parse(localStorage.getItem('complete')));
  const [edit, setEdit] = useState<Todo>();
  const searchParams = useSearchParams();
  const todoFilter = searchParams.get("todos") || "all";

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos)); // Update localStorage whenever todos change
    localStorage.setItem('complete', JSON.stringify(complete)); // Update localStorage whenever todos change
  }, [todos, complete]); // Watch for changes in todos state
  // ----------------------------------------------------- functions-------------------------------------------------------------------  
  const addTodo = (todo: string) => {
    let id = Math.random()
    setTodos((prev) => ([{ todo, id }, ...prev]))
    setTodo("");
    console.log('todos', todos)
  }
  const handleDelete = (id: number) => {
    let latestTasks = todos.filter((item) => item.id !== id)
    let completedTask = todos.filter((item) => item.id === id)
    setComplete((prev) => ([...prev, completedTask[0]]))
    setTodos(latestTasks)
    localStorage.setItem('complete', JSON.stringify(complete));
  }

  const deleteTask = (id: number) => {
    const deletedTask = complete.filter((item) => item.id !== id)
    setComplete(deletedTask)
    localStorage.setItem('complete', JSON.stringify(complete))
  }

  const editTask = (id: number) => {
    const task = todos.find((item) => item.id === id)
    setEdit(task)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    addTodo(todo)
  }

  // --------------------------------------------------------functions end-------------------------------------------------------------------

  // --------------------------------------------------------   Variables --------------------------------------------------------------------

  let allLength = todos.length
  let completedLength = complete.length
  // --------------------------------------------------------  variables end  ----------------------------------------------------------------
  const handleType = () => {
    if (todoFilter === 'completed') {
      return (
        <>{complete.length ?
          complete.map((todoItem) => {
            return (
              <div key={todoItem.id} className="flex justify-between items-center p-4 drop-shadow-md bg-slate-300 ">
                <span className="text-2xl font-whisper font-bold">{todoItem.todo}</span>
                <div className="flex gap-4">
                  <span className="cursor-pointer" onClick={() => { deleteTask(todoItem.id) }}><MdDeleteOutline className="text-red-500" /></span>
                </div>
              </div>
            )
          })
          :
          <div className="flex justify-center p-4  border-4 border-orange-500">All Tasks Completed ....</div>
        }
        </>
      )
    }
    else {
      return (
        <>
          {todos.length ? todos.map((todoItem) => {
            return (
              <div key={todoItem.id} className="flex justify-between items-center p-4 drop-shadow-md bg-slate-300">
                <span className="text-2xl font-whisper font-bold">{todoItem.todo}</span>
                <div className="flex gap-4">
                  <span className="cursor-pointer" onClick={() => { editTask(todoItem.id) }}><FaEdit /></span>
                  <span className="cursor-pointer" onClick={() => { handleDelete(todoItem.id) }}><MdDeleteOutline className="text-red-500" /></span>
                </div>
              </div>
            )
          }) :
            <div className="flex justify-center p-4 border-4 border-orange-500">You have Zero Tasks Left ...</div>
          }
        </>
      )
    }

  }

  return (
    <main className="relative">
      <Title />
      <InputForm todo={todo} setTodo={setTodo} handleSubmit={handleSubmit} />
      <Header allLength={allLength} completedLength={completedLength} />
      <Tasks handleType={handleType} />
      {edit && <Modal edit={edit} setEdit={setEdit} setTodos={setTodos} />}
    </main>
  );
}
