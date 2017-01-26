var lunrIndex = null;
var lunrData  = null;

// Download index data
$.ajax({
  url: "/search.json",
  cache: true,
  method: 'GET',
  success: function(data) {
    lunrData = data;
    lunrIndex = lunr.Index.load(lunrData.index);
  }
});

$(document).ready(function () { 

  $('#search-button').click(function() {
    $('#search-overlay').fadeIn("fast"); 
    $('#search-overlay input').focus();
    $('#search-overlay input').val("");
    $('body').addClass('no-scroll');
  });

  $('#close-search-overlay').click(function() {
    $('body').removeClass('no-scroll');
    $('#search-overlay').fadeOut("fast");
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

        if(!doc.summary) {
          var summary = "<p class='summary'><em>Page has no summary </em></p>"; 
        } else {
          var summary = "<p class='summary'>" + doc.summary + "</p>";
        }

        var searchitem = "<div class='search-result'><p><a href='" + doc.url + "'>" + doc.title + "</a>" + summary;

        searchresults.append(searchitem);
      }
      resultcount.show();
      searchresults.show();
    }
  });
});