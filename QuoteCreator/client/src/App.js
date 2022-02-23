import React from 'react';
// import './App.css';
import Navbar from './Pages/Navbar'
import Dashboard from './Pages/Dashboard';
import Login from './Pages/Login';
import Register from './Pages/Register';
import {BrowserRouter , Route} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Navbar/>
          <Route exact path="/" component={Login}/>
          <Route path="/dashboard" component={Dashboard}/>
          <Route path="/login" component={Login}/>
          <Route path="/register" component={Register}/>
      </BrowserRouter>
    </div>
  );
}

export default App;
