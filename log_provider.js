
exports.LogProvider = function (mongo) {
    this.mongo = mongo;
};
exports.LogProvider.prototype = {
    find: function (id, callback) {
        
        callback();
    },
    save: 
    	function (ip, user_agent, url, stack_trace, 
	    		  dump_app, dump_dom, callback) {
    		this.mongo.collection('logs', function(error, collection) {
    			collection.insert(
	    		{ 	ip: ip, 
		    		uagent: user_agent, 
		    		url: url, 
		    	  	stack: stack_trace, 
		    	  	dmp_dom: dump_dom,
		    	  	dmp_app: dump_app
		    	}, 
		    	function(error, doc) {
		    		callback(null,{
		    			ip: doc.ip, 
		    			user_agent: doc.uagent, 
		    			url: doc.url, 
		    	  		stack_trace: doc.stack, 
		    	  		dump_application: doc.dmp_app,
		    	  		dump_dom: doc.dmp_dom 
		    		});	  	
		    	});
    		});
    		
    }
};
