import { AccountCenter_API } from "./APIs";

const AccountCenterSubmit = async (event, requestBody, accdetail,
  setUsernameexistError, setAccountSuccess, setAccountError, 
  navigate) => {
  event.preventDefault();

  if (Object.keys(requestBody).length > 0) { // fullnameError      
    console.log(JSON.stringify(requestBody))
    try {
      const response = await fetch(`${AccountCenter_API}/${accdetail.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: accdetail.token,
        },
        body: JSON.stringify(requestBody),
      });
      if (response.ok) {
        setAccountSuccess("Update Profile successfully.");

        const user_body = JSON.parse(localStorage.getItem("user"));

        const updatedUser = { ...user_body, ...requestBody };

        localStorage.setItem("user", JSON.stringify(updatedUser));

        const userName = updatedUser.username;
        const userAvatarUrl = updatedUser.avatarUrl;

        const user = {
          authToken: accdetail.token,
          id: accdetail.id,
          userName: userName,
          avatarUrl: userAvatarUrl
        }

        localStorage.setItem("loggedInUser", JSON.stringify(user));
        localStorage.setItem("userName", userName)
        // Redirect to login page after 1 second
        setTimeout(() => {
          navigate("/profile");
        }, 1000);
      } else if (response.status === 409) {
        //username exists
        setUsernameexistError(true);
        setAccountError(`Username Exists. `);
      }
      else if (response.status === 404) {
        setAccountError("Failed to connect to backend.");

      }
    } catch (error) {
      console.error(error);
      setAccountError("Failed to update profile.");
    }
  }
};

export default AccountCenterSubmit;