
const SignupSubmit = async (event, username, password, email, location, confirmPassword, isChecked,
  usernameError, emailError, passwordError, confirmPasswordError, locationError, isCheckedError,
  setUsernameError, setPasswordError, setConfirmPasswordError, setLocationError, setEmailError,
  setUsernameexistError, setIsCheckedError, setSignUpSuccess, setSignUpError, avatarUrl, avatarChanged, SIGNUP_API, navigate) => {
  event.preventDefault();
  // Get the history object from react-router-dom
  if (!/^[a-zA-Z0-9]{6,16}$/.test(username)) {
    // username.length < 6 || username.length > 16 || 
    setUsernameError(true);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    setEmailError(true);
  }
  if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[,.?!@#$%^&+-_=*]).{8,16}$/.test(password)) {
    // password.length < 8 || password.length > 16 || 
    setPasswordError(true);
  }
  if (!(password === confirmPassword)) {
    setConfirmPasswordError(true);
  }
  // if (!(fullname.length > 0)) {
  //   setFullNameError(true);
  // }
  if (location === "") {
    setLocationError(true);
  }
  if (!isChecked) {
    setIsCheckedError(true);
  }
  if (!(usernameError || emailError || passwordError || confirmPasswordError || locationError || isCheckedError)) { // fullnameError
    try {
      const response = await fetch(SIGNUP_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password, location, avatarUrl }),
      });
      if (response.ok) {
        setSignUpSuccess('Log in successfully!');
        console.log(response);
        const user_body = await response.json();

        const authToken = user_body.token;
        const userID = user_body.id;
        const userName = user_body.username;
        const userAvatarUrl = user_body.avatarUrl;
        // save user to localStorage
        // localStorage.setItem("loggedInUser", user);
        const user = {
          authToken: authToken,
          id: userID,
          userName: userName,
          avatarUrl: userAvatarUrl
        }


        localStorage.setItem("loggedInUser", JSON.stringify(user));
        localStorage.setItem("user", JSON.stringify(user_body))



        localStorage.setItem("authToken", authToken);
        localStorage.setItem("id", userID);
        localStorage.setItem("userName", userName)

        // Redirect to login page after 3 seconds
        setTimeout(() => {
          navigate("/"); // Replace "/login" with the actual URL of your login page
        }, 1000);
      } else if (response.status === 409) {
        // const error = await response.text();
        setUsernameexistError(true);
        setSignUpError("Username Exists. Please choose another one.");
      }
      else if (response.status === 404) {
        setSignUpError("Failed to connect to backend. Please try again later.");

      }
    } catch (error) {
      console.error(error);
      setSignUpError("Failed to sign up. Please try again later.");
    }
  }
};

export default SignupSubmit;