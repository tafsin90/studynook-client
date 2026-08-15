"use client";

import { BiX } from "react-icons/bi";
import { IoMdSearch } from "react-icons/io";
import { TbZoomReset } from "react-icons/tb";

const amenities = [
  "Whiteboard",
  "Projector",
  "Wi-Fi",
  "Power Outlets",
  "Quiet Zone",
  "Air Conditioning",
];

const Filter = (props) => {
  const {
    search,
    setSearch,
    selectedAmenities,
    setSelectedAmenities,
    minRate,
    setMinRate,
    maxRate,
    setMaxRate,
    onReset,
  } = props;
  const toggleAmenity = (amenity) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity],
    );
  };

  return (
    <aside className="w-full max-w-[260px] rounded-xl border border-white/10 bg-[#111c17] p-5 text-white">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="font-serif text-lg font-bold">Refine</h2>

        <button
          type="button"
          onClick={onReset}
          className="flex items-center gap-3 text-xs font-medium text-gray-200 transition hover:text-white hover:cursor-pointer border px-1 py-0.5 rounded-lg border-sage"
        >
          <span> Reset</span>
          <TbZoomReset size={16} />
        </button>
      </div>

      <div className="mb-5">
        <label className="mb-2 block text-xs text-[#a3b18a]">
          Search by name
        </label>
        <div className="relative">
          <IoMdSearch
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="e.g. Quiet Pod"
            className="h-9 w-full rounded-lg border border-white/10 bg-[#0d1612] pl-9 pr-3 text-sm text-white outline-none placeholder:text-gray-500 focus:border-[#a3b18a]"
          />
        </div>
      </div>

      <div className="mb-5">
        <p className="mb-2 text-xs text-[#a3b18a]">Amenities</p>
        <div className="space-y-2">
          {amenities.map((amenity) => (
            <label
              key={amenity}
              className="flex cursor-pointer items-center gap-2 text-sm text-gray-200"
            >
              <input
                type="checkbox"
                value={amenity}
                checked={selectedAmenities.includes(amenity)}
                onChange={() => toggleAmenity(amenity)}
                className="h-3.5 w-3.5 appearance-none rounded-full border border-[#c49a3a] bg-transparent checked:bg-[#c49a3a]"
              />
              <span>{amenity}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs text-[#a3b18a]">Hourly rate ($)</p>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            placeholder="Min"
            value={minRate}
            onChange={(e) => setMinRate(e.target.value)}
            className="h-9 w-full rounded-lg border border-white/10 bg-[#0d1612] px-3 text-sm text-white outline-none placeholder:text-gray-500 focus:border-[#a3b18a]"
          />
          <input
            type="number"
            placeholder="Max"
            value={maxRate}
            onChange={(e) => setMaxRate(e.target.value)}
            className="h-9 w-full rounded-lg border border-white/10 bg-[#0d1612] px-3 text-sm text-white outline-none placeholder:text-gray-500 focus:border-[#a3b18a]"
          />
        </div>
      </div>
    </aside>
  );
};

export default Filter;
