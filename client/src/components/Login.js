import React from 'react'
import { useState, useEffect} from 'react'
import Header from './Header'
import axios from 'axios'
function Login() {
  const [form , setForm] = useState({})
  const [error , setError] = useState(null)
  function handleChange(e){
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }
  
  function handleSubmit(e){
    
    e.preventDefault()
    axios.post('http://localhost:5000/api/login', form)
    .then(res => {
      setError(null)
      console.log(res)
      localStorage.setItem('user', JSON.stringify(res.data))
      window.location.href = '/home'
    })
    .catch((error) => {
      console.log(error.response)
      setError(error.response.data.message)
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
    <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

    <div className="form-floating my-3">
      <input type="text" 
      name="username"
      onChange={handleChange}
      className="form-control" 
      id="floatingInput" 
      placeholder="username" 
      fdprocessedid="fbwt6l"
      />

      <label htmlFor="floatingInput">Username</label>
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
    {error && <div className="alert alert-danger" role="alert">
      {error}</div>}
    
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

export default Login