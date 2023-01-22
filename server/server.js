require('dotenv').config();

const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('public'));

const stripe = require('stripe')(process.env.STRIPE_KEY);

const storeItems = new Map([
  [
    1,
    {
      priceInCents: 100,
      name: 'Donate $1',
      image_url:
        'https://thumbs.dreamstime.com/b/us-one-dollar-bill-closeup-macro-back-side-us-one-dollar-bill-closeup-macro-back-side-111089938.jpg'
    }
  ],
  [
    2,
    {
      priceInCents: 200,
      name: 'Donate $2',
      image_url:
        'https://media.istockphoto.com/id/884972262/photo/a-close-up-of-a-two-u-s-dollar-bill-isolated.jpg?s=612x612&w=0&k=20&c=u0weFiv55wN2rjAR7ySBu5mZvttrB8R3kEW9JiPDpmA='
    }
  ]
]);

app.post('/process-payment', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: req.body.items.map((item) => {
        const storeItem = storeItems.get(item.id);
        return {
          price_data: {
            currency: 'usd',
            product_data: {
              name: storeItem.name,
              images: [storeItem.image_url]
            },
            unit_amount: storeItem.priceInCents
          },
          quantity: item.quantity
        };
      }),
      success_url: `${process.env.SERVER_URL}/success.html`,
      cancel_url: `${process.env.SERVER_URL}/cancel.html`
    });
    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(3000);
