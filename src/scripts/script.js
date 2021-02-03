// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
  $("form, [type='submit']").submit(function(e) {
  	e.preventDefault();
  	// console.log($("form"))
  	$.ajax({
  		url: "api/login",
  	}).done(data => {
  		console.log(data);
  	});
  });

  // **userCONTROLLER Events**
	// Sign Up
	$().submit(function(e) {
		e.preventDefault();
		// console.log($("form"))
		$.ajax({
			url: "/api/signup",
		}).done(data => {
			console.log(data);
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
