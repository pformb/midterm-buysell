$(document).ready(function () {

  // Click event for the "Profile" menu option
  $('#profile').on('click', function () {
    location.reload(true);

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
  });

  // Click event for the "Messages" menu option
  $('#messages').on('click', function () {
    const content = `<h1 class="messages-h1">Messages</h1>`;
    $('main').html(content);
  });

  // Click event for the "Selling" menu option
  $('#selling').on('click', function () {
    const content = `<h1>Selling</h1>
    <div class="selling-menu">
      <span class="selling-option" data-option="current">Current</span>
      <span class="selling-option" data-option="pending">Pending</span>
      <span class="selling-option" data-option="history">History</span>
    </div>
    <div class="selling-items">
      <!-- Items will be dynamically loaded here based on the selected option -->
    </div>`;

    $('main').html(content);

    // Add click event handlers for selling menu options
    $('.selling-option').on('click', function () {
      const option = $(this).data('option');
      loadSellingItems(option);
    });
  });

  // Click event for the "Orders" menu option
  $('#orders').on('click', function () {
    const content = `<h1>Orders</h1>
    <div class="orders-menu">
      <span class="orders-option" data-option="current">Current</span>
      <span class="orders-option" data-option="pending">Pending</span>
      <span class="orders-option" data-option="history">History</span>
    </div>
    <div class="orders-items">
      <!-- Items will be dynamically loaded here based on the selected option -->
    </div>`;

    $('main').html(content);

    // Add click event handlers for orders menu options
    $('.orders-option').on('click', function () {
      const option = $(this).data('option');
      loadOrdersItems(option);
    });
  });

  // Click event for the "Favorites" menu option
  $('#favorites').on('click', function () {
    const content = `<h1 class="messages-h1">Favourites</h1>
    <div>Favourites</div>`;
    $('main').html(content);
  });

  // Add hover effect to side panel options
  $('.side-panel ul li').hover(
    function () {
      // Mouse over
      $(this).css('color', '#62B6CB');
      $(this).css('cursor', 'pointer');
    },
    function () {
      // Mouse out
      $(this).css('color', ''); // Revert to the default color
      $(this).css('cursor', 'default'); // Revert to the default cursor
    }
  );

  // Function to toggle edit mode for profile information
  function toggleEdit() {
    let nameInput = $('#nameInput');
    let emailInput = $('#emailInput');
    let addressInput = $('#addressInput');
    let cityInput = $('#cityInput');
    let postalInput = $('#postalInput');
    let provinceInput = $('#provinceInput');

    nameInput.prop('readonly', !nameInput.prop('readonly'));
    emailInput.prop('readonly', !emailInput.prop('readonly'));
    addressInput.prop('readonly', !addressInput.prop('readonly'));
    cityInput.prop('readonly', !cityInput.prop('readonly'));
    postalInput.prop('readonly', !postalInput.prop('readonly'));
    provinceInput.prop('readonly', !provinceInput.prop('readonly'));
  }


  // Click event for the "EDIT" button in profile section
  $('.header-footer button').on('click', toggleEdit);

  // Function to load selling items based on the selected option
  function loadSellingItems(option) {
    // Implement logic to load selling items based on the selected option
    // Update the content of ".selling-items" accordingly
    const sellingItemsContent = `Items for ${option}`;
    $('.selling-items').html(sellingItemsContent);
  }

  // Function to load orders items based on the selected option
  function loadOrdersItems(option) {
    // Implement logic to load orders items based on the selected option
    // Update the content of ".orders-items" accordingly
    const ordersItemsContent = `Items for ${option}`;
    $('.orders-items').html(ordersItemsContent);
  }

});
