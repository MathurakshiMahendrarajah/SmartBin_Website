document.querySelectorAll('.priority-card').forEach(card => {
  card.addEventListener('click', () => {
    const lat = card.getAttribute('data-lat');
    const lng = card.getAttribute('data-lng');
    if (!lat || !lng) return;

    const mapFrame = document.getElementById('map-frame');
    const gpsText = document.getElementById('gps-coords');

    // Update iframe src with new location
    mapFrame.src = `https://www.google.com/maps?q=${lat},${lng}&hl=en&z=15&output=embed`;

    // Update GPS text
    gpsText.textContent = `GPS Coordinates: ${lat}°, ${lng}°`;
  });
});