function addProduct() {
  const name = document.getElementById("name").value.trim();
  const price = parseFloat(document.getElementById("price").value);
  const quantity = parseInt(document.getElementById("quantity").value);
  const imageUrl = document.getElementById("imageUrl").value.trim();
  const youtubeLink = document.getElementById("youtubeLink").value.trim();

  if (!name || isNaN(price) || isNaN(quantity)) {
    alert("Please fill in all fields correctly.");
    return;
  }

  db.collection("products").add({
    name,
    price,
    quantity,
    imageUrl,
    youtubeLink
  })
  .then(() => {
    alert("Product added successfully!");
    clearForm();
    loadProducts();
  })
  .catch(error => {
    console.error("Error adding product:", error);
    alert("Failed to add product.");
  });
}

function clearForm() {
  document.getElementById("name").value = "";
  document.getElementById("price").value = "";
  document.getElementById("quantity").value = "";
  document.getElementById("imageUrl").value = "";
  document.getElementById("youtubeLink").value = "";
}

function loadProducts() {
  const tbody = document.querySelector("#productTable tbody");
  tbody.innerHTML = "";

  db.collection("products").get().then(snapshot => {
    snapshot.forEach(doc => {
      const d = doc.data();
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${d.name}</td>
        <td>₹${d.price}</td>
        <td>${d.quantity}</td>
        <td><img src="${d.imageUrl}" width="50"></td>
        <td><a href="${d.youtubeLink}" target="_blank">Watch</a></td>
      `;
      tbody.appendChild(row);
    });
  });
}

window.onload = loadProducts;
