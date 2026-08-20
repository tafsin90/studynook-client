"use client";

import { Label, ListBox, Select } from "@heroui/react";

const TimePicker = ({ label, value, onChange }) => {
  return (
    <Select
      className="w-full"
      placeholder="Select time"
      value={value !== null ? String(value) : undefined}
      onChange={(value) => onChange(Number(value))}
    >
      <Label>{label}</Label>

      <Select.Trigger>
        <Select.Value />
        <Select.Indicator />
      </Select.Trigger>

      <Select.Popover>
        <ListBox>
          {Array.from({ length: 24 }, (_, i) => {
            const hour = i % 12 || 12;
            const period = i < 12 ? "AM" : "PM";

            const displayTime = `${hour}:00 ${period}`;

            return (
              <ListBox.Item
                key={i}
                id={String(i)}
                textValue={displayTime}
              >
                {displayTime}
                <ListBox.ItemIndicator />
              </ListBox.Item>
            );
          })}
        </ListBox>
      </Select.Popover>
    </Select>
  );
};

export default TimePicker;