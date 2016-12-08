/*----------------------- VARIABLES ------------------*/
var previousSection = 0;
var sections = ['home', 'about', 'resume', 'contact'];

$(window).bind("load", function(){
	animateHome();
	myMap();

	/*-------------------- NAV-BAR -------------------*/
	$('.menu').on('click', function(e){
		e.preventDefault();

		// Activ nav-btn
		$('.menu').removeClass('active');
		var item = $(this).addClass('active');

		/*------------ Animated crossing--------------*/
		var leftFlag = false;
		var presentSection = parseInt(item.attr('id').substr(-1));	

		if (previousSection === presentSection) return false; 
		else if (previousSection > presentSection) leftFlag = true;

		//Selected sections to show
		$(sectionsToShow(previousSection, presentSection)).removeClass('disp-non');

		//Scroling needed section position
		if(leftFlag) $('.child-left').scrollTop($('#' + sections[previousSection]).position().top);
		else $('.child-right').scrollTop($('#' + sections[previousSection] + '-1').position().top);

		//Animated crossing sections
		animateSections(presentSection);

		previousSection = presentSection;
		return false;
	});
	/*---------------- SOCIAL-NETWORK ----------------*/
	$('[data-toggle="tooltip"]').tooltip();
	return false;
})

function sectionsToShow(prev, pres){
	var show = '';
	if (prev < pres)
		for (var i = prev + 1; i <= pres; i++)
			show += '#' + sections[i] + ',#' + sections[i] + '-1,';
		else if (prev > pres)
			for (var i = prev - 1; i >= pres; i--)
				show += '#' + sections[i] + ',#' + sections[i] + '-1,';
	return show.substr(0, show.length - 1);
}

function sectionsToHide(pres){
	var hide = '';
	for (var i = 0; i < sections.length; i++)
		if(i !== pres)
			hide += '#' + sections[i] + ',#' + sections[i] + '-1,';
	return hide.substr(0, hide.length - 1);
}

function animateSections(pres){
	//Asynchronous animated crossing sections
	$('.child-left').stop().animate({
		scrollTop : $('#' + sections[pres]).position().top
	},{
		duration: 1000,
		queue: false
	});
	$('.child-right').stop().animate({
		scrollTop : $('#' + sections[pres] + '-1').position().top
	},{
		duration: 1000,
		queue: false,
		complete: function(){
			//Hiding sections out of screen
			$(sectionsToHide(pres)).addClass('disp-non');
		}
	});
}

function animateHome(){
	$('.name, .surname').animate({
		top: '0',
		opacity: '1'
	},{
		duration: 'slow',
		queue: false
	});
	setTimeout(function(){
		$('.profession').animate({
			left: '0',
			opacity: '1'
		},{
			duration :'slow',
			queue : false
		});
		$('.social-network').animate({
			top: '0',
			opacity: '1'
		},{
			duration :'slow',
			queue : false});
	}, 500);
}

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
}