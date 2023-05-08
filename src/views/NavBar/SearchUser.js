import { useState } from "react"
import { Autocomplete, TextField, InputAdornment, styled } from "@mui/material"
import Fuse from 'fuse.js';
import { useUsers } from '../../hooks/useUsers'
import { BiSearch } from 'react-icons/bi';
import UserInfoWrapper from "../../components/Wrapper/UserInfoWrapper";
import { useNavigate } from 'react-router-dom'

const CustomOption = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.postBackground.main,
  '&:hover': {
    backgroundColor: theme.palette.postBackground.main,
  },
}));

const SearchUser = () => {

  const navigate = useNavigate()

  const test = [
    { username: 'A', avatarUrl: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f', id: 1 },
    { username: 'B', avatarUrl: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f', id: 1 },
    { username: 'C', avatarUrl: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f', id: 1 },
    { username: 'D', avatarUrl: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f', id: 1 },
    { username: 'BE', avatarUrl: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f', id: 1 },
  ]

  const handleClick = (id) => {
    console.log('navigate!')
    navigate(`/profile/${id}`)
  }

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
        <CustomOption {...props} onClick={() =>
          handleClick(option.id)}>
          <UserInfoWrapper
            user={option}
          />
        </CustomOption>
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
        width: '15%',
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