// Hide elements that should be hidden on page load 
$('.tag-operations').toggle();
$('.schema-body .schema-body').toggle();
$('.property-body').toggle();
$('.enum-list').toggle();

// smooth scrolling to expandable things 
$('h2, h3, .operation-heading').on('click', function(event) {
    event.preventDefault();
    event.stopPropagation();
    $(this).toggleClass('open');
    $(this).next('.expandable').slideToggle('fast');
    $('html, body').animate({scrollTop: $(this).offset().top - 75}, 800);
});

// on click collapse object schema definitions
$('.schema-title').click(function(event) {
    event.preventDefault();
    link_id = $(this).attr('id');
    $(this).siblings('.schema-body').toggle();
});

// on click show property details 
$('.property-type').click(function(event) {
    event.preventDefault();
    $(this).siblings('.property-body').toggle();
})

// on click show enum list 
$('.enum-link').click(function(event) {
    event.preventDefault();
    $(this).siblings('.enum-list').toggle();
});

// smooth scrolling to schema definitions 
$('a[href^="#"]').on('click', function(event) {
    var target = $(this.getAttribute('href'));
    if( target.length ) {
        event.preventDefault();
        $('html, body').stop().animate({
            scrollTop: target.offset().top - 100 // accomodate for fixed header
        }, 500);
    }
});