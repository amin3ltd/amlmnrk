// jQuery click scroll functionality
var sectionArray = [1, 2, 3, 4, 5, 6, 7, 8];

// Document ready function to ensure DOM is fully loaded
$(document).ready(function() {
    // Initialize active link on load
    $('.navbar-nav .nav-item .nav-link').addClass('inactive');
    $('.navbar-nav .nav-item .nav-link').eq(0).addClass('active').removeClass('inactive');

    // Scroll event to update active links
    $(document).scroll(function() {
        var docScroll = $(document).scrollTop();

        // Iterate through each section to check visibility
        $.each(sectionArray, function(index, value) {
            var offsetSection = $('#section_' + value).offset().top - 90; // Adjusting offset as needed
            var nextOffsetSection = index < sectionArray.length - 1 
                                    ? $('#section_' + sectionArray[index + 1]).offset().top - 90 
                                    : Infinity; // Use Infinity for the last section

            // Check if the section is in view
            if (docScroll >= offsetSection && docScroll < nextOffsetSection) {
                $('.navbar-nav .nav-item .nav-link').removeClass('active').addClass('inactive');
                $('.navbar-nav .nav-item .nav-link').eq(index).addClass('active').removeClass('inactive');
            }
        });
    });

    // Click event for scroll links
    $('.click-scroll').click(function(e) {
        e.preventDefault();  // Prevent default link behavior
        var targetId = $(this).attr('href');
        var offsetClick = $(targetId).offset().top - 90;

        $('html, body').animate({
            scrollTop: offsetClick
        }, 300);
    });
});
