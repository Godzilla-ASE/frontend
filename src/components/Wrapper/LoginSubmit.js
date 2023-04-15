const LoginSubmit = async (event, username, password, setUsernameError, setPasswordError, setUsernamecorrectError, setPasswordcorrectError, setLoginStatus) => {
  event.preventDefault();
  if (!username) {
    setUsernameError(true);
  }
  if (!password) {
    setPasswordError(true);
  }
  if (username && password) {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        const authToken = await response.text();
        // save user to localStorage
        // localStorage.setItem("loggedInUser", user);
        setLoginStatus(`Logged in successfully.`);
      } else if (response.status === 404) {
        const error = await response.text();
        setUsernamecorrectError(true);
        setLoginStatus(`Username not found.`);
      } else if (response.status === 409) {
        const error = await response.text();
        setPasswordcorrectError(true);
        setLoginStatus(`Wrong credentials.`);
      }
    } catch (error) {
      console.error(error);
      setLoginStatus("Failed to log in.");
    }
  }
};

export default LoginSubmit;