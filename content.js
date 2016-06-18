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


$(document).ready(function(){
	MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

	var observer = new MutationObserver(function(mutations, observer){

    $('img').each(function(index, image){
        var url = $(image).attr('src');

        var trumpcatted = $(image).attr('trumpcat');

        if(var == null or var == undefined)
        	continue;

        if($(image).attr('trumpcat', true));

        determineIfTrump(url, function(response){
        	if (response.isTrump == true){
        		$(image).attr('src', response.cat);
        	}
        	else{
        		$(image).attr("src",  url);
        	}
        }, function(){
        })

    });

	observer.observe(document, {
		subtree: true,
		attributes: true,
	});

});





$(document).ready(function() {
    $('img').each(function(index, image){
        var url = $(image).attr('src');

        determineIfTrump(url, function(response){
        	if (response.isTrump == true){
        		$(image).attr('src', response.cat);
        	}
        	else{
        		$(image).attr("src",  url);
        	}
        }, function(){
        })
    });
});