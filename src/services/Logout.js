const Logout = (setPageStatus) => {
    try {
      // Clear userId from localStorage
      localStorage.removeItem("loggedInUser");
      localStorage.removeItem("userID");
      localStorage.removeItem("authToken");
      setPageStatus("Logged out successfully.");
    } catch (error) {
      console.error(error);
      setPageStatus("Failed to log out. Can't log out when not logined.");
    }
  };
  
  export default Logout;