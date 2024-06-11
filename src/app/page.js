
"use client"
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"


const desks = [
  { id: 1, type: 'individual' },
  { id: 2, type: 'individual' },
  { id: 3, type: 'individual' },
  { id: 4, type: 'individual' },
  { id: 5, type: 'individual' },
  { id: 6, type: 'individual' },
  { id: 7, type: 'individual' },
  { id: 8, type: 'individual' },
  { id: 9, type: 'individual' },
  { id: 10, type: 'individual' },
  { id: 11, type: 'team' },
  { id: 12, type: 'team' },
  { id: 13, type: 'team' },
  { id: 14, type: 'team' },
  { id: 15, type: 'team' },
];

const membershipTiers = {
  basic: 10,
  premium: 15,
  executive: 20,
};

export default function Home() {
  const [bookings, setBookings] = useState([]);
  const [selectedDesk, setSelectedDesk] = useState(null);
  const [membership, setMembership] = useState('basic');
  const [hours, setHours] = useState(1);

  useEffect(() => {
    const savedBookings = JSON.parse(localStorage.getItem('bookings')) || [];
    setBookings(savedBookings);
  }, []);

  const handleBooking = () => {
    if (selectedDesk === null) {
      alert('Please select a desk.');
      return;
    }

    const desk = desks.find((d) => d.id === selectedDesk);
    if (!desk) {
      alert('Selected desk is invalid.');
      return;
    }

    const isBooked = bookings.some(
      (booking) => booking.deskId === selectedDesk
    );
    if (isBooked) {
      alert('Desk already booked!');
      return;
    }

    let pricePerHour = desk.type === 'team' ? 25 : membershipTiers[membership];
    let total = pricePerHour * hours;

    if (hours > 3) {
      total *= 0.9; // 10% discount
    }

    const newBooking = { deskId: selectedDesk, membership, hours, total };

    const updatedBookings = [...bookings, newBooking];
    setBookings(updatedBookings);

    localStorage.setItem('bookings', JSON.stringify(updatedBookings));

    setSelectedDesk(null);
    setHours(1);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 flex justify-center text-gray-600 p-7">Work-Space Booking</h1>
      <div className="grid grid-cols-3 gap-4 cursor-pointer shadow-lg">
        {desks.map((desk) => (
          <div
            key={desk.id}
            className={`p-4 border ${
              bookings.some((b) => b.deskId === desk.id)
                ? 'bg-red-500'
                : 'bg-green-500'
            }`}
            onClick={() => setSelectedDesk(desk.id)}
          >
            {desk.type === 'individual' ? `Desk ${desk.id}` : `Team Desk ${desk.id}`}
          </div>
        ))}
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-bold mb-2 text-gray-600 p-7">Booking Details</h2>
        <div>
          <label className='text-gray-600'>Membership: </label>
          <select
            value={membership}
            onChange={(e) => setMembership(e.target.value)}
            className="border p-2 mr-5 mb-5"
          >
            <option value="basic">Basic</option>
            <option value="premium">Premium</option>
            <option value="executive">Executive</option>
          </select>
        </div>
        <div>
          <label className='text-gray-600'>Hours: </label>
          <input
            type="number"
            value={hours}
            onChange={(e) => setHours(Number(e.target.value))}
            min="1"
            className="border p-2 text-gray-600 mr-5"
          />
        </div>
        <Button
          onClick={handleBooking}
          className="bg-blue-500 text-white px-4 py-2 mt-5"
          variant='ghost'
        >
          Book
        </Button>
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-bold mb-2 text-gray-600">Bookings</h2>
        <ul>
          {bookings.map((booking, index) => (
            <li key={index} className='text-gray-700'>
              Desk {booking.deskId} - {booking.membership} - {booking.hours} hours - ${booking.total.toFixed(2)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
