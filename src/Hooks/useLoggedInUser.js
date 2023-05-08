import { useState, useEffect } from 'react'

export default function useLoggedInUser() {
  
  let loggedUser = null
  const loggedUserJSON = window.localStorage.getItem('loggedInUser')
  if (loggedUserJSON) {
    loggedUser = JSON.parse(loggedUserJSON)
  }

  return loggedUser
}
