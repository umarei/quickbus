// frontend/js/buses.js

document.getElementById('logoutButton').addEventListener('click', async () => {
    await fetch('http://localhost:5000/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });
    window.location.href = 'login.html';
  });
  
  window.onload = async () => {
    const response = await fetch('http://localhost:5000/api/buses', {
      credentials: 'include',
    });
  
    if (response.ok) {
      const buses = await response.json();
      displayBuses(buses);
    } else {
      window.location.href = 'login.html';
    }
  };
  
  function displayBuses(buses) {
    const busList = document.getElementById('busList');
    buses.forEach(bus => {
      const busItem = document.createElement('div');
      busItem.className = 'bus-item';
      busItem.innerHTML = `
        <h3>${bus.name}</h3>
        <p>Route: ${bus.route}</p>
        <p>Available Seats: ${bus.availableSeats.length}</p>
        <button class="btn select-bus-btn" data-id="${bus._id}">Select Bus</button>
      `;
      busList.appendChild(busItem);
    });
  
    document.querySelectorAll('.select-bus-btn').forEach(button => {
      button.addEventListener('click', (e) => {
        const busId = e.target.getAttribute('data-id');
        sessionStorage.setItem('selectedBusId', busId);
        window.location.href = 'seats.html';
      });
    });
  }
  