import { useEffect, useRef, useState } from 'react'

import './App.css'

function App() {
  const [count, setCount] = useState(0)
  let inputref = useRef()
  let [tasks, setTasks] = useState([])
  let handlesubmit = () => {
    let task = {
      task: inputref.current.value,
      isCompleted: false,
      id: Date.now()
    }
    console.log(task)
    inputref.current.value = ""
    setTasks((prevValue) => [...prevValue, task])
  }
  useEffect(() => {
    console.log(tasks)
  }, [tasks])
  useEffect(() => {
    if (localStorage.getItem('tasks')) {
      setTasks(JSON.parse(localStorage.getItem('tasks')))
    } else {
      localStorage.setItem('tasks', JSON.stringify(tasks))
    }
  }, [])
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('tasks', JSON.stringify(tasks))
    }
  }, [tasks])
  let handleDelete = (id)=>{
    let taskList=tasks.filter(value=>value.id!=id)
    setTasks(taskList)
  }
  let handleEdit = (task)=>{
    let taskList=tasks.filter(value=>value.id!=task.id)
    setTasks(taskList)
    inputref.current.value=""
    inputref.current.value=task.task
  }
  
  let handleComplete = (task) =>{
    let taskList=tasks.map((value)=>{
      if(value.id==task.id) {
        return {...value,isCompleted:!value.isCompleted}
      }else{
        return value
      }
    })
    console.log(taskList)
    setTasks(taskList)
  }
  return (
    <div>
      <div className="todo-body w-1/2 mx-auto my-4 flex flex-col justify-center items-center">
        <h1 className='text-3xl text-indigo-400 font-semibold'>Todo-app</h1>
        <div className="input-field my-3 flex gap-3">
          <input ref={inputref} type="text" name="input" id="" placeholder='enter task' className=' border-b-4 border-green-400 p-2 text-green-700 font-semibold text-xl focus:outline-none' />
          <button onClick={handlesubmit} className='px-4 py-2 rounded text-green-700 border-2 border-green-500 font-semibold text-xl'>submit</button>
        </div>
        <div className="tasks-section">
          {tasks.map((value,index)=>(
            <div key={index} className='flex flex-col gap-4 bg-slate-200 px-4 py-2 shadow-lg my-3 rounded'>
              <h1 className={`text-2xl font-semibold ${value.isCompleted ?"line-through":""}`}>{value.task}</h1>
              <span className="actions flex gap-x-3">
                <button onClick={()=>handleEdit(value)} className='px-2 capitalize py-1 text-yellow-400 text-xl border-2 border-yellow-500 rounded'>edit</button>
                <button onClick={()=>handleDelete(value.id)} className='px-2 capitalize py-1 text-red-400 text-xl border-2 border-red-500 rounded'>delete</button>
                <button  onClick={()=>handleComplete(value)} className='px-2 capitalize py-1 text-green-400 text-xl border-2 border-green-500 rounded'>complete</button>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
