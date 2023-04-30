import xhs from '../assets/xhs.png';
import { useState } from 'react'
import { AiOutlineHome } from 'react-icons/ai';
import { MdOutlineExplore } from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';
import { RiImageAddFill } from 'react-icons/ri';
import { BiMessageRoundedDetail } from 'react-icons/bi';
import { NavLink, Outlet } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import CreatePostDialog from '../views/CreatePost/CreatePostDialog';
import MessageStack from '../views/MessageStack/MessageStack';


export default function NavBar() {
  const [createPost, setCreatePost] = useState(false)
  const [openMessage, setOpenMessage] = useState(false)
  const theme = useTheme()

  const navLinkStyle = {
    color: theme.palette.primary.main
  }

  const handleCreate = () => {
    setCreatePost(prev => !prev)
  }

  const handleMessage = () => {
    setOpenMessage(prev => !prev);
  }

  return (
    <div className="nav">
      <header>
        <nav>
          {/* <NavLink to="/"><img src={xhs} alt="logo" /></NavLink> */}
          <NavLink style={navLinkStyle} to="/"><AiOutlineHome size={28} /></NavLink>
          <NavLink style={navLinkStyle} onClick={handleCreate}><RiImageAddFill size={28} /></NavLink>
          <NavLink style={navLinkStyle} onClick={handleMessage}><BiMessageRoundedDetail size={28} /></NavLink>
          <NavLink style={navLinkStyle} to="/login"><CgProfile size={28} /></NavLink>
        </nav>
        <CreatePostDialog
          isOpen={createPost}
          onClose={handleCreate}
        />
        <MessageStack isOpen={openMessage} onClose={handleCreate} />
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  )
}
