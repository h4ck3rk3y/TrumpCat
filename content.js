function determineIfTrump(url, callback, errorCallback){

	var x = new XMLHttpRequest();
	x.open('GET', "https://ec2-52-50-209-51.eu-west-1.compute.amazonaws.com/" + url);
	x.responseType = 'json';

	x.onload = function(){
		var response = x.response;

		if(!response){
			errorCallback();
		}

		callback(response);
	}

	x.onerror = function(){
		errorCallback();
	}

	x.send();
1
}

$(document).bind("DOMSubtreeModified", function() {
    $('img').each(function(index, image){
        var url = $(image).attr('src');

        var original_style = $(image).attr("style");
        console.log(original_style);
        $(image).attr("style", original_style + " background:url(" + url + ")");
        $(image).attr("src", chrome.extension.getURL("hourglass.gif"));

        determineIfTrump(url, function(response){
        	if (response.isTrump == true){
        		$(image).attr('src', response.cat);
        	}
        	else{
        		$(image).attr("src",  url);
        	}
        	$(image).attr("style", original_style);
        }, function(){

        	$(image).attr("style", original_style);
        	$(image).attr("src", url);
        })
    });
});