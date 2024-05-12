import axios from 'axios'
import React from 'react'


function Todo({id,todo,setRefresh,isdone}) {
  function getTokens(){
    const user =  localStorage.getItem('user')
    if(!user){
        return
    }
    const token = JSON.parse(user).token
    console.log(token)
    return token

   } 
   const handleDelete = async () => {
    try {
      const token = getTokens();
      const response = await axios.post('https://todomern-z3n3.onrender.com/api/delete',{_id:id}, {
        headers: {
          auth: token,
        },
      });
      setRefresh(new Date())
    } catch (error) {
      console.error(error);
    }
   }
 const handleDone = async () => {
    try {
      const token = getTokens();
      const response = await axios.post('https://todomern-z3n3.onrender.com/api/done', { _id: id }, {
        headers: {
          auth: token,
        },
      });
      console.log(response.data);
      setRefresh(new Date())
    } catch (error) {
      console.error(error);
    }

 }
 console.log(isdone)



  
  return (
    <div className='col-sm-3 mx-3 my-2 alert bg-light ' style={{border:"1px solid black"}}>
     
        <div className='card-header '>
          {isdone? "completed":"not completed"}

        </div>
        <hr></hr>
        <div className='card-body'>
            <h4 className='card-title'>Title</h4>
            <p className='card-text'>{todo}</p>
        </div>
      <div className='actionButton' style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:"1rem",}}>
        <div className='deleteButton'>
          <button type="button" class="btn btn-danger" onClick={handleDelete} >Delete</button>
        </div>
        <div className='doneButton'>
          <button type="button" class="btn btn-outline-success" onClick={handleDone}>{isdone?"mark inCompleted":"Mark Completed"}</button>
        </div>
      </div>

    </div>
  )
}

export default Todo