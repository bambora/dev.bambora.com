// Collapsable path-method blocks 
$('.operation-heading').click(function(){
    $(this).next('.operation-content').slideToggle('fast');
});

// Collapsable object spec definitions
$('.schema-link').click(function(event) {
    event.preventDefault();
    link_id = $(this).attr('id');
    $('#' + link_id + "-code").slideToggle('fast');
});