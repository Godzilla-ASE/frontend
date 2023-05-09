import React from "react";
import { FormControl, InputLabel, Select, MenuItem, FormHelperText, Autocomplete, TextField } from "@mui/material";

function LocationSet({ location,
  setLocation,
  setLocationError,
  locationError,
  setPageStatus,
  setLocationChanged }) {
  const handleLocationChange = (newLocation) => {
    setLocation(newLocation);
    setLocationError(false);
    setLocationChanged(true);
    setPageStatus("");
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
    // <FormControl variant="outlined" className="signup-input">
    //   <InputLabel htmlFor="location-select">Location</InputLabel>
    //   <Select
    //     labelId="location-select"
    //     id="location-select"
    //     value={location}
    //     onChange={handleLocationChange}
    //     label="Location"
    //     error={locationError}
    //   >
    //     {cantons.map((canton) => <MenuItem key={canton} value={canton}>{canton}</MenuItem>)}
    //     {/* <MenuItem value="Zurich">Zurich</MenuItem>
    //     <MenuItem value="Bern">Bern</MenuItem>
    //     <MenuItem value="Geneva">Geneva</MenuItem>
    //     <MenuItem value="Lucerne">Lucerne</MenuItem>
    //     <MenuItem value="St. Gallen">St. Gallen</MenuItem> */}
    //   </Select>
    //   {locationError &&
    //     <FormHelperText sx={{ fontSize: 'body2.fontSize', color: 'red' }}>
    //       Please select your location
    //     </FormHelperText>}
    // </FormControl>

    // <Autocomplete
    //   focused
    //   disablePortal
    //   options={cantons}
    //   sx={{ width: 300 }}
    //   renderInput={(params) => <TextField {...params} label="Location" />}
    // />
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