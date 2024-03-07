    // Función para obtener la lista de contactos desde localStorage
    function getContactList() {
      const contactListString = localStorage.getItem('contactList');
      return contactListString ? JSON.parse(contactListString) : [];
  }

  // Función para guardar la lista de contactos en localStorage
  function saveContactList(contactList) {
      localStorage.setItem('contactList', JSON.stringify(contactList));
  }

  // Función para agregar un nuevo contacto
  function addContact(name, details) {
      const contactList = getContactList();
      contactList.push({ name, details });
      saveContactList(contactList);
  }

  // Función para mostrar la lista de contactos en el HTML
  function renderContactList() {
      const contactList = getContactList();
      const contactListElement = document.getElementById('contactList');

      // Limpiar la lista actual
      contactListElement.innerHTML = '';

      // Mostrar cada contacto en la lista
      contactList.forEach(contact => {
          const listItem = document.createElement('li');
          listItem.className = 'list-group-item';
          listItem.innerHTML = `
              <div class="contact-info">
                  <span class="contact-name">${contact.name}</span>
                  <span class="contact-details">${contact.details}</span>
              </div>
          `;
          contactListElement.appendChild(listItem);
      });
  }

  // Manejar el evento del botón para agregar un nuevo contacto
  document.querySelector('#addContactBtn').addEventListener('click', function () {
      const name = prompt('Ingrese el nombre del contacto:');
      const details = prompt('Ingrese los detalles del contacto:');

      if (name && details) {
          addContact(name, details);
          renderContactList();
      } else {
          alert('Ingrese un nombre y detalles válidos.');
      }
  });

  // Mostrar la lista de contactos al cargar la página
  renderContactList();
