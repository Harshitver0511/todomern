import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect} from 'react'

function Header() {
  const [user, setUser] = useState(null)
  useEffect(() =>{
    const user = localStorage.getItem('user')
    if(user){
      setUser(JSON.parse(user))
    }
  },[])

  function handleLogout(){
    localStorage.removeItem('user')
    window.location.href = '/'
  }
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark" aria-label="Fifth navbar example">
    <div className="container-fluid">
      <Link className="navbar-brand" to="/home">Harshit</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample05" aria-controls="navbarsExample05" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarsExample05">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="/home">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/">Login</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/register">Register</Link>
          </li>
          {user &&
          <li className="nav-item">
          <Link className="nav-link " onClick={handleLogout}>Log Out</Link>
        </li>}
          
        </ul>
        <form role="search" style={{display:'flex',gap:'1rem'}}>
          <input className="form-control" type="search" placeholder="Search" aria-label="Search"/>
          <button className="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>
    </div>
  </nav>
    </>
  )
}

export default Header