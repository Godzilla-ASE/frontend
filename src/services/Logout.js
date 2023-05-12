import { LOGOUT_API } from "../services/APIs";

const Logout = async (navigate, setSuccess, setError) => {
  if (localStorage.getItem("authToken") === null) {
    setError("Failed to log out. Can't log out when not logined.");

    setTimeout(() => {
      navigate('/login'); // Replace "/login" with the actual URL of your login page
    }, 1000);
  }
  else {
    // Clear userId from localStorage
    try {
      const id = localStorage.getItem("userID")
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
        setSuccess("Logged out successfully.");

        setTimeout(() => {
          navigate('/'); // Replace "/login" with the actual URL of your login page
          localStorage.removeItem("loggedInUser");
          localStorage.removeItem("userID");
          localStorage.removeItem("authToken");
          localStorage.removeItem("user");
          localStorage.removeItem("userName");
        }, 1000);
      }
    } catch (error) {
      console.error(error);
      setError("Failed to log out. Can't log out when not logined.");

      setTimeout(() => {
        navigate('/login'); // Replace "/login" with the actual URL of your login page
      }, 1000);
    }
  };
};
export default Logout;