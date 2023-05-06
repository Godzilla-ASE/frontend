import { useState, useEffect } from 'react'

export default function useLoggedInUser() {
  // const [user, setUser] = useState(null)
  let loggedUser
  const loggedUserJSON = window.localStorage.getItem('loggedInUser')
  if (loggedUserJSON) {
    loggedUser = JSON.parse(loggedUserJSON)
    // setUser(loggedUser)
  }

  return loggedUser
}
