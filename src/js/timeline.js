$(function() {

  window.onload = function() {

    var tl = new TimelineLite();

    var gradient = $(".gradient"),
        circle = $("#circle svg, .yinyang"),
        title = $(".title"),
        subtitle = $(".subtitle"),
        hero = $(".title, .subtitle, #about, .arrow"),
        nav = $(".burger-check, .burger"),
        body = $("html, body");

    var t = TweenLite.to(title, 0.25, {
        height: 0,
        paused: true,
        reversed: true
    });

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
            .to(gradient, 1, {
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

    TweenLite.delayedCall(0.5, intro);

  };

});
