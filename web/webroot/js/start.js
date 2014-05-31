$(document).ready(function(){
	getAddress();
});

function getAddress(){
	$.ajax({
	    type: "GET",
	    url: "https://maps.googleapis.com/maps/api/geocode/json?latlng="+$("input[name='locationX']").val()+","+$("input[name='locationY']").val()+"&sensor=true",
	    success: function(data) {
	    	$("#position").html(data['results'][0]['formatted_address']);
	    }
	});
}