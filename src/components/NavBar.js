import {useState,} from 'react'
import {AiOutlineHome, AiOutlineLogin} from 'react-icons/ai';
import {RiImageAddFill} from 'react-icons/ri';
import {BiMessageRoundedDetail} from 'react-icons/bi';
import {NavLink, Outlet} from 'react-router-dom';
import {useTheme} from '@emotion/react';
import CreatePostDialog from '../views/CreatePost/CreatePostDialog';
import MessageStack from '../views/MessageStack/MessageStack';
import useLoggedInUser from '../hooks/useLoggedInUser';
import SearchUser from '../views/NavBar/SearchUser';
import {Avatar, Typography} from '@mui/material';


export default function NavBar() {

  const [newMessage, setNewMessage] = useState(false)

  const loggedInUser = useLoggedInUser()

  const [createPost, setCreatePost] = useState(false)
  const [openMessage, setOpenMessage] = useState(false)
  const theme = useTheme()

  const navLinkStyle = {
    color: theme.palette.primary.main
  }

  const navLinkStyleProfile = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.primary.main,
    textDecoration: 'none'
  }

  const handleCreate = () => {
    setCreatePost(prev => !prev)
  }

  const handleMessage = () => {
    setOpenMessage(prev => !prev);
    setNewMessage(false)
  }

  const handleHome = () => {
    setOpenMessage(false);
    setCreatePost(false)
  }

  return (
    <div className="nav">
      <header>
        <nav>
          <Typography variant="h2" className="signup-heading" sx={{color: 'primary.main'}}>
            Godzilla
          </Typography>
          {/* Home */}
          <NavLink style={navLinkStyle} to="/" onClick={handleHome}><AiOutlineHome size={28}/></NavLink>
          {/* Create New Post */}
          {loggedInUser ?
            <NavLink style={navLinkStyle} onClick={handleCreate}><RiImageAddFill size={28}/></NavLink> : null}
          {/* Search Users */}
          <SearchUser/>
          {/* Messages */}
          {loggedInUser ? <div className="nav-link-container">
            {newMessage && <div className="badge"></div>}
            <NavLink style={navLinkStyle} onClick={handleMessage}><BiMessageRoundedDetail size={28}/></NavLink>
          </div> : null}
          {/* Profile / LogIn */}
          {loggedInUser
            ? <NavLink style={navLinkStyleProfile} to={`/profile`}>
              <Avatar
                src={loggedInUser.avatarUrl}
                alt={`${loggedInUser.username}'s avatar`}
                sx={{width: 30, height: 30, marginRight: 1}}
              />
              <Typography variant="body2">{loggedInUser.username}</Typography>
            </NavLink>
            : <NavLink style={navLinkStyle} to="/login"><AiOutlineLogin size={28}/></NavLink>}
        </nav>
        {loggedInUser ? <CreatePostDialog
          isOpen={createPost}
          onClose={handleCreate}
        /> : null}
        {loggedInUser ?
          <MessageStack isOpen={openMessage} onClose={handleMessage} setNewMessage={setNewMessage}/> : null}
      </header>

      <main>
        <Outlet/>
      </main>
    </div>
  )
}
