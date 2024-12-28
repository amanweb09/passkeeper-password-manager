import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Home from "./pages/home"
import Signup from "./pages/signup"
import Login from "./pages/login"
import React, { useEffect, useState } from "react"
import { type BaseJSXProps } from "./types"
import { useDispatch, useSelector } from "react-redux"
import { authSelector } from "./store/auth-slice"
import { reauth } from "./api"
import { modifyUser } from "./store/auth-slice"
import Loading from "./components/loading"

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

  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    (async () => {
      try {
        const { data } = await reauth()
        dispatch(modifyUser({
          isAuth: true,
          user: data.user
        }))
        setLoading(false)
      } catch (error) {
        setLoading(false)
      }
    })()
  }, [])

  return <>
    {
      loading
        ?
        <Loading />
        :
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/signup" element={<GuestRoute><Signup /></GuestRoute>} />
            <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
          </Routes>
        </BrowserRouter>
    }
  </>
}

export default App