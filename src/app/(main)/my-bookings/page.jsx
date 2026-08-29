import BookingsTable from "@/components/BookingsTable";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";


export const metadata = {
  title: "My Bookings",
};


export default async function MyBookingsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const userId = session?.user.id;

  // Update expired bookings first
  await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/bookings/status`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
    },
    cache: "no-store"
  });

  // get updated bookings
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/bookings?userId=${userId}`,{
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
