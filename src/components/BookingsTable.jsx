import { Chip, Table } from "@heroui/react";
import Image from "next/image";
import { format } from "date-fns";
import { DeleteBooking } from "./DeleteBooking";

const BookingsTable = ({ bookingDatas, userId }) => {
  const todayStr = format(new Date(), "yyyy-MM-dd");
  const getDisplayStatus = (bookingData) => {
    if (bookingData.status === "Cancelled") return "Cancelled";
    return bookingData.date < todayStr ? "Expired" : "Confirmed";
  };

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
              Date
              <Table.ColumnResizer />
            </Table.Column>
            <Table.Column defaultWidth="1fr" id="time" minWidth={160}>
              Time
              <Table.ColumnResizer />
            </Table.Column>
            <Table.Column defaultWidth="1fr" id="cost" minWidth={160}>
              Cost
              <Table.ColumnResizer />
            </Table.Column>
            <Table.Column defaultWidth="1fr" id="status" minWidth={160}>
              Status
              <Table.ColumnResizer />
            </Table.Column>
            <Table.Column defaultWidth="1fr" id="action" minWidth={160}>
              Action
              <Table.ColumnResizer />
            </Table.Column>
          </Table.Header>

          <Table.Body>
            {bookingDatas.map((bookingData, index) => {
              const displayStatus = getDisplayStatus(bookingData);
              return (
                <>
                  <Table.Row key={bookingData._id}>
                    {/* name and image */}
                    <Table.Cell>
                      <div className="flex items-center gap-3 font-semibold">
                        <Image
                          src={bookingData.imageUrl}
                          alt="User Image"
                          width={80}
                          height={80}
                        ></Image>
                        <h2>{bookingData.roomName}</h2>
                      </div>
                    </Table.Cell>

                    {/* date */}
                    <Table.Cell>
                      {format(new Date(bookingData.date), "dd LLL, yyyy")}
                    </Table.Cell>

                    {/* Time */}
                    <Table.Cell>
                      {bookingData.startTime} - {bookingData.endTime}
                    </Table.Cell>

                    <Table.Cell>${bookingData.price}</Table.Cell>

                    <Table.Cell>
                      {displayStatus === "Confirmed" && (
                        <Chip color="success" size="sm" variant="soft">
                          Confirmed
                        </Chip>
                      )}
                      {displayStatus === "Expired" && (
                        <Chip color="danger" size="sm" variant="soft">
                          Expired
                        </Chip>
                      )}
                      {displayStatus === "Cancelled" && (
                        <Chip color="warning" size="sm" variant="soft">
                          Cancelled
                        </Chip>
                      )}
                    </Table.Cell>
                    <Table.Cell>
                      <DeleteBooking
                        userId={userId}
                        bookingId={bookingData._id}
                      ></DeleteBooking>
                    </Table.Cell>
                  </Table.Row>
                </>
              );
            })}
          </Table.Body>
        </Table.Content>
      </Table.ResizableContainer>
    </Table>
  );
};

export default BookingsTable;
