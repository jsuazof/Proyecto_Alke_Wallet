$(document).ready(function () {

   // Definir un arreglo de usuarios y contraseñas
   const users = [
    { username: "admin", password: "12345" },
    { username: "user", password: "223344" }
    // Puedes agregar más usuarios según sea necesario
  ];


  $("#loginForm").submit(function (event) {
    event.preventDefault();
    let username = $("#username").val();
    let password = $("#password").val();

    // Verificar las credenciales
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
      // Credenciales válidas, redirigir a la pantalla de wallet
      window.location.href = "/html/menu.html";
    } else {
      // Credenciales inválidas, mostrar mensaje de error
      alert("Usuario o contraseña inválido. Inténtalo de nuevo.");
    }
  });


    // Verificar las credenciales
   
    /* if (username === "admin" && password === "12345") {
      // Credenciales válidas, redirigir a la pantalla de wallet
      window.location.href = "/html/menu.html";
    } else {
      // Credenciales inválidas, mostrar mensaje de error
      alert("Usuario o contraseña inválido. Inténtalo de nuevo.");
    }
    */
  });

  // Corrección aquí: usar $(document).ready(function() {...})
  $(document).ready(function () {
    // Agrega un evento de clic al botón de logout
    $("#logoutBtn").click(function () {
      // Simulamos cerrar la sesión, puedes agregar tu lógica real aquí
      alert("¡Has cerrado sesión!");
      // Redirige a la página de inicio de sesión u otra página de tu elección
      window.location.href = "/index.html";
    });
  });

  let balance = 0;

  function updateBalance() {
    $("#balance").text(balance.toFixed(2));
  }

  $("#depositBtn").click(function () {
    let amount = parseFloat($("#amount").val());
    if (!isNaN(amount) && amount > 0) {
      balance += amount;
      updateBalance();
      $("#amount").val("");
      alert("Depósito realizado!");
    } else {
      alert("Monto inválido. Por favor, ingrese un número positivo.");
    }
  });

  $("#withdrawBtn").click(function () {
    let amount = parseFloat($("#amount").val());
    if (!isNaN(amount) && amount > 0 && amount <= balance) {
      balance -= amount;
      updateBalance();
      $("#amount").val("");
      alert("Retiro exitoso!");
    } else {
      alert("Cantidad no válida. Ingrese un número válido dentro de su saldo.");
    }
  });
});
