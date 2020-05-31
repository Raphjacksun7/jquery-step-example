$(function(){
	$("#wizard").steps({
        headerTag: "h4",
        bodyTag: "section",
        transitionEffect: "fade",
        enableAllSteps: true,
        transitionEffectSpeed: 500,
        onStepChanging: function (event, currentIndex, newIndex) { 
            if ( newIndex === 1 ) {
                $('.steps ul').addClass('step-2');
            } else {
                $('.steps ul').removeClass('step-2');
            }
            if ( newIndex === 2 ) {
                $('.steps ul').addClass('step-3');
            } else {
                $('.steps ul').removeClass('step-3');
            }

            if ( newIndex === 3 ) {
                $('.steps ul').addClass('step-4');
                $('.actions ul').addClass('step-last');
            } else {
                $('.steps ul').removeClass('step-4');
                $('.actions ul').removeClass('step-last');
            }
            return true; 
        },
        labels: {
            finish: "Validate",
            next: "Next",
            previous: "Previous"
        }
    });

    // Custom Button of upload 
    
    $.fn.fileUploader = function (filesToUpload) {
        this.closest(".files").change(function (evt) {

            for (var i = 0; i < evt.target.files.length; i++) {
                filesToUpload.push(evt.target.files[i]);
            };
            var output = [];

            for (var i = 0, f; f = evt.target.files[i]; i++) {
                var removeLink = "<a class=\"removeFile\" href=\"#\" data-fileid=\"" + i + "\">Remove</a>";

                output.push("<li><strong>", escape(f.name), "</strong> - ", removeLink, "</li> ");
            }

            $(this).children(".fileList")
                .append(output.join(""));
        });
    };

    var filesToUpload = [];

    $(document).on("click",".removeFile", function(e){
        e.preventDefault();
        var fileName = $(this).parent().children("strong").text();
        // loop through the files array and check if the name of that file matches FileName
        // and get the index of the match
        for(i = 0; i < filesToUpload.length; ++ i){
            if(filesToUpload[i].name == fileName){
                //console.log("match at: " + i);
                // remove the one element at the index where we get a match
                filesToUpload.splice(i, 1);
            }	
        }
        //console.log(filesToUpload);
        // remove the <li> element of the removed file from the page DOM
        $(this).parent().remove();
    });


    $("#files").fileUploader(filesToUpload);

    $("#uploadBtn").click(function (e) {
        e.preventDefault();
    });

    
    // Custom Steps Jquery Steps
    $('.wizard > .steps li a').click(function(){
    	$(this).parent().addClass('checked');
		$(this).parent().prevAll().addClass('checked');
		$(this).parent().nextAll().removeClass('checked');
    });
    // Custom Button Jquery Steps
    $('.forward').click(function(){
    	$("#wizard").steps('next');
    })
    $('.backward').click(function(){
        $("#wizard").steps('previous');
    })
    // Checkbox
    $('.checkbox-circle label').click(function(){
        $('.checkbox-circle label').removeClass('active');
        $(this).addClass('active');
    })
})

