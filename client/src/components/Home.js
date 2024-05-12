import React, {useState, useEffect } from 'react'
import Header from './Header'
import Todo from './Todo'
import Addmodel from './Addmodel'
import axios from 'axios'
function Home() {
  const [allTodos, setAllTodos] = useState([])
  const [refresh ,setRefresh]= useState()
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

  },[refresh])
   
  
  async function getTodos() {
    try {
      // Assuming getTokens() returns a Promise or the token itself
      const token = await getTokens();
  
      const response = await axios.get('https://todomern-z3n3.onrender.com/api/todo', {
        headers: {
          auth: token,
        },
      });
       let a=response.data.user.todos
      setAllTodos(response.data.user.todos);
      // console.log(a)
    } catch (error) {
      console.error(error);
    }
  }



  


  return (
    <>
    <Header />
    <div className="container" style={{position:"relative"}}>
      <div className="row justify-content-md-center mt-4">
        {allTodos.map((todo)=>{
          return <Todo key={todo._id} id={todo._id} todo={todo.desc} isdone={todo.isDone} setRefresh={setRefresh}/>
        })}
        {/* <Todo/>
        <Todo/>
        <Todo/>
        <Todo/> */}
      </div>
      <Addmodel setRefresh={setRefresh }/>

    </div>

    </>
  )
}

export default Home