// Sticky Plugin v1.0.4 for jQuery
// =============
// Author: Anthony Garand
// Improvements by German M. Bravo (Kronuz), Ruud Kamphuis (ruudk), and Leonardo C. Daronco (daronco)
// Created: 02/14/2011
// Updated: 10/21/2024
// Website: http://stickyjs.com/
// Description: Makes an element on the page stick on the screen as you scroll.
//              It will only set the 'top' and 'position' of your element; you
//              might need to adjust the width in some cases.

(function($) {
  var slice = Array.prototype.slice;
  var splice = Array.prototype.splice;

  var defaults = {
    topSpacing: 0,
    bottomSpacing: 0,
    className: 'is-sticky',
    wrapperClassName: 'sticky-wrapper',
    center: false,
    getWidthFrom: '',
    widthFromWrapper: true, // works only when .getWidthFrom is empty
    responsiveWidth: false
  };

  var $window = $(window),
      $document = $(document),
      sticked = [],
      windowHeight = $window.height(),
      requestAnimationFrame = window.requestAnimationFrame || function(callback) {
        window.setTimeout(callback, 1000 / 60);
      };

  var scroller = function() {
    var scrollTop = $window.scrollTop(),
        documentHeight = $document.height(),
        dwh = documentHeight - windowHeight,
        extra = (scrollTop > dwh) ? dwh - scrollTop : 0;

    for (var i = 0; i < sticked.length; i++) {
      var s = sticked[i],
          elementTop = s.stickyWrapper.offset().top,
          etse = elementTop - s.topSpacing - extra;

      // Update height in case of dynamic content
      s.stickyWrapper.css('height', s.stickyElement.outerHeight());

      if (scrollTop <= etse) {
        if (s.currentTop !== null) {
          s.stickyElement.css({ 'width': '', 'position': '', 'top': '' });
          s.stickyElement.parent().removeClass(s.className);
          s.stickyElement.trigger('sticky-end', [s]);
          s.currentTop = null;
        }
      } else {
        var newTop = documentHeight - s.stickyElement.outerHeight() - s.topSpacing - s.bottomSpacing - scrollTop - extra;
        newTop = newTop < 0 ? newTop + s.topSpacing : s.topSpacing;

        if (s.currentTop != newTop) {
          var newWidth = s.getWidthFrom ? $(s.getWidthFrom).width() || null : s.widthFromWrapper ? s.stickyWrapper.width() : null;
          newWidth = newWidth == null ? s.stickyElement.width() : newWidth;

          s.stickyElement.css({ 'width': newWidth, 'position': 'fixed', 'top': newTop });
          s.stickyElement.parent().addClass(s.className);

          if (s.currentTop === null) {
            s.stickyElement.trigger('sticky-start', [s]);
          } else {
            s.stickyElement.trigger('sticky-update', [s]);
          }

          if (s.currentTop === s.topSpacing && s.currentTop > newTop || s.currentTop === null && newTop < s.topSpacing) {
            s.stickyElement.trigger('sticky-bottom-reached', [s]);
          } else if (s.currentTop !== null && newTop === s.topSpacing && s.currentTop < newTop) {
            s.stickyElement.trigger('sticky-bottom-unreached', [s]);
          }

          s.currentTop = newTop;
        }
      }
    }
  };

  var resizer = function() {
    windowHeight = $window.height();

    for (var i = 0; i < sticked.length; i++) {
      var s = sticked[i];
      var newWidth = s.getWidthFrom && s.responsiveWidth ? $(s.getWidthFrom).width() : s.widthFromWrapper ? s.stickyWrapper.width() : null;

      if (newWidth != null) {
        s.stickyElement.css('width', newWidth);
      }
    }
  };

  var methods = {
    init: function(options) {
      var o = $.extend({}, defaults, options);
      return this.each(function() {
        var stickyElement = $(this);
        var stickyId = stickyElement.attr('id');
        var stickyHeight = stickyElement.outerHeight();
        var wrapperId = stickyId ? stickyId + '-' + defaults.wrapperClassName : defaults.wrapperClassName;
        var wrapper = $('<div></div>').attr('id', wrapperId).addClass(o.wrapperClassName);

        stickyElement.wrapAll(wrapper);
        var stickyWrapper = stickyElement.parent();

        if (o.center) {
          stickyWrapper.css({ width: stickyElement.outerWidth(), marginLeft: "auto", marginRight: "auto" });
        }

        if (stickyElement.css("float") == "right") {
          stickyElement.css({ "float": "none" }).parent().css({ "float": "right" });
        }

        stickyWrapper.css('height', stickyHeight);

        o.stickyElement = stickyElement;
        o.stickyWrapper = stickyWrapper;
        o.currentTop = null;

        sticked.push(o);
      });
    },
    update: scroller,
    unstick: function() {
      return this.each(function() {
        var that = this;
        var unstickyElement = $(that);

        for (var i = sticked.length - 1; i >= 0; i--) {
          if (sticked[i].stickyElement.get(0) === that) {
            splice.call(sticked, i, 1);
            unstickyElement.unwrap();
            unstickyElement.css({ 'width': '', 'position': '', 'top': '', 'float': '' });
            break;
          }
        }
      });
    }
  };

  // Add event listeners for scroll and resize
  $window.on('scroll', function() {
    requestAnimationFrame(scroller);
  });

  $window.on('resize', function() {
    requestAnimationFrame(resizer);
  });

  $.fn.sticky = function(method) {
    if (methods[method]) {
      return methods[method].apply(this, slice.call(arguments, 1));
    } else if (typeof method === 'object' || !method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error('Method ' + method + ' does not exist on jQuery.sticky');
    }
  };

  $.fn.unstick = function() {
    return methods.unstick.apply(this, arguments);
  };

  // Initialize on document ready
  $(function() {
    setTimeout(scroller, 0);
  });
})(jQuery);

// Activate sticky functionality on navbar
$(document).ready(function(){
  $(".navbar").sticky({ topSpacing: 0 });
});
