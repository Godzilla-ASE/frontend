import { useState, useEffect } from 'react'

export default function useLoggedInUser() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    // check if any user logged in
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      console.log('user', loggedUser)
      setUser(loggedUser)
      // blogService.setToken(loggedUser.token)
    }
  }, [])

  return user
}
