$(function() {

  window.onload = function() {

    var tl = new TimelineLite();

    var gradient = $(".gradient"),
        circle = $("#circle svg, .yinyang"),
        hero = $("#about"),
        nav = $(".burger-check, .burger, .arrow"),
        body = $("html, body");

    // TweenLite.lagSmoothing(1000, 16);

    function intro() {
        tl
            .set(nav, {
                className: "+=no-click"
            })
            .set(circle, {
                className: "+=no-click"
            })
            .set(body, {
                className: "+=no-scroll"
            })
            .to(gradient, 0.75, {
                height: "100%",
                ease: Quad.easeInOut
            })
            .to(circle, 0.75, {
                opacity: 1,
                ease: Quad.easeIn
            })
            .to(circle, 0.5, {
                ease: Quad.easeIn,
                delay: 1
            })
            .to(hero, 0.25, {
                opacity: 1,
                ease: Quad.easeIn
            })
            .to(gradient, 0.75, {
                height: 12,
                ease: Quad.easeInOut
            })
            .to(nav, 0.5, {
                opacity: 1,
                ease: Quad.easeIn
            })
            .set(nav, {
                className: "-=no-click"
            })
            .set(body, {
                className: "-=no-scroll"
            })
            .set(circle, {
                className: "-=no-click"
            });
    }

    //now jump to the end and back again so that everything gets initialized/recorded internally right now, like when your page loads:
    tl.progress(1).progress(0);
    TweenLite.delayedCall(0.25, intro);

  };

});
