import MapBoxGeocoder from "@mapbox/mapbox-gl-geocoder";
import { useControl } from "react-map-gl";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
export const TOKEN =
  "sk.eyJ1IjoibWFsaWt1amp3YWwiLCJhIjoiY2x2OGxzY25lMDV0cjJrcDIwc2U5NW83bCJ9.LPBvEJhCVC72mCl9K_dXlg";

const Geocoder = ({ setNewPlace, mapRef }) => {
  const ctrl = new MapBoxGeocoder({
    accessToken: TOKEN,
    marker: false,
    collapsed: true,
  });
  useControl(() => ctrl);
  ctrl.on("result", (e) => {
    const coords = e.result.geometry.coordinates;
    setNewPlace({ lng: coords[0], lat: coords[1] });
    console.log("nnnnn", e);
    mapRef.current.flyTo({
      center: e.result.geometry.coordinates,
      zoom: 16,
      pitch: 45,
    });
  });
  return null;
};

export default Geocoder;