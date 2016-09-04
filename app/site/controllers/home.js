(function(){
	angular
		.module('myApp')
		.controller('HomeCtrl', HomeCtrl);

	function HomeCtrl ($scope, $location, auth) {
		var homeVm = this;

		var shown = [false,false,false,false,false,false,false,false]

		homeVm.showAnswer = showAnswer;

		function showAnswer(id,icon){
			if (shown[id-1] === false) {
				$('#'+id).slideDown()
				shown[id-1] = true
			}
			else if (shown[id-1] === true) {
				$('#'+id).slideUp()
				shown[id-1] = false
			}
			$('#'+icon).toggleClass('rotate-90');
		}


		window.sr = ScrollReveal();
		sr.reveal()
		// sr.reveal('.scroll_up',{duration: 1000, distance: '100px', delay: 200},250)		
		// sr.reveal('.scroll_left',{origin: 'left',duration: 2000, distance: '400px'},500)
		// sr.reveal('.scroll_left_img',{origin: 'left',duration: 2000, distance: '400px'},500)
		// sr.reveal('.scroll_right',{origin: 'right',duration: 2000, distance: '400px'},500)
		// sr.reveal('.scroll_up_faq',{duration: 1000, distance: '100px', delay: 200},50)

		var navPosition;
		var aboutPosition;
		var howWePosition;
		var timelinePosition;
		var faqPosition;
		var closeAbout;
		var closeHowWe;
		var closeTimeline;
		var closeFaq;

		function getOffsets() {
			navPosition = $('#nav_follow_container').offset();
			aboutPosition = $('#about_us_section').offset();
			howWePosition = $('#how_we_section').offset();
			timelinePosition = $('#timeline_section').offset();
			faqPosition = $('#faq_section').offset();
			closeAbout = $('#close_about_us_section').offset();
			closeHowWe = $('#close_how_we_section').offset();
			closeTimeline = $('#close_timeline_section').offset();
			closeFaq = $('#close_faq_section').offset();			
		}

		getOffsets();

		$(window).resize(function() {
			getOffsets();
		})

		$(window).scroll(function(){
			// navbar
	        if($(window).scrollTop() > navPosition.top){
	              $('#secondNav').css({'position':'fixed', 'top':'0px'});
	              $('.follow_btn').show()
	        } else {
	            $('#secondNav').css('position','relative');
	        } 
	        // second navbar
	        // about us
	        if($(window).scrollTop() > aboutPosition.top-21){
	            $('.about_us').show();
	            $('#about_us').css('color','#00A7E1')
	            
	        } else {
	            $('.about_us').hide();
	            $('#about_us').css('color','#455A64')
	        }

		        if($(window).scrollTop() > closeAbout.top-21){
					$('.about_us').hide();
		            $('#about_us').css('color','#455A64')
		        }
		    // how we help
	        if($(window).scrollTop() > howWePosition.top-21){
	            $('.how_we').show();
	            $('#how_we').css('color','#00A7E1')
	            
	        } else {
	            $('.how_we').hide();
	            $('#how_we').css('color','#455A64')
	        }

		        if($(window).scrollTop() > closeHowWe.top-21){
					$('.how_we').hide();
		            $('#how_we').css('color','#455A64')
		        }
		    // timeline
	        if($(window).scrollTop() > timelinePosition.top-21){
	            $('.timeline').show();
	            $('#timeline').css('color','#00A7E1')
	            
	        } else {
	            $('.timeline').hide();
	            $('#timeline').css('color','#455A64')
	        }

		        if($(window).scrollTop() > closeTimeline.top-21){
					$('.timeline').hide();
		            $('#timeline').css('color','#455A64')
		        }
		    // faq
	        if($(window).scrollTop() > faqPosition.top-21){
	            $('.faq').show();
	            $('#faq').css('color','#00A7E1')
	            
	        } else {
	            $('.faq').hide();
	            $('#faq').css('color','#455A64')
	        }

		        if($(window).scrollTop() > closeFaq.top-21){
					$('.faq').hide();
		            $('#faq').css('color','#455A64')
		        }
		});

		
		$('a[href^="#"]').on('click', function(event) {

			if ($(this).hasClass('follow_a') || $(this).hasClass('follow_selected_a') == true) {
				$(this).removeClass('follow_a').addClass('follow_selected_a')
				$(this).siblings().removeClass('follow_selected_a').addClass('follow_a')
			}


			var target = $(this.getAttribute('href'))

			if (target.length) {
				event.preventDefault();
				$('body').stop().animate({
					scrollTop: target.offset().top-20
				}, 1000)
			}
		})


	}
})()
