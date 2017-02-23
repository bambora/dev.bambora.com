// Hamburger button/side menu replace header links on 
// small screens. 
$(document).ready(function () { 
    // Hamburger menu on mobile screen
    $(".header-contents").toggleClass("mobile-state-hidden")    
    $('.hamburger-icon').click(function(event) {
        event.preventDefault();
        event.stopPropagation();
        $(".header-contents").toggleClass("mobile-state-hidden")
    });

    // toc button between on mobile screen
    $('.nav-left').toggleClass('mobile-state-hidden');
    $('.show-toc').click(function(event) {
        event.preventDefault();
        event.stopPropagation();
        $('.nav-left').toggleClass('mobile-state-hidden');
    });
});