$(function() {

    // http://stackoverflow.com/questions/19491336/get-url-parameter-jquery-or-how-to-get-query-string-values-in-js
    // get a parameter from the page url 
    var getUrlParameter = function getUrlParameter(sParam) {
        var sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
    };

    // Use div dropdown as <select>
    var val = $('.form-group .dropdown-open-on-hover .value');
    var options = $('.form-group .dropdown-open-on-hover ul');

    options.children('li').click(function(e) {
        e.stopPropagation();
        e.preventDefault();
        val.text($(this).text());
    });

    // Update hidden fields for merchant coutnry and merchant currency when 
    // select field representing both is changed. 
    // legend ([country, currency]):
    //      'Canada - CAD'   => ['CA', 1]
    //      'Canada - USD'   => ['CA', 2]
    //      'USA - USD'      => ['US', 2]
    //      'UK - GBP'       => ['SE', 3]
    //      'UK - Euro'      => ['SE', 4]
    var $countryCurrencySelect = $('#country-currency-select .value');
    var $countryHiddenInput = $('#createTestAccount_form input[name="merchant_country"]');
    var $currencyHiddenInput = $('#createTestAccount_form input[name="merchant_currency"]');
    $("#country-currency-select ul li").click(function() {
        switch($countryCurrencySelect.text()) {
            case "Canada - CAD":
                $countryHiddenInput.val('CA');
                $currencyHiddenInput.val('1');
                break;
            case "Canada - USD": 
                $countryHiddenInput.val('CA');
                $currencyHiddenInput.val('2');
                break;
            case "USA - USD": 
                $countryHiddenInput.val('US');
                $currencyHiddenInput.val('2');
                break;
            case "UK - GBP": 
                $countryHiddenInput.val('SE');
                $currencyHiddenInput.val('3');
                break;
            case "UK - Euro": 
                $countryHiddenInput.val('SE');
                $currencyHiddenInput.val('4');
                break;
        }
    });


    // Handle display of error or success after submitting 
    // a Test Merchant Account creation. 
    var urlStatus = getUrlParameter('status');
    if(getUrlParameter('status')) {  // (i.e. if there is a response in the url)
       
        var $currentForm = $('#createTestAccount_form');
        var $statusDiv = $currentForm.next('.block-highlight');
        var $statusParagraph = $statusDiv.find('p');         

        // if account was created successfully: 
        if(urlStatus === '1') { 
            $statusParagraph.html("<strong>Account successfully created!</strong>");
            $statusParagraph.append("<br> Merchant ID: " + getUrlParameter('merchant_id'));
            $statusDiv.removeClass('hidden notice error');
            $statusDiv.addClass('success');
            $currentForm.find(":input").prop('disabled', true); // disable form on success
        // if account creation failed validation: 
        } else if(urlStatus === '0') {
            var errorMessage = decodeURIComponent(getUrlParameter('error_message'));
            var errorFields = decodeURIComponent(getUrlParameter('error_fields'));

            // Repopulate fields in form:
            $currentForm.find('input[name="user_login"]').val(getUrlParameter('user_login'));
            $currentForm.find('input[name="company_login"]').val(getUrlParameter('company_login'));
            $currentForm.find('input[name="user_email"]').val(getUrlParameter('user_email'));
            $currentForm.find('input[name="merchant_country"]').val(getUrlParameter('merchant_country'));
            $currentForm.find('input[name="merchant_currency"]').val(getUrlParameter('merchant_currency'));
            $currentForm.find('select[name="country_and_currency"]').val(
                getUrlParameter('merchant_country') + "-" + getUrlParameter('merchant_currency')); 
            
            // highlight invalid fields
            errorFields = errorFields.split(',');
            for(var i = 0; i < errorFields.length; i++) { 
                $currentForm.find(":input[name=" + errorFields[i] + "]").addClass('invalid');
                $currentForm.find("label[for=" + errorFields[i] + "]").addClass('invalid');
            }
            
            $statusParagraph.html("<strong>Account creation failed.</strong>");
            $statusParagraph.append("<br> " + errorMessage); 
            $statusDiv.removeClass('hidden success notice');
            $statusDiv.addClass('error');

        // otherwise, unexpected values returned in url: 
        } else {
            $statusParagraph.html("Unexpected response. Please try again.");
            $statusDiv.removeClass('hidden success notice');
            $statusDiv.addClass('error');
        }
    } 
});