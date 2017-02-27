$('h2').each(function(){ 
    $(this).nextUntil("h2").wrapAll('<div class="faq-answer" />');
});

$('h2').on('click', function(event) {
    event.stopPropagation();
    $(this).toggleClass('open');
    $(this).next('.faq-answer').slideToggle('fast');
    $('html, body').animate({scrollTop: $(this).offset().top - 75}, 800);

    // lazy load images
    $(this).next('.faq-answer').find("img").lazy({
        bind: "event",
        delay: 0
    });
});

