let cart = [];

function loadProducts() {
  db.collection("products").get().then(snapshot => {
    snapshot.forEach(doc => {
      const data = doc.data();
      const div = document.createElement("div");
      div.innerHTML = `
        ${data.name} - ₹${data.price} - Stock: ${data.stock}<br>
        <input type="number" min="1" value="1" id="qty-${doc.id}">
        <button onclick="addToCart('${doc.id}', '${data.name}', ${data.price})">Add</button>
        <hr>
      `;
      document.getElementById("products").appendChild(div);
    });
  });
}

function addToCart(id, name, price) {
  const qty = parseInt(document.getElementById(`qty-${id}`).value);
  cart.push({ name, price, qty });
  updateCart();
}

function updateCart() {
  const cartDiv = document.getElementById("cart");
  cartDiv.innerHTML = "";
  let total = 0;
  cart.forEach(item => {
    cartDiv.innerHTML += `${item.name} x${item.qty} = ₹${item.price * item.qty}<br>`;
    total += item.price * item.qty;
  });
  cartDiv.innerHTML += `<strong>Total: ₹${total}</strong>`;
}

function checkout() {
  let message = "Order Details:\n";
  let total = 0;
  cart.forEach(item => {
    message += `${item.name} x${item.qty} = ₹${item.price * item.qty}\n`;
    total += item.price * item.qty;
  });
  message += `Total: ₹${total}\nPlease send GPay screenshot.`;
  const phone = "91XXXXXXXXXX"; // your WhatsApp number
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}

loadProducts();
