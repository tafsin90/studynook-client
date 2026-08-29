import ListingTable from "@/components/ListingTable";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";


export const metadata = {
  title: "My Listings", 
};

const MyListingsPage = async() => {

    const session = await auth.api.getSession({
        headers: await headers(),
      });
      const user = session?.user;

      const res = await fetch(`http://localhost:5000/listings?userId=${user.id}`)
      const listingDatas = await res.json()
      console.log(listingDatas)
  return (
    <div>
      <ListingTable listingDatas={listingDatas} user={user}></ListingTable>
    </div>
  )
}

export default MyListingsPage