import { useEffect } from "react";

export default function LoggedInUser() {
  useEffect(() => {
    // check if any user logged in
    const loggedUserJSON = window.localStorage.getItem("loggedInUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      return user
      // blogService.setToken(user.token)
    }
    return 
  }, [])
}
