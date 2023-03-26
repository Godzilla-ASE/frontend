import xhs from '../assets/xhs.png';
import { AiOutlineHome } from 'react-icons/ai';
import { MdOutlineExplore } from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';
import { RiImageAddFill } from 'react-icons/ri';
import { NavLink, Outlet } from 'react-router-dom';
import { useTheme } from '@emotion/react';

export default function NavBar() {
  const theme = useTheme();
  return (

    <div className="nav">
      <header>
        <nav>
          {/* <NavLink to="/"><img src={xhs} alt="logo" /></NavLink> */}
          <NavLink to="/"><AiOutlineHome size={28} /></NavLink>
          <NavLink to="/login"><CgProfile size={28} /></NavLink>
          {/* <div>
            <a href="/Home">
              <RiImageAddFill size={28} />
            </a>
            <a href="/Home">
              <AiOutlineHome size={28} />
            </a>
            <a href="/Home">
              <MdOutlineExplore size={28} />
            </a>
            <a href="/Home">
              <CgProfile size={28} />
            </a>
          </div> */}
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  )
}