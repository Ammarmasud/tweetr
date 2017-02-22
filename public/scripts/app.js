/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(function() {
  const loadTweets = function () {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      success: function (dbTweets) {
        renderTweets(dbTweets.reverse());
      }
    });
  }();

  const escape = function (str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const calcDaysAgo = function (date_past) {
    // get total seconds between the times
    let delta = Math.abs(Date.now() - date_past) / 1000;
    let timeMessage = ``;

    if (delta >= 86400) {
      // calculate (and subtract) whole days
      delta = Math.floor(delta / 86400);
      timeMessage += `${delta} day(s) ago`
    } else if (delta >= 3600) {
      // calculate (and subtract) whole hours
      delta = Math.floor(delta / 3600) % 24;
      timeMessage += `${delta} hour(s) ago`
    } else if (delta >= 60) {
      // calculate (and subtract) whole minutes
      delta = Math.floor(delta / 60) % 60;
      timeMessage += `${delta} minute(s) ago`
    } else {
      timeMessage += `Just now!`
    }
    return timeMessage;
  };

  const createTweetElement = function (tweetData) {
    const timeAgo = calcDaysAgo(tweetData.created_at);
    const tweet = `<article class="tweet">
                    <header>
                      <img class="profile-pic" src="${tweetData.user.avatars.small}">
                      <h3>${escape(tweetData.user.name)}</h3>
                      <h6>${escape(tweetData.user.handle)}</h6>
                    </header>
                    <p>${escape(tweetData.content.text)}</p>
                    <footer>
                      <p>${timeAgo}</p>
                    </footer>
                  </article>`;

    return tweet;
  };

  const renderTweets = function (data) {
    const tweets = data.map(createTweetElement);
    $('#tweets-container').append(tweets);
  };

  const renderNewTweet = function (newTweetData) {
    const tweet = createTweetElement(newTweetData);
    $('#tweets-container').prepend(tweet);
  };

  $('#new-tweet-form').on('submit', function(event) {
    event.preventDefault();
    const new_tweet = $(this).serialize();

    $.ajax({
      url: '/tweets/',
      method: 'POST',
      data: new_tweet,
      success: function () {
        console.log($('#new-tweet-form textarea'));
        $('#new-tweet-form textarea').val('');
        $.ajax({
          url: '/tweets',
          method: 'GET',
          success: function (dbTweets) {
            console.log(typeof dbTweets);
            renderNewTweet(dbTweets[dbTweets.length - 1]);
          }
        });
      }
    });
  });
});
