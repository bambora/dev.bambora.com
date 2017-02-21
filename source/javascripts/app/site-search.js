//= require lunr.min
//= require lunr.stemmer.support
//= require lunr.es

var lunrIndex = null;
var lunrData  = null;

// Download index data
$.ajax({
  url: '/search.json',
  cache: true,
  method: 'GET',
  dataType: "json",
  success: function(data) {
    lunrData = data;
    lunrIndex = lunr.Index.load(lunrData.index);
  }
});

$(document).ready(function () { 
  
  $('#search-button').click(function(event) {
    event.preventDefault();
    event.stopPropagation();
    $('#search-overlay').fadeIn("fast"); 
    $('#search-overlay input').focus();
    $('#search-overlay input').val("");
    $('body').addClass('no-scroll');
    
    // Reset results 
    var searchresults = $('.search-results');
    var resultcount = $('#result-count');
    searchresults.hide();
    resultcount.hide();
  });

  $('#close-search-overlay').click(function(event) {
    event.preventDefault();
    event.stopPropagation();
    $('body').removeClass('no-scroll');
    $('#search-overlay').fadeOut("fast");
  });

  $(document).keyup(function(e) {
    if (e.keyCode == 27) { // escape key maps to keycode `27`
      event.preventDefault();
      $('body').removeClass('no-scroll');
      $('#search-overlay').fadeOut("fast");
    }
  });

  $('input#search').on('keyup', function () {
    // Get query
    var query = $(this).val();
    // Search for it
    var result = lunrIndex.search(query);
    // Output it
    var searchresults = $('.search-results');
    var resultcount = $('#result-count');
    if (result.length === 0) {
      
      // Hide results
      searchresults.hide();
      resultcount.hide();

    } else {
      // Show results
      resultcount.html(result.length + " results");
      searchresults.empty();
      for (var item in result) {
        // A result only gives us a reference to a document
        var ref = result[item].ref;
        // Using the reference get the document
        var doc = lunrData.docs[ref];

        // Get Breadcrumbs 
        var breadcrumbs = "<p>" + doc.breadcrumbs + "</p>";

        // Get Title 
        var title = "<p><a href='" + doc.url + "'>" + doc.title + "</a></p>";

        // Get Summary 
        if(!doc.summary) {
          var summary = "<p class='summary'><em>Page has no summary </em></p>"; 
        } else {
          var summary = "<p class='summary'>" + doc.summary + "</p>";
        }

        // Create search result 

        var searchitem = "<div class='search-result'>" + breadcrumbs + 
                          title + summary + "</div>"; 

        searchresults.append(searchitem);
      }
      resultcount.show();
      searchresults.show();
    }
  });
});