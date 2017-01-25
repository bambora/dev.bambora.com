var lunrIndex = null;
var lunrData  = null;

// Download index data
$.ajax({
  url: "../search.json",
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
  });

  $('#close-search-overlay').click(function() {
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
      resultcount.html('results: ' + result.length);
      searchresults.empty();
      for (var item in result) {
        // A result only gives us a reference to a document
        var ref = result[item].ref;
        // Using the reference get the document
        var doc = lunrData.docs[ref];
        // Get the section of the site
        //var group = " <span class='badge'>" + doc.group + '</span>';
        var searchitem = '<li><a class="list-group-item" href="' + doc.url + '">' + doc.title + '</a></li>';
        searchresults.append(searchitem);
      }
      searchresults.show();
    }
  });
});