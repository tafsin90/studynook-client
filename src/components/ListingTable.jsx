import { Chip, Table } from "@heroui/react";
import { format } from "date-fns";
import Image from "next/image";
import { DeleteRoomModal } from "./DeleteRoomModal";

const ListingTable = ({listingDatas, user}) => {
  return (
    <Table>
          <Table.ResizableContainer>
            <Table.Content
              aria-label="Table with resizable columns"
              className="min-w-[700px]"
            >
              <Table.Header>
                <Table.Column
                  isRowHeader
                  defaultWidth="1fr"
                  id="name"
                  minWidth={160}
                >
                  Name
                  <Table.ColumnResizer />
                </Table.Column>
                <Table.Column defaultWidth="1fr" id="date" minWidth={160}>
                  Minimum Capacity
                  <Table.ColumnResizer />
                </Table.Column>
                <Table.Column defaultWidth="1fr" id="time" minWidth={160}>
                  Maximum Capacity
                  <Table.ColumnResizer />
                </Table.Column>
                <Table.Column defaultWidth="1fr" id="cost" minWidth={160}>
                  Cost per hour
                  <Table.ColumnResizer />
                </Table.Column>
                <Table.Column defaultWidth="1fr" id="action" minWidth={160}>
                  Action
                  <Table.ColumnResizer />
                </Table.Column>
              </Table.Header>
    
              <Table.Body>
                {listingDatas.map((room) => {
                  return (
                    <>
                      <Table.Row key={room._id}>
                        {/* name and image */}
                        <Table.Cell>
                          <div className="flex items-center gap-3 font-semibold">
                            <Image
                              src={room.roomImageUrl}
                              alt="User Image"
                              width={80}
                              height={80}
                            ></Image>
                            <h2>{room.roomName}</h2>
                          </div>
                        </Table.Cell>
    
                        {/* min capacity */}
                        <Table.Cell>
                         At least - {room.seatCapacity.min} 
                        </Table.Cell>
    
                        {/* max capacity */}
                        <Table.Cell>
                          At most - {room.seatCapacity.max}
                        </Table.Cell>
    
                        <Table.Cell>${room.hourlyRate}</Table.Cell>
    
                        <Table.Cell>
                          <DeleteRoomModal room={room} user={user}></DeleteRoomModal>
                        </Table.Cell>
                      </Table.Row>
                    </>
                  );
                })}
              </Table.Body>
            </Table.Content>
          </Table.ResizableContainer>
        </Table>
  )
}

export default ListingTable