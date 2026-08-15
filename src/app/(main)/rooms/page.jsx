import RoomList from "@/components/RoomList";

const AllRoomsPage = async () => {
  const res = await fetch("http://localhost:5000/rooms");
  const rooms = await res.json();

  return <RoomList rooms={rooms} />;
};

export default AllRoomsPage;