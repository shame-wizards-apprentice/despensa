// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
	console.log("app.js loaded");
  $("form").submit(function(e) {
  	e.preventDefault();
  	// console.log($("form"))
  	// $.ajax({
  	// 	url: "api/login",
  	// }).done(data => {
  	// 	console.log(data);
  	// });
  });

  // **userCONTROLLER Events**
	// Sign Up
	$("#sign-up-btn").click(function(e) {
		console.log("SIGN ME UP SCOTTY");
		e.preventDefault();
		// console.log($("form"))
		$.ajax({
			url: "/api/signup",
			data:{
				email: $("#email").val(),
				password: $("#pass").val()
			},
			method: "POST"
		}).done(data => {
			console.log(data);
			window.location.replace("/")
		}).fail(err => {
			console.log(err);
		});
	});

	// Sign Up
	$("#sign-in-btn").click(function(e) {
		e.preventDefault();
		// console.log($("form"))
		$.ajax({
			url: "/api/login",
			data:{
				email: $("#email").val(),
				password: $("#pass").val()
			},
			method: "POST"
		}).done(data => {
			console.log(data);
			window.location.replace("/")
		}).fail(err => {
			console.log(err);
		});
	});

	// **foodCONTROLLER Events**

	// Create new food (I think this is a form)
	$().submit(function(e) {
		e.preventDefault();
		// console.log($("form"))
		$.ajax({
			url: "api/foods/create",
		}).done(data => {
			console.log(data);
		});
	});

	// Delete Food
	$().click(function(e) {
		$.ajax({
			url:"api/foods/delete/:id",
		}).done(data => {
			console.log(data);
		});
	});

	// Update food(?)
	$().submit(function(e) {
		e.preventDefault();
		// console.log($("form"))
		$.ajax({
			url: "api/theme/update/:id",
		}).done(data => {
			console.log(data);
		});
	});

	// **themesController Events**
	// $().click(function(e) {
	// 	$.ajax({
	// 		url:"api/themes/update",
	// 	}).done(data => {
	// 		console.log(data);
	// 	});
	// });

	// **locationController Events**

	// add Location
	$().submit(function(e) {
		// console.log($("form"))
		e.preventDefault();
		$.ajax({
			url:"api/locations/create",
		}).done(data => {
			console.log(data);
		});
	});

	// Delete location
	$().click(function(e) {
		$.ajax({
			url:"api/locations/delete/:id",
		}).done(data => {
			console.log(data);
		});
	});

	// **adviceCONTROLLER Events**

	// Get Advice
	$().click(function(e) {
		$.ajax({
			url:"/api/advice",
		}).done(data => {
			console.log(data);
		});
	});

	// Create Advice

	$().submit(function(e) {
		// console.log($("form"))
		e.preventDefault();
		$.ajax({
			url:"/api/advice/create",
		}).done(data => {
			console.log(data);
		});
	});
});
