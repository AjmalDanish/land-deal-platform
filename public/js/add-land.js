const form = document.getElementById('landForm');
const latInput = document.getElementById('latitude');
const lngInput = document.getElementById('longitude');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  try {
    const response = await fetch('https://your-render-backend-url.onrender.com/add-land', {
      method: 'POST',
      body: formData,
    });
    if (response.ok) {
      alert('Land added successfully!');
      window.location.href = '/listings';
    } else {
      alert('Failed to add land.');
    }
  } catch (error) {
    console.error(error);
    alert('Error submitting form.');
  }
});