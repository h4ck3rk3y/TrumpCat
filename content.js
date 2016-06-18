function determineIfTrump(url, callback, errorCallback){

	var x = new XMLHttpRequest();
	x.open('POST', "https://gyani.xyz/url");
	x.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

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

	x.send(JSON.stringify({url:url}));
1
}


$(document).ready(function(){
	MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

	var observer = new MutationObserver(function(mutations, observer){

	    $('img').each(function(index, image){
	        var url = $(image).attr('src');

	        var trumpcatted = $(image).attr('trumpcat');

	        if(trumpcatted == true)
	        	return true;

	        if($(image).attr('trumpcat', true)){

		        determineIfTrump(url, function(response){
		        	console.log("tryuing " + url);
		        	if (response.isTrump == true && response.status == 200){
		        		$(image).attr('src', trumpcatted);
		        	}
		        	else{
		        		$(image).attr("src",  url);
		        	}
		        }, function(){
		        })
		    }
	    });

		observer.observe(document, {
			subtree: true,
			attributes: true,
		});

	});
});




$(document).ready(function() {
    $('img').each(function(index, image){
        var url = $(image).attr('src');

        var trumpcatted = $(image).attr('trumpcat');

        if(trumpcatted == true)
        	return true;

        if($(image).attr('trumpcat', true)){

	        determineIfTrump(url, function(response){
	        	console.log(url);
	        	if (response.isTrump == true && response.status == 200){
	        		$(image).attr('src', response.cat);
	        	}
	        	else{
	        		$(image).attr("src",  url);
	        	}
	        }, function(){
	        });
	    }
    });

});