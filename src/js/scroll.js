$(function() {

    $('html').niceScroll();

    // $('body').on('mouseover', '.message-image', function() {
    //     $('html').getNiceScroll().remove();
    // }).on('mouseout', '.message-image', function() {
    //     $('html').niceScroll();
    // });

    $(this).scrollTop(0);

    var offsetTop = $('#projects').offset().top - 50;

    $(window).scroll(function() {
        var scrollTop = $(window).scrollTop();
        var arrowIcon = $('.arrow');

        if (scrollTop > offsetTop) {
            arrowIcon.addClass('down')
                .find('a')
                .attr('href', '#hero');
        } else {
            arrowIcon.removeClass('down')
                .find('a')
                .attr('href', '#projects');
        }
    });

    // Select all links with hashes
    $('a[href*="#"]')
        // Remove links that don't actually link to anything
        .not('[href="#"]')
        .not('[href="#0"]')
        .click(function(event) {
            // On-page links
            if (
                location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname
            ) {
                // Figure out element to scroll to
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                // Does a scroll target exist?
                if (target.length) {
                    // Only prevent default if animation is actually gonna happen
                    event.preventDefault();
                    $('html, body').animate({
                        scrollTop: target.offset().top
                    }, 1000, function() {
                        // Callback after animation
                        // Must change focus!
                        var $target = $(target);
                        $target.focus();
                        if ($target.is(":focus")) { // Checking if the target was focused
                            return false;
                        } else {
                            $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                            $target.focus(); // Set focus again
                        }
                    });
                }
            }
        });

});
