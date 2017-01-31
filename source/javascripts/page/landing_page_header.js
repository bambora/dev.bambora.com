wrap = $(window);
header = $('nav');

header.addClass('nav-pane-transparent');

wrap.on("scroll", function(e) {
    if(wrap.scrollTop() > 0) {
        header.addClass('nav-pane-dark');
        header.removeClass('nav-pane-transparent');
    } else {
        header.removeClass('nav-pane-dark');
        header.addClass('nav-pane-transparent');
    }
});