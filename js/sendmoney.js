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
      window.location.href = "/html/menu.html";
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
      window.location.href = "/index.html";
    });
  });

  // Función para obtener la lista de contactos desde localStorage
  function getContacts() {
    const contactsString = localStorage.getItem("contacts");
    return contactsString ? JSON.parse(contactsString) : [];
  }

  // Función para guardar la lista de contactos en localStorage
  function saveContacts(contacts) {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }

  // Función para agregar un nuevo contacto
  function addContact(name, cbu, alias, banco) {
    const contacts = getContacts();
    const newContact = { name, cbu, alias, banco };
    contacts.push(newContact);
    saveContacts(contacts);
    return newContact;
  }

  // Función para mostrar la lista de contactos en el HTML
  function displayContacts() {
    const contactList = document.getElementById("contactList");
    const contacts = getContacts();

    // Limpiar la lista antes de mostrar los contactos
    contactList.innerHTML = "";

    // Mostrar cada contacto en la lista
    contacts.forEach((contact) => {
      const listItem = document.createElement("li");
      listItem.className = "list-group-item";
      listItem.innerHTML = `
            <div class="contact-info">
                <span class="contact-name">${contact.name}</span>
                <span class="contact-details">
                    CBU: ${contact.cbu}, Alias: ${contact.alias}, Banco: ${contact.banco}
                </span>
            </div>
        `;
      contactList.appendChild(listItem);
    });
  }

  // Manejar el evento del formulario para agregar un nuevo contacto
  document
    .getElementById("addContactForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      const name = document.getElementById("name").value;
      const cbu = document.getElementById("cbu").value;
      const alias = document.getElementById("alias").value;
      const banco = document.getElementById("banco").value;

      if (name && cbu && alias && banco) {
        const newContact = addContact(name, cbu, alias, banco);
        alert(`Nuevo contacto agregado: ${newContact.name}`);
        displayContacts();
      } else {
        alert("Por favor, complete todos los campos del formulario.");
      }
    });

  // Mostrar los contactos al cargar la página
  displayContacts();
});
