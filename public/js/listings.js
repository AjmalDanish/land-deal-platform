window.addEventListener('DOMContentLoaded', async () => {
  try {
    const res = await fetch('https://land-deal-platform.onrender.com/listings');
    const lands = await res.json();
    const container = document.getElementById('landList');
    container.innerHTML = '';

    lands.forEach(land => {
      const card = document.createElement('div');
      card.className = 'bg-white rounded-lg shadow-md p-4 w-full sm:w-[48%] md:w-[31%]';
      card.innerHTML = `
        <img src="${land.image}" alt="Land" class="w-full h-48 object-cover rounded mb-2">
        <h3 class="text-lg font-semibold mb-1">${land.address}</h3>
        <p class="text-green-700 font-bold">₹${land.price}</p>
        <a href="/details/${land._id}" class="text-blue-600 underline">View Details</a>
      `;
      container.appendChild(card);
    });
  } catch (err) {
    console.error(err);
    alert('Failed to load listings.');
  }
});