const AccountCenterSubmit = async (event, username, password, email, location, confirmPassword,
  usernameError, emailError, passwordError, confirmPasswordError, locationError,
  setUsernameError, setPasswordError, setConfirmPasswordError, setLocationError, setEmailError,
  setUsernameexistError, setPageStatus, AccountCenter_API, navigate,
  selectedDate, dateChanged, usernameChanged, emailChanged, passwordChanged, locationChanged,
  avatarUrl, avatarChanged, token, userID) => {
  event.preventDefault();

  let requestBody = {};
  // Get the history object from react-router-dom
  if (usernameChanged) {
    if ((!/^[a-zA-Z0-9]{6,16}$/.test(username))) {
      // username.length < 6 || username.length > 16 || 
      setUsernameError(true);
    } else {
      requestBody.username = username
    }
  } else {
    setUsernameError(false);
  }

  if (emailChanged) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError(true);
    } else {
      requestBody.email = email
    }
  } else {
    setEmailError(false);
  }

  if (passwordChanged) {
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[,.?!@#$%^&+-_=*]).{8,16}$/.test(password)) {
      // password.length < 8 || password.length > 16 || 
      setPasswordError(true);
    } else if (!(password === confirmPassword)) {
      setConfirmPasswordError(true);
    } else {
      requestBody.password = password
    }
  } else {
    setPasswordError(false);
    setConfirmPasswordError(false);
  }

  // if (!(fullname.length > 0)) {
  //   setFullNameError(true);
  // }
  if (locationChanged) {
    if (location === "") {
      setLocationError(true);
    } else {
      requestBody.location = location
    }
  } else {
    setLocationError(false);
  }

  if (avatarChanged) {
    requestBody.avatarUrl = avatarUrl
  }

  if (dateChanged) {
    requestBody.birthday = selectedDate
  }

  if (Object.keys(requestBody).length > 0 && (!(usernameError || emailError || passwordError || confirmPasswordError || locationError))) { // fullnameError      
    console.log(JSON.stringify(requestBody))
    try {
      const response = await fetch(`${AccountCenter_API}/${userID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(requestBody),
      });
      if (response.ok) {
        //const result = await response.text();
        setPageStatus(`Update Profile successfully.`);

        const user_body = JSON.parse(localStorage.getItem("user"));

        const updatedUser = { ...user_body, ...requestBody };

        localStorage.setItem("user", JSON.stringify(updatedUser));

        const userName = updatedUser.username;
        const userAvatarUrl = updatedUser.avatarUrl;

        const user = {
          authToken: token,
          userID: userID,
          userName: userName,
          avatarUrl: userAvatarUrl
        }

        localStorage.setItem("loggedInUser", JSON.stringify(user));
        localStorage.setItem("userName", userName)

        // Redirect to login page after 3 seconds
        //  setTimeout(() => {
        //    navigate("/accountcenter"); // Replace "/login" with the actual URL of your login page
        //  }, 1000);
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
      setPageStatus("Failed to update profile.");
    }
  }
};

export default AccountCenterSubmit;