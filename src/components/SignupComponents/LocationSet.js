import React from "react";
import { Autocomplete, TextField } from "@mui/material";

function LocationSet({ location,
  setLocation,
  setLocationError,
  setLocationChanged }) {
  const handleLocationChange = (newLocation) => {
    setLocation(newLocation);
    setLocationError(false);
    setLocationChanged(true);

  };

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
  ]

  return (
    <Autocomplete
      sx={{
        '& .MuiIconButton-root': {
          color: 'white',
        },
        "& .MuiOutlinedInput-root": {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "white",
            borderWidth: "2px"
          },
          "& .MuiInputBase-input": {
            color: "white",
            "&::placeholder": {
              color: "white"
            }
          },
          "& .MuiInputLabel-root": {
            color: "white"
          }
        },
        "& .MuiAutocomplete-clearIndicator": {
          color: "white"
        },
        "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: "white"
        },
        width: '100%'
      }}
      value={location}
      onChange={(event, newValue) => {
        handleLocationChange(newValue);
      }}
      options={cantons}
      renderInput={(params) => <TextField {...params} focused label="Location" />}
    />
  );
};

export default LocationSet;