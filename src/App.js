//import logo from './logo.svg';
import './App.css';
//import Login from './components/LoginComponents/Login的副本';
import Login from './components/Login';
import SignUp from './components/SignUp';
import AccountCenter from './components/AccountCenter';
import Homepage from './components/Homepage';
import SinglePost from './components/SinglePost';
import NavBar from './components/NavBar';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<NavBar />}>
        <Route index element={<Homepage />}></Route> : null
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/accountcenter" element={<AccountCenter />}></Route>
        <Route path="/post/:postId" element={<SinglePost />} />
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
