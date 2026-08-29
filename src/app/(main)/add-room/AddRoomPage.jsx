"use client";

import { authClient } from "@/lib/auth-client";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextArea,
  TextField,
} from "@heroui/react";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";


const AddRoomPage = () => {
  const [capacityError, setCapacityError] = useState("");

  const router = useRouter();

  const amenityOptions = [
    "Whiteboard",
    "Projector",
    "Wi-Fi",
    "Power Outlets",
    "Quiet Zone",
    "Air Conditioning",
  ];
  const { data: session } = authClient.useSession();
  // console.log(session.user.id)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(e.currentTarget);
    const roomData = Object.fromEntries(formData.entries());

    const minCapacity = Number(roomData.minCapacity);
    const maxCapacity = Number(roomData.maxCapacity);

    if (maxCapacity < minCapacity) {
      setCapacityError("Maximum capacity cannot be less than minimum capacity");
      return;
    }
    setCapacityError("");

    const room = {
      userId: session.user.id,
      roomImageUrl: roomData.roomImageUrl,
      roomName: roomData.roomName,
      shortDescription: roomData.shortDescription,
      floor: roomData.roomFloor,
      seatCapacity: {
        min: minCapacity,
        max: maxCapacity,
      },
      hourlyRate: Number(roomData.roomRate),
      amenities: formData.getAll("amenities"),
    };

    // console.log(room);

    const res = await fetch("http://localhost:5000/add-room", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(room),
    });
    const data = await res.json();
    // console.log(data);

    if (res.ok) {
      toast.success("Room added successfully.");
      form.reset();
      router.push("/my-listings");
    } else {
      console.error(data);
    }
  };

  return (
    <div className="flex min-h-screen justify-center bg-cream px-4 py-10 dark:bg-forest-dark">
      <div className="w-full max-w-2xl rounded-2xl border border-sage-light/40 bg-white p-8 shadow-lg dark:border-sage/30 dark:bg-forest">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-forest-dark dark:text-cream">
            Add a Room
          </h1>

          <p className="mt-2 text-sm text-gray-600 dark:text-sage-light">
            Add a study room to StudyNook.
          </p>
        </div>

        <Form className="flex w-full flex-col gap-5" onSubmit={handleSubmit}>
          {/* Room Name */}
          <TextField
            isRequired
            name="roomName"
            validate={(value) => {
              if (value.length < 3) {
                return "Room name must be at least 3 characters";
              }

              return null;
            }}
          >
            <Label className="text-sm font-medium text-forest-dark dark:text-cream">
              Room Name
            </Label>

            <Input
              placeholder="Pin drop silence room"
              className="mt-1 rounded-lg border border-sage-light/60 bg-white px-3 text-forest-dark outline-none placeholder:text-gray-400 focus:border-forest dark:border-sage/50 dark:bg-forest-dark dark:text-cream dark:placeholder:text-sage-light"
            />

            <FieldError className="mt-1 text-sm text-red-500" />
          </TextField>

          {/* Short Description */}
          <TextField
            isRequired
            name="shortDescription"
            validate={(value) => {
              if (value.length < 10) {
                return "Description must be at least 10 characters";
              }

              if (value.length > 100) {
                return "Description cannot exceed 100 characters";
              }

              return null;
            }}
          >
            <Label className="text-sm font-medium text-forest-dark dark:text-cream">
              Short Description
            </Label>

            <Input
              placeholder="A quiet room perfect for focused study sessions."
              className="mt-1 rounded-lg border border-sage-light/60 bg-white px-3 py-3 text-forest-dark outline-none placeholder:text-gray-400 focus:border-forest dark:border-sage/50 dark:bg-forest-dark dark:text-cream dark:placeholder:text-sage-light"
            />

            <Description className="mt-1 text-xs text-gray-600 dark:text-sage-light">
              Keep it short and descriptive.
            </Description>

            <FieldError className="mt-1 text-sm text-red-500" />
          </TextField>

          {/* Room Image URL */}
          <TextField isRequired name="roomImageUrl" type="url">
            <Label className="text-sm font-medium text-forest-dark dark:text-cream">
              Room Image URL
            </Label>

            <Input
              placeholder="https://example.com/room.jpg"
              className="mt-1 rounded-lg border border-sage-light/60 bg-white px-3 text-forest-dark outline-none placeholder:text-gray-400 focus:border-forest dark:border-sage/50 dark:bg-forest-dark dark:text-cream dark:placeholder:text-sage-light"
            />

            <FieldError className="mt-1 text-sm text-red-500" />
          </TextField>

          {/* Floor */}
          <TextField isRequired name="roomFloor" type="number">
            <Label className="text-sm font-medium text-forest-dark dark:text-cream">
              Floor
            </Label>

            <Input
              placeholder="3"
              className="mt-1 rounded-lg border border-sage-light/60 bg-white px-3 text-forest-dark outline-none placeholder:text-gray-400 focus:border-forest dark:border-sage/50 dark:bg-forest-dark dark:text-cream dark:placeholder:text-sage-light"
            />

            <FieldError className="mt-1 text-sm text-red-500" />
          </TextField>

          {/* Capacity */}
          <div>
            <Label className="mb-2 block text-sm font-medium text-forest-dark dark:text-cream">
              Seat Capacity
            </Label>

            <div className="grid grid-cols-2 gap-3">
              <TextField
                isRequired
                name="minCapacity"
                type="number"
                validate={(value) => {
                  if (Number(value) < 1) {
                    return "Minimum must be at least 1";
                  }

                  return null;
                }}
              >
                <Input
                  placeholder="Minimum"
                  className="rounded-lg border border-sage-light/60 bg-white px-3 text-forest-dark outline-none placeholder:text-gray-400 focus:border-forest dark:border-sage/50 dark:bg-forest-dark dark:text-cream dark:placeholder:text-sage-light"
                />

                <FieldError className="mt-1 text-sm text-red-500" />
              </TextField>

              <TextField
                isRequired
                name="maxCapacity"
                type="number"
                validate={(value) => {
                  if (Number(value) < 1) {
                    return "Maximum must be at least 1";
                  }

                  return null;
                }}
              >
                <Input
                  placeholder="Maximum"
                  className="rounded-lg border border-sage-light/60 bg-white px-3 text-forest-dark outline-none placeholder:text-gray-400 focus:border-forest dark:border-sage/50 dark:bg-forest-dark dark:text-cream dark:placeholder:text-sage-light"
                />

                <FieldError className="mt-1 text-sm text-red-500" />
              </TextField>
            </div>
            {capacityError && (
              <p className="mt-1 text-xs text-red-500">{capacityError}</p>
            )}
          </div>

          {/* Hourly Rate */}
          <TextField
            isRequired
            name="roomRate"
            type="number"
            validate={(value) => {
              if (Number(value) <= 0) {
                return "Hourly rate must be greater than 0";
              }

              return null;
            }}
          >
            <Label className="text-sm font-medium text-forest-dark dark:text-cream">
              Hourly Rate ($)
            </Label>

            <Input
              placeholder="5"
              className="mt-1 rounded-lg border border-sage-light/60 bg-white px-3 text-forest-dark outline-none placeholder:text-gray-400 focus:border-forest dark:border-sage/50 dark:bg-forest-dark dark:text-cream dark:placeholder:text-sage-light"
            />

            <FieldError className="mt-1 text-sm text-red-500" />
          </TextField>

          {/* Amenities */}
          <div>
            <Label className="mb-3 block text-sm font-medium text-forest-dark dark:text-cream">
              Amenities
            </Label>

            <div className="grid grid-cols-2 gap-3">
              {amenityOptions.map((amenity) => (
                <label
                  key={amenity}
                  className="flex cursor-pointer items-center gap-2 text-sm text-gray-700 dark:text-sage-light"
                >
                  <input
                    type="checkbox"
                    name="amenities"
                    value={amenity}
                    className="h-4 w-4 accent-forest"
                  />

                  <span>{amenity}</span>
                </label>
              ))}
            </div>

            <Description className="mt-2 text-xs text-gray-600 dark:text-sage-light">
              Select all amenities available in this room.
            </Description>
          </div>
          {/* Buttons */}
          <div className="mt-3 flex w-full gap-3">
            <Button
              type="submit"
              className="flex-1 rounded-lg bg-forest px-4 py-2.5 font-medium text-white transition hover:bg-forest-dark"
            >
              Publish Room
            </Button>

            <Button
              type="reset"
              variant="secondary"
              className="rounded-lg border border-sage bg-transparent px-4 py-2.5 font-medium text-forest-dark transition hover:bg-sage-light/20 dark:text-cream dark:hover:bg-sage/20"
            >
              Reset
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AddRoomPage;
