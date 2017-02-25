const submitUser = function (event) {
  event.preventDefault();
  const [name, handle, email, password] = [$('#reg-name'), $('#reg-handle'), $('#reg-email'), $('#reg-password')];

  name.val(escape(name.val()));
  handle.val(`@${escape(handle.val())}`);
  email.val(escape(email.val()));
  password.val(escape(password.val()));

  const new_user = {
    "name": name,
    "handle": handle,
    "email": email,
    "password":password
  };
  console.log(new_user);

  $('section.new-tweet').slideDown();
  $('#new-tweet-form textarea').select();

  console.log('THIS WORKED 1');
  $.ajax({
    url: '/users/',
    method: 'POST',
    data: new_user,
    success: function () {
      console.log('THIS WORKED 2');
    }
    // success: function () {
    //   tweetTextArea.val('');
    //   $.ajax({
    //     url: '/tweets',
    //     method: 'GET',
    //     success: function (dbTweets) {
    //       renderNewTweet(dbTweets[dbTweets.length - 1]);
    //     }
    //   });
    // }
  });
};


$(function() {
  // Modal tab switching
  $('.tab-login').on('click', function(event) {
    $(event.target).addClass('tab-selected').removeClass('tab-unselected');
    $('.tab-register').addClass('tab-unselected').removeClass('tab-selected');
    $('.login-form').css('display', 'block');
    $('.registration-form').css('display', 'none');
  });
  $('.tab-register').on('click', function() {
    $(event.target).addClass('tab-selected').removeClass('tab-unselected');
    $('.tab-login').addClass('tab-unselected').removeClass('tab-selected');
    $('.login-form').css('display', 'none');
    $('.registration-form').css('display', 'block');
  });

  // Get the modal
  const modal = $('#user-modal');
  $(".btn-register-login").on('click', function() { modal.css('display', 'block') });
  $(".close").on('click', function() {
    modal.css('display', 'none');
  });
  $(document).on('click', function(event) {
    if (event.target === modal[0]) {
      modal.css('display', 'none');
    };
  });

  $('#registration-form').on('submit', submitUser);
});