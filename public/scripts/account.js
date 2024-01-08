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

  $('#messages').on('click', function () {
    const content = ` <h1 class="messages-h1">Messages</h1>`;

    $('main').html(content);

  })

  $('#selling').on('click', function () {
    const content = `<h1>Selling</h1>
    <div class="selling-menu">
      <span>Current</span>
      <span>Pending</span>
      <span>History</span>
    </div>
    <div class="selling-items">
      Items
    </div>`;

    $('main').html(content);
  })

  $('#orders').on('click', function () {
    const content = `<h1>Orders</h1>
    <div class="selling-menu">
      <span>Current</span>
      <span>Pending</span>
      <span>History</span>
    </div>
    <div class="selling-items">
      Items
    </div>`;

    $('main').html(content);
  })

  $('#favorites').on('click', function () {
    const content = ` <h1 class="messages-h1">Favourites</h1>
    <div>Favourites</div>`;

    $('main').html(content);

  })

});
