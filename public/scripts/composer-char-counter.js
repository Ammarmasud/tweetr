countingText = function() {
  let remaining = 140 - $(this).val().length
  let counter = $(this).parent().children('span.counter');
  counter.text(remaining);
  if (Number(remaining) < 0) {
    counter.addClass('red-text');
  } else {
    counter.removeClass('red-text');
  }
}

$(function() {
  $('.new-tweet textarea').on('keyup',countingText);
  $('.new-tweet textarea').on('keypress',countingText);
});