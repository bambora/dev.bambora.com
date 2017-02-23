/* Javascript for header and side toc */

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

    // toc close button
    $('.mobile-close').click(function(event) {
        event.stopPropagation();
        $('.nav-left').toggleClass('mobile-state-hidden');
    });

    // Combine toc and header side nav if page width below $header-break-width.
    var $window = $(window);
    var $tableOfContents = $('nav.nav-left');
    var $tableOfContentsWrap = $('.nav-wrapper');
    var $headerSideNav = $('.header-contents>span');
    var headerBreakWidth = 875;
    var combined = false;
    function checkWidth() {
        var windowsize = $window.width();
        if (windowsize < 875 && combined === false) {

            console.log('combine');
            combined = true;
            $headerSideNav.append($tableOfContents);
        
        } else if (windowsize >= 875 && combined === true) {
            console.log("separate");
            combined = false;
            $tableOfContentsWrap.append($tableOfContents);
        }
    }
    checkWidth();
    $(window).resize(checkWidth);

});
