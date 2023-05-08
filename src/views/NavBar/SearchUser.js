import { useState } from "react"
import { Autocomplete, TextField, InputAdornment } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import Fuse from 'fuse.js';
import { useUsers } from '../../hooks/useUsers'
import { BiSearch } from 'react-icons/bi';
import UserInfoWrapper from "../../components/Wrapper/UserInfoWrapper";

const SearchUser = () => {

  const test = [
    { username: 'A', avatarUrl: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f' },
    { username: 'B', avatarUrl: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f' },
    { username: 'C', avatarUrl: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f' },
    { username: 'D', avatarUrl: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f' },
    { username: 'BE', avatarUrl: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f' },
  ]

  // const allUsers = useUsers()
  const allUsers = test
  // const [filteredUsers, setFilteredUsers] = useState([] || allUsers.slice(0, 5))
  const [filteredUsers, setFilteredUsers] = useState([] || allUsers.slice(0, 5))

  if (!allUsers) {
    return (
      <div style={{ height: 829, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <p> Users are loading </p>
      </div>
    )
  }

  const fuseOptions = {
    keys: ['username'],
    threshold: 0.6,
  };

  const fuse = new Fuse(allUsers, fuseOptions); // #TODO replace options



  const handleSearch = (value) => {
    if (value.trim() === '') {
      setFilteredUsers(allUsers.slice(0, 5)); // #TODO replace options
    } else {
      const results = fuse.search(value);
      setFilteredUsers(results.map((result) => result.item));
    }
  };


  return (
    <Autocomplete
      freeSolo
      options={filteredUsers}
      onInputChange={(event, newInputValue) => {
        handleSearch(newInputValue)
      }}
      renderOption={(props, option) => (
        <UserInfoWrapper
          user={option}
          onClick={() => {
            console.log('Clicked avatar:', option.name);
          }}
        />
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label=""
          placeholder="Search for Users"
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                {/* <SearchIcon color="primary" fontSize="28" /> */}
                <BiSearch size={30} color="white" />
              </InputAdornment>
            ),
          }}
        />
      )}
      sx={{
        width: '30%',
        '& .MuiInputBase-input::placeholder': {
          color: (theme) => theme.palette.primary.main, // 更改 placeholder 颜色
        },
        '& .MuiInputBase-input:focus::placeholder': {
          color: (theme) => theme.palette.primary.main, // 更改聚焦时 placeholder 颜色
        },
        '& .MuiInputBase-input': {
          color: (theme) => theme.palette.primary.main, // 更改聚焦时 placeholder 颜色
        },
        '& .MuiIconButton-root': {
          color: (theme) => theme.palette.primary.main, // 更改下拉菜单图标颜色
        },
        'margin': '5px 0',
        '& .MuiOutlinedInput-notchedOutline': {
          border: 'none',
        },
        '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
          border: 'none',
        },
        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
          border: 'none',
        },
      }}
      getOptionLabel={(option) => option.username || ''}
      filterOptions={(options) => options}
    />

  )
}

export default SearchUser