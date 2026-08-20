diff --git a/src/app/(main)/add-room/page.jsx b/src/app/(main)/add-room/page.jsx
index 0290d50..86d3c73 100644
--- a/src/app/(main)/add-room/page.jsx
+++ b/src/app/(main)/add-room/page.jsx
@@ -1,301 +1,7 @@
-"use client";
-
-import {
-  Button,
-  Description,
-  FieldError,
-  Form,
-  Input,
-  Label,
-  TextArea,
-  TextField,
-} from "@heroui/react";
-import { useState } from "react";
+import RoomForm from "@/components/RoomForm";
 
 const AddRoomPage = () => {
-  const [capacityError, setCapacityError] = useState("");
-
-  const amenityOptions = [
-    "Whiteboard",
-    "Projector",
-    "Wi-Fi",
-    "Power Outlets",
-    "Quiet Zone",
-    "Air Conditioning",
-  ];
-
-  const handleSubmit = async (e) => {
-    e.preventDefault();
-const form = e.currentTarget;
-    const formData = new FormData(e.currentTarget);
-    const roomData = Object.fromEntries(formData.entries());
-
-    const minCapacity = Number(roomData.minCapacity);
-    const maxCapacity = Number(roomData.maxCapacity);
-
-    if (maxCapacity < minCapacity) {
-      setCapacityError("Maximum capacity cannot be less than minimum capacity");
-      return;
-    }
-    setCapacityError("");
-
-    const room = {
-      roomImageUrl: roomData.roomImageUrl,
-      roomName: roomData.roomName,
-      shortDescription: roomData.shortDescription,
-      floor: roomData.roomFloor,
-      seatCapacity: {
-        min: minCapacity,
-        max: maxCapacity,
-      },
-      hourlyRate: Number(roomData.roomRate),
-      amenities: formData.getAll("amenities"),
-    };
-
-    // console.log(room);
-
-    const res = await fetch("http://localhost:5000/add-room", {
-      method: "POST",
-      headers: {
-        "content-type": "application/json",
-      },
-      body: JSON.stringify(room),
-    });
-    const data = await res.json();
-    console.log(data)
-
-    if (res.ok) {
-      form.reset();
-    } else {
-      console.error(data);
-    }
-  };
-
-  return (
-    <div className="flex min-h-screen justify-center bg-cream px-4 py-10 dark:bg-forest-dark">
-      <div className="w-full max-w-2xl rounded-2xl border border-sage-light/40 bg-white p-8 shadow-lg dark:border-sage/30 dark:bg-forest">
-        {/* Header */}
-        <div className="mb-8">
-          <h1 className="text-3xl font-bold text-forest-dark dark:text-cream">
-            Add a Room
-          </h1>
-
-          <p className="mt-2 text-sm text-gray-600 dark:text-sage-light">
-            Add a study room to StudyNook.
-          </p>
-        </div>
-
-        <Form className="flex w-full flex-col gap-5" onSubmit={handleSubmit}>
-          {/* Room Name */}
-          <TextField
-            isRequired
-            name="roomName"
-            validate={(value) => {
-              if (value.length < 3) {
-                return "Room name must be at least 3 characters";
-              }
-
-              return null;
-            }}
-          >
-            <Label className="text-sm font-medium text-forest-dark dark:text-cream">
-              Room Name
-            </Label>
-
-            <Input
-              placeholder="Pin drop silence room"
-              className="mt-1 rounded-lg border border-sage-light/60 bg-white px-3 text-forest-dark outline-none placeholder:text-gray-400 focus:border-forest dark:border-sage/50 dark:bg-forest-dark dark:text-cream dark:placeholder:text-sage-light"
-            />
-
-            <FieldError className="mt-1 text-sm text-red-500" />
-          </TextField>
-
-          {/* Short Description */}
-          <TextField
-            isRequired
-            name="shortDescription"
-            validate={(value) => {
-              if (value.length < 10) {
-                return "Description must be at least 10 characters";
-              }
-
-              if (value.length > 100) {
-                return "Description cannot exceed 100 characters";
-              }
-
-              return null;
-            }}
-          >
-            <Label className="text-sm font-medium text-forest-dark dark:text-cream">
-              Short Description
-            </Label>
-
-            <Input
-              placeholder="A quiet room perfect for focused study sessions."
-              className="mt-1 rounded-lg border border-sage-light/60 bg-white px-3 py-3 text-forest-dark outline-none placeholder:text-gray-400 focus:border-forest dark:border-sage/50 dark:bg-forest-dark dark:text-cream dark:placeholder:text-sage-light"
-            />
-
-            <Description className="mt-1 text-xs text-gray-600 dark:text-sage-light">
-              Keep it short and descriptive.
-            </Description>
-
-            <FieldError className="mt-1 text-sm text-red-500" />
-          </TextField>
-
-          {/* Room Image URL */}
-          <TextField isRequired name="roomImageUrl" type="url">
-            <Label className="text-sm font-medium text-forest-dark dark:text-cream">
-              Room Image URL
-            </Label>
-
-            <Input
-              placeholder="https://example.com/room.jpg"
-              className="mt-1 rounded-lg border border-sage-light/60 bg-white px-3 text-forest-dark outline-none placeholder:text-gray-400 focus:border-forest dark:border-sage/50 dark:bg-forest-dark dark:text-cream dark:placeholder:text-sage-light"
-            />
-
-            <FieldError className="mt-1 text-sm text-red-500" />
-          </TextField>
-
-          {/* Floor */}
-          <TextField isRequired name="roomFloor" type="number">
-            <Label className="text-sm font-medium text-forest-dark dark:text-cream">
-              Floor
-            </Label>
-
-            <Input
-              placeholder="3"
-              className="mt-1 rounded-lg border border-sage-light/60 bg-white px-3 text-forest-dark outline-none placeholder:text-gray-400 focus:border-forest dark:border-sage/50 dark:bg-forest-dark dark:text-cream dark:placeholder:text-sage-light"
-            />
-
-            <FieldError className="mt-1 text-sm text-red-500" />
-          </TextField>
-
-          {/* Capacity */}
-          <div>
-            <Label className="mb-2 block text-sm font-medium text-forest-dark dark:text-cream">
-              Seat Capacity
-            </Label>
-
-            <div className="grid grid-cols-2 gap-3">
-              <TextField
-                isRequired
-                name="minCapacity"
-                type="number"
-                validate={(value) => {
-                  if (Number(value) < 1) {
-                    return "Minimum must be at least 1";
-                  }
-
-                  return null;
-                }}
-              >
-                <Input
-                  placeholder="Minimum"
-                  className="rounded-lg border border-sage-light/60 bg-white px-3 text-forest-dark outline-none placeholder:text-gray-400 focus:border-forest dark:border-sage/50 dark:bg-forest-dark dark:text-cream dark:placeholder:text-sage-light"
-                />
-
-                <FieldError className="mt-1 text-sm text-red-500" />
-              </TextField>
-
-              <TextField
-                isRequired
-                name="maxCapacity"
-                type="number"
-                validate={(value) => {
-                  if (Number(value) < 1) {
-                    return "Maximum must be at least 1";
-                  }
-
-                  return null;
-                }}
-              >
-                <Input
-                  placeholder="Maximum"
-                  className="rounded-lg border border-sage-light/60 bg-white px-3 text-forest-dark outline-none placeholder:text-gray-400 focus:border-forest dark:border-sage/50 dark:bg-forest-dark dark:text-cream dark:placeholder:text-sage-light"
-                />
-
-                <FieldError className="mt-1 text-sm text-red-500" />
-              </TextField>
-            </div>
-            {capacityError && (
-              <p className="mt-1 text-xs text-red-500">{capacityError}</p>
-            )}
-          </div>
-
-          {/* Hourly Rate */}
-          <TextField
-            isRequired
-            name="roomRate"
-            type="number"
-            validate={(value) => {
-              if (Number(value) <= 0) {
-                return "Hourly rate must be greater than 0";
-              }
-
-              return null;
-            }}
-          >
-            <Label className="text-sm font-medium text-forest-dark dark:text-cream">
-              Hourly Rate ($)
-            </Label>
-
-            <Input
-              placeholder="5"
-              className="mt-1 rounded-lg border border-sage-light/60 bg-white px-3 text-forest-dark outline-none placeholder:text-gray-400 focus:border-forest dark:border-sage/50 dark:bg-forest-dark dark:text-cream dark:placeholder:text-sage-light"
-            />
-
-            <FieldError className="mt-1 text-sm text-red-500" />
-          </TextField>
-
-          {/* Amenities */}
-          <div>
-            <Label className="mb-3 block text-sm font-medium text-forest-dark dark:text-cream">
-              Amenities
-            </Label>
-
-            <div className="grid grid-cols-2 gap-3">
-              {amenityOptions.map((amenity) => (
-                <label
-                  key={amenity}
-                  className="flex cursor-pointer items-center gap-2 text-sm text-gray-700 dark:text-sage-light"
-                >
-                  <input
-                    type="checkbox"
-                    name="amenities"
-                    value={amenity}
-                    className="h-4 w-4 accent-forest"
-                  />
-
-                  <span>{amenity}</span>
-                </label>
-              ))}
-            </div>
-
-            <Description className="mt-2 text-xs text-gray-600 dark:text-sage-light">
-              Select all amenities available in this room.
-            </Description>
-          </div>
-          {/* Buttons */}
-          <div className="mt-3 flex w-full gap-3">
-            <Button
-              type="submit"
-              className="flex-1 rounded-lg bg-forest px-4 py-2.5 font-medium text-white transition hover:bg-forest-dark"
-            >
-              Publish Room
-            </Button>
-
-            <Button
-              type="reset"
-              variant="secondary"
-              className="rounded-lg border border-sage bg-transparent px-4 py-2.5 font-medium text-forest-dark transition hover:bg-sage-light/20 dark:text-cream dark:hover:bg-sage/20"
-            >
-              Reset
-            </Button>
-          </div>
-        </Form>
-      </div>
-    </div>
-  );
+  return <RoomForm mode="add" redirectTo="/my-listings" />;
 };
 
 export default AddRoomPage;
diff --git a/src/app/(main)/my-bookings/page.jsx b/src/app/(main)/my-bookings/page.jsx
new file mode 100644
index 0000000..dfab5aa
--- /dev/null
+++ b/src/app/(main)/my-bookings/page.jsx
@@ -0,0 +1,19 @@
+import { auth } from "@/lib/auth";
+import { headers } from "next/headers";
+import { redirect } from "next/navigation";
+import { API_URL } from "@/lib/api";
+import MyBookingsClient from "@/components/MyBookingsClient";
+
+const MyBookingsPage = async () => {
+  const session = await auth.api.getSession({ headers: await headers() });
+  if (!session) redirect("/login");
+
+  const res = await fetch(`${API_URL}/bookings?user=${session.user.id}`, {
+    cache: "no-store",
+  });
+  const bookings = await res.json();
+
+  return <MyBookingsClient initialBookings={bookings} userId={session.user.id} />;
+};
+
+export default MyBookingsPage;
diff --git a/src/app/(main)/my-listings/[id]/edit/page.jsx b/src/app/(main)/my-listings/[id]/edit/page.jsx
new file mode 100644
index 0000000..0db5455
--- /dev/null
+++ b/src/app/(main)/my-listings/[id]/edit/page.jsx
@@ -0,0 +1,27 @@
+import { auth } from "@/lib/auth";
+import { headers } from "next/headers";
+import { redirect, notFound } from "next/navigation";
+import { API_URL } from "@/lib/api";
+import RoomForm from "@/components/RoomForm";
+
+const EditRoomPage = async ({ params }) => {
+  const { id } = await params;
+
+  const session = await auth.api.getSession({ headers: await headers() });
+  if (!session) redirect("/login");
+
+  const res = await fetch(`${API_URL}/rooms/${id}`, { cache: "no-store" });
+  if (!res.ok) notFound();
+
+  const room = await res.json();
+
+  if (room.createdBy !== session.user.id) {
+    redirect("/my-listings");
+  }
+
+  return (
+    <RoomForm mode="edit" room={room} roomId={id} redirectTo="/my-listings" />
+  );
+};
+
+export default EditRoomPage;
diff --git a/src/app/(main)/my-listings/page.jsx b/src/app/(main)/my-listings/page.jsx
new file mode 100644
index 0000000..9bbd05c
--- /dev/null
+++ b/src/app/(main)/my-listings/page.jsx
@@ -0,0 +1,19 @@
+import { auth } from "@/lib/auth";
+import { headers } from "next/headers";
+import { redirect } from "next/navigation";
+import { API_URL } from "@/lib/api";
+import MyListingsClient from "@/components/MyListingsClient";
+
+const MyListingsPage = async () => {
+  const session = await auth.api.getSession({ headers: await headers() });
+  if (!session) redirect("/login");
+
+  const res = await fetch(`${API_URL}/rooms?createdBy=${session.user.id}`, {
+    cache: "no-store",
+  });
+  const rooms = await res.json();
+
+  return <MyListingsClient initialRooms={rooms} userId={session.user.id} />;
+};
+
+export default MyListingsPage;
diff --git a/src/app/(main)/page.jsx b/src/app/(main)/page.jsx
index 78aeef3..0801352 100644
--- a/src/app/(main)/page.jsx
+++ b/src/app/(main)/page.jsx
@@ -1,8 +1,9 @@
 import Banner from "@/components/Banner";
 import RoomCard from "@/components/RoomCard";
+import { API_URL } from "@/lib/api";
 
 export default async function Home() {
-  const res = await fetch("http://localhost:5000/");
+  const res = await fetch(`${API_URL}/`);
   const sixRooms = await res.json();
 
   return (
diff --git a/src/app/(main)/rooms/[id]/book/page.jsx b/src/app/(main)/rooms/[id]/book/page.jsx
new file mode 100644
index 0000000..ac0d0d5
--- /dev/null
+++ b/src/app/(main)/rooms/[id]/book/page.jsx
@@ -0,0 +1,26 @@
+import { auth } from "@/lib/auth";
+import { headers } from "next/headers";
+import { redirect, notFound } from "next/navigation";
+import { API_URL } from "@/lib/api";
+import BookingForm from "@/components/BookingForm";
+
+const BookRoomPage = async ({ params }) => {
+  const { id } = await params;
+
+  const session = await auth.api.getSession({ headers: await headers() });
+  if (!session) redirect("/login");
+
+  const res = await fetch(`${API_URL}/rooms/${id}`, { cache: "no-store" });
+  if (!res.ok) notFound();
+
+  const room = await res.json();
+
+  // A user cannot book a room they created themselves.
+  if (room.createdBy === session.user.id) {
+    redirect(`/rooms/${id}`);
+  }
+
+  return <BookingForm room={room} user={session.user} />;
+};
+
+export default BookRoomPage;
diff --git a/src/app/(main)/rooms/[id]/page.jsx b/src/app/(main)/rooms/[id]/page.jsx
index 4202a00..2041f11 100644
--- a/src/app/(main)/rooms/[id]/page.jsx
+++ b/src/app/(main)/rooms/[id]/page.jsx
@@ -7,13 +7,21 @@ import {
   FaClock,
   FaLayerGroup,
 } from "react-icons/fa6";
+import { auth } from "@/lib/auth";
+import { headers } from "next/headers";
+import { API_URL } from "@/lib/api";
+import RoomOwnerActions from "@/components/RoomOwnerActions";
 
 const RoomDetailsPage = async ({ params }) => {
   const { id } = await params;
 
-  const res = await fetch(`http://localhost:5000/rooms/${id}`);
+  const session = await auth.api.getSession({ headers: await headers() });
+
+  const res = await fetch(`${API_URL}/rooms/${id}`);
   const room = await res.json();
 
+  const isOwner = session?.user?.id === room.createdBy;
+
   const {
     roomImageUrl,
     roomName,
@@ -161,12 +169,13 @@ const RoomDetailsPage = async ({ params }) => {
               </div>
 
               <h2 className="mt-5 text-xl font-bold text-forest-dark dark:text-cream">
-                Book this room
+                {isOwner ? "Your room" : "Book this room"}
               </h2>
 
               <p className="mt-2 text-sm leading-6 text-forest-dark/70 dark:text-cream/70">
-                Reserve this study space for your next focused study
-                session.
+                {isOwner
+                  ? "You created this listing. You can edit its details or remove it below."
+                  : "Reserve this study space for your next focused study session."}
               </p>
 
               {/* Price */}
@@ -186,13 +195,20 @@ const RoomDetailsPage = async ({ params }) => {
                 </div>
               </div>
 
-              {/* Booking Button */}
-              <Link
-                href={`/rooms/${id}/book`}
-                className="mt-6 flex w-full items-center justify-center rounded-lg bg-forest px-5 py-3 font-semibold text-white transition hover:bg-sage"
-              >
-                Book This Room
-              </Link>
+              {isOwner ? (
+                <RoomOwnerActions
+                  roomId={id}
+                  roomName={roomName}
+                  userId={session.user.id}
+                />
+              ) : (
+                <Link
+                  href={`/rooms/${id}/book`}
+                  className="mt-6 flex w-full items-center justify-center rounded-lg bg-forest px-5 py-3 font-semibold text-white transition hover:bg-sage"
+                >
+                  Book This Room
+                </Link>
+              )}
 
             </div>
           </div>
diff --git a/src/app/(main)/rooms/page.jsx b/src/app/(main)/rooms/page.jsx
index f7fd166..a667ec3 100644
--- a/src/app/(main)/rooms/page.jsx
+++ b/src/app/(main)/rooms/page.jsx
@@ -1,7 +1,8 @@
 import RoomList from "@/components/RoomList";
+import { API_URL } from "@/lib/api";
 
 const AllRoomsPage = async () => {
-  const res = await fetch("http://localhost:5000/rooms");
+  const res = await fetch(`${API_URL}/rooms`, { cache: "no-store" });
   const rooms = await res.json();
 
   return <RoomList rooms={rooms} />;
diff --git a/src/components/BookingCard.jsx b/src/components/BookingCard.jsx
new file mode 100644
index 0000000..945e4a8
--- /dev/null
+++ b/src/components/BookingCard.jsx
@@ -0,0 +1,83 @@
+"use client";
+
+import Image from "next/image";
+import Link from "next/link";
+import { useState } from "react";
+import { FaCalendar, FaClock, FaXmark } from "react-icons/fa6";
+import { API_URL } from "@/lib/api";
+
+const BookingCard = ({ booking, userId, onCancelled }) => {
+  const [cancelling, setCancelling] = useState(false);
+
+  const handleCancel = async () => {
+    if (!confirm(`Cancel your booking for "${booking.roomName}"?`)) return;
+
+    setCancelling(true);
+    try {
+      const res = await fetch(
+        `${API_URL}/bookings/${booking._id}?userId=${userId}`,
+        { method: "DELETE" },
+      );
+
+      if (res.ok) {
+        onCancelled(booking._id);
+      } else {
+        const data = await res.json().catch(() => ({}));
+        alert(data.message || "Failed to cancel booking");
+      }
+    } finally {
+      setCancelling(false);
+    }
+  };
+
+  return (
+    <div className="flex flex-col gap-4 overflow-hidden rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900 sm:flex-row">
+      <div className="relative h-40 w-full shrink-0 overflow-hidden rounded-lg sm:h-auto sm:w-48">
+        <Image
+          src={booking.roomImageUrl}
+          alt={booking.roomName}
+          fill
+          className="object-cover"
+        />
+      </div>
+
+      <div className="flex flex-1 flex-col justify-between">
+        <div>
+          <Link
+            href={`/rooms/${booking.roomId}`}
+            className="text-lg font-semibold text-gray-900 hover:underline dark:text-white"
+          >
+            {booking.roomName}
+          </Link>
+
+          <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
+            <span className="flex items-center gap-1.5">
+              <FaCalendar />
+              {booking.date}
+            </span>
+
+            <span className="flex items-center gap-1.5">
+              <FaClock />
+              {booking.startTime} &bull; {booking.duration}h
+            </span>
+          </div>
+
+          <p className="mt-2 text-sm font-medium text-forest dark:text-sage-light">
+            Total: ${booking.totalPrice}
+          </p>
+        </div>
+
+        <button
+          onClick={handleCancel}
+          disabled={cancelling}
+          className="mt-3 flex w-fit items-center gap-2 rounded-lg border border-red-500 px-3 py-2 text-sm font-medium text-red-500 transition hover:bg-red-500 hover:text-white disabled:opacity-50"
+        >
+          <FaXmark />
+          {cancelling ? "Cancelling..." : "Cancel Booking"}
+        </button>
+      </div>
+    </div>
+  );
+};
+
+export default BookingCard;
diff --git a/src/components/BookingForm.jsx b/src/components/BookingForm.jsx
new file mode 100644
index 0000000..4592408
--- /dev/null
+++ b/src/components/BookingForm.jsx
@@ -0,0 +1,157 @@
+"use client";
+
+import { useState } from "react";
+import { useRouter } from "next/navigation";
+import Link from "next/link";
+import Image from "next/image";
+import { FaArrowLeft } from "react-icons/fa6";
+import { API_URL } from "@/lib/api";
+
+const inputClass =
+  "mt-1 w-full rounded-lg border border-sage-light/60 bg-white px-3 py-2.5 text-forest-dark outline-none placeholder:text-gray-400 focus:border-forest dark:border-sage/50 dark:bg-forest-dark dark:text-cream dark:placeholder:text-sage-light";
+
+const BookingForm = ({ room, user }) => {
+  const router = useRouter();
+  const [duration, setDuration] = useState(1);
+  const [error, setError] = useState("");
+  const [submitting, setSubmitting] = useState(false);
+
+  const total = (Number(duration) || 0) * room.hourlyRate;
+  const today = new Date().toISOString().split("T")[0];
+
+  const handleSubmit = async (e) => {
+    e.preventDefault();
+    const formData = new FormData(e.currentTarget);
+    const values = Object.fromEntries(formData.entries());
+
+    if (Number(values.duration) < 1) {
+      setError("Minimum booking is 1 hour");
+      return;
+    }
+
+    setSubmitting(true);
+    setError("");
+
+    try {
+      const res = await fetch(`${API_URL}/bookings`, {
+        method: "POST",
+        headers: { "content-type": "application/json" },
+        body: JSON.stringify({
+          roomId: room._id,
+          bookedBy: user.id,
+          bookedByName: user.name,
+          bookedByEmail: user.email,
+          date: values.date,
+          startTime: values.startTime,
+          duration: Number(values.duration),
+        }),
+      });
+
+      const data = await res.json().catch(() => ({}));
+
+      if (!res.ok) {
+        setError(data.message || "Failed to book this room. Please try again.");
+        return;
+      }
+
+      router.push("/my-bookings");
+    } catch (err) {
+      setError("Failed to book this room. Please try again.");
+    } finally {
+      setSubmitting(false);
+    }
+  };
+
+  return (
+    <main className="min-h-screen bg-cream px-4 py-10 dark:bg-forest-dark md:px-8">
+      <div className="mx-auto max-w-xl">
+        <Link
+          href={`/rooms/${room._id}`}
+          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-forest transition hover:text-sage dark:text-sage-light"
+        >
+          <FaArrowLeft />
+          Back to Room
+        </Link>
+
+        <div className="overflow-hidden rounded-2xl border border-sage-light/50 bg-white shadow-md dark:border-sage/30 dark:bg-forest">
+          <div className="relative h-48 w-full">
+            <Image
+              src={room.roomImageUrl}
+              alt={room.roomName}
+              fill
+              className="object-cover"
+            />
+          </div>
+
+          <div className="p-6 md:p-8">
+            <h1 className="text-2xl font-bold text-forest-dark dark:text-cream">
+              Book {room.roomName}
+            </h1>
+
+            <p className="mt-1 text-sm text-forest-dark/70 dark:text-cream/70">
+              ${room.hourlyRate} / hour &bull; Floor {room.floor}
+            </p>
+
+            <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-5">
+              <div>
+                <label className="text-sm font-medium text-forest-dark dark:text-cream">
+                  Date
+                </label>
+                <input
+                  required
+                  type="date"
+                  name="date"
+                  min={today}
+                  className={inputClass}
+                />
+              </div>
+
+              <div>
+                <label className="text-sm font-medium text-forest-dark dark:text-cream">
+                  Start Time
+                </label>
+                <input required type="time" name="startTime" className={inputClass} />
+              </div>
+
+              <div>
+                <label className="text-sm font-medium text-forest-dark dark:text-cream">
+                  Duration (hours)
+                </label>
+                <input
+                  required
+                  type="number"
+                  name="duration"
+                  min="1"
+                  defaultValue="1"
+                  onChange={(e) => setDuration(e.target.value)}
+                  className={inputClass}
+                />
+              </div>
+
+              <div className="rounded-lg border border-sage-light/40 bg-cream/60 p-4 dark:border-sage/30 dark:bg-forest-dark">
+                <p className="text-sm text-forest-dark/60 dark:text-cream/60">
+                  Total Price
+                </p>
+                <p className="text-2xl font-bold text-forest dark:text-sage-light">
+                  ${total || 0}
+                </p>
+              </div>
+
+              {error && <p className="text-sm text-red-500">{error}</p>}
+
+              <button
+                type="submit"
+                disabled={submitting}
+                className="rounded-lg bg-forest px-4 py-2.5 font-medium text-white transition hover:bg-forest-dark disabled:opacity-50"
+              >
+                {submitting ? "Booking..." : "Confirm Booking"}
+              </button>
+            </form>
+          </div>
+        </div>
+      </div>
+    </main>
+  );
+};
+
+export default BookingForm;
diff --git a/src/components/MyBookingsClient.jsx b/src/components/MyBookingsClient.jsx
new file mode 100644
index 0000000..82ade51
--- /dev/null
+++ b/src/components/MyBookingsClient.jsx
@@ -0,0 +1,39 @@
+"use client";
+
+import { useState } from "react";
+import BookingCard from "@/components/BookingCard";
+
+const MyBookingsClient = ({ initialBookings, userId }) => {
+  const [bookings, setBookings] = useState(initialBookings);
+
+  const handleCancelled = (id) => {
+    setBookings((prev) => prev.filter((booking) => booking._id !== id));
+  };
+
+  return (
+    <div className="px-6 py-8">
+      <h1 className="mb-6 text-3xl font-bold text-forest-dark dark:text-cream">
+        My Bookings
+      </h1>
+
+      {bookings.length === 0 ? (
+        <p className="flex h-40 items-center justify-center text-center text-lg font-medium text-green-900 dark:text-gray-300">
+          You haven&apos;t booked any rooms yet.
+        </p>
+      ) : (
+        <div className="flex flex-col gap-4">
+          {bookings.map((booking) => (
+            <BookingCard
+              key={booking._id}
+              booking={booking}
+              userId={userId}
+              onCancelled={handleCancelled}
+            />
+          ))}
+        </div>
+      )}
+    </div>
+  );
+};
+
+export default MyBookingsClient;
diff --git a/src/components/MyListingsClient.jsx b/src/components/MyListingsClient.jsx
new file mode 100644
index 0000000..3af7597
--- /dev/null
+++ b/src/components/MyListingsClient.jsx
@@ -0,0 +1,51 @@
+"use client";
+
+import { useState } from "react";
+import Link from "next/link";
+import { FaPlus } from "react-icons/fa6";
+import MyRoomCard from "@/components/MyRoomCard";
+
+const MyListingsClient = ({ initialRooms, userId }) => {
+  const [rooms, setRooms] = useState(initialRooms);
+
+  const handleDeleted = (id) => {
+    setRooms((prev) => prev.filter((room) => room._id !== id));
+  };
+
+  return (
+    <div className="px-6 py-8">
+      <div className="mb-6 flex items-center justify-between">
+        <h1 className="text-3xl font-bold text-forest-dark dark:text-cream">
+          My Listings
+        </h1>
+
+        <Link
+          href="/add-room"
+          className="flex items-center gap-2 rounded-lg bg-forest px-4 py-2 text-sm font-medium text-white transition hover:bg-forest-dark"
+        >
+          <FaPlus />
+          Add Room
+        </Link>
+      </div>
+
+      {rooms.length === 0 ? (
+        <p className="flex h-40 items-center justify-center text-center text-lg font-medium text-green-900 dark:text-gray-300">
+          You haven&apos;t listed any rooms yet.
+        </p>
+      ) : (
+        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
+          {rooms.map((room) => (
+            <MyRoomCard
+              key={room._id}
+              room={room}
+              userId={userId}
+              onDeleted={handleDeleted}
+            />
+          ))}
+        </div>
+      )}
+    </div>
+  );
+};
+
+export default MyListingsClient;
diff --git a/src/components/MyRoomCard.jsx b/src/components/MyRoomCard.jsx
new file mode 100644
index 0000000..cf7bcaa
--- /dev/null
+++ b/src/components/MyRoomCard.jsx
@@ -0,0 +1,85 @@
+"use client";
+
+import Image from "next/image";
+import Link from "next/link";
+import { useState } from "react";
+import { useRouter } from "next/navigation";
+import { FaPen, FaTrash } from "react-icons/fa6";
+import { API_URL } from "@/lib/api";
+
+const MyRoomCard = ({ room, userId, onDeleted }) => {
+  const router = useRouter();
+  const [deleting, setDeleting] = useState(false);
+
+  const handleDelete = async () => {
+    if (!confirm(`Delete "${room.roomName}"? This cannot be undone.`)) return;
+
+    setDeleting(true);
+    try {
+      const res = await fetch(`${API_URL}/rooms/${room._id}?userId=${userId}`, {
+        method: "DELETE",
+      });
+
+      if (res.ok) {
+        onDeleted(room._id);
+        router.refresh();
+      } else {
+        const data = await res.json().catch(() => ({}));
+        alert(data.message || "Failed to delete room");
+      }
+    } finally {
+      setDeleting(false);
+    }
+  };
+
+  return (
+    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900">
+      <div className="relative h-52 w-full">
+        <Image
+          src={room.roomImageUrl}
+          alt={room.roomName}
+          fill
+          className="object-cover"
+        />
+      </div>
+
+      <div className="p-5">
+        <h2 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">
+          {room.roomName}
+        </h2>
+
+        <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
+          Floor {room.floor} &bull; ${room.hourlyRate}/hr
+        </p>
+
+        <div className="flex gap-2">
+          <Link
+            href={`/my-listings/${room._id}/edit`}
+            className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-forest px-3 py-2 text-sm font-medium text-forest transition hover:bg-forest hover:text-white"
+          >
+            <FaPen />
+            Edit
+          </Link>
+
+          <button
+            onClick={handleDelete}
+            disabled={deleting}
+            className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-red-500 px-3 py-2 text-sm font-medium text-red-500 transition hover:bg-red-500 hover:text-white disabled:opacity-50"
+          >
+            <FaTrash />
+            {deleting ? "Deleting..." : "Delete"}
+          </button>
+        </div>
+
+        <Link
+          href={`/rooms/${room._id}`}
+          className="mt-3 block text-center text-sm font-medium text-forest hover:underline dark:text-sage-light"
+        >
+          View Details
+        </Link>
+      </div>
+    </div>
+  );
+};
+
+export default MyRoomCard;
diff --git a/src/components/RoomForm.jsx b/src/components/RoomForm.jsx
new file mode 100644
index 0000000..af3a867
--- /dev/null
+++ b/src/components/RoomForm.jsx
@@ -0,0 +1,361 @@
+"use client";
+
+import {
+  Button,
+  Description,
+  FieldError,
+  Form,
+  Input,
+  Label,
+  TextArea,
+  TextField,
+} from "@heroui/react";
+import { useState } from "react";
+import { useRouter } from "next/navigation";
+import { authClient } from "@/lib/auth-client";
+import { API_URL } from "@/lib/api";
+
+const amenityOptions = [
+  "Whiteboard",
+  "Projector",
+  "Wi-Fi",
+  "Power Outlets",
+  "Quiet Zone",
+  "Air Conditioning",
+];
+
+const RoomForm = ({ mode = "add", room, roomId, redirectTo = "/my-listings" }) => {
+  const router = useRouter();
+  const { data: session } = authClient.useSession();
+  const user = session?.user;
+
+  const isEdit = mode === "edit";
+
+  const [capacityError, setCapacityError] = useState("");
+  const [submitError, setSubmitError] = useState("");
+  const [submitting, setSubmitting] = useState(false);
+
+  const handleSubmit = async (e) => {
+    e.preventDefault();
+    const form = e.currentTarget;
+    const formData = new FormData(form);
+    const roomData = Object.fromEntries(formData.entries());
+
+    const minCapacity = Number(roomData.minCapacity);
+    const maxCapacity = Number(roomData.maxCapacity);
+
+    if (maxCapacity < minCapacity) {
+      setCapacityError("Maximum capacity cannot be less than minimum capacity");
+      return;
+    }
+    setCapacityError("");
+
+    if (!user) {
+      setSubmitError("You must be logged in to do this.");
+      return;
+    }
+
+    const payload = {
+      roomImageUrl: roomData.roomImageUrl,
+      roomName: roomData.roomName,
+      shortDescription: roomData.shortDescription,
+      floor: roomData.roomFloor,
+      seatCapacity: {
+        min: minCapacity,
+        max: maxCapacity,
+      },
+      hourlyRate: Number(roomData.roomRate),
+      amenities: formData.getAll("amenities"),
+    };
+
+    setSubmitting(true);
+    setSubmitError("");
+
+    try {
+      const res = isEdit
+        ? await fetch(`${API_URL}/rooms/${roomId}`, {
+            method: "PUT",
+            headers: { "content-type": "application/json" },
+            body: JSON.stringify({ ...payload, userId: user.id }),
+          })
+        : await fetch(`${API_URL}/add-room`, {
+            method: "POST",
+            headers: { "content-type": "application/json" },
+            body: JSON.stringify({
+              ...payload,
+              createdBy: user.id,
+              createdByName: user.name,
+              createdByEmail: user.email,
+            }),
+          });
+
+      const data = await res.json().catch(() => ({}));
+
+      if (!res.ok) {
+        setSubmitError(data.message || "Something went wrong. Please try again.");
+        return;
+      }
+
+      if (!isEdit) form.reset();
+      router.push(redirectTo);
+      router.refresh();
+    } catch (err) {
+      setSubmitError("Something went wrong. Please try again.");
+    } finally {
+      setSubmitting(false);
+    }
+  };
+
+  return (
+    <div className="flex min-h-screen justify-center bg-cream px-4 py-10 dark:bg-forest-dark">
+      <div className="w-full max-w-2xl rounded-2xl border border-sage-light/40 bg-white p-8 shadow-lg dark:border-sage/30 dark:bg-forest">
+        {/* Header */}
+        <div className="mb-8">
+          <h1 className="text-3xl font-bold text-forest-dark dark:text-cream">
+            {isEdit ? "Edit Room" : "Add a Room"}
+          </h1>
+
+          <p className="mt-2 text-sm text-gray-600 dark:text-sage-light">
+            {isEdit
+              ? "Update the details of your study room."
+              : "Add a study room to StudyNook."}
+          </p>
+        </div>
+
+        <Form className="flex w-full flex-col gap-5" onSubmit={handleSubmit}>
+          {/* Room Name */}
+          <TextField
+            isRequired
+            name="roomName"
+            defaultValue={room?.roomName}
+            validate={(value) => {
+              if (value.length < 3) {
+                return "Room name must be at least 3 characters";
+              }
+
+              return null;
+            }}
+          >
+            <Label className="text-sm font-medium text-forest-dark dark:text-cream">
+              Room Name
+            </Label>
+
+            <Input
+              placeholder="Pin drop silence room"
+              className="mt-1 rounded-lg border border-sage-light/60 bg-white px-3 text-forest-dark outline-none placeholder:text-gray-400 focus:border-forest dark:border-sage/50 dark:bg-forest-dark dark:text-cream dark:placeholder:text-sage-light"
+            />
+
+            <FieldError className="mt-1 text-sm text-red-500" />
+          </TextField>
+
+          {/* Short Description */}
+          <TextField
+            isRequired
+            name="shortDescription"
+            defaultValue={room?.shortDescription}
+            validate={(value) => {
+              if (value.length < 10) {
+                return "Description must be at least 10 characters";
+              }
+
+              if (value.length > 100) {
+                return "Description cannot exceed 100 characters";
+              }
+
+              return null;
+            }}
+          >
+            <Label className="text-sm font-medium text-forest-dark dark:text-cream">
+              Short Description
+            </Label>
+
+            <Input
+              placeholder="A quiet room perfect for focused study sessions."
+              className="mt-1 rounded-lg border border-sage-light/60 bg-white px-3 py-3 text-forest-dark outline-none placeholder:text-gray-400 focus:border-forest dark:border-sage/50 dark:bg-forest-dark dark:text-cream dark:placeholder:text-sage-light"
+            />
+
+            <Description className="mt-1 text-xs text-gray-600 dark:text-sage-light">
+              Keep it short and descriptive.
+            </Description>
+
+            <FieldError className="mt-1 text-sm text-red-500" />
+          </TextField>
+
+          {/* Room Image URL */}
+          <TextField isRequired name="roomImageUrl" type="url" defaultValue={room?.roomImageUrl}>
+            <Label className="text-sm font-medium text-forest-dark dark:text-cream">
+              Room Image URL
+            </Label>
+
+            <Input
+              placeholder="https://example.com/room.jpg"
+              className="mt-1 rounded-lg border border-sage-light/60 bg-white px-3 text-forest-dark outline-none placeholder:text-gray-400 focus:border-forest dark:border-sage/50 dark:bg-forest-dark dark:text-cream dark:placeholder:text-sage-light"
+            />
+
+            <FieldError className="mt-1 text-sm text-red-500" />
+          </TextField>
+
+          {/* Floor */}
+          <TextField
+            isRequired
+            name="roomFloor"
+            type="number"
+            defaultValue={room?.floor !== undefined ? String(room.floor) : undefined}
+          >
+            <Label className="text-sm font-medium text-forest-dark dark:text-cream">
+              Floor
+            </Label>
+
+            <Input
+              placeholder="3"
+              className="mt-1 rounded-lg border border-sage-light/60 bg-white px-3 text-forest-dark outline-none placeholder:text-gray-400 focus:border-forest dark:border-sage/50 dark:bg-forest-dark dark:text-cream dark:placeholder:text-sage-light"
+            />
+
+            <FieldError className="mt-1 text-sm text-red-500" />
+          </TextField>
+
+          {/* Capacity */}
+          <div>
+            <Label className="mb-2 block text-sm font-medium text-forest-dark dark:text-cream">
+              Seat Capacity
+            </Label>
+
+            <div className="grid grid-cols-2 gap-3">
+              <TextField
+                isRequired
+                name="minCapacity"
+                type="number"
+                defaultValue={room?.seatCapacity?.min !== undefined ? String(room.seatCapacity.min) : undefined}
+                validate={(value) => {
+                  if (Number(value) < 1) {
+                    return "Minimum must be at least 1";
+                  }
+
+                  return null;
+                }}
+              >
+                <Input
+                  placeholder="Minimum"
+                  className="rounded-lg border border-sage-light/60 bg-white px-3 text-forest-dark outline-none placeholder:text-gray-400 focus:border-forest dark:border-sage/50 dark:bg-forest-dark dark:text-cream dark:placeholder:text-sage-light"
+                />
+
+                <FieldError className="mt-1 text-sm text-red-500" />
+              </TextField>
+
+              <TextField
+                isRequired
+                name="maxCapacity"
+                type="number"
+                defaultValue={room?.seatCapacity?.max !== undefined ? String(room.seatCapacity.max) : undefined}
+                validate={(value) => {
+                  if (Number(value) < 1) {
+                    return "Maximum must be at least 1";
+                  }
+
+                  return null;
+                }}
+              >
+                <Input
+                  placeholder="Maximum"
+                  className="rounded-lg border border-sage-light/60 bg-white px-3 text-forest-dark outline-none placeholder:text-gray-400 focus:border-forest dark:border-sage/50 dark:bg-forest-dark dark:text-cream dark:placeholder:text-sage-light"
+                />
+
+                <FieldError className="mt-1 text-sm text-red-500" />
+              </TextField>
+            </div>
+            {capacityError && (
+              <p className="mt-1 text-xs text-red-500">{capacityError}</p>
+            )}
+          </div>
+
+          {/* Hourly Rate */}
+          <TextField
+            isRequired
+            name="roomRate"
+            type="number"
+            defaultValue={room?.hourlyRate !== undefined ? String(room.hourlyRate) : undefined}
+            validate={(value) => {
+              if (Number(value) <= 0) {
+                return "Hourly rate must be greater than 0";
+              }
+
+              return null;
+            }}
+          >
+            <Label className="text-sm font-medium text-forest-dark dark:text-cream">
+              Hourly Rate ($)
+            </Label>
+
+            <Input
+              placeholder="5"
+              className="mt-1 rounded-lg border border-sage-light/60 bg-white px-3 text-forest-dark outline-none placeholder:text-gray-400 focus:border-forest dark:border-sage/50 dark:bg-forest-dark dark:text-cream dark:placeholder:text-sage-light"
+            />
+
+            <FieldError className="mt-1 text-sm text-red-500" />
+          </TextField>
+
+          {/* Amenities */}
+          <div>
+            <Label className="mb-3 block text-sm font-medium text-forest-dark dark:text-cream">
+              Amenities
+            </Label>
+
+            <div className="grid grid-cols-2 gap-3">
+              {amenityOptions.map((amenity) => (
+                <label
+                  key={amenity}
+                  className="flex cursor-pointer items-center gap-2 text-sm text-gray-700 dark:text-sage-light"
+                >
+                  <input
+                    type="checkbox"
+                    name="amenities"
+                    value={amenity}
+                    defaultChecked={room?.amenities?.includes(amenity)}
+                    className="h-4 w-4 accent-forest"
+                  />
+
+                  <span>{amenity}</span>
+                </label>
+              ))}
+            </div>
+
+            <Description className="mt-2 text-xs text-gray-600 dark:text-sage-light">
+              Select all amenities available in this room.
+            </Description>
+          </div>
+
+          {submitError && <p className="text-sm text-red-500">{submitError}</p>}
+
+          {/* Buttons */}
+          <div className="mt-3 flex w-full gap-3">
+            <Button
+              type="submit"
+              isDisabled={submitting}
+              className="flex-1 rounded-lg bg-forest px-4 py-2.5 font-medium text-white transition hover:bg-forest-dark disabled:opacity-50"
+            >
+              {submitting
+                ? isEdit
+                  ? "Saving..."
+                  : "Publishing..."
+                : isEdit
+                  ? "Save Changes"
+                  : "Publish Room"}
+            </Button>
+
+            {!isEdit && (
+              <Button
+                type="reset"
+                variant="secondary"
+                className="rounded-lg border border-sage bg-transparent px-4 py-2.5 font-medium text-forest-dark transition hover:bg-sage-light/20 dark:text-cream dark:hover:bg-sage/20"
+              >
+                Reset
+              </Button>
+            )}
+          </div>
+        </Form>
+      </div>
+    </div>
+  );
+};
+
+export default RoomForm;
diff --git a/src/components/RoomOwnerActions.jsx b/src/components/RoomOwnerActions.jsx
new file mode 100644
index 0000000..e7f0916
--- /dev/null
+++ b/src/components/RoomOwnerActions.jsx
@@ -0,0 +1,56 @@
+"use client";
+
+import Link from "next/link";
+import { useState } from "react";
+import { useRouter } from "next/navigation";
+import { FaPen, FaTrash } from "react-icons/fa6";
+import { API_URL } from "@/lib/api";
+
+const RoomOwnerActions = ({ roomId, roomName, userId }) => {
+  const router = useRouter();
+  const [deleting, setDeleting] = useState(false);
+
+  const handleDelete = async () => {
+    if (!confirm(`Delete "${roomName}"? This cannot be undone.`)) return;
+
+    setDeleting(true);
+    try {
+      const res = await fetch(`${API_URL}/rooms/${roomId}?userId=${userId}`, {
+        method: "DELETE",
+      });
+
+      if (res.ok) {
+        router.push("/my-listings");
+        router.refresh();
+      } else {
+        const data = await res.json().catch(() => ({}));
+        alert(data.message || "Failed to delete room");
+      }
+    } finally {
+      setDeleting(false);
+    }
+  };
+
+  return (
+    <div className="mt-6 flex flex-col gap-3">
+      <Link
+        href={`/my-listings/${roomId}/edit`}
+        className="flex w-full items-center justify-center gap-2 rounded-lg bg-forest px-5 py-3 font-semibold text-white transition hover:bg-sage"
+      >
+        <FaPen />
+        Edit Room
+      </Link>
+
+      <button
+        onClick={handleDelete}
+        disabled={deleting}
+        className="flex w-full items-center justify-center gap-2 rounded-lg border border-red-500 px-5 py-3 font-semibold text-red-500 transition hover:bg-red-500 hover:text-white disabled:opacity-50"
+      >
+        <FaTrash />
+        {deleting ? "Deleting..." : "Delete Room"}
+      </button>
+    </div>
+  );
+};
+
+export default RoomOwnerActions;
diff --git a/src/lib/api.js b/src/lib/api.js
new file mode 100644
index 0000000..ae4fa0f
--- /dev/null
+++ b/src/lib/api.js
@@ -0,0 +1 @@
+export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
diff --git a/src/proxy.js b/src/proxy.js
index a3ced51..c61398b 100644
--- a/src/proxy.js
+++ b/src/proxy.js
@@ -1,22 +1,26 @@
 import { NextResponse } from 'next/server'
 import { auth } from './lib/auth';
 import { headers } from 'next/headers';
- 
+
 // This function can be marked `async` if using `await` inside
 export async function proxy(request) {
-    const session = await auth.api.getSession({
-        headers: await headers(),
-    });
-     console.log("SESSION:", session);
-  console.log("HEADERS:", Object.fromEntries(request.headers.entries()));
-  if(!session){
+  const session = await auth.api.getSession({
+    headers: await headers(),
+  });
+
+  if (!session) {
     return NextResponse.redirect(new URL('/login', request.url))
   }
 }
- 
+
 // Alternatively, you can use a default export:
 // export default function proxy(request) { ... }
- 
+
 export const config = {
-  matcher: ['/rooms/:path'],
-}
\ No newline at end of file
+  matcher: [
+    '/rooms/:path*',
+    '/add-room',
+    '/my-listings/:path*',
+    '/my-bookings/:path*',
+  ],
+}