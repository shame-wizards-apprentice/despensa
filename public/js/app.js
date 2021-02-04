// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {

	$(".tabs-title:first-child, .tabs-panel:first-child").addClass("is-active");

	// $(".accordion-title").click(function() {
	// 	if($(this).parents(".accordion-item").hasClass('is-active')) {
	// 		$(this).parents(".accordion-item").removeClass("is-active");
	// 		$(this).siblings(".accordion-content").hide();
	// 	}
	// });

	$("#headerAva").click(function() {
		$.ajax({
			url: "/api/advice",
			method: "GET"
		}).done(data => {
			console.log(data);
			$(".quote").html(data.content);
		}).fail(err => {
			console.log(err);
		})
	});

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
	$("#sign-up-btn").click(function (e) {
		console.log("SIGN ME UP SCOTTY");
		e.preventDefault();
		// console.log($("form"))
		$.ajax({
			url: "/api/signup",
			data: {
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
	$("#sign-in-btn").click(function (e) {
		e.preventDefault();
		// console.log($("form"))
		$.ajax({
			url: "/api/login",
			data: {
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

	$("#signOut").click(function(e) {
		e.preventDefault();

		$.ajax({
			url: "/api/users/signout",
			method: "GET"
		}).done(data => {
			window.location.replace("/");

		}).fail(err => {
			console.log(err);
		})
	});

	$(".dropdown.menu a:first-child").click(function (e) {
		e.preventDefault();
	});

	// ** CHANGE THEME **
	$("#optionsModal .dropdown .submenu a").click(function (e) {
		e.preventDefault();

		console.log($(this).data('id'));

		$.ajax({
			url: "/api/users/update",
			data: {
				username: null,
				email: null,
				password: null,
				ThemeId: $(this).data("id")
			},
			method: "PUT"
		}).done(data => {
			console.log(data);
			window.location.replace("/")

		}).fail(err => {
			console.log(err);
		});
	});

	$("#addFoodModal .close").click(function() {
		window.location.replace("/");
	});

	// **foodCONTROLLER Events**
	$("#addFoodModal a:first-child").click(function (e) {
		e.preventDefault();
	});

	// Create new food (I think this is a form)
	$("#addFoodSubmit").click(function (e) {
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
			$(".avocadoAdvice").removeClass("hide").text("You've got food!")
			console.log(data);
		});
	});

	// Delete Food
	$(".delete-food").click(function (e) {
		let foodid = $(this).data("foodid");

		$.ajax({
			url: `/api/foods/delete/${foodid}`,
			method: "DELETE"
		}).done(data => {
			$(this).parents("li.food").remove();
		});
	});

	// Update food(?)
	$(".move-food").click(function (e) {
		e.preventDefault();

		let foodid = $(this).data("foodid");
		let listid = $(this).parents("#location-menu").find(".list").data("locationid");

		console.log(foodid, listid);

		let foodObj = {
			name: null,
			brand: null,
			amount: null,
			isCheese: null,
			expirationDate: null,
			LocationId: listid
		};

		$.ajax({
			url: `/api/foods/update/${foodid}`,
			data: foodObj,
			method: "PUT"
		}).done(data => {
			// console.log(data);
			window.location.replace("/")
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
	$("#menuModal a:first-child").click(function (e) {
		e.preventDefault();

	});

	let locationType = "";
	$("#menuModal ul ul a").click(function (e) {
		// console.log($("form"))
		// e.preventDefault();
		let locationType = $(this).data("type");
		// $("#addLocationModal ul a:firstChild").text(locationType);
		console.log(locationType);
	});

	$("#addLocationSubmit").click(function () {
		$.ajax({
			url: "/api/locations/create",
			data: {
				name: $("#locationName").val(),
				type: $("[name='locationType']:checked").val()
			},
			method: "POST"
		}).done(data => {
			$(".avocado").text("You have a new food home!")
			console.log(data);
		});
	});

	// Delete location
	// $().click(function(e) {
	// 	$.ajax({
	// 		where:{

	// 		}
	// 		url:"/api/locations/delete/:id",
	// 		data: {
	// 			name:$("#foodName").val(),
	// 			type:  $("[name='locationType']:checked").val()
	// 		},
	// 		method: "POST"
	// 	}).done(data => {
	// 		console.log(data);
	// 	});
	// });

	// **adviceCONTROLLER Events**
	// Get Advice
	// $().click(function(e) {
	// 	$.ajax({
	// 		url:"/api/advice",
	// 	}).done(data => {
	// 		console.log(data);
	// 	});
	// });

	// Create Advice
	// $().submit(function(e) {
	// 	// console.log($("form"))
	// 	e.preventDefault();
	// 	$.ajax({
	// 		url:"/api/advice/create",
	// 	}).done(data => {
	// 		console.log(data);
	// 	});
	// });
});
