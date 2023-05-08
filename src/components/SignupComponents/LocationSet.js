import React from "react";
import {FormControl,InputLabel,Select,MenuItem,FormHelperText} from "@mui/material";

function LocationSet({location,
  setLocation,
  setLocationError,
  locationError,
  setPageStatus,
  setLocationChanged}){
  const handleLocationChange = (event) => {
    setLocation(event.target.value);
    setLocationError(false);
    setLocationChanged(true);
    setPageStatus("");
  };

  return (
    <FormControl variant="outlined" className="signup-input">
    <InputLabel htmlFor="location-select">Location</InputLabel>
    <Select
        labelId="location-select"
        id="location-select"
        value={location}
        onChange={handleLocationChange}
        label="Location"
        error={locationError}
    >
    <MenuItem value="Zurich">Zurich</MenuItem>
    <MenuItem value="Bern">Bern</MenuItem>
    <MenuItem value="Geneva">Geneva</MenuItem>
    <MenuItem value="Lucerne">Lucerne</MenuItem>
    <MenuItem value="St. Gallen">St. Gallen</MenuItem>
    </Select>
    {locationError &&
    <FormHelperText sx={{ fontsize:'body2.fontSize', color: 'red' }}>
        Please select your location
        </FormHelperText>}
    </FormControl>
  );
};

export default LocationSet;