export default function useLoggedInUser() {

  let loggedUser = null
  const loggedUserJSON = window.localStorage.getItem('user')
  if (loggedUserJSON) {
    loggedUser = JSON.parse(loggedUserJSON)
  }

  return loggedUser
}
