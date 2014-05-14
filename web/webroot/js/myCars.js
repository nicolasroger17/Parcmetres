$(document).ready(function(){
	$(".carsForm").each(function(){
		$(this).submit(function(){
			$(this).find("input[name='registrationPlate']").removeAttr("disabled");
		});
	});
});