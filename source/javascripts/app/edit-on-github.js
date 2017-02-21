// Modal popup for Edit on github button. 
$(document).ready(function () { 
  $('a#edit-on-github, #edit-on-github li a').click(function(event) {
    event.preventDefault();
    var github_link = $(this).attr("href");
    $('.continue-to-github').attr('href', github_link);
    $('.modal-overlay').toggle();
  });

  $('.close-modal').click(function(){
    $('.modal-overlay').toggle();
  });
});