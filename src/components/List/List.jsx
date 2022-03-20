import React, { useState, useEffect, useRef, createRef } from "react";
import {
  CircularProgress,
  Grid,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@material-ui/core";

import useStyles from "./styles";
import PlaceDetails from "../PlaceDeatails/PlaceDetails";

const List = ({
  places,
  childClicked,
  isLoading,
  type,
  rating,
  setType,
  setRating,
}) => {
  const classes = useStyles();

  const [elRefs, setElRefs] = useState([]);

  useEffect(() => {
    if (!places) return "";
    const refs = new Array(places.length)
      .fill()
      .map((_, i) => elRefs[i] || createRef());

    setElRefs(refs);
  }, [places]);

  return (
    <div className={classes.container}>
      <Typography variant="h4">
        Restraunts, Attractions and Hotels around you
      </Typography>
      {isLoading ? (
        <div>
          <CircularProgress size={"5rem"} />
        </div>
      ) : (
        <>
          <div style={{ marginBottom: "15px" }}>
            <FormControl>
              <InputLabel>Type</InputLabel>
              <Select value={type} onChange={(e) => setType(e.target.value)}>
                <MenuItem value={"restaurants"}>Restraunts</MenuItem>
                <MenuItem value={"attractions"}> Attractions</MenuItem>
                <MenuItem value={"hotels"}>Hotels</MenuItem>
              </Select>
            </FormControl>
            <span style={{ marginLeft: "5px" }}></span>
            <FormControl>
              <InputLabel>Rating</InputLabel>
              <Select
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              >
                <MenuItem value={0}>All</MenuItem>
                <MenuItem value={3}> Above 3.0</MenuItem>
                <MenuItem value={4}>Above 4.0</MenuItem>
                <MenuItem value={4.5}>Above 4.5</MenuItem>
              </Select>
            </FormControl>
          </div>
          <Grid container spacing={3} className={classes.list}>
            {places?.map((e, i) => (
              <Grid ref={elRefs[i]} item key={i} xs={12}>
                <PlaceDetails
                  place={e}
                  selected={Number(childClicked) === i}
                  refProp={elRefs[i]}
                />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </div>
  );
};

export default List;
