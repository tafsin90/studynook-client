import { BookingForm } from "@/components/Bookingform";
import { DeleteRoomModal } from "@/components/DeleteRoomModal";
import EditRoomModal from "@/components/EditRoomModal";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import {
  FaArrowLeft,
  FaCalendarCheck,
  FaChair,
  FaClock,
  FaLayerGroup,
} from "react-icons/fa6";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const res = await fetch(`http://localhost:5000/rooms/${id}`);
  const room = await res.json();

  return {
    title: `${room.roomName} | StudyNook`,
  };
}

const RoomDetailsPage = async ({ params }) => {
  const { id } = await params;
  // get the token (jwt)
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });
  // console.log(token)

  // find the user
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;

  // fetching API
  const res = await fetch(`http://localhost:5000/rooms/${id}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    throw new Error("You are not authorized to view this room.");
  }
  const room = await res.json();
  // console.log(room);
  // console.log(user);

  const {
    userId,
    roomImageUrl,
    roomName,
    shortDescription,
    floor,
    seatCapacity,
    hourlyRate,
    amenities,
    bookingCount,
  } = room;
  const { min, max } = seatCapacity;
  const isOwner = user?.id === userId;

  return (
    <main className="min-h-screen bg-cream px-4 py-10 dark:bg-forest-dark md:px-8">
      <div className="mx-auto max-w-7xl">
        <section className="flex items-center justify-between py-4">
          {/* Back to Rooms */}
          <Link
            href="/rooms"
            className=" inline-flex items-center gap-2  font-semibold  text-forest transition hover:text-sage dark:text-sage-light"
          >
            <FaArrowLeft />
            Back to Rooms
          </Link>

          {/* edit & delete button */}
          {isOwner && (
            <div className=" flex gap-3">
              <EditRoomModal room={room}></EditRoomModal>

              <DeleteRoomModal room={room} user={user}></DeleteRoomModal>
            </div>
          )}
        </section>

        {/* Main Card */}
        <div className="overflow-hidden rounded-2xl border border-sage-light/50 bg-white shadow-md dark:border-sage/30 dark:bg-forest">
          {/* Image */}
          <div className="relative h-[300px] w-full md:h-[450px]">
            <Image
              src={roomImageUrl}
              alt={roomName}
              fill
              priority
              className="object-cover"
            />

            {/* Image overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Room name */}
            <div className="absolute bottom-6 left-6">
              <h1 className="text-3xl font-bold text-white md:text-4xl">
                {roomName}
              </h1>
            </div>
          </div>

          {/* Content */}
          <div className="grid gap-10 p-6 md:p-10 lg:grid-cols-[1fr_340px]">
            {/* Left Section */}
            <div>
              <section>
                <h2 className="text-xl font-bold text-forest-dark dark:text-cream">
                  About this room
                </h2>

                <p className="mt-3 max-w-3xl leading-7 text-black/80">
                  {shortDescription}
                </p>
              </section>

              {/* Room Information */}
              <section className="mt-8">
                <h2 className="text-xl font-bold text-forest-dark dark:text-cream">
                  Room Information
                </h2>

                <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {/* Capacity */}
                  <div className="rounded-xl border border-sage-light/40 bg-cream/60 p-5 dark:border-sage/30 dark:bg-forest-dark">
                    <FaChair className="text-2xl text-forest dark:text-sage-light" />

                    <p className="mt-4 text-sm text-forest-dark/60 dark:text-cream/60">
                      Capacity
                    </p>

                    <p className="mt-1 font-semibold text-forest-dark dark:text-cream">
                      {min} - {max} people
                    </p>
                  </div>

                  {/* Floor */}
                  <div className="rounded-xl border border-sage-light/40 bg-cream/60 p-5 dark:border-sage/30 dark:bg-forest-dark">
                    <FaLayerGroup className="text-2xl text-forest dark:text-sage-light" />

                    <p className="mt-4 text-sm text-forest-dark/60 dark:text-cream/60">
                      Floor
                    </p>

                    <p className="mt-1 font-semibold text-forest-dark dark:text-cream">
                      <span>Floor </span>
                      <span>{floor}</span>
                    </p>
                  </div>

                  {/* Hourly Rate */}
                  <div className="rounded-xl border border-sage-light/40 bg-cream/60 p-5 dark:border-sage/30 dark:bg-forest-dark">
                    <FaClock className="text-2xl text-forest dark:text-sage-light" />

                    <p className="mt-4 text-sm text-forest-dark/60 dark:text-cream/60">
                      Hourly Rate
                    </p>

                    <p className="mt-1 font-semibold text-forest-dark dark:text-cream">
                      ${hourlyRate} / hour
                    </p>
                  </div>

                  {/* Booking Count */}
                  <div className="rounded-xl border border-sage-light/40 bg-cream/60 p-5 dark:border-sage/30 dark:bg-forest-dark">
                    <FaCalendarCheck className="text-2xl text-forest dark:text-sage-light" />

                    <p className="mt-4 text-sm text-forest-dark/60 dark:text-cream/60">
                      Times Booked
                    </p>

                    <p className="mt-1 font-semibold text-forest-dark dark:text-cream">
                      {bookingCount ?? 0}
                    </p>
                  </div>
                </div>
              </section>

              {/* Amenities */}
              <section className="mt-8">
                <h2 className="text-xl font-bold text-forest-dark dark:text-cream">
                  Amenities
                </h2>

                <div className="mt-4 flex flex-wrap gap-3">
                  {amenities?.map((amenity) => (
                    <span
                      key={amenity}
                      className="rounded-full border border-sage-light/50 bg-sage-light/20 px-4 py-2 text-sm font-medium text-forest-dark dark:border-sage/40 dark:bg-sage/20 dark:text-cream"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </section>
            </div>

            {/* Booking Card */}
            <div className="h-fit rounded-2xl border border-sage-light/50 bg-cream p-6 dark:border-sage/30 dark:bg-forest-dark">
              <h2 className="mt-3 text-2xl font-bold text-forest-dark dark:text-cream">
                Book this room
              </h2>

              <p className="mt-2 text-sm leading-6 text-forest-dark/70 dark:text-cream/70">
                Reserve this study space for your next focused study session.
              </p>

              {/* Price */}
              <div className="mt-3 border-y border-sage-light/40 py-3">
                <p className="text-sm text-forest-dark/60 dark:text-cream/60">
                  Price
                </p>

                <div className="mt-1">
                  <span className="text-3xl font-bold text-forest dark:text-sage-light">
                    ${hourlyRate}
                  </span>

                  <span className="ml-1 text-sm text-forest-dark/60 dark:text-cream/60">
                    / hour
                  </span>
                </div>
              </div>

              {user ? (
                <BookingForm room={room} roomId={id} user={user} />
              ) : (
                <Link
                  href={`/login?callbackUrl=${encodeURIComponent(`/rooms/${id}`)}`}
                  className="mt-3 flex w-full items-center justify-center rounded-lg bg-forest px-5 py-3 font-semibold text-white transition hover:bg-sage"
                >
                  Login To Book This Room
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default RoomDetailsPage;
