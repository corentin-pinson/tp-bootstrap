var Menu = (() => {
	let currentIndex = null;
	let tabs = new Array();
	let pages = new Array();

	return {
		build: function() {
			$('.nav-item', '.navbar-nav').each(function() {
				let link = $(this).children()
								  .filter('[class="nav-link"]')
								  .first();
				let index = link.attr('tab-index');
				tabs[index] = $(this);
				pages[index] = $('.page[page-index="' + index + '"]')
								  .first();
			});

			tabs.forEach(function(tab, index) {
				tab.click(function() {
					Menu.showTab(index);
				});
			});
			Menu.showTab(0);
		},
		showTab: function(newIndex) {
			currentIndex = newIndex;
			for (let tabInd in tabs) {
				let currentTab = tabs[tabInd];
				let currentPage = pages[tabInd];
				if (tabInd == currentIndex) {
					currentTab.addClass('active');
					currentPage.show();
				} else {
					currentPage.hide();
					currentTab.removeClass('active');
				}
			}
		}
	};
})();

function openPage() {
	let searchedPage = $('#form_search').val();
	let foundPage = $('[class="nav-link"][id="' + searchedPage.toLowerCase() + '"]').first();
	if (foundPage.length > 0) {
		Menu.showTab(foundPage.attr('tab-index'));
	}
	return false;
}

$(function() {
	/* Build the menu - link the buttons to the pages */
	Menu.build();

	/* Carousel indicators */
	$(".carousel-inner", "#carousel").children().each(function(ind, elem) {
		let indicator = $('<li data-target="#carousel" data-slide-to="' + ind + '"></li>');
		if (ind == 0) {
			indicator.addClass("active");
		}
		$(".carousel-indicators", "#carousel").append(indicator);
	});

	/* Pictures */
	$("#pictures-grid").children().each(function(ind, elem) {
		// Title and link
		$(this).find('p').first().text('Picture ' + (ind + 1));
		let link = $(this).find('a').first();
		link.attr('href', link.find('img').first().attr('src'));

		// Add the picture in contact form
		let option = $('<option value="#' + (ind + 1) + '">#' + (ind + 1) + '</option>');
		$("#form_picture").append(option);
	});

	/* Fare */
	$("tbody", "#table_fares").children().each(function(ind, elem) {
		// Add the fare in contact form
		let option = $('<option value="#' + (ind + 1) + '">#' + (ind + 1) + '</option>');
		$("#form_fare").append(option);
	});

	/* Send email with form */
	$("#contact-form").submit(function(event) {
		let feedback = 'Email successfully sent!' + '</br></br>';
		feedback += 'From: ' + $(this).find('#form_name').val()
				 + ' ' + $(this).find('#form_lastname').val()
				 + ' (' + $(this).find('#form_email').val() + ')' + '</br>';
		feedback += 'To: our_email@our_museum.com' + '</br>';
		feedback += 'Subject: Buying picture ' + $(this).find('#form_picture').val()
				 + ', Fare ' + $(this).find('#form_fare').val() + '</br>';
		feedback += $(this).find('#form_message').val();

		$('#modal_email_content').html(feedback);
		$('#modal_email').modal('show');
		return false;
	});

	/* Email modal closing */
	$("#close_modal_email").click(function() {
		// Empty and hide the modal
		$('#modal_email_content').html('');
		$('#modal_email').modal('hide');

		// Empty the form
		let contactForm = $("#contact-form");
		contactForm.find('#form_name').val('');
		contactForm.find('#form_lastname').val('');
		contactForm.find('#form_email').val('');
		contactForm.find('#form_picture').val('');
		contactForm.find('#form_fare').val('');
		contactForm.find('#form_message').val('');
	});

	/* Scroll */
	$('#button-scroll-to-top').click(function() {
		$('html, body').animate({scrollTop: 0}, 'slow');
	});

	/* Social network links */
	$('.social-networks-nav-link').each(function() {
		$(this).attr('href', 'https://www.' + $(this).attr('id') + '.com');
	});
});