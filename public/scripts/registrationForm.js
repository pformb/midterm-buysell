//Jquery and ajax registration form

$(() => {

  const $registrationForm = $(`
    <div>
      <form id="registration-form">
        <label for="first-name">First Name:</label>
        <input type="text" id="first-name" name="first-name" required />

        <label for="last-name">Last Name:</label>
        <input type="text" id="last-name" name="last-name" required />

        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required />

        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required />
        <p>At least 8 characters, 1 uppercase letter, 1 number & 1 symbol</p>
        <button type="submit" id="submit-btn">Sign Up</button>

        <p>By signing up, you agree you've read and accepted our Terms and Conditions. Please see our Privacy Policy for information on how we process your data.</p>
        <p>Already have an account? Log In</p>
      </form>
    </div>
  `);
      function register(data) {
        return $.post('/register', data);
      }

      $registrationForm.on('submit', function (event) {
        event.preventDeafult();

        const data = $(this).searlize();
        login(data)
        .done(function () {
          window.location.href = '/browse';
        })
        .fail(function (error) {
          console.log(error, "Registration Failed");
      });
  });
});
