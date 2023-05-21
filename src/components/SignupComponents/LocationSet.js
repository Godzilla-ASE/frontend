import React,{useState} from "react";
import { Autocomplete, TextField, Typography } from "@mui/material";

function LocationSet({ location,
  setLocation,
  setIsFieldValid,}) {
  const [noLocationError, setNoLocationError] = useState(false)

  const handleLocationChange = (newLocation) => {
    setLocation(newLocation);
    setIsFieldValid((prevState) => ({
      ...prevState,
      location: true
    }));

  };

  const handleLocationBlur = () => {
    //if empty
    if (location === "" ) {
      setNoLocationError(true)
      setIsFieldValid((prevState) => ({
        ...prevState,
        location: false
      }));
    }
    else{
      setNoLocationError(false)
      setIsFieldValid((prevState) => ({
        ...prevState,
        location: true
      }));
    }
  }

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
    <>
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
      error={noLocationError}
      onBlur={handleLocationBlur}
      renderInput={(params) => <TextField {...params} focused label="Location" />}
    />
    {
      noLocationError &&
      <Typography variant="body2" color="error" align="center" fontWeight={700}>
        Please select a valid location.
      </Typography>
    }
    </>
  );
};

export default LocationSet;