//import logo from './logo.svg';
import './App.css';
//import Login from './components/LoginComponents/Login的副本';
import Login from './components/Login';
import SignUp from './components/SignUp';
import AccountCenter from './components/AccountCenter';
import SinglePost from './views/SinglePost/SinglePost';
import Profile from './views/Profile/Profile'
import Homepage from './views/Homepage/Homepage';
import NavBar from './components/NavBar';
import ProfileVisit from './views/Profile/ProfileVisit'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import LocationPage from './views/LocationPage/LocationPage';
import TagPage from './views/TagPage/TagPage';

function App() {

  const fakeUser = {
    username: 'Iamuser',
    authToken: "authToken",
    userID: 2,
    avatarUrl: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f"
  }

  localStorage.setItem("loggedInUser", JSON.stringify(fakeUser));
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
