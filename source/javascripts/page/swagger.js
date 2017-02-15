// Collapsable path-method blocks 
$('.operation-heading').click(function(){
    $(this).next('.operation-content').slideToggle('fast');
});

// Hide elements on page load 
$('.schema-body .schema-body').toggle();
$('.property-body').toggle();
$('.enum-list').toggle();

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
            scrollTop: target.offset().top - 100
        }, 500);
    }
});