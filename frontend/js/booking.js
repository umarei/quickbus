// frontend/js/booking.js

document.getElementById('logoutButton').addEventListener('click', async () => {
    await fetch('http://localhost:5000/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });
    window.location.href = 'login.html';
  });
  
  const busId = sessionStorage.getItem('selectedBusId');
  let selectedSeat = null;
  
  window.onload = async () => {
    if (!busId) {
      window.location.href = 'buses.html';
      return;
    }
  
    const response = await fetch(`http://localhost:5000/api/buses/${busId}/seats`, {
      credentials: 'include',
    });
  
    if (response.ok) {
      const seats = await response.json();
      displaySeats(seats);
    } else {
      window.location.href = 'login.html';
    }
  };
  
  function displaySeats(seats) {
    const seatMap = document.getElementById('seatMap');
    for (let i = 1; i <= 40; i++) {
      const seat = document.createElement('div');
      seat.className = 'seat';
      seat.textContent = i;
  
      if (seats.includes(i)) {
        seat.classList.add('available');
        seat.addEventListener('click', () => {
          document.querySelectorAll('.seat').forEach(s => s.classList.remove('selected'));
          seat.classList.add('selected');
          selectedSeat = i;
        });
      } else {
        seat.classList.add('unavailable');
      }
      seatMap.appendChild(seat);
    }
  }
  
  document.getElementById('bookButton').addEventListener('click', async () => {
    if (!selectedSeat) {
      alert('Please select a seat.');
      return;
    }
  
    const response = await fetch('http://localhost:5000/api/bookings', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ busId, seatNumber: selectedSeat }),
    });
  
    const data = await response.json();
    if (response.ok) {
      alert('Seat booked successfully!');
      window.location.href = 'buses.html';
    } else {
      alert(data.message || data.error);
    }
  });
  