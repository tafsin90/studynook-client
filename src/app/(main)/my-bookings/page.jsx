import BookingsTable from "@/components/BookingsTable";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function MyBookingsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const userId = session.user.id;

  // Update expired bookings first
  await fetch("http://localhost:5000/bookings/status", {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
    },
    cache: "no-store"
  });

  // get updated bookings
  const res = await fetch(`http://localhost:5000/bookings?userId=${userId}`,{
    cache: "no-store"
  });
  const bookingDatas = await res.json();
  // console.log(bookingDatas);

  return (
    <div>
      <BookingsTable bookingDatas={bookingDatas} userId={userId}></BookingsTable>
    </div>
  );
}
