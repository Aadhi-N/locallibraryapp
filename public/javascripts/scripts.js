// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation');
    const inputUsername = document.getElementById('inputUsername');
  const inputPassword = document.getElementsById('inputPassword');
  const invalidFeedback = document.getElementsById('invalid-feedback');

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
      
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })
})()

//   // Fetch all the forms we want to apply custom Bootstrap validation styles to
//   var form = document.getElementById('needs-validation')
//   const inputUsername = document.getElementById('inputUsername');
//   const inputPassword = document.getElementsById('inputPassword');
//   const invalidFeedback = document.getElementsById('invalid-feedback');

 
// form.addEventListener('submit', (e) => {
//   let messages = [];
//   if (inputUsername.value.length < 8 || inputUsername.value.length == null) {
//     messages.push('Library card number must be 8 digits long');
//   }

//   if (messages.length > 0) {
//     e.preventDefault();
//     invalidFeedback.innerText = messages.join(', ');
//   }
     
// })


/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}
