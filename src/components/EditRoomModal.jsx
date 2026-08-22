"use client";

import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  Modal,
  Surface,
  TextField,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaBookOpenReader } from "react-icons/fa6";
import { toast } from "react-toastify";



const EditRoomModal = ({ room }) => {
  // console.log(room);
  const router = useRouter()

  const [capacityError, setCapacityError] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const amenityOptions = [
    "Whiteboard",
    "Projector",
    "Wi-Fi",
    "Power Outlets",
    "Quiet Zone",
    "Air Conditioning",
  ];

  const onSubmit = async (e) => {
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

    const updatedRoom = {
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

    // console.log(updatedRoom)
    const res = await fetch(`http://localhost:5000/rooms/${room._id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updatedRoom),
    });
    const data = await res.json();
    if (res.ok) {
      router.refresh();
      setIsOpen(false)
      toast.info("Room has been edited.")
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
      <Button variant="secondary" onPress={()=> setIsOpen(true)}>Edit Room</Button>
      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-md">
            <Modal.CloseTrigger />
            <Modal.Header>
              <FaBookOpenReader className="text-4xl text-forest-dark" />
              <Modal.Heading>Edit Your Room</Modal.Heading>
            </Modal.Header>
            <Modal.Body className="p-6">
              <Surface variant="default">
                <Form className="flex flex-col gap-4" onSubmit={onSubmit}>
                  {/* room name */}
                  <TextField
                    name="roomName"
                    defaultValue={room.roomName}
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
                    defaultValue={room.shortDescription}
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
                  <TextField
                    name="roomImageUrl"
                    type="url"
                    defaultValue={room.roomImageUrl}
                  >
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
                  <TextField
                    name="roomFloor"
                    type="number"
                    defaultValue={room.floor}
                  >
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
                        name="minCapacity"
                        defaultValue={room.seatCapacity.min}
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
                        name="maxCapacity"
                        type="number"
                        defaultValue={room.seatCapacity.max}
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
                      <p className="mt-1 text-xs text-red-500">
                        {capacityError}
                      </p>
                    )}
                  </div>

                  {/* Hourly Rate */}
                  <TextField
                    name="roomRate"
                    type="number"
                    defaultValue={room.hourlyRate}
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
                            defaultChecked={room.amenities?.includes(amenity)}
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

                  <Modal.Footer>
                    <Button
                      type="submit"
                      className="w-full rounded-lg bg-forest px-4 py-2.5 font-medium text-white transition hover:bg-forest-dark"
                    >
                      Publish Room
                    </Button>
                  </Modal.Footer>
                </Form>
              </Surface>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};

export default EditRoomModal;
