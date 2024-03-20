import { Dispatch, FormEvent, SetStateAction } from "react"
import { Button, Input } from "../.."

const InputForm = ({ todo, setTodo, handleSubmit }: { todo: string, setTodo: Dispatch<SetStateAction<string>>, handleSubmit: (e: FormEvent<HTMLFormElement>) => void }) => {
    return (
        <form className="flex justify-center p-4 my-8" onSubmit={(e) => handleSubmit(e)}>
            <Input todo={todo} setTodo={setTodo} />
            <Button
                todo={todo}
            />
        </ form>)
}

export default InputForm