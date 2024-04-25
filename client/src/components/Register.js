import React from 'react'
import Header from './Header'
import { useState ,useEffect} from 'react'
import axios from 'axios'

function Register() {
  const [form , setForm] = useState({})
  const [error , setError] = useState(null)
  const [errorname , setErrorname] = useState(null)
  function handleChange(e){
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }
  function handleSubmit(e){
    e.preventDefault()
    console.log(form)
    axios.post('http://localhost:5000/api', form)
    .then(res => {
      setError(null)
      console.log(res)
      localStorage.setItem('user', JSON.stringify(res.data))
      window.location.href = '/home'
    })
    .catch((error) => {
      console.log(error.response.data)
      setError(error.response.data.errors)
      setErrorname(error.response.data.errors.name)
    })
   
  }
  useEffect(() =>{
    const user = localStorage.getItem('user')

    if(user){
      window.location.href = '/home'
    }

  },[])
 
  
  return (
    <>
    <Header />
    <div className="form-signin w-50 m-auto my-5">
   <form>
    <h1 className="h3 mb-3 fw-normal">Register</h1>
    <div className="form-floating my-3">
      <input type="text" 
      name="name"
      onChange={handleChange}
      className="form-control" 
      id="floatingname" 
      placeholder="Name" 
      fdprocessedid="fbwt6l"
      />

      <label htmlFor="floatingname">Name</label>
    </div>
    {errorname && <div className="alert alert-danger" role="alert">
      {errorname.msg}</div>}
    {/* {errorname===null && <div className="alert alert-danger" role="alert">
      {errorname}</div>} */}
    <div className="form-floating my-3">
      <input type="email" 
      name="email"
      onChange={handleChange}
      className="form-control" 
      id="floatingEMAIL" 
      placeholder="Email" 
      fdprocessedid="fbwt6l"
      />

      <label htmlFor="floatingEMAIL">Email</label>
    </div>
    {error && <div className="alert alert-danger" role="alert">
      {error}</div>}


    <div className="form-floating my-3">
      <input type="text" 
      name="username"
      onChange={handleChange}
      className="form-control" 
      id="floatingInput" 
      placeholder="username" 
      fdprocessedid="fbwt6l"
      />

      <label htmlFor="floatingInput"> Set your Username</label>
    </div>
    <div className="form-floating my-3">
      <input 
      type="password" 
      name="password"
      onChange={handleChange}
      className="form-control" 
      id="floatingPassword" 
      placeholder="Password" 
      fdprocessedid="o5eaw"
      />

      <label htmlFor="floatingPassword">Password</label>
      <small id="passwordHelp" className="form-text text-muted">Don't share your password to anyone</small>
    </div>
    {/* <small id="emailHelp" className="form-text text-muted"> {error}</small> */}
    
    <button 
    className="w-100 btn btn-lg btn-primary" 
    onClick={handleSubmit}
    type="submit" 
    fdprocessedid="vhxx7n">
      Sign in</button>
    <p className="mt-5 mb-3 text-muted">© 2017–2022</p>
  </form>
  </div>
    </>
  )
}

export default Register