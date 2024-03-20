
const Tasks = ({ handleType }: any) => {
    return (
        <div className="flex justify-center w-full p-8">
            <section className="bg-white w-96 rounded  text-slate-800 flex flex-col gap-2 p-2">
                {handleType()}
            </section>
        </div>)
}

export default Tasks