/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(function() {
  let data = [
    {
      "user": {
        "name": "Newton",
        "avatars": {
          "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
          "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
          "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
        },
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": {
          "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
          "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
          "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
        },
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    },
    {
      "user": {
        "name": "Johann von Goethe",
        "avatars": {
          "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
          "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
          "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
        },
        "handle": "@johann49"
      },
      "content": {
        "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
      },
      "created_at": 1461113796368
    }
  ];

  escape = function (str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  calcDaysAgo = function (date_past) {
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

  createTweetElement = function (tweetData) {
    const timeAgo = calcDaysAgo(tweetData.created_at);
    const tweet = `<article class="tweet">
                    <header>
                      <img class="profile-pic" src="${tweetData.user.avatars.small}">
                      <h3>${escape(tweetData.user.name)}</h3>
                      <h6>${escape(tweetData.user.handle)}</h6>
                    </header>
                    <p>${escape(tweetData.text)}</p>
                    <footer>
                      <p>${timeAgo}</p>
                    </footer>
                  </article>`;

    return tweet;
  };

  renderTweets = function (data) {
    data.forEach(function(tweetData) {
      const $tweet = createTweetElement(tweetData);
      $('#tweets-container').append($tweet);
    });
  };

  renderTweets(data);
});
