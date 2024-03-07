let balance = 0;


$(document).ready(function () {
  // Inicializar el saldo desde localStorage al cargar la página
  if (localStorage.getItem("balance")) {
    balance = parseFloat(localStorage.getItem("balance"));
    updateBalance();
  }

  // Función para mostrar alerta de Bootstrap
  const appendAlert = (message, type) => {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = [
      `<div class="custom-alert alert alert-${type} alert-dismissible" role="alert">`,
      `   <div>${message}</div>`,
      '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
      "</div>",
    ].join("");

    // Agrega la alerta al contenedor de alertas en el HTML
    $("#liveAlertPlaceholder").append(wrapper);
    // Configura un temporizador para eliminar la alerta después de 5 segundos
    setTimeout(function () {
      wrapper.remove();
    }, 2500);
  };

  // Expresión regular para validar el formato de correo electrónico
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Definir un arreglo de usuarios y contraseñas con correos electrónicos
  const users = [
    { username: "admin@example.com", password: "12345" },
    { username: "user@example.com", password: "223344" },
    // Puedes agregar más usuarios según sea necesario
  ];

  $("#loginForm").submit(function (event) {
    event.preventDefault();
    let username = $("#username").val();
    let password = $("#password").val();

    // Eliminar las alertas existentes al momento de enviar el formulario
    $("#liveAlertPlaceholder").empty();

    // Verificar las credenciales y el formato del correo electrónico
    const user = users.find(
      (u) =>
        u.username.toLowerCase() === username.toLowerCase() &&
        u.password === password &&
        emailRegex.test(username)
    );

    if (user) {
      // Credenciales válidas, redirigir a la pantalla de wallet
      window.location.href = "Proyecto_Alke_Wallet/html/menu.html";
    } else {
      // Credenciales inválidas, mostrar mensaje de error
      appendAlert(
        "Usuario o contraseña inválido. Inténtalo de nuevo.",
        "danger"
      );
    }
  });

  // Corrección aquí: usar $(document).ready(function() {...})
  $(document).ready(function () {
    // Agrega un evento de clic al botón de logout
    $("#logoutBtn").click(function () {
      // Limpiar localStorage al cerrar sesión
      localStorage.removeItem("balance");

      // Simulamos cerrar la sesión, puedes agregar tu lógica real aquí
      appendAlert("¡Has cerrado sesión!");
      // Redirige a la página de inicio de sesión u otra página de tu elección
      window.location.href = "../index.html";
    });
  });



  function updateBalance() {
    $("#balance").text(balance.toFixed(2));
  }

  $("#depositBtn").click(function () {
    // Elimina las alertas existentes con la clase "custom-alert" antes de cerrar sesión
    $(".custom-alert").remove();
    let amount = parseFloat($("#amount").val());
    if (!isNaN(amount) && amount > 0) {
      balance += amount;
      updateBalance();
      $("#amount").val("");
      appendAlert("Depósito realizado!");
      // Actualizar el saldo en localStorage
      localStorage.setItem("balance", balance.toString());
    } else {
      appendAlert("Monto inválido. Por favor, ingrese un número positivo.");
    }
  });

  $("#withdrawBtn").click(function () {
    // Elimina las alertas existentes con la clase "custom-alert" antes de cerrar sesión
    $(".custom-alert").remove();
    let amount = parseFloat($("#amount").val());
    if (!isNaN(amount) && amount > 0 && amount <= balance) {
      balance -= amount;
      updateBalance();
      $("#amount").val("");
      appendAlert("Retiro exitoso!");
      // Actualizar el saldo en localStorage
      localStorage.setItem("balance", balance.toString());
    } else {
      appendAlert(
        "Cantidad no válida. Ingrese un número válido dentro de su saldo."
      );
    }
  });
});
