function getCurrentTabUrl(callback) {

  console.log("bro");

  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    var tab = tabs[0];
    var url = tab.url;
    console.log(url);

    callback(url);
  });
};


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
	console.log("yahan");
	getCurrentTabUrl(function(parent_url){
		MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

		var observer = new MutationObserver(function(mutations, observer){

		    $('img').each(function(index, image){

		    	console.log(parent_url);

		        var url = $(image).attr('src');

		        var trumpcatted = $(image).attr('trumpcat');

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




$(document).ready(function() {
	console.log("wahan");
	getCurrentTabUrl(function(parent_url){

	    $('img').each(function(index, image, parent_url){

	    	console.log(parent_url);

	        var url = $(image).attr('src');

	        var trumpcatted = $(image).attr('trumpcat');

	        if(trumpcatted == true)
	        	return true;

	        if($(image).attr('trumpcat', true))
	        {

		        determineIfTrump(url, function(response){
		        	if (response.isTrump == true){
		        		console.log('entered');
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
});