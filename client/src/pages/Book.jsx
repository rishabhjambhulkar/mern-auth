import React, { useState } from 'react';
import './book.css';

export default function Book() {
  const initialSeats = Array.from({ length: 10 }, (_, index) => ({
    seat: index + 1,
    availability: 'Available',
  }));

  const [data, setData] = useState(initialSeats);
  const [seatNumber, setSeatNumber] = useState('');
  const [reservationStatus, setReservationStatus] = useState('');

  const handleReservation = (action) => {
    const seatNum = parseInt(seatNumber, 10);
    if (isNaN(seatNum) || seatNum < 1 || seatNum > 10) {
      setReservationStatus('Invalid seat number');
      return;
    }

    const newData = data.map((item) => {
      if (item.seat === seatNum) {
        if (action === 'reserve' && item.availability === 'Available') {
          return { ...item, availability: 'Reserved' };
        } else if (action === 'cancel' && item.availability === 'Reserved') {
          return { ...item, availability: 'Available' };
        } else {
          setReservationStatus(`Seat ${seatNum} is already ${item.availability}`);
          return item;
        }
      }
      return item;
    });

    setData(newData);
    setReservationStatus(`Seat ${seatNum} successfully ${action === 'reserve' ? 'reserved' : 'canceled'}`);
  };

  return (
    <>
      <h1>Reservation System</h1>
      <table>
        <thead>
          <tr>
            <th className="blue-header">Seat Number</th>
            <th className="blue-header">Availability</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.seat}</td>
              <td>{item.availability}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <input
        type="number"
        placeholder="Enter seat number"
        value={seatNumber}
        onChange={(e) => setSeatNumber(e.target.value)}
      />
      <button
        onClick={() => handleReservation('reserve')}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Reserve Seat
      </button>
      <button
        onClick={() => handleReservation('cancel')}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Cancel Reservation
      </button>
      {reservationStatus && <p>{reservationStatus}</p>}
    </>
  );
}
