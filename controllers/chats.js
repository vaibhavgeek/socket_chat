module.exports = function(app){
	
	app.get('/chat/:id' , function(req,res) {
		res.render('chat' , {data : req.params});
	});
	
}