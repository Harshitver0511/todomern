import React, {useState, useEffect } from 'react'
import Header from './Header'
import Todo from './Todo'
import Addmodel from './Addmodel'
import axios from 'axios'
function Home() {
  const [allTodos, setAllTodos] = useState({})
  function getTokens(){
    const user =  localStorage.getItem('user')
    if(!user){
        return
    }
    const token = JSON.parse(user).token
    return token

  }

  
  useEffect(() => {  
    const token = getTokens()
    if(!token){
      window.location.href = '/'
    }
    getTodos()

  })
   
  function getTodos(){
    let token = getTokens()
    axios.get('http://localhost:5000/api/todo',{
      headers:{
        auth:token
      }
    })
    .then((res)=>{
      setAllTodos(res.data.user.todos)
      // console.log(res.data.user.todos)
    })
    .catch((err)=>{
      console.log(err)
    })
  }



  


  return (
    <>
    <Header />
    <div className="container" style={{position:"relative"}}>
      <div className="row justify-content-md-center mt-4">
        {allTodos.map((todo)=>{
          return <Todo key={todo._id} todo={todo.desc}/>
        })}
        {/* <Todo/>
        <Todo/>
        <Todo/>
        <Todo/> */}
      </div>
      <Addmodel/>

    </div>

    </>
  )
}

export default Home