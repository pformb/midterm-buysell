$(document).ready(function () {
  $('#profile').on('click', function () {

    const content = `<header>
    <h1>Profile</h1>
    <div class="header-footer">
      <h3>Personal Information</h3>
      <button>EDIT</button>
    </div>
  </header>
  <div class="profile">
    <img src="./images/sample-profile-pic.png" alt="">
    <div class="input-fields">
      <label for="">Name: <input type="text" placeholder="Name"></label>
      <label for="">Email: <input type="email" placeholder="Email Address"></label>
      <label for="">Password: <input type="password" placeholder="******"></label>
    </div>
  </div>
  <div class="header-footer">
    <h3>Shipping Information</h3>
    <button>EDIT</button>
  </div>`;

  $('main').html(content);

  })
});
