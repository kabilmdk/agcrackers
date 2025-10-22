firebase.auth().onAuthStateChanged(user => {
  if (!user || user.email !== "admin@agcrackers.com") {
    alert("Unauthorized access");
    window.location.href = "login.html";
  } else {
    loadProducts();
  }
});

function addProduct() {
  const name = document.getElementById("name").value;
  const price = parseInt(document.getElementById("price").value);
  const stock = parseInt(document.getElementById("stock").value);

  db.collection("products").add({ name, price, stock })
    .then(() => {
      alert("Product added!");
      loadProducts();
    });
}

function loadProducts() {
  const list = document.getElementById("productList");
  list.innerHTML = "";

  db.collection("products").get().then(snapshot => {
    snapshot.forEach(doc => {
      const data = doc.data();
      const li = document.createElement("li");
      li.textContent = `${data.name} - ₹${data.price} - Stock: ${data.stock}`;
      list.appendChild(li);
    });
  });
}
