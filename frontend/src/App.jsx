import React from 'react'
import {Route,Routes } from 'react-router-dom';
import Home from './assets/pages/Home';
import Login from './assets/pages/login';
import Form from './assets/pages/forms/Form';
import Medical from './assets/pages/forms/Medical';
import PhysicalExam from './assets/pages/forms/PhysicalExam';

const App = () => {

  return (
    <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/home' element={<Home/>}></Route>
        <Route path='/form' element={<Form/>}></Route>
        <Route path='/medical' element={<Medical></Medical>}></Route>
        <Route path='/physical' element={<PhysicalExam></PhysicalExam>}></Route>
    </Routes>
    )
}

export default App
