import Image from "next/image";
import Link from "next/link";

const RoomCard = ({ room }) => {
  const description =
    room.shortDescription.length > 50
      ? room.shortDescription.slice(0, 50) + "..."
      : room.shortDescription;

  const visibleAmenities = room.amenities.slice(0, 3);
  const remainingAmenities = room.amenities.length - 3;

  return (
    <div className="room-card-perspective">
      <div className="room-card-tilt overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-gray-700 dark:bg-gray-900">
        {/* Room Image */}
        <div className="relative h-60 w-full">
          <Image
            src={room.roomImageUrl}
            alt={room.roomName}
            fill
            className="object-cover"
          />
        </div>

        {/* Card Content */}
        <div className="p-5">
          {/* Room Name */}
          <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
            {room.roomName}
          </h2>

          {/* Description */}
          <p className="mb-4 text-sm leading-6 text-gray-600 dark:text-gray-400">
            {description}
          </p>

          {/* Room Information */}
          <div className="mb-4 space-y-2 text-sm">
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-medium">Floor:</span> {room.floor}
            </p>

            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-medium">Capacity:</span>{" "}
              {room.seatCapacity.min}–{room.seatCapacity.max} people
            </p>

            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-medium">Rate:</span> ${room.hourlyRate}/hr
            </p>
          </div>

          {/* Amenities */}
          <div className="mb-5 flex flex-wrap gap-2">
            {visibleAmenities.map((amenity) => (
              <span
                key={amenity}
                className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300"
              >
                {amenity}
              </span>
            ))}

            {remainingAmenities > 0 && (
              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                +{remainingAmenities} more
              </span>
            )}
          </div>

          {/* View Details */}
          <Link
            href={`/rooms/${room._id}`}
            className="block w-full rounded-lg bg-forest px-4 py-2.5 text-center text-sm font-medium text-white transition hover:bg-forest-dark"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;