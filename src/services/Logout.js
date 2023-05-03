import { LOGOUT_API } from "../services/APIs";

const Logout = async (setPageStatus,navigate) => {
    if (localStorage.getItem("authToken") === null)  {
      setPageStatus("Failed to log out. Can't log out when not logined.");

      setTimeout(() => {
        navigate('/login'); // Replace "/login" with the actual URL of your login page
      }, 1000);
    }
    else{
      // Clear userId from localStorage
      try {
        const userID = localStorage.getItem("userID")
        const token = localStorage.getItem("authToken")
        const response = await fetch(`${LOGOUT_API}/${userID}`, {
          method: "DELETE",
          headers: { 
            "Content-Type": "application/json",
            Authorization : token,
         },
        });
        if (response.ok) {
          setPageStatus("Logged out successfully.");

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
      setPageStatus("Failed to log out. Can't log out when not logined.");

      setTimeout(() => {
        navigate('/login'); // Replace "/login" with the actual URL of your login page
      }, 1000);
    }
  };
};  
  export default Logout;