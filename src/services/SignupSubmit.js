const SignupSubmit = async (event, username, password, email, location, confirmPassword, isChecked,
  usernameError, emailError, passwordError, confirmPasswordError, locationError, isCheckedError,
  setUsernameError, setPasswordError, setConfirmPasswordError, setLocationError, setEmailError,
  setUsernameexistError, setIsCheckedError, setPageStatus, SIGNUP_API, navigate) => {
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
        body: JSON.stringify({ username, email, password, location }),
      });
      if (response.ok) {
        //const result = await response.text();
        setPageStatus(`Sign up successfully.`);

        // Redirect to login page after 3 seconds
        setTimeout(() => {
          navigate("/login"); // Replace "/login" with the actual URL of your login page
        }, 3000);
      } else if (response.status === 409) {
        const error = await response.text();
        setUsernameexistError(true);
        setPageStatus(`Username Exists. `);
      }
      else if (response.status === 404) {
        setPageStatus("Failed to connect to backend.");

      }
    } catch (error) {
      console.error(error);
      setPageStatus("Failed to sign up.");
    }
  }
};

export default SignupSubmit;