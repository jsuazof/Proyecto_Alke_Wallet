// Add event listener for deposit button
document.getElementById("depositBtn").addEventListener("click", function() {
  // Get values of input fields
  const name = document.getElementById("name").value;
  const cbu = document.getElementById("cbu").value;
  const alias = document.getElementById("alias").value;
  const banco = document.getElementById("banco").value;

  // Validate input
  if (name === "" || cbu === "" || alias === "" || banco === "") {
    alert("Todos los campos son obligatorios");
    return;
  }

  // Check if user exists in local storage
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const userExists = users.some(user => user.cbu === cbu);

  if (userExists) {
    alert("El usuario ya existe");
    return;
  }

  // Create new user
  users.push({ name, cbu, alias, banco });

  // Save users to local storage
  localStorage.setItem("users", JSON.stringify(users));

  // Create local transaction
  const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
  transactions.push({
    type: "deposit",
    amount: 0,
    date: new Date(),
    details: { name, cbu, alias, banco }
  });

  // Save transactions to local storage
  localStorage.setItem("transactions", JSON.stringify(transactions));

  alert("Transferencia exitosa");
});