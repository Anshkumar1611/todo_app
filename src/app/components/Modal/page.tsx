"use client"
import { Todo } from "@/app/types"
import { Dispatch, SetStateAction, useState } from "react"
import { RxCrossCircled } from "react-icons/rx";
import { Button } from "..";

const Modal = ({ edit, setEdit, setTodos }: {
    edit: Todo,
    setEdit: Dispatch<SetStateAction<Todo | undefined>>,
    setTodos: Dispatch<SetStateAction<Todo[]>>,
}) => {
    const [editTask, setEditTask] = useState<Todo>({ ...edit })
    const handleEdit = (e: any) => {
        const { name, value } = e.target;
        console.log(name, value)
        setEditTask((prevItem) => ({ ...prevItem, [name]: value }));
    }

    const handleSaveClick = (editTask: Todo) => {
        handleSave(editTask)
        setEdit(undefined)
    }

    const handleSave = (editTask: Todo) => {
        setTodos((prevData) => {
            const updatedData = prevData.map((item) =>
                item.id === editTask.id ? editTask : item
            );
            return updatedData;
        })
    }
    return (
        <>

            <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 backdrop-blur">
                <div className="absolute inset-0 z-10 overflow-y-auto p-6">
                    <main className="flex-col justify-between items-center p-4 drop-shadow-md bg-slate-200 w-80 rounded absolute top-2/4 left-1/2 transform -translate-x-1/2 -translate-y-2/4">
                        <div className="flex justify-end pb-4">
                            <RxCrossCircled className="text-red-500 text-2xl cursor-pointer" onClick={() => setEdit(undefined)} />
                        </div>
                        <label className="text-slate-700 flex justify-center items-center p-2 font-bold"> Update Your Task</label>
                        <div className="flex">
                            <input name='todo' type="text" className="text-slate-400 p-2 w-2/3" value={editTask.todo} onChange={(e) => handleEdit(e)} />
                            <button onClick={() => handleSaveClick(editTask)} className="bg-orange-500 hover:bg-orange-600 text-black font-bold py-2 px-4 rounded-r-lg placeholder:text-slate-500" >Update</button>
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}

export default Modal