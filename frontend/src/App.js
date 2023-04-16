
import React from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import Login from './pages/Login';
import MyPosts from './pages/MyPosts';
import Main from './pages/Main';
function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Main />} />
          {/* <Route path='/' element={<Dashboard />} /> */}
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/Myposts' element={<MyPosts />} />
        </Routes>
      </Router>
    </>
  );
}

export default App