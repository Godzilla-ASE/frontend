//import logo from './logo.svg';
import './App.css';
import Login from './components/LoginPage/Login';
import SignUp from './components/RegisterPage/SignUp'
import Homepage from './components/Homepage';
import SinglePost from './components/SinglePost';
import NavBar from './components/NavBar';
import { useEffect, useState } from 'react';
import { getAll } from './services/post';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';

function App() {
  const [data, setData] = useState([])
  const [userLogIn, setUserLogIn] = useState(null)

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<NavBar />}>
        {data ? <Route index element={<Homepage data={data} user={userLogIn} />}></Route> : null}
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/post/:postId" element={<SinglePost />} />
      </Route>
    )
  )

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAll()
      setData(data)
    }

    fetchData()

    // check if any user logged in
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUserLogIn(user)
      // blogService.setToken(user.token)
    }
  }, [])

  return (
    <>
      {/* <NavBar />
      <div sx={{ height: '80px' }}></div>
      {data ? <Homepage data={data} user={userLogIn} /> : null} */}
      <RouterProvider router={router} />
    </>
  );
}

export default App;
