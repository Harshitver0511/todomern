import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Addmodel({setRefresh}) {
    const [todo, setTodo] = useState('')
    function getTokens(){
        const user =  localStorage.getItem('user')
        if(!user){
            return
        }
        const token = JSON.parse(user).token
        return token

    }
    function  handlseSubmit(e){
      e.preventDefault()
      console.log(todo)
      let token = getTokens()
      axios.post('https://todomern-z3n3.onrender.com/api/create',{desc:todo},{
            headers:{
                auth:token
            }

      })
        .then((res)=>{
            console.log(res)
            // window.location.href = '/home'

            toast.success('Todo added successfully')
            setRefresh( new Date())
        })
        .catch((err)=>{
            console.log(err)
        })
      setTodo('')
    }
  return (
    <>
        <div className='' style={{position:"fixed", left:"85%",top:"75%", zIndex:1030}}>
        <ToastContainer />
        <button 
        type='button'
        className='btn btn-primary btn-lg '
        data-bs-toggle="modal" 
        data-bs-target="#exampleModal"
        >Add Todo</button>
      </div>
      <div className='modal mt-5' id='exampleModal' >
          <div className='modal-dialog' role="document">
            <div className='modal-content'>
              <div className='modal-header'>
                <div className='modal-title'>Add new Todo</div>
                <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='close'></button>
                <span aria-hidden='true'></span>
               </div>
               <div className='modal-body'>
                 <div className='form-group'>
                  <textarea className='form-control'
                  rows={3} 
                  value={todo}
                  name='todo'
                  onChange={(e)=>setTodo(e.target.value)}
                  placeholder='Write your todo here'></textarea>


                 </div>
                </div>
                <div className='modal-footer'>
                  <button type='button' className='btn btn-secondary' data-bs-dismiss='modal'>Close</button>
                  <button type='button' className='btn btn-primary' data-bs-dismiss='modal' onClick={handlseSubmit} >Add Todo</button>
                 </div> 
              </div>
           </div> 
      </div>
    </>
  )
}

export default Addmodel