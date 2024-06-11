"use client";
import { useState } from "react";
import Image from "next/image";

const desk = [
  { id: 1, type: "individual" },
  { id: 2, type: "individual" },
  { id: 3, type: "individual" },
  { id: 4, type: "individual" },
  { id: 5, type: "individual" },
  { id: 6, type: "individual" },
  { id: 7, type: "individual" },
  { id: 8, type: "individual" },
  { id: 9, type: "individual" },
  { id: 10, type: "individual" },
  { id: 11, type: "team" },
  { id: 12, type: "team" },
  { id: 13, type: "team" },
  { id: 14, type: "team" },
  { id: 15, type: "team" },
  { id: 16, type: "team" },
];

const membershipTiers = {
  clay: 10,
  silver: 15,
  gold: 20,
};

export default function Home() {
  const [bookings, setBookings] = useState([]);
  const [chooseDesk, setChooseDesk] = useState(null);
  const [member, setMember] = useState("clay");
  const [hours, setHours] = useState(1);

  const handleBooking = () => {
    const isBooked = bookings.some((booking) => booking.deskId === chooseDesk);
    if (isBooked) {
      alert("Desk already booked!");
      return;
    }

    const desk = desk.find((d) => d.id === chooseDesk);
    let pricePerHour = desk.type === "team" ? 25 : membershipTiers[member];
    let total = pricePerHour * hours;

    if (hours > 3) {
      total *= 0.9; // 10% discount
    }

    const newBooking = { deskId: selectedDesk, membership, hours, total };

    const updatedBookings = [...bookings, newBooking];
    setBookings(updatedBookings);

    localStorage.setItem("bookings", JSON.stringify(updatedBookings));

    setSelectedDesk(null);
    setHours(1);

    setBookings([
      ...bookings,
      { deskId: chooseDesk, membership, hours, total },
    ]);

    setChooseDesk(null);
    setHours(1);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Co-working Space Booking</h1>
      <div className="grid grid-cols-3 gap-4">
        {desk.map((desk) => (
          <div
            key={desk.id}
            className={`p-4 border ${
              bookings.some((b) => b.deskId === desk.id)
                ? "bg-red-200"
                : "bg-green-200"
            }`}
            onClick={() => setChooseDesk(desk.id)}
          >
            {desk.type === "individual"
              ? `Desk ${desk.id}`
              : `Team Desk ${desk.id}`}
          </div>
        ))}
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-bold mb-2">Booking Details</h2>
        <div>
          <label>Membership: </label>
          <select
            value={member}
            onChange={(e) => setMember(e.target.value)}
            className="border p-2"
          >
            <option value="clay">Basic</option>
            <option value="silver">Premium</option>
            <option value="gold">Executive</option>
          </select>
        </div>
        <div>
          <label>Hours: </label>
          <input
            type="number"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            min="1"
            className="border p-2"
          />
        </div>
        <button
          onClick={handleBooking}
          className="bg-blue-500 text-white px-4 py-2 mt-2 rounded-md"
        >
          Book
        </button>
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-bold mb-2">Bookings</h2>
        <ul>
          {bookings.map((booking, index) => (
            <li key={index}>
              Desk {booking.deskId} - {booking.membership} - {booking.hours}{" "}
              hours - ${booking.total.toFixed(2)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
