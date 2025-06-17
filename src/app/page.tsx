'use client'
import MapView from "@/components/Map";
import Sidebar from "@/components/Sidebar";
import { useState } from "react";

export default function Home() {
  const [selectedCity, setSelectedCity] = useState({
    lat: 23.1136,
    lon: -82.3666,
    name: "Havana",
  });

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <Sidebar onSelect={(lat, lon, name) => setSelectedCity({ lat, lon, name })} />
      <div className="flex-1 h-[50vh] md:h-full">
        <MapView lat={selectedCity.lat} lon={selectedCity.lon} name={selectedCity.name} />
      </div>
    </div>
  );
}
