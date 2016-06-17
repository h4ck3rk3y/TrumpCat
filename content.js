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

$(document).ready(function() {
    $('img').each(function(index, image){
    	$(image).load(function(){
    		console.log("loaded");
	        var url = $(image).attr('src');

	        var original_style = $(image).html();
	        var width = $(image).width();
	        var height= $(image).height();
	        var hourglass = chrome.extension.getURL("hourglass.gif");

	        var replacement = "<div style='width=" + width + "px; height="+height + "px; overflow:hidden;'><img style='background:url(" + url  + ");' src=" + hourglass + "></div>";
	        console.log(replacement);


	        $(image).replaceWith(replacement);

	        // $(image).attr("style", "background:url(" + url + ")");
	        // $(image).attr("src", chrome.extension.getURL("hourglass.gif"));

	        determineIfTrump(url, function(response){
	        	if (response.isTrump == true){
	        		$(image).attr('src', response.cat);
	        	}
	        	$(image).replaceWith(original_style);
	        }, function(){
	           	$(image).replaceWith(original_style);
        	})
    	});
	});
});