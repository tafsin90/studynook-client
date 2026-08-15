import Banner from "@/components/Banner";
import RoomCard from "@/components/RoomCard";

export default async function Home() {
  const res = await fetch("http://localhost:5000/");
  const sixRooms = await res.json();

  return (
    <div className="space-y-8">
      <Banner></Banner>
      <h1 className="text-4xl font-semibold text-green-950">Featured Rooms</h1>
      <div className="grid grid-cols-1 gap-6 px-6 sm:grid-cols-2 lg:grid-cols-3">
      {sixRooms.map((room) => (
        <RoomCard key={room._id} room={room} />
      ))}
    </div>
    </div>
  );
}