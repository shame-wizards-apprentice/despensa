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
	$("#addFoodModal a:first-child").click(function(e) {
		e.preventDefault();
	});

	// Create new food (I think this is a form)
	$("#addFoodSubmit").click(function(e) {
		e.preventDefault();
		
		console.log($("#foodIsCheese").is(":checked"))

		$.ajax({
			url: "/api/foods/create",
			data: {
				name: $("#foodName").val(),
				brand: $("#foodBrand").val(),
				expirationDate: $("#foodExpirationDate").val(),
				isCheese: $("#foodIsCheese").is(":checked"),
				amount: $("#foodAmount").val(),
				locationId: $("[name='foodLocation']:checked").val()
			},
			method: "POST"
		}).done(data => {
			$(".avacadoAdvice").text("You've got food!")
			console.log(data);
		});
	});

	// Delete Food
	$().click(function(e) {
		$.ajax({
			url:"/api/foods/delete/:id",
		}).done(data => {
			console.log(data);
		});
	});

	// Update food(?)
	$().submit(function(e) {
		e.preventDefault();
		// console.log($("form"))
		$.ajax({
			url: "/api/theme/update/:id",
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
	$("#addLocationModal a:first-child").click(function(e) {
		e.preventDefault();
		
	});

	let locationType = "";
	$("#addLocationModal ul ul a").click(function(e) {
		// console.log($("form"))
		// e.preventDefault();
		let locationType = $(this).data("type");
		// $("#addLocationModal ul a:firstChild").text(locationType);
		console.log(locationType);
	});

	$("#addLocationSubmit").click(function() {
		$.ajax({
			url: "/api/locations/create",
			data: {
				name:$("#locationName").val(),
				type:  $("[name='locationType']:checked").val()
			},
			method: "POST"
		}).done(data => {
			$(".avacadoAdvice").text("You have a new food home!")
			console.log(data);
		});
	});

	// Delete location
	$().click(function(e) {
		$.ajax({
			url:"/api/locations/delete/:id",
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
