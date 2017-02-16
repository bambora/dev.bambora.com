document.getElementById("encodeIdAndKey_form").addEventListener("submit", function(e){
  e.preventDefault();

  var merchantId = document.getElementById("merchantId").value;
  var apiKey = document.getElementById("apiKey").value;

  var $div = $('#encodeIdAndKey_result');
  $div.text(btoa(merchantId + ':' + apiKey));
  $div.removeClass('hidden');
  $div.addClass('success');
});
