//import logo from './logo.svg';
import './App.css';
//import Login from './components/LoginComponents/Login的副本';
import Login from './components/Login';
import SignUp from './components/SignUp';
import AccountCenter from './components/AccountCenter';
import Homepage from './views/Homepage/Homepage';
import SinglePost from './components/SinglePost';
import Profile from './components/Profile'
import NavBar from './components/NavBar';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import LocationPage from './views/LocationPage/LocationPage';
import TagPage from './views/TagPage/TagPage';

function App() {

  const fakeUser = {
    authToken: "authToken",
    userID: 2,
    avatar: "userAvatar"
  }

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
        {/* #TODO Add Tag Page: something like homepage but with a tag title and filtered posts*/}
        <Route path="/tag/:tagName" element={<TagPage />} />
        <Route path="/location/:locationName" element={<LocationPage />} />
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
