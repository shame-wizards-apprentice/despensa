// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function () {
	$("form, [type='submit']").submit(function (e) {
		e.preventDefault();
		// console.log($("form"))
		$.ajax({
			url: "api/login",
		}).done(data => {
			console.log(data);
		});
	});

	$("#Select-Location a").click(function () {
		$("#Select-Location").addClass("hide");
		$("#Select-Container").removeClass("hide");
		console.log($(this).data("location-id"))
	});
	
	$("#Select-Container a").click(function () {
		$("#Select-Container").addClass("hide");
		$("#Select-Add").removeClass("hide");
		console.log($(this).data("location-id"))
	});

	

});