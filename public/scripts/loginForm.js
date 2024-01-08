//handles login-form submission and on-click event for login button

$(() => {

  const $loginForm = $(`
  <div class="login-container">
  <form id="login-form">

      <label for="email">Email:</label>
      <input type="email" id="email" name="email" required>

      <label for="password">Password:</label>
      <input type="password" id="password" name="password" required>
      <p>Forgot your Password?</p>
      <button type="submit" id="submit-btn">Login In</button>

      <p>By logging in you agree to the Terms of Service and Privacy Policy</p>
      <!-- Links not yet applied that Paul added in the Figma-->
      <p>Don't have an account?  Sign Up Here</p>
      <!--Make this a seperate div or footer?-->
  </form>
</div>
`);
  window.$loginForm = $loginForm;

  $loginForm.on('submit', function (event) {
    event.preventDefault();

    const data = $(this).serialize();
    login(data)
      .then(function (json) {
        header.update(json);
      });
  });
});
