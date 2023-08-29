import React from 'react';
import { Routes, Route } from "react-router-dom";
import AppWithFunctionality from "./AppWithFunctionality.jsx";
import Register from "./Register/Register.jsx";
import Login from "./Login/Login.jsx";
import ProtectedRoute from './ProtectedRoute/ProtectedRoute'
function App() {
  return (
    <Routes>
      <Route  path='/'   element={ <ProtectedRoute >
              <AppWithFunctionality />
       </ProtectedRoute>} />
      <Route path="/sign-up" element={<Register />} />
      <Route path="/sign-in" element={<Login />} />
      <Route path='*'  element={<h1>Неправильный маршрут</h1>}/>
      
    </Routes>
  );
}

export default App;
