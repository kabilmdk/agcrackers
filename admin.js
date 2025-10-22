function addProduct() {
  const name = document.getElementById("name").value;
  const price = parseInt(document.getElementById("price").value);
  const quantity = parseInt(document.getElementById("quantity").value);
  const imageUrl = document.getElementById("imageUrl").value;
  const youtubeLink = document.getElementById("youtubeLink").value;

  db.collection("products").add({ name, price, quantity, imageUrl, youtubeLink })
    .then(() => {
      alert("Product added!");
      loadProducts();
    });
}

function loadProducts() {
  const table = document.getElementById("productTable");
  table.innerHTML = "<tr><th>Name</th><th>Price</th><th>Qty</th><th>Image</th><th>Video</th></tr>";
  db.collection("products").get().then(snapshot => {
    snapshot.forEach(doc => {
      const d = doc.data();
      table.innerHTML += `<tr>
        <td>${d.name}</td>
        <td>₹${d.price}</td>
        <td>${d.quantity}</td>
        <td><img src="${d.imageUrl}" width="50"></td>
        <td><a href="${d.youtubeLink}" target="_blank">Watch</a></td>
      </tr>`;
    });
  });
}

loadProducts();
