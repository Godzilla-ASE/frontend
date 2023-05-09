import * as React from 'react';
import { TextField, Autocomplete, Grid } from '@mui/material'

const cantons = [
  'Aargau',
  'Appenzell Ausserrhoden',
  'Appenzell Innerrhoden',
  'Basel-Landschaft',
  'Basel-Stadt',
  'Bern',
  'Fribourg',
  'Genève',
  'Glarus',
  'Graubünden',
  'Jura',
  'Luzern',
  'Neuchâtel',
  'Nidwalden',
  'Obwalden',
  'Schaffhausen',
  'Schwyz',
  'Solothurn',
  'St. Gallen',
  'Thurgau',
  'Ticino',
  'Uri',
  'Valais',
  'Vaud',
  'Zug',
  'Zurich',
  ''
]

const Location = ({ location, setLocation }) => {

  return (
    <Grid item xs={1} sx={{ borderBottom: '2px solid #CECECE' }}>
      <Autocomplete
        value={location}
        onChange={(event, newValue) => {
          setLocation(newValue);
        }}
        id="controllable-states-demo"
        options={cantons}
        sx={{
          width: '100%',
          '& .MuiInputBase-input::placeholder': {
            color: (theme) => theme.palette.secondary.main, // 更改 placeholder 颜色
          },
          '& .MuiInputBase-input:focus::placeholder': {
            color: (theme) => theme.palette.secondary.main, // 更改聚焦时 placeholder 颜色
          },
          '& .MuiInputBase-input': {
            color: (theme) => theme.palette.secondary.main, // 更改聚焦时 placeholder 颜色
          },
          '& .MuiIconButton-root': {
            color: (theme) => theme.palette.secondary.main, // 更改下拉菜单图标颜色
          },
          'margin': '5px 0',
          '& .MuiOutlinedInput-notchedOutline': {
            border: 'none',
          },
          '.MuiOutlinedInput-root': {
            paddingLeft: '0px'
          },
          '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
            border: 'none',
          },
          '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            border: 'none',
          },
        }}
        renderInput={(params) => <TextField {...params} placeholder="Add a location..." />}
      />
    </Grid>
  )
}

export default Location