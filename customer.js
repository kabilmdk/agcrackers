let cart = [];

function loadProducts() {
  const table = document.getElementById("productTable");
  table.innerHTML = "<tr><th>Name</th><th>Price</th><th>Qty</th><th>Add</th></tr>";
  db.collection("products").get().then(snapshot => {
    snapshot.forEach(doc => {
      const d = doc.data();
      table.innerHTML += `<tr>
        <td>${d.name}</td>
        <td>₹${d.price}</td>
        <td><input type="number" id="qty-${doc.id}" value="1" min="1"></td>
        <td><button onclick="addToCart('${d.name}', ${d.price}, 'qty-${doc.id}')">Add</button></td>
      </tr>`;
    });
  });
}

function addToCart(name, price, qtyId) {
  const qty = parseInt(document.getElementById(qtyId).value);
  cart.push({ name, price, qty });
  updateCart();
}

function updateCart() {
  const div = document.getElementById("cart");
  div.innerHTML = "";
  let total = 0;
  cart.forEach(item => {
    div.innerHTML += `${item.name} x${item.qty} = ₹${item.price * item.qty}<br>`;
    total += item.price * item.qty;
  });
  div.innerHTML += `<strong>Total: ₹${total}</strong>`;
}

function goToCheckout() {
  localStorage.setItem("cart", JSON.stringify(cart));
  window.location.href = "checkout.html";
}

loadProducts();
