$w = $(window);
$nav = $('nav');

$w.on("scroll", function(e) {
    if($w.scrollTop() > 0) {
        $nav.addClass('nav-pane-dark');
        $nav.removeClass('nav-pane-transparent');
    } else {
        $nav.removeClass('nav-pane-dark');
        $nav.addClass('nav-pane-transparent');
    }
});

// TODO: Putting this here now but should be site-wide. 

// Hamburger menu on mobile screen
$('.hamburger-icon').click(function(event) {
    event.preventDefault();
    $(".header-contents").slideToggle("fast");
});


$(window).on('resize', function(event){
    var windowWidth = $(window).width();
    if(windowWidth > 875){
        $('.header-contents').show();
    }
});


