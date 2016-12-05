$(window).bind("load", function(){
	/*------------------ START-SITE ------------------*/
	animateHome();
	/*------------------ GOOGLE-MAP ------------------*/
	myMap();

	/*--------------- SIZE OF SECTIONS ---------------*/
	var previousSection = 0;
	var sections = ['home', 'about', 'resume', 'contact'];
	var positions = {
		homeTop : 0,
		homeBootom :0,
		aboutTop : 0,
		aboutBootom : 0,
		resumeTop : 0,
		resumeBootom :0,
		contactTop : 0,
		contactBootom : 0,
	};

	for (var i = 0; i < sections.length; i++) {
		var sec = $('#'+sections[i]+'-1');
		console.log('#'+sections[i]+'-1');								/*LOGGGGGGG*/
		for (var j = 0; j < 2; j++) {
			positions[sections[j] + 'Top'] = sec.offset().top;
			positions[sections[j] + 'Bootom'] = sec.height();
		}
	}



	/*-------------------- NAV-BAR -------------------*/
	$('.menu').on('click', function(event){
		/*-------------- Focus nav btn ---------------*/
		$('.menu').removeClass('active');
		var item = $(this).addClass('active');


		var presentSection = item.attr('id').substr(-1);
		console.log(presentSection);									/*LOGGGGGGG*/
		if (previousSection < presentSection) {
			for (i = previousSection + 1, top = -768; i <= presentSection; i++, top-= 768) {
				var rowSections = $('#'+ sections[i] + ', #' + sections[i] + '-1');
				console.log(rowSections);								/*LOGGGGGGG*/
				rowSections[0].css({
					'position' : 'absolute',
					'top' : top,
					'left' : '0',
					'right' : '0'
				}).show();
				rowSections[1].css({
					'position' :'absolute',
					'top' : abs(top),
					'left' : '0',
					'right' : '0'
				});
			}
		} 
		/*else (previousSection > presentSection) {
			//TODO...
		}*/


		/*----- Set the static position -----*/
		$('.left, .right').css({
				'position' : 'absolute',
				'bottom' : '0',
				'left' : '0',
				'right' : '0'
			});





		/*----- Propertly showing single section -----*/
		var id = item.attr('href');
		$('.left' + ', ' + '.right').hide();
		//if (id.substr(1) !== 'home') {
			$(id + '1').css({
				'position' : 'absolute',
				'top' : '0',
				'left' : '0',
				'right' : '0'
			});
		//}
		$(id + ', ' + id + '-1').show();
	});
	/*---------------- SOCIAL-NETWORK ----------------*/
	$('[data-toggle="tooltip"]').tooltip();
});

function animateHome(){
	$('.name').animate({top: '0', opacity: '1'}, 'slow');
	$('.surname').animate({top: '0', opacity: '1'}, 'slow');
	setTimeout(function(){
		$('.profession').animate({left: '0', opacity: '1'}, 'slow');
		$('.social-network').animate({top: '0', opacity: '1'}, 'slow');
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
};