import axios from "axios";

const URL = (type) =>
  `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`;

export const getPlacesData = async (sw, ne, type) => {
  const OPTIONS = {
    params: {
      bl_latitude: sw.lat,
      tr_latitude: ne.lat,

      bl_longitude: sw.lng,
      tr_longitude: ne.lng,
    },
    headers: {
      "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
      "x-rapidapi-key": "4c9c465b38msh3d955a23dcb4fd8p1d8efejsn6a37e4aa7579", //change to the
    },
  };
  try {
    const {
      data: { data },
    } = await axios.get(URL(type), OPTIONS);
    return data;
  } catch (error) {
    console.error(error);
  }
};
