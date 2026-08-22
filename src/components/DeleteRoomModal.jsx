"use client";

import { AlertDialog, Button } from "@heroui/react";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";

export function DeleteRoomModal({ room, user }) {
  const handleDelete = async () => {
    const res = await fetch(`http://localhost:5000/rooms/${room._id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({userId: user.id})
    });
    const data = await res.json(); 
    if(res.ok){
        toast.info("Room deleted permanently.")
        redirect('/rooms');
    }
  };

  return (
    <AlertDialog>
      <Button variant="danger">Delete Room</Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>
                Delete project permanently?
              </AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                This will permanently delete <strong>{room.roomName}</strong>{" "}
                and all of its data. This action cannot be undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button slot="close" variant="danger" onClick={handleDelete}>
                Delete Room
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}
