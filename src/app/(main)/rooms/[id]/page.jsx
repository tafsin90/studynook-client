import Image from "next/image";
import Link from "next/link";
import {
  FaArrowLeft,
  FaBookOpen,
  FaChair,
  FaClock,
  FaLayerGroup,
} from "react-icons/fa6";

const RoomDetailsPage = async ({ params }) => {
  const { id } = await params;

  const res = await fetch(`http://localhost:5000/rooms/${id}`);
  const room = await res.json();

  const {
    roomImageUrl,
    roomName,
    shortDescription,
    floor,
    seatCapacity,
    hourlyRate,
    amenities,
  } = room;
  const { min, max } = seatCapacity;

  return (
    <main className="min-h-screen bg-cream px-4 py-10 dark:bg-forest-dark md:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Back to Rooms */}
        <Link
          href="/rooms"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-forest transition hover:text-sage dark:text-sage-light"
        >
          <FaArrowLeft />
          Back to Rooms
        </Link>

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
              <p className="mb-2 text-sm font-medium text-sage-light">
                Study Room
              </p>

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

                <div className="mt-4 grid gap-4 sm:grid-cols-3">

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

              {/* Icon */}
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-forest text-white">
                <FaBookOpen />
              </div>

              <h2 className="mt-5 text-xl font-bold text-forest-dark dark:text-cream">
                Book this room
              </h2>

              <p className="mt-2 text-sm leading-6 text-forest-dark/70 dark:text-cream/70">
                Reserve this study space for your next focused study
                session.
              </p>

              {/* Price */}
              <div className="mt-6 border-y border-sage-light/40 py-5">
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

              {/* Booking Button */}
              <Link
                href={`/rooms/${id}/book`}
                className="mt-6 flex w-full items-center justify-center rounded-lg bg-forest px-5 py-3 font-semibold text-white transition hover:bg-sage"
              >
                Book This Room
              </Link>

            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default RoomDetailsPage;