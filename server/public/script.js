const checkoutBtn = document.getElementById('checkout-btn');

checkoutBtn.addEventListener('click', checkOut);

async function checkOut() {
  try {
    const res = await fetch('/process-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        items: [
          { id: 1, quantity: 3 },
          { id: 2, quantity: 1 }
        ]
      })
    });

    if (!res.ok) {
      throw await res.json();
    }

    const { url } = await res.json();
    window.location = url;
  } catch (e) {
    console.error(e.error);
  }
}
