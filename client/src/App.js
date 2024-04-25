
import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  // const info =localStorage.getItem('user')
  // const [user, setUser] = useState(JSON.parse(info));


  return (
    <>   
    <Router>
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/' element={<Login  />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
