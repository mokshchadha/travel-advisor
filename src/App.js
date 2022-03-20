import React, { useEffect, useState } from "react";
import { CssBaseline, Grid } from "@material-ui/core";
import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";
import { getPlacesData } from "./api";

function App() {
  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState(null);

  const [childClicked, setChildClicked] = useState(false);

  const [isLoading, setLoading] = useState(false);

  const [type, setType] = useState("restaurants");
  const [rating, setRating] = useState(0);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((e) => {
      console.log(e);
      setCoordinates({ lat: e.coords.latitude, lng: e.coords.longitude });
    });
  }, []);

  useEffect(() => {
    const filteredPlaces = places.filter((e) => Number(e.rating) > rating);
    setFilteredPlaces(filteredPlaces);
  }, [rating]);

  useEffect(() => {
    setLoading(true);
    if (bounds)
      getPlacesData(bounds.sw, bounds.ne, type).then((e) => {
        console.log({ data: e });
        setPlaces(e.filter((e) => e.name));
        setLoading(false);
      });
  }, [coordinates, bounds, type]);

  return (
    <>
      <CssBaseline />
      <Header setCoordinates={setCoordinates} />
      <Grid container spacing={3} style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          <List
            places={filteredPlaces.length > 0 ? filteredPlaces : places}
            childClicked={childClicked}
            isLoading={isLoading}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            places={filteredPlaces.length > 0 ? filteredPlaces : places}
            setChildClicked={setChildClicked}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
