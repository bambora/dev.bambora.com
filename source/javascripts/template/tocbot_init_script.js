tocbot.init({
    // Where to render the table of contents.
    tocSelector: '.js-toc',
    // Where to grab the headings to build the table of contents.
    contentSelector: '.js-toc-content',
    // Which headings to grab inside of the contentSelector element.
    headingSelector: 'h2, h3, h4, h5',
    // How many heading levels should not be collpased.
    // For example, number 6 will show everything since
    // there are only 6 heading levels and number 0 will collpase them all.
    // The sections that are hidden will open
    // and close as you scroll to headings within them.

    ignoreSelector: '.js-toc-ignore',

    collapseDepth: 1,
    // Main class to add to links.
    //linkClass: '',

    // Extra classes to add to links.
    //extraLinkClasses: '',

    // Class to add to active links,
    // the link corresponding to the top most heading on the page.
    //activeLinkClass: '',

    // Main class to add to lists.
    //listClass: 'nav-vertical',

    // Extra classes to add to lists.
    //extraListClasses: '',

    // Class to add to list items.
    //listItemClass: '',

    smoothScrollOptions: {
      offset: 80 // offset to account for header
    }
});


// Position left nav nicely on scroll 
wrap = $(window);
nav = $('.nav-left');
nav_link = $('#show-nav-link');
nav_offset = 84; // hard-coded pixel height between top of nav and page header
nav_offset -= 40; // padding above fixed nav

wrap.on("scroll", function(e) {
  if(wrap.scrollTop() > nav_offset) {
    nav.addClass('nav-left-fixed');
  } else {
    nav.removeClass('nav-left-fixed');
  }
});
