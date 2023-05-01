import * as React from 'react';
import { TextField, Autocomplete, GlobalStyles } from '@mui/material'
import { useState } from 'react';

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
  'Zurich'
]

const Location = ({ location, setLocation }) => {

  return (
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
        'margin': '5px 0'
      }}
      renderInput={(params) => <TextField {...params} placeholder="Location" />}
    />
  )
}

export default Location