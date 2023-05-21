const LoginSubmit = async (event, username, password,
                           setUsernameError, setPasswordError, setUsernamecorrectError, setPasswordcorrectError, setLogInSuccess, setLogInError,
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
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({username, password}),
      });
      if (response.ok) {
        const user_body = await response.json();
        const authToken = user_body.token;
        const id = user_body.id;
        const userName = user_body.username;
        const userAvatarUrl = user_body.avatarUrl;

        // Saving user to the localStorage
        const user = {
          authToken: authToken,
          id: id,
          userName: userName,
          avatarUrl: userAvatarUrl
        }

        localStorage.setItem("loggedInUser", JSON.stringify(user));
        localStorage.setItem("user", JSON.stringify(user_body))

        localStorage.setItem("authToken", authToken);
        localStorage.setItem("id", id);
        localStorage.setItem("userName", userName)

        console.log(user_body)
        setLogInSuccess("Logged in successfully.");

        // Redirect to login page after 3 seconds
        setTimeout(() => {
          navigate(previousUrl); // Replace "/login" with the actual URL of your login page
        }, 1000);
      } else if (response.status === 404) {
        setUsernamecorrectError(true);
        setLogInError("Username not found.")
      } else if (response.status === 409) {
        setPasswordcorrectError(true);
        setLogInError("Wrong credentials.");
      }
    } catch (error) {
      console.error(error);
      setLogInError("Failed to log in.");
    }
  }
};

export default LoginSubmit;
