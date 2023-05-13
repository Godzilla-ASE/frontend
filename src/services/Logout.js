import { LOGOUT_API } from "../services/APIs";

const Logout = async (navigate, setLogOutSuccess, setLogOutError) => {
  if (localStorage.getItem("authToken") === null) {
    setLogOutError("Failed to log out. Can't log out when not logined.");

    setTimeout(() => {
      navigate('/login'); // Replace "/login" with the actual URL of your login page
    }, 1000);
  }
  else {
    // Clear userId from localStorage
    try {
      const id = localStorage.getItem("id")
      const token = localStorage.getItem("authToken")
      const response = await fetch(`${LOGOUT_API}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      console.log(response)
      if (response.ok) {
        setLogOutSuccess("Logged out successfully.");

        setTimeout(() => {
          navigate('/'); // Replace "/login" with the actual URL of your login page
          localStorage.removeItem("loggedInUser");
          localStorage.removeItem("id");
          localStorage.removeItem("authToken");
          localStorage.removeItem("user");
          localStorage.removeItem("userName");
        }, 1000);
      }
    } catch (error) {
      console.error(error);
      setLogOutError("Failed to log out. Can't log out when not logined.");

      setTimeout(() => {
        navigate('/login'); // Replace "/login" with the actual URL of your login page
      }, 1000);
    }
  };
};
export default Logout;