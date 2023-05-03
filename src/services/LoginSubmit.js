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
        // const user = {
        //    authToken: "authToken",
        //    userID: 123,
        //    avatar: "userAvatar"
        //   }


        localStorage.setItem("loggedInUser", JSON.stringify(user));

        localStorage.setItem("authToken", JSON.stringify(authToken));
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

        // const user = {
        //   authToken: "authToken",
        //   userID: 123,
        //   avatar: "userAvatar"
        //  }
        // const authToken = JSON.stringify({username:"abc",email:"22@22.22",fullName:"ABC",location:"Zurich",birthday:null,avatarUrl:"https://godzilla2023ase.s3.eu-central-1.amazonaws.com/846f28bd-1d2b-4a7f-8461-a3245dc1dd46.jpg"})
        // localStorage.setItem("authToken", authToken);


        //  localStorage.setItem("loggedInUser", JSON.stringify(user));

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