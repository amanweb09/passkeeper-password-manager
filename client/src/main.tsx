import { createRoot } from 'react-dom/client'
import './dist/main.css'
import App from './App.tsx'
import { Provider } from "react-redux"
import store from './store/store.ts'
import { ToastContainer } from 'react-toastify'

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <ToastContainer />
        <App />
    </Provider>
)
