$(document).ready(function() {
  // Initialize MagnificPopup for image popups
  function initMagnificPopup() {
    $('.popup-image').magnificPopup({
      type: 'image',
      removalDelay: 300,
      mainClass: 'mfp-with-zoom',
      gallery: {
        enabled: true
      },
      zoom: {
        enabled: true, // Enable zoom effect
        duration: 300, // Duration of the effect, in milliseconds
        easing: 'ease-in-out', // CSS transition easing function
        opener: function(openerElement) {
          // Determine the opener element for the zoom effect
          return openerElement.is('img') ? openerElement : openerElement.find('img');
        }
      }
    });
  }

  // Call the initialization function
  initMagnificPopup();
});
