$(window).bind("load", function(){
	/*---------------- START-ANIMATE -----------------*/
	$('.name').animate({top: '0', opacity: '1'}, 'slow');
	$('.surname').animate({top: '0', opacity: '1'}, 'slow');
	setTimeout(function(){
		$('.profession').animate({left: '0', opacity: '1'}, 'slow');
		$('.social-network').animate({top: '0', opacity: '1'}, 'slow');
	}, 500);
	/*------------------ GOOGLE-MAP ------------------*/
	myMap();
	/*-------------------- NAV-BAR -------------------*/
	$('.menu').click(function(){
		$('.menu').removeClass('active');
		var item = $(this).addClass('active');
		$('.section').hide();
		$(item.attr('href') + ', ' + item.attr('href') + '-1').show();
	});
	/*---------------- SOCIAL-NETWORK ----------------*/
	$('[data-toggle="tooltip"]').tooltip();
});

function myMap() {
	var myPosition = new google.maps.LatLng(50.042572,19.928030000000035);
	var mapCanvas = document.getElementById("map");
	var mapOptions = {
		center: myPosition,
		zoom: 15
	};
	var map = new google.maps.Map(mapCanvas, mapOptions);
	var marker = new google.maps.Marker({position : myPosition});
	marker.setMap(map);
	var infowindow = new google.maps.InfoWindow({content : 'I live here :)'});
	infowindow.open(map, marker);
};