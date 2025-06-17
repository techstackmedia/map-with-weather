"use client";
import { useEffect, useState } from "react";
import Map, { Marker, Popup } from "react-map-gl";
import WeatherPopup from "./WeatherPopup";
import Forecast from "./interface";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;
const WEATHER_API = process.env.NEXT_PUBLIC_WEATHER_API!;


type MarkerProps = {
  lat: number;
  lon: number;
  name: string;
};

export default function MapView({ lat, lon, name }: MarkerProps) {
  const [viewState, setViewState] = useState({
    latitude: lat,
    longitude: lon,
    zoom: 4,
  });
  const [popupInfo, setPopupInfo] = useState<{
    name: string;
    forecast: Forecast;
  } | null>(null);

  useEffect(() => {
    setViewState((vs) => ({
      ...vs,
      latitude: lat,
      longitude: lon,
    }));
    setPopupInfo(null);
  }, [lat, lon]);

  const fetchWeather = async () => {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API}&units=metric`
    );
    const data = await res.json();
    setPopupInfo({ name, forecast: data });
  };

  return (
    <Map
      {...viewState}
      mapboxAccessToken={MAPBOX_TOKEN}
      style={{ width: "100%", height: "100%" }}
      mapStyle="mapbox://styles/mapbox/light-v11"
      onMove={(evt) => setViewState(evt.viewState)}
    >
      <Marker latitude={lat} longitude={lon}>
        <button onClick={fetchWeather}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/1163/1163624.png"
            width={24}
            alt="Weather Info"
          />
        </button>
      </Marker>

      {popupInfo && (
        <Popup
          latitude={lat}
          longitude={lon}
          closeOnClick={false}
          onClose={() => setPopupInfo(null)}
        >
          <WeatherPopup city={popupInfo.name} forecast={popupInfo.forecast} />
        </Popup>
      )}
    </Map>
  );
}
