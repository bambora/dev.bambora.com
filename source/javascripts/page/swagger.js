// Collapsable path-method blocks 
$('.operation-heading').click(function(){
    $(this).next('.operation-content').slideToggle('fast');
});

// Hide second level schema definitions
$('.schema-body .schema-body').toggle();
$('.dots').toggle();
$('.schema-body .dots').toggle();

// on click collapse object schema definitions
$('.schema-title').click(function(event) {
    event.preventDefault();
    link_id = $(this).attr('id');
    $(this).siblings('.schema-body').toggle();
    $(this).siblings('.dots').toggle();
});