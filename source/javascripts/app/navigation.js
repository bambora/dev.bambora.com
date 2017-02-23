// Hamburger button/side menu replace header links on 
// small screens. 
$(document).ready(function () { 
    // Hamburger menu on mobile screen
    $('.hamburger-icon').click(function(event) {
        event.preventDefault();
        event.stopPropagation();
        $(".header-contents").toggleClass("mobile-state-hidden")
    });
});