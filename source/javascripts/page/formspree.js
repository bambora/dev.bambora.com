$(function() {

    // Handle formspree form submission (Asynchronous)
    $('.formspree-form').submit(function(e) { 
        e.preventDefault();

        var $currentForm = $(this); 
        var toEmail = $currentForm.find('input[name="_to"]').val();
        var replyEmail = $currentForm.find('input[name="_replyto"]').val();

        var $statusDiv = $currentForm.next('.block-highlight');
        var $statusParagraph = $statusDiv.find('p');

        // pre-validation (form dependent)
        if(($currentForm).attr('id') == 'requestSproutSDK_form') {
            if(!$currentForm.find('input[name="android"]').is(":checked") && 
                !$currentForm.find('input[name="iOS"]').is(":checked")) { 
                
                $statusParagraph.html("Please choose Android and/or iOS");
                $statusDiv.removeClass('hidden success error');
                $statusDiv.addClass('notice');
                return; // invalid form, don't continue submit
            }
        }

        $.ajax({
            url: '//formspree.io/' + toEmail,
            method: 'post',
            data: $(this).serialize(),
            dataType: 'json',
            beforeSend: function() {
                $statusParagraph.html("Sending message...");
                $statusDiv.removeClass('hidden success error');
                $statusDiv.addClass('notice');
            },
            success: function(data) {
                $statusParagraph.html("Message sent!");
                $statusDiv.removeClass('hidden notice error');
                $statusDiv.addClass('success');

                $currentForm.find(":input").prop('disabled', true); // disable form on success
            },
            error: function(err) {
                $statusParagraph.html("Oops, there was an error.");
                $statusDiv.removeClass('hidden notice success');
                $statusDiv.addClass('error');            
            }
        });    
    });
});