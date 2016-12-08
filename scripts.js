/*----------------------- VARIABLES ------------------*/
var previousSection = 0;


var sections = ['home', 'about', 'resume', 'contact'];

$(window).bind("load", function(){
	animateHome();
	myMap();
	/*-------------------- NAV-BAR -------------------*/
	$('.menu').on('click', function(e){
		e.preventDefault();
		var left = false;
		$('.menu').removeClass('active');
		var item = $(this).addClass('active');

		var presentSection = parseInt(item.attr('id').substr(-1));	

		if (presentSection === previousSection)
			return false; 

		//clearAll(left);
		console.log('previousSection ' + previousSection + ', presentSection ' + presentSection);
		console.log('mnożnik ' + Math.abs(previousSection - presentSection));
		var toShow = '';
		if (previousSection < presentSection) {
			for (var i = previousSection + 1; i <= presentSection; i++)
				toShow += '#' + sections[i] + ',#' + sections[i] + '-1,';
			console.log('Change position to absolute right column '+$('#' + sections[previousSection] + '-1').attr('id')+' '+768 * Math.abs(previousSection - presentSection));
			/*$('#' + sections[previousSection] + '-1').css({
					'position' : 'absolute',
					'top' : 768 * Math.abs(previousSection - presentSection),
					'left' : '0',
					'right' : '0',
			});*/
		} else if (previousSection > presentSection) {
			for (var i = previousSection - 1; i >= presentSection; i--)
				toShow += '#' + sections[i] + ',#' + sections[i] + '-1,';
			console.log('Change position to absolute left column '+$('#' + sections[previousSection]).attr('id')+' '+768 * Math.abs(previousSection - presentSection));
			/*$('#' + sections[previousSection]).css({
					'position' : 'absolute',
					'top' : 768 * Math.abs(previousSection - presentSection),
					'left' : '0',
					'right' : '0',
			});*/
			left = true;
		}
		toShow = toShow.substr(0, toShow.length - 1);

		
		
		console.log('sections to show : ' + toShow);
		$(toShow).removeClass('disp-non');

		
		

		
		
		if(left){
			console.log('Scroll top position left section to previous: '+ $('#' + sections[previousSection]).attr('id')+ ' ' + $('#' + sections[previousSection]).position().top);
			$('.child-left').scrollTop($('#' + sections[previousSection]).position().top);
		}
		else{
			console.log('Scroll top position right section to previous: '+ $('#' + sections[previousSection] + '-1').attr('id')+ ' ' + $('#' + sections[previousSection] + '-1').position().top);
			$('.child-right').scrollTop($('#' + sections[previousSection] + '-1').position().top);
		}



		console.log('Animate to: \n  -left '+$('#' + sections[presentSection]).attr('id') + ' ' + $('#' + sections[presentSection]).position().top);
		console.log('  -right ' +$('#' + sections[presentSection]).attr('id') + ' ' + $('#' + sections[presentSection] + '-1').position().top);
		$('.child-left').stop().animate({
			scrollTop : $('#' + sections[presentSection]).position().top
		},{
			duration: 3000,
    		queue: false,
		});
		$('.child-right').stop().animate({
			scrollTop : $('#' + sections[presentSection] + '-1').position().top
		},{
			duration: 3000,
    		queue: false,
    		complete: function(){
			//$('.child-right').css('overflow-y', 'hidden');
						var toHide = '';
						for (var i = 0; i < sections.length; i++)
						if(i !== presentSection)
							toHide += '#' + sections[i] + ',#' + sections[i] + '-1,';
				
						toHide = toHide.substr(0, toHide.length - 1);
						$(toHide).addClass('disp-non');
					}
		});

		
		previousSection = presentSection;

		return false;
	});
	/*---------------- SOCIAL-NETWORK ----------------*/
	$('[data-toggle="tooltip"]').tooltip();
	return false;
});

function clearAll(left){
	if(left) {
				$('#' + sections[previousSection]).css({
					'position' : 'static',
					'height' : 768
				});
			}
			else
				$('#' + sections[previousSection] + '-1').css({
					'position' : 'static',
					'height' : 768
				});


			var toHide = '';
			for (var i = 0; i < sections.length; i++)
				if(i !== presentSection)
					toHide += '#' + sections[i] + ',#' + sections[i] + '-1,';
			toHide = toHide.substr(0, toHide.length - 1);
			$(toHide).hide();
			$('.child-left, .child-left').scrollTop(0);
}

function animateHome(){
	$('.name, .surname').animate({top: '0', opacity: '1'}, 'slow');
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