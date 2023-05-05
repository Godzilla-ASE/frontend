import { useEffect, useState } from "react"
import { getAll } from "../../services/user"
import { Autocomplete, TextField, inputAdornmentClasses } from "@mui/material"
import Fuse from 'fuse.js';

const SearchUser = () => {

  const options = [
    { username: 'nmkdqzah', avatar: 'https://images.unsplash.com/photo-1479090793912-eb9929f4fdb2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1268&q=80' },
    { username: 'eufgjzam', avatar: 'https://images.unsplash.com/photo-1479090793912-eb9929f4fdb2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1268&q=80' },
    { username: 'vwomuyex', avatar: 'https://images.unsplash.com/photo-1479090793912-eb9929f4fdb2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1268&q=80' },
    { username: 'crmyglps', avatar: 'https://images.unsplash.com/photo-1479090793912-eb9929f4fdb2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1268&q=80' },
    { username: 'tbihmldx', avatar: 'https://images.unsplash.com/photo-1479090793912-eb9929f4fdb2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1268&q=80' },
    { username: 'zvwdpmly', avatar: 'https://images.unsplash.com/photo-1479090793912-eb9929f4fdb2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1268&q=80' },
    { username: 'xsjtnquz', avatar: 'https://images.unsplash.com/photo-1479090793912-eb9929f4fdb2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1268&q=80' }
  ]


  const [allUsers, setAllUsers] = useState('')
  const [filteredUsers, setFilteredUsers] = useState(options.slice(0, 5))

  useEffect(() => {
    const findUsers = async () => {
      const users = await getAll()
      setAllUsers(users)
    }

    findUsers()
  }, [])

  const fuseOptions = {
    keys: ['username'],
    threshold: 0.6,
  };

  const fuse = new Fuse(options, fuseOptions); // #TODO replace options



  const handleSearch = (value) => {
    if (value.trim() === '') {
      setFilteredUsers(options.slice(0, 5)); // #TODO replace options
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
      renderInput={(params) => (
        <TextField {...params} label="" />
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