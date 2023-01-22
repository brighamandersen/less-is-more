const checkoutBtn = document.getElementById('checkout-btn');
const oneDollarQty = document.getElementById('one-dollar-qty');
const twoDollarQty = document.getElementById('two-dollar-qty');

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
          { id: 1, quantity: oneDollarQty.value },
          { id: 2, quantity: twoDollarQty.value }
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
