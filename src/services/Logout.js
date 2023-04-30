const Logout = (setPageStatus,navigate) => {
    try {
    if (localStorage.getItem("authToken") === null)  {
      setPageStatus("Failed to log out. Can't log out when not logined.");

      setTimeout(() => {
        navigate('/login'); // Replace "/login" with the actual URL of your login page
      }, 1000);
    }
    else{
      // Clear userId from localStorage
      setPageStatus("Logged out successfully.");

      setTimeout(() => {
        navigate('/'); // Replace "/login" with the actual URL of your login page
        localStorage.removeItem("loggedInUser");
        localStorage.removeItem("userID");
        localStorage.removeItem("authToken");
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
  
  export default Logout;