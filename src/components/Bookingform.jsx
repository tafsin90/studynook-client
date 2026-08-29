"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DatePicker } from "@/components/DatePicker";
import TimePicker from "@/components/TimePicker";
import { toast } from "react-toastify";
import { format } from "date-fns";
import { authClient } from "@/lib/auth-client";

export function BookingForm({ room, roomId, user }) {
  const router = useRouter();

  const [date, setDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [error, setError] = useState("");

  // Calculate duration
  const durationHours =
    startTime !== null && endTime !== null ? endTime - startTime : null;

  // Calculate total price
  const totalCost =
    durationHours !== null ? durationHours * room.hourlyRate : null;

  // Convert 24-hour number to AM/PM string
  const formatTime = (hour) => {
    if (hour === null || hour === undefined) {
      return null;
    }

    const period = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;

    return `${displayHour}:00 ${period}`;
  };

  const handleBooking = async () => {
    setError("");

    // Check date and time
    if (date === null || startTime === null || endTime === null) {
      setError("Please select a date, start time, and end time.");
      return;
    }

    // End time must be after start time
    if (endTime <= startTime) {
      setError("End time must be after start time.");
      return;
    }

    // Minimum 1 hour
    if (durationHours < 1) {
      setError("Booking must be at least 1 hour.");
      return;
    }

    // Convert time to AM/PM
    const startTimeString = formatTime(startTime);
    const endTimeString = formatTime(endTime);

    const bookingData = {
      userId: user.id,
      roomId: roomId,
      imageUrl: room.roomImageUrl,
      roomName: room.roomName,
      date: format(new Date(date), "yyyy-MM-dd"),
      startTime: startTimeString,
      endTime: endTimeString,
      startHour: startTime,
      endHour: endTime,
      duration: durationHours,
      price: totalCost,
      status: "Confirmed"
    };

    // console.log("Booking Data:", bookingData);

    const {data: tokenData} = await authClient.token()
    // console.log(tokenData)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${tokenData.token}`
        },
        body: JSON.stringify(bookingData),
      });
      const data = await res.json();
      if (res.status === 409 ){
        setError(data.message )
        return;
      }
      toast.success("Room Booked Successfully.");

      router.refresh();
      // router.push("/my-bookings");
    } catch (error) {
      setError(error.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="mt-3">
      {/* Date */}
      <section>
        <DatePicker value={date} onChange={setDate} />
      </section>

      {/* Time */}
      <section className="mt-3 flex gap-4">
        <TimePicker label="Start" value={startTime} onChange={setStartTime} />

        <TimePicker label="End" value={endTime} onChange={setEndTime} />
      </section>

      {/* Price Preview */}
      {durationHours !== null && durationHours > 0 && (
        <div className="mt-4 rounded-lg bg-sage-light/20 px-4 py-3 dark:bg-sage/20">
          {/* Duration */}
          <div className="flex items-center justify-between text-sm">
            <span className="text-forest-dark/70 dark:text-cream/70">
              Duration
            </span>

            <span className="font-semibold text-forest-dark dark:text-cream">
              {durationHours} {durationHours === 1 ? "hour" : "hours"}
            </span>
          </div>

          {/* Hourly Rate */}
          <div className="mt-2 flex items-center justify-between text-sm">
            <span className="text-forest-dark/70 dark:text-cream/70">
              Hourly rate
            </span>

            <span className="font-semibold text-forest-dark dark:text-cream">
              ${room.hourlyRate}/hr
            </span>
          </div>

          {/* Total */}
          <div className="mt-3 border-t border-sage-light/40 pt-3">
            <div className="flex items-center justify-between">
              <span className="font-medium text-forest-dark dark:text-cream">
                Total
              </span>

              <span className="text-lg font-bold text-forest dark:text-sage-light">
                ${totalCost.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Error */}
      {error && <p className="mt-3 text-sm text-red-500">{error}</p>}

      {/* Booking Button */}
      <button
        type="button"
        onClick={handleBooking}
        className="mt-6 flex w-full items-center justify-center rounded-lg bg-forest px-5 py-3 font-semibold text-white transition hover:bg-sage disabled:cursor-not-allowed disabled:opacity-60"
      >
        Book This Room
      </button>
    </div>
  );
}
