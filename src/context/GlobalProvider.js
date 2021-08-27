import axios from 'axios'
import React,{useState,useEffect} from 'react'
import GlobalContext from './GlobalContext'

const GlobalProvider = (props) => {
    const [todos, setTodos] = useState("")
    const [users, setUsers] = useState("")
    const [isAuth, setIsAuth] = useState(false)
    const [loginUser,setLoginUser]=useState("")
    
    useEffect(() => {
        axios.get("http://localhost:3002/todos").then(res => setTodos(res.data)).catch(err => console.log(err))
        axios.get("http://localhost:3002/users").then(res => setUsers(res.data)).catch(err => console.log(err))
    },[])
    if(todos === "" || users === "") return null
    return (
        <GlobalContext.Provider value={{todos,setTodos,users,setUsers,isAuth,setIsAuth,loginUser,setLoginUser}}>
            {props.children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider
