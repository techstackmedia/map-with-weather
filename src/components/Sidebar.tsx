import { cities } from "@/utiles/cities";
import { useState } from "react";

type SidebarProps = {
  onSelect: (lat: number, lon: number, name: string) => void;
};

export default function Sidebar({ onSelect }: SidebarProps) {
  const [search, setSearch] = useState("");

  const filtered = cities.filter((city) =>
    city.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 w-full md:w-64 bg-white max-h-[50vh] md:max-h-full overflow-y-auto border-b md:border-b-0 md:border-r border-gray-200">
      <input
        type="text"
        placeholder="Search city..."
        className="w-full mb-4 p-2 border rounded"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ul className="space-y-1">
        {filtered.map((city) => (
          <li
            key={city.name}
            className="cursor-pointer hover:underline"
            onClick={() => onSelect(city.lat, city.lon, city.name)}
          >
            {city.name}, {city.country}
          </li>
        ))}
      </ul>
    </div>
  );
}
