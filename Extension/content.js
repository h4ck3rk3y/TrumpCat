
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


chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse){

		var parent_url = request.link;
		sendResponse({message: "thanksbro"});

		$(document).ready(function() {

		    $('img').each(function(index, image){

		        var url = $(image).attr('src');

		    	var parser = document.createElement('a');
		    	parser.href = url;



		    	if(url.substr(0, 2) == "//"){
		    		parser.href = parent_url;
		    		url = parser.protocol + url;
		    	}
		    	else if (url.substr(0,1) == "/")
		    	{
		    		url = parser.protocol + "//" + parser.hostname + parser.pathname;
		    	}


		        var trumpcatted = $(image).attr('trumpcat');
				console.log(url);

		        if(trumpcatted == true)
		        	return true;

		        if($(image).attr('trumpcat', true))
		        {

			        determineIfTrump(url, function(response){
			        	if (response.isTrump == true){
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

		$(document).ready(function(){

			MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

			var observer = new MutationObserver(function(mutations, observer){

			    $('img').each(function(index, image){

			        var url = $(image).attr('src');
			    	var parser = document.createElement('a');
			    	parser.href = url;

			    	if(url.substr(0, 2) == "//"){
			    		parser.href = parent_url;
			    		url = parser.protocol + url;
			    	}
			    	else if (url.substr(0,1) == "/")
			    	{
			    		url = parser.protocol + "//" + parser.hostname + parser.pathname;
			    	}

			        var trumpcatted = $(image).attr('trumpcat');
			        console.log(url);

			        if(trumpcatted == true)
			        	return true;

			        if($(image).attr('trumpcat', true))
			        {

				        determineIfTrump(url, function(response){
				        	if (response.isTrump == true){
				        		$(image).attr('src', trumpcatted);
				        	}
				        	else{
				        		$(image).attr("src",  url);
				        	}
				        }, function(){
				        });
				    }
			    });

				observer.observe(document, {
					subtree: true,
					attributes: true,
				});

			});

		});
});