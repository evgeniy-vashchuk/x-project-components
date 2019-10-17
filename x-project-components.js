(function ($) {

'use strict';

// =========================
// PRELOADER =================================
// =========================

function hidePreloader(preloaderItem, hideTimeout) {
	// hide preloader by click
	preloaderItem.on('click', function() {
		$(this).fadeOut('slow');
	});

	$(window).on('load', function() {
		// hide preloader
		setTimeout(function() {
			preloaderItem.fadeOut('slow');
		}, hideTimeout);
	});
}

hidePreloader($('.js-preloader'), 1000);

$(document).ready(function() {

	// =========================
	// SVG ANIMATION =================================
	// =========================

	function svgAnimation(svgItem, duration) {
		$(svgItem).addClass('-animation-init');

		new Vivus(svgItem, {
			duration: duration,
			type: 'oneByOne'
		});
	}

	function svgAnimationOnScroll() {
		var svgItem = $('.js-svg-animation-item');

		if (svgItem.length) {
			svgItem.waypoint({
				handler: function() {
					if (!this.element.svgAnimationInit) {
						this.element.svgAnimationInit = true;

						svgAnimation(this.element, 300)
					}
				},
				offset: '80%'
			})
		}
	}

	svgAnimationOnScroll();

	// =========================
	// COUNT UP =================================
	// =========================

	function countUpNumbers(countUpItem, duration) {
		var countNumber = $(countUpItem).attr('data-count-number'),
				numbersAfterComma = 0;

		if (countNumber.indexOf('.') > 0) {
			numbersAfterComma = countNumber.length - (countNumber.indexOf('.') + 1);
		}

		var options = {
			useEasing: true,
			decimal: '.',
			suffix: '%'
		};

		new CountUp(countUpItem, 0, countNumber, numbersAfterComma, duration/1000, options).start();
	}

	function countUpNumbersOnScroll() {
		var countUpItem = $('.js-count-up-item');

		if (countUpItem.length) {
			countUpItem.waypoint({
				handler: function() {
					if (!this.element.countUpInit) {
						this.element.countUpInit = true;

						countUpNumbers(this.element, 4000);
					}
				},
				offset: '80%'
			})
		}
	}

	countUpNumbersOnScroll();

	// =========================
	// PROGRESS BARS =================================
	// =========================

	function progressBars(progressBarsBlock, duration) {
		var progressBarItem = $(progressBarsBlock).find('.js-progress-bar-item');

		progressBarItem.each(function() {
			var progressBarsFillItem = $(this).find('.js-progress-bar-strip'),
					progressBarsCountUpItem = $(this).find('.js-progress-bar-percent'),
					progressBarPercent = progressBarsCountUpItem.attr('data-progress-percent');

			// progress bar fill animation
			progressBarsFillItem.animate({
				width: progressBarPercent + '%'
			}, duration, 'swing');

			// count up animation
			var options = {
				useEasing: false,
				decimal: '.',
				suffix: '%'
			};

			// find amount of numbers after the decimal point
			var numbersAfterComma = 0;

			if (progressBarPercent.indexOf('.') > 0) {
				numbersAfterComma = progressBarPercent.length - (progressBarPercent.indexOf('.') + 1);
			}

			var countUpElement = progressBarsCountUpItem.get(0),
					numAnim = new CountUp(countUpElement, 0, progressBarPercent, numbersAfterComma, duration/1000, options);

			numAnim.start();
		});
	}

	function progressBarsOnScroll() {
		var progressBarsBlock = $('.js-progress-bars');

		if (progressBarsBlock.length) {
			progressBarsBlock.waypoint({
				handler: function() {
					if (!this.element.progressBarsInit) {
						this.element.progressBarsInit = true;

						progressBars(this.element, 4000);
					}
				},
				offset: '80%'
			})
		}
	}

	progressBarsOnScroll();

	// =========================
	// SHUFFLE FILTER =================================
	// =========================

	function filterInit() {
		var filterContainer = $('.js-filter-container');

		if (filterContainer.length) {
			var filterContent = filterContainer.find('.filter-content'),
					filterNav = filterContainer.find('.filter-nav'),
					filterCategoryName = '',
					shuffle = window.shuffle;

			var myShuffle = new Shuffle(filterContent, {
				speed: 400,
				easing: 'ease',
			});

			myShuffle.update();

			// filtering by click
			filterNav.find('a').on('click', function() {

				filterNav.find('a').removeClass('-active');
				$(this).addClass('-active');
				filterCategoryName = $(this).attr('data-group');

				myShuffle.filter(filterCategoryName, shuffle);

				myShuffle.update();

			});
		}
	}

	filterInit();

	// =========================
	// SMALL HEADER AFTER SCROLL =================================
	// =========================

	function smallHeaderAfterScroll(distanceY) {
		var header = $('.js-header');

		$(window).on('scroll', function() {
			if ($(this).scrollTop() > distanceY) {
				header.addClass('-small-header');
			} else {
				header.removeClass('-small-header');
			}
		});

		if ($(document).scrollTop() > distanceY) {
			header.addClass('-small-header');
		}
	}

	smallHeaderAfterScroll(1);

	// =========================
	// STICKY FOOTER =================================
	// =========================

	function stickyFooter() {
		// 1) height of footer
		var footerHeight = $('.js-footer').outerHeight();

		// 2) compensation
		$('.js-wrap-for-sticky').css({
			'padding-bottom': footerHeight
		});
	}

	stickyFooter();

	$(window).on('resize', function() {
		stickyFooter();
	});

	// =========================
	// SCROLL TOP BUTTON =================================
	// =========================

	function showHideScrollTopBtn(distance) {
		var scrollTopBtn = $('.js-scroll-top-btn');

		$(window).on('scroll', function() {
			if ($(this).scrollTop() > distance) {
				scrollTopBtn.addClass('-show');
			} else {
				scrollTopBtn.removeClass('-show');
			}
		});

		if ($(document).scrollTop() > distance) scrollTopBtn.addClass('-show');
	}

	function scrollTopAnimation() {
		var scrollTopBtn = $('.js-scroll-top-btn'),
				scrollingComplete = true;

		scrollTopBtn.on('click', function() {

			if (scrollingComplete) {
				scrollingComplete = false;

				$('body, html').animate({
					scrollTop: 0
				}, 1000 ).promise().done(function() {
					scrollingComplete = true;
				});

				return false;
			}
		});
	}

	function scrollTopBtn() {
		// 1) checking the distance from the top of the page
		showHideScrollTopBtn(100);
		// 2) сlick event to scroll top
		scrollTopAnimation();
	}

	scrollTopBtn();

	// =========================
	// SCROLL TO ELEMENT =================================
	// =========================

	function scrollToElement() {
		var animationComplete = true;

		$('a[href^="#"]:not(.js-no-scroll)').on('click', function(e) {
			e.preventDefault();

			// height of header (for offset)
			var headerOffset = $('.js-header').outerHeight(),
					idOfElement = $(this).attr('href');

			if (headerOffset === undefined) {
				headerOffset = 0;
			}

			var top = $(idOfElement).offset().top - headerOffset;

			if (animationComplete) {
				animationComplete = false;

				$('body, html').animate({
					scrollTop: top
				}, 1000 ).promise().done(function() {
					animationComplete = true;
				});
			}
		});
	}

	scrollToElement();

	// =========================
	// WIDTH OF SCROLLBAR =================================
	// =========================

	var widthOfScrollbar;

	function getScrollBarWidth() {
		if (window.innerWidth > $(window).width()) {
			var $outer = $('<div>').css({visibility: 'hidden', width: 100, overflow: 'scroll'}).appendTo('body'),
					widthWithScroll = $('<div>').css({width: '100%'}).appendTo($outer).outerWidth();
			$outer.remove();
			widthOfScrollbar = 100 - widthWithScroll;
			return 100 - widthWithScroll;
		} else {
			return widthOfScrollbar = 0;
		}
	}

	getScrollBarWidth();

	$(window).on('resize', function() {
		getScrollBarWidth();
	});

	function addScrollbarCompensation(element) {
		element.css('padding-right', widthOfScrollbar);
	}

	function removeScrollbarCompensation(element) {
		element.css('padding-right', 0);
	}

	// example
	addScrollbarCompensation($('.element-one, .element-two'));

	removeScrollbarCompensation($('.element-one, .element-two'));

	// =========================
	// STANDARD GOOGLE MAP =================================
	// =========================

	function initMap() {
		var mapBlock = $('.js-map');

		if (!mapBlock.length) return;

		var coordinates = new google.maps.LatLng(40.712348, -74.006720),
		zoom = 12;

		var map = new google.maps.Map(mapBlock.get(0), {
			center: coordinates,
			zoom: zoom,
			disableDefaultUI: true,
			zoomControl: true,
			fullscreenControl: true,
			zoomControlOptions: {
				position: google.maps.ControlPosition.RIGHT_CENTER
			},

			// OPTIONAL - styles for theme (https://snazzymaps.com)
			// minify code (https://www.minifier.org)

			// styles: [{"featureType":"administrative","elementType":"all","stylers":[{"saturation":"-100"}]},{"featureType":"administrative.province","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"all","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","elementType":"all","stylers":[{"saturation":-100},{"lightness":"50"},{"visibility":"simplified"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":"-100"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"all","stylers":[{"lightness":"30"}]},{"featureType":"road.local","elementType":"all","stylers":[{"lightness":"40"}]},{"featureType":"transit","elementType":"all","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]},{"featureType":"water","elementType":"labels","stylers":[{"lightness":-25},{"saturation":-100}]}]
		});

		// OPTIONAL - custom icon
		var icon = {
			url: '../img/svg/icon_map_marker.svg',
			scaledSize: new google.maps.Size(50, 50)
		};

		var marker = new google.maps.Marker({
			position: coordinates,
			map: map,

			// OPTIONAL - animation of marker
			// animation: google.maps.Animation.BOUNCE,

			// OPTIONAL - text on marker hover
			// title: 'text on hover',

			// OPTIONAL - custom icon from png or svg
			// icon: icon
		});

		// OPTIONAL - add info window
		var infoWindow = new google.maps.InfoWindow({
			content: '<p>Info window</p>'
		});

		// show info window after click
		/*marker.addListener('click', function() {
			infoWindow.open(map, marker);
		});*/

		// show info window all time
		/*google.maps.event.addListenerOnce(map, 'tilesloaded', function() {
			infoWindow.open(map,marker);
		});*/

		// close info window after click anywhere on the map
		google.maps.event.addListener(map, 'click', function() {
			infoWindow.close();
		});
	}

	initMap();

	// =========================
	// GOOGLE MAP WITH MULTIPLE MARKER =================================
	// =========================

	function initMapMultipleMarkers() {
		var mapBlock = $('.js-map-multiple-markers');

		if (!mapBlock.length) return;

		var map = new google.maps.Map(mapBlock.get(0), {
			disableDefaultUI: true,
			zoomControl: true,
			fullscreenControl: true,
			zoomControlOptions: {
				position: google.maps.ControlPosition.RIGHT_CENTER
			}
		});

		// array of markers (with coordinates, name, address)
		var multipleMarkers = [
			{
				lat: 40.679680,
				lng: -73.942175,
				name: 'Name 1',
				address: 'Address 1'
			},
			{
				lat: 40.729391,
				lng: -74.076758,
				name: 'Name 2',
				address: 'Address 2'
			},
			{
				lat: 40.745260,
				lng: -73.997794,
				name: 'Name 3',
				address: 'Address 3'
			}
		];

		var infoWindow = new google.maps.InfoWindow();

		google.maps.event.addListener(map, 'click', function() {
			infoWindow.close();
		});

		// Determine the boundaries of the visible area of the map in accordance with the position of the markers
		var bounds = new google.maps.LatLngBounds();

		// create the markers
		for (var i = 0; i < multipleMarkers.length; i++){

			var latLng = new google.maps.LatLng(multipleMarkers[i].lat, multipleMarkers[i].lng);
			var name = multipleMarkers[i].name;
			var address = multipleMarkers[i].address;

			addMarker(latLng, name, address);

			// Expand the boundaries of our visible area by adding the coordinates of our current marker
			bounds.extend(latLng);
		}

		// Automatically scale the map so that all markers are in the visible area of the map
		map.fitBounds(bounds);

		function addMarker(latLng, name, address) {
			var marker = new google.maps.Marker({
				position: latLng,
				map: map,
				title: name
			});

			google.maps.event.addListener(marker, 'click', function() {
				var contentString = '<div class="infowindow">' +
															'<h5>' + name + '</h5>' +
															'<p>' + address + '</p>' +
														'</div>';

				infoWindow.setContent(contentString);
				infoWindow.open(map, marker);
			});
		}
	}

	initMapMultipleMarkers();

	// =========================
	// MAP WITH HTML MARKER =================================
	// =========================

	function initMapWithHtmlMarker() {
		var mapBlock = $('.js-map-with-marker');

		if (!mapBlock.length) return;

		var coordinates = new google.maps.LatLng(40.709541, -74.007984),
		zoom = 16;

		var map = new google.maps.Map(mapBlock.get(0), {
			center: coordinates,
			zoom: zoom,
			disableDefaultUI: true,
			zoomControl: false,
			fullscreenControl: false,
			styles: [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":17}]}]
		});

		// HTML MAP MARKER
		function CustomMarker(latlng, map, args) {
			this.latlng = latlng;
			this.args = args;
			this.setMap(map);
		}

		CustomMarker.prototype = new google.maps.OverlayView();

		CustomMarker.prototype.draw = function() {

			var self = this;

			var div = this.div;

			if (!div) {

				div = this.div = document.createElement('div');

				div.className = 'html-map-marker';

				if (typeof(self.args.marker_id) !== 'undefined') {
					div.dataset.marker_id = self.args.marker_id;
				}

				google.maps.event.addDomListener(div, "click", function(event) {
					// marker click
					google.maps.event.trigger(self, "click");
				});

				var panes = this.getPanes();
				panes.overlayImage.appendChild(div);
			}

			var point = this.getProjection().fromLatLngToDivPixel(this.latlng);

			var mapMarkerWidth = $('.html-map-marker').width() / 2;

			if (point) {
				div.style.left = (point.x - mapMarkerWidth) + 'px';
				div.style.top = (point.y - mapMarkerWidth) + 'px';
			}
		};

		CustomMarker.prototype.remove = function() {
			if (this.div) {
				this.div.parentNode.removeChild(this.div);
				this.div = null;
			}
		};

		CustomMarker.prototype.getPosition = function() {
			return this.latlng;
		};

		var overlay = new CustomMarker(
			coordinates,
			map,
			{
				marker_id: 'html-map-murker'
			}
		);
		// HTML MAP MARKER END
	}

	initMapWithHtmlMarker();

	// =========================
	// YOUTUBE THUMBNAIL =================================
	// =========================

	function getYouTubeVideoId(videoItem) {
		var videoThumbnailUrl = videoItem.find('.js-youtube-thumbnail-media').attr('style');

		return videoThumbnailUrl.split('/')[videoThumbnailUrl.split('/').length - 2];
	}

	function insertYouTubeIframe() {
		$('.js-youtube-thumbnail').on('click', function() {
			var youTubeIframe = $('<iframe class="youtube-thumbnail__media" allowfullscreen></iframe>');
					youTubeIframe.attr('allow', 'autoplay');
					youTubeIframe.attr('src', 'https://www.youtube.com/embed/' + getYouTubeVideoId($(this)) + '?rel=0&showinfo=0&autoplay=1');

			$(this).find('.js-youtube-thumbnail-media').remove();
			$(this).append(youTubeIframe);
		})
	}

	insertYouTubeIframe();

	// =========================
	// VIMEO THUMBNAIL =================================
	// =========================

	function getVimeoVideoId(vimeoBlock) {
		return vimeoBlock.attr('data-vimeo-url').split('/').pop();
	}

	function setVimeoThumbnailBackground(vimeoBlock) {
		$.getJSON('https://www.vimeo.com/api/v2/video/' + getVimeoVideoId(vimeoBlock) + '.json?callback=?', { format: 'json' }, function (data) {
			var thumbnailImg = data[0].thumbnail_large;
			vimeoBlock.find('.js-vimeo-thumbnail-media').css('background-image', 'url(' + thumbnailImg + ')');
		});
	}

	function setVimeoThumbnailBackgroundToAllBlocks() {
		$('.js-vimeo-thumbnail').each(function() {
			setVimeoThumbnailBackground($(this));
		});
	}

	setVimeoThumbnailBackgroundToAllBlocks();

	function insertVimeoIframe() {
		$('.js-vimeo-thumbnail').on('click', function() {
			var vimeoIframe = $('<iframe class="vimeo-thumbnail__media" allowfullscreen></iframe>');
					vimeoIframe.attr('allow', 'autoplay');
					vimeoIframe.attr('src', 'https://player.vimeo.com/video/' + getVimeoVideoId($(this)) + '?autoplay=1');

			$(this).find('.js-vimeo-thumbnail-media').remove();
			$(this).append(vimeoIframe);
		})
	}

	insertVimeoIframe();

});

}(jQuery));