import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import axios from "axios";
import config from "../../config";

const Map = ({ projectId }) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const [coordinates, setCoordinates] = useState(null);

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const response = await axios.get(
          `${config.apiBaseUrl}/projects/${projectId}`
        );
        setCoordinates(response.data.coordinates);
      } catch (error) {
        console.error("Error fetching coordinates:", error);
      }
    };

    fetchCoordinates();
  }, [projectId]);

  useEffect(() => {
    if (mapContainerRef.current && !mapRef.current && coordinates) {
      mapboxgl.accessToken =
        "pk.eyJ1IjoicmFodWxuYXlhazg5IiwiYSI6ImNseWVxamRxZDA1N24ya3NibW93MnFuYWEifQ.6tPvrLaxDfDL9ymW63l7-w";

      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/dark-v9",
        center: coordinates,
        zoom: 9,
      });

      mapRef.current.addControl(new mapboxgl.NavigationControl(), "top-right");

      new mapboxgl.Marker()
        .setLngLat(coordinates)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }).setText(
            "Nirmaan Mitra Constructions"
          )
        )
        .addTo(mapRef.current);
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [coordinates]);

  return (
    <div>
      <div
        ref={mapContainerRef}
        style={{ width: "100%", height: "357px" }}
        className="rounded-5"
      />
    </div>
  );
};

export default Map;
