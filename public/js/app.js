// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function () {
	$("form, [type='submit']").submit(function (e) {
		e.preventDefault();
	});

	$("#sign-up-btn").click(function(e) {
		e.preventDefault();
		// console.log("SIGN ME UP, SCOTTY!");
		$.ajax({
			url: "/api/signup",
			data: {
				email: $("#email").val(),
				password: $("#pass").val()
			},
			method: "POST"
		}).then(data => {
			console.log(data);
		}).fail(err => {
			console.log(err);
		});
	});

	$("#sign-in-btn").click(function(e) {
		e.preventDefault();
		$.ajax({
			url: "/api/login",
			data: {
				email: $("#email").val(),
				password: $("#pass").val()
			},
			method: "POST"
		}).then(data => {
			console.log(data);
			if(data.id) {
				window.location.replace("/");
			}
		}).fail(err => {
			console.log(err);
		});
	});

	$("#Select-Location a").click(function () {
		$("#Select-Location").addClass("hide");
		$("#Select-Container").removeClass("hide");
		console.log($(this).data("location-id"))
	});

	// $("#Select-Container a").click(function () {
	// 	$("#Select-Container").addClass("hide");
	// 	$("#Select-Add").removeClass("hide");
	// 	console.log($(this).data("location-id"))
	// });

});