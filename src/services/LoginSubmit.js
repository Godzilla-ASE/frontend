const LoginSubmit = async (event, username, password, 
  setUsernameError, setPasswordError, setUsernamecorrectError, setPasswordcorrectError, setPageStatus,
  LOGIN_API, navigate, previousUrl) => {
  event.preventDefault();
  if (!username) {
    setUsernameError(true);
  }
  if (!password) {
    setPasswordError(true);
  }
  if (username && password) {
    try {
      const response = await fetch(LOGIN_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        const authToken = await response.text();
        const userID = authToken.userID;
        const userAvatar = authToken.avatar;
        // save user to localStorage
        // localStorage.setItem("loggedInUser", user);
        const user = {
          authToken: authToken,
          userID: userID,
          avatar: userAvatar
        }

        localStorage.setItem("loggedInUser", user);

        localStorage.setItem("authToken", authToken);
        localStorage.setItem("userID", userID);
        setPageStatus("Logged in successfully.");

        // Redirect to login page after 3 seconds
        setTimeout(() => {
          navigate(previousUrl); // Replace "/login" with the actual URL of your login page
        }, 1000);
      } else if (response.status === 404) {
        const error = await response.text();
        setUsernamecorrectError(true);
        setPageStatus("Username not found.");
      } else if (response.status === 409) {
        const error = await response.text();
        setPasswordcorrectError(true);
        setPageStatus("Wrong credentials.");
      }
    } catch (error) {
      console.error(error);
      setPageStatus("Failed to log in.");
    }
  }
};

export default LoginSubmit;