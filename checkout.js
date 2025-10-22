function generateInvoice() {
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const address = document.getElementById("address").value;
  const cart = JSON.parse(localStorage.getItem("cart"));

  localStorage.setItem("customer", JSON.stringify({ name, phone, address }));
  localStorage.setItem("finalCart", JSON.stringify(cart));
  window.location.href = "invoice.html";
}
