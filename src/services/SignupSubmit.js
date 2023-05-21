
import { SIGNUP_API} from "./APIs";

const SignupSubmit = async (event, requestBody, signupFormError, setUsernameexistError,
  setSignUpSuccess, setSignUpError, navigate) => {
  event.preventDefault();

  if (!(signupFormError)) { // fullnameError
    try {
      const response = await fetch(SIGNUP_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
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

        // Redirect to login page after 1 seconds
        setTimeout(() => {
          navigate("/"); // Replace "/login" with the actual URL of your login page
        }, 1000);
      } else if (response.status === 409) {
        //username exist
        setUsernameexistError(true);
        setSignUpError("Username Exists. Please choose another one.");
      }
      else if (response.status === 404) {
        //lost backend
        setSignUpError("Failed to connect to backend. Please try again later.");

      }
    } catch (error) {
      console.error(error);
      setSignUpError("Failed to sign up. Please try again later.");
    }
  }
  else{
    //not all the fields filled
    setSignUpError("Please fill all the fields.");
  }
};

export default SignupSubmit;