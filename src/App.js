//import logo from './logo.svg';
import './App.css';
//import Login from './components/LoginComponents/Login的副本';
import Login from './components/Login';
import SignUp from './components/SignUp';
import AccountCenter from './components/AccountCenter';
import Homepage from './components/Homepage';
import SinglePost from './views/SinglePost/SinglePost';
import Profile from './views/Profile/Profile'
import NavBar from './components/NavBar';
import ProfileVisit from './views/Profile/ProfileVisit'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';

function App() {

  // const fakeUser = {
  //   authToken: "23e5e8d1-a521-4149-b3f9-fff222eec957",
  //   userID: 3,
  //   avatar: "userAvatar"
  // }

  // localStorage.setItem("loggedInUser", JSON.stringify(fakeUser));
  // localStorage.removeItem("loggedInUser");

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<NavBar />}>
        <Route index element={<Homepage />}></Route> : null
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/accountcenter" element={<AccountCenter />}></Route>
        <Route path="/post/:postId" element={<SinglePost />} />
        <Route path="/profile/:visitedUserId" element={<ProfileVisit />} />
        {/* #TODO Add Tag Page: something like homepage but with a tag title and filtered posts*/}
        {/* <Route path="/tag/:tagName" element={<SingleTag />} /> */}
        {/* #TODO Add Location Page: something like homepage but with a location title and filtered posts*/}
        {/* <Route path="/location/:locationName" element={<SingleLocation />} /> */}
      </Route>
    )
  )

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
