import React from 'react'

function Todo({key,todo}) {
  return (
    <div className='col-sm-3 mx-3 my-2 alert bg-light ' style={{border:"1px solid black"}}>
        <div className='card-header '>
           {key}

        </div>
        <hr></hr>
        <div className='card-body'>
            <h4 className='card-title'>Title</h4>
            <p className='card-text'>{todo}</p>
        </div>
    </div>
  )
}

export default Todo