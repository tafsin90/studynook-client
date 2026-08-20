"use client";

import { DateField, Label } from "@heroui/react";
import { today, getLocalTimeZone } from "@internationalized/date";

export function DatePicker({ value, onChange }) {
  const now = today(getLocalTimeZone());
  const maxDate = now.add({ years: 1 });
//   console.log(now, maxDate)

  return (
    <DateField
      className="w-full"
      name="date"
      value={value}
      onChange={onChange}
      minValue={now}
      maxValue={maxDate}
    >
      <Label>Date</Label>
      <DateField.Group>
        <DateField.Input>
          {(segment) => <DateField.Segment segment={segment} />}
        </DateField.Input>
      </DateField.Group>
    </DateField>
  );
}