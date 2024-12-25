import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Home from "./pages/home"
import Signup from "./pages/signup"
import Login from "./pages/login"
import React from "react"
import { type BaseJSXProps } from "./types"
import { useSelector } from "react-redux"
import { authSelector } from "./store/auth-slice"

const ProtectedRoute: React.FC<BaseJSXProps> = ({ children }) => {
  const { isAuth } = useSelector(authSelector)

  if (isAuth) return children

  return <Navigate to={"/login"} />
}

const GuestRoute: React.FC<BaseJSXProps> = ({ children }) => {
  const { isAuth } = useSelector(authSelector)

  if (!isAuth) return children

  return <Navigate to={"/"} />
}

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/signup" element={<GuestRoute><Signup /></GuestRoute>} />
        <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App