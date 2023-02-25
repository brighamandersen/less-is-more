const checkoutBtn = document.getElementById('checkout-btn');
const oneDollarQty = document.getElementById('one-dollar-qty');
const twoDollarQty = document.getElementById('two-dollar-qty');

oneDollarQty.addEventListener('input', toggleCheckoutButton);
twoDollarQty.addEventListener('input', toggleCheckoutButton);
checkoutBtn.addEventListener('click', checkOut);

// Enable or disable checkout button
function toggleCheckoutButton() {
  // Disable checkout button if neither are filled in 
  if (!oneDollarQty.value && !twoDollarQty.value) {
    checkoutBtn.disabled = true;
  } else {
    checkoutBtn.disabled = false; // Enable checkout button
  }
}

async function checkOut() {
  let items = [];

  if (!!oneDollarQty.value) {
    items.push({ id: 1, quantity: oneDollarQty.value })
  }
  if (!!twoDollarQty.value) {
    items.push({ id: 2, quantity: twoDollarQty.value })
  }

  try {
    const res = await fetch('/process-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        items
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
