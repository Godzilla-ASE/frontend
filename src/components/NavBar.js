import xhs from '../assets/xhs.png';
import { useState, useEffect } from 'react'
import { AiOutlineHome, AiOutlineLogin } from 'react-icons/ai';
import { MdOutlineExplore } from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';
import { RiImageAddFill } from 'react-icons/ri';
import { BiMessageRoundedDetail } from 'react-icons/bi';
import { NavLink, Outlet } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import CreatePostDialog from '../views/CreatePost/CreatePostDialog';
import MessageStack from '../views/MessageStack/MessageStack';
import MessageContext from '../context/MessageContext';
import { MessageProvider } from '../context/MessageContext';
import useLoggedInUser from '../hooks/useLoggedInUser';
import { useNavigate } from 'react-router-dom'


export default function NavBar() {

  const loggedInUser = useLoggedInUser()
  const navigate = useNavigate()

  const [createPost, setCreatePost] = useState(false)
  const [openMessage, setOpenMessage] = useState(false)
  const theme = useTheme()

  const navLinkStyle = {
    color: theme.palette.primary.main
  }

  const handleCreate = () => {
    if (!loggedInUser) {
      navigate('/login')
    } else {
      setCreatePost(prev => !prev)
    }
  }

  const handleMessage = () => {
    if (!loggedInUser) {
      navigate('/login')
    } else {
      setOpenMessage(prev => !prev);
    }
  }

  return (
    <MessageProvider>
      <div className="nav">
        <header>
          <nav>
            {/* <NavLink to="/"><img src={xhs} alt="logo" /></NavLink> */}
            <NavLink style={navLinkStyle} to="/"><AiOutlineHome size={28} /></NavLink>
            <NavLink style={navLinkStyle} onClick={handleCreate}><RiImageAddFill size={28} /></NavLink>
            <NavLink style={navLinkStyle} onClick={handleMessage}><BiMessageRoundedDetail size={28} /></NavLink>
            <div className="nav-link-container" onClick={handleMessage}>
              {/* {hasNewMessage && <div className="badge"></div>} */}
              <BiMessageRoundedDetail size={28} />
            </div>
            <NavLink style={navLinkStyle} to="/login"><AiOutlineLogin size={28} /></NavLink>
            <NavLink style={navLinkStyle} to="/login"><CgProfile size={28} /></NavLink>
          </nav>
          <CreatePostDialog
            isOpen={createPost}
            onClose={handleCreate}
          />
          {/* <MessageStack isOpen={openMessage} onClose={handleMessage} /> */}
        </header>

        <main>
          <Outlet />
        </main>
      </div>
    </MessageProvider>
  )
}
