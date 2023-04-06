//import logo from './logo.svg';
import './App.css';
import Login from './components/LoginPage/Login';
import SignUp from './components/RegisterPage/SignUp'
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
        <Route path="/post/:postId" element={<SinglePost />} />
        {/* #TODO Add Tag Page: something like homepage but with a tag title and filtered posts*/}
        {/* <Route path="/tag/:tagName" element={<SingleTag />} /> */}
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
