// Modal popup for Edit on github button. 
$(document).ready(function () { 
  $('a#edit-on-github, #edit-on-github li a').click(function(event) {
    event.preventDefault();
    var github_link = $(this).attr("href");
    $('.continue-to-github').attr('href', github_link);
    $('.modal-overlay').toggle();
    $(".modal-overlay").prependTo("body"); // Kind of hacky and unecessary except to fix styling spec layout. 
    $('body').addClass('no-scroll');
  });

  // Prevent a click on the modal from closing it. 
  $('.github-modal').click(function(event) {
    event.stopPropagation();
  });

  $('.close-modal, .modal-overlay').click(function(){
    $('.modal-overlay').toggle();
    $('body').removeClass('no-scroll');
  });
});