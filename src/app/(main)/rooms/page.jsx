import RoomList from "@/components/RoomList";

export const metadata = {
  title: "Available Rooms", 
};

const AllRoomsPage = async () => {
  
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/rooms`);
  const rooms = await res.json();

  return <RoomList rooms={rooms} />;
};

export default AllRoomsPage;