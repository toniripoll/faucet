import { createContext, useContext, useState } from 'react'

const userContext = createContext({})

export function useUserContext() {
    return useContext(userContext)
}

const UserProvider = ({children}: any) => {
    const [cuenta, setCuenta] = useState({
        acc: "123456"
    })

  return (
    <userContext.Provider value={{cuenta, setCuenta}}>
        {children}
    </userContext.Provider>
  )
}

export default UserProvider