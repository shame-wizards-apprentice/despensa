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
});
