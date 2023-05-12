const body = document.body;
const grafica = document.getElementById('grafica');

function toggleGraphFrame() {
      if (grafica.style.display === 'none') {
        grafica.style.display = 'block';
      } else {
        grafica.style.display = 'none';
      }
    }

document.addEventListener('keydown', function (event) {


  var key = event.key;

  switch (key) {

    case 'ArrowDown':
      var image = document.getElementById('image');
      imageHtml = '<img src="https://cdn.pixabay.com/photo/2018/06/27/07/45/college-student-3500990_1280.jpg" width="300" height="200" >';
      image.innerHTML = imageHtml;
      break;
    case 'Escape':
      var image = document.getElementById('image');
      var imagePet = document.getElementById('imagePet');
      var table = document.getElementById('table');
      var mail = document.getElementById('mail');
      if (table) {
        while (table.firstChild) {
          table.removeChild(table.firstChild);
        }
      }
      mail.value = "";
      imagePet.innerHTML = '';
      image.innerHTML = '';
      break;
    case 'ArrowUp':
      var imagePet = document.getElementById('imagePet');
      imagePetHtml = '<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-UZ0UVZD6X4xllQJSoMB9qxLl5NMmNXzhAe2Utby53g&s" width="300" height="200" >';
      imagePet.innerHTML = imagePetHtml;
      break;
    case 'Shift':
      var table = document.getElementById('table');
      tableHtml = '<table><tr><td>Nombre</td><td>Apellido</td><td>Edad</td><td>Genero</td></tr><tr><td>Daniela</td><td>Marin</td><td>32</td><td>Femenino</tr><tr><td>Miguel</td><td>Angel</td><td>13</td><td>Masculino</tr><tr><td>Sara</td><td>Alexis</td><td>21</td><td>Femenino</tr><tr><td>Angela</td><td>Furier</td><td>12</td><td>Femenino</tr></table>';
      table.innerHTML = tableHtml;
      break;
    case 'o':
      var table = document.getElementById('table');
      var maxAge = -Infinity;
      var minAge = Infinity;
      var maxAgeCell = null;
      var minAgeCell = null;

      if (table) {
        for (var i = 0; i < table.rows.length; i++) {
          var row = table.rows[i];
          for (var j = 0; j < row.cells.length; j++) {
            var cell = row.cells[j];
            if (cell.innerHTML === 'Edad') {
              continue;
            }
            var age = parseInt(cell.innerHTML);
            if (!isNaN(age)) {
              if (age > maxAge) {
                maxAge = age;
                maxAgeCell = cell;
              }
              if (age < minAge) {
                minAge = age;
                minAgeCell = cell;
              }
            }
          }
        }

        if (maxAgeCell) {
          maxAgeCell.style.backgroundColor = 'green';
        }
        if (minAgeCell) {
          minAgeCell.style.backgroundColor = 'red';
        }
      }
      break;
    case ' ':

      var emailContent = document.getElementById('mail').value;
      // Realizar la solicitud POST al servidor
      fetch('http://localhost:3000/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          emailContent: emailContent
        })
      })
        .then(response => {
          if (response.ok) {
            console.log('Correo electrónico enviado');
          } else {
            console.log('Ocurrió un error al enviar el correo electrónico');
          }
        })
        .catch(error => {
          console.log('Error al enviar el correo electrónico:', error);
        });

      break;
    case 'p':
      var number = document.getElementById('number').value;
      number = "+57" + number;
      fetch('http://localhost:3000/makecall', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          number: number
        })
      })
        .then(response => {
          if (response.ok) {
            console.log('Llamada iniciada');
          } else {
            console.log('Ocurrió un error al iniciar la llamada');
          }
        })
        .catch(error => {
          console.log('Error al iniciar la llamada:', error);
        });
      break;
      case 'g':
      toggleGraphFrame();
      break;
  }
});
