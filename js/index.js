const images = document.querySelectorAll('.bg-img');
let positions = ['position-left', 'position-center', 'position-right'];

setInterval(() => {
// Remove current positions
images.forEach(img => {
    positions.forEach(pos => img.classList.remove(pos));
});

// Rotate the array
positions.unshift(positions.pop());

// Reapply new positions
images.forEach((img, i) => {
    img.classList.add(positions[i]);
});
}, 2000);