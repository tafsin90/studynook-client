"use client";

import { useState } from "react";
import Filter from "@/components/Filter";
import RoomCard from "@/components/RoomCard";

const RoomList = ({ rooms }) => {
  const [search, setSearch] = useState("");
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [minRate, setMinRate] = useState("");
  const [maxRate, setMaxRate] = useState("");

  const filteredRooms = rooms.filter((room) => {
    const matchesSearch = room.roomName
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesAmenities = selectedAmenities.every((amenity) =>
      room.amenities.includes(amenity)
    );

    const matchesMinRate =
      minRate === "" || room.hourlyRate >= Number(minRate);

    const matchesMaxRate =
      maxRate === "" || room.hourlyRate <= Number(maxRate);

    return matchesSearch && matchesAmenities && matchesMinRate && matchesMaxRate;
  });

  const handleReset = () => {
    setSearch("");
    setSelectedAmenities([]);
    setMinRate("");
    setMaxRate("");
  };

  return (
    <div className="flex gap-3 py-6">
      <Filter
        search={search}
        setSearch={setSearch}
        selectedAmenities={selectedAmenities}
        setSelectedAmenities={setSelectedAmenities}
        minRate={minRate}
        setMinRate={setMinRate}
        maxRate={maxRate}
        setMaxRate={setMaxRate}
        onReset={handleReset}
      />

      <div className="grid flex-1 grid-cols-1 gap-2.5 md:grid-cols-2 xl:grid-cols-3">
        {filteredRooms.map((room) => (
          <RoomCard key={room._id} room={room} />
        ))}
      </div>
    </div>
  );
};

export default RoomList;