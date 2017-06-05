$(window).scroll(function () {
    var $this = $(this);
    var wScroll = $this.scrollTop();

    parallaxHeader(wScroll);
    parallaxModelsPics(wScroll, $this);
    parallaxPromoscope(wScroll, $this);
    parallaxBlogPosts(wScroll, $this);

});

function parallaxHeader (wScroll) {

    $('.logo').css({
        'transform': 'translate(0px, ' + wScroll / 2 + '%)'
    });
    $('.back-bird').css({
        'transform': 'translate(0px, ' + wScroll / 4 + '%)'
    });
    $('.fore-bird').css({
        'transform': 'translate(0px, -' + wScroll / 40 + '%)'
    });
    
}

function parallaxModelsPics (wScroll, $this) {

    if (wScroll > $('.clothes-pics').offset().top - $this.height() / 1.3) {
        var $pics = $('.clothes-pics figure');

        $pics.each(function (i) {
            setTimeout(function () {
                $pics.eq(i).addClass('is-showing');
            }, 150 * (i + 1));
        })
    }
}

function parallaxPromoscope (wScroll, $this) {
    var $circleWindow = $('.large-window');
    var offset = $circleWindow.offset().top;

    if (wScroll > offset - $this.height()) {

        $circleWindow.css({
            'background-position': 'center ' + (wScroll - offset) + 'px'
        });

        var opacity = (offset - wScroll - $this.height() / 4) / (- $this.height() / 4);

        $('.window-tint').css({
            'opacity': opacity
        });
    }
}

function parallaxBlogPosts (wScroll, $this) {
    var $blogPosts = $('.blog-posts');
    var offset = Math.min(0, wScroll - $blogPosts.offset().top + $this.height()/ 4);


    if (wScroll > $blogPosts.offset().top - $this.height()) {
        $('.post-1').css({
            'transform': 'translate(' + offset + 'px, ' + Math.abs(offset * 0.2) + 'px)'
        });

        $('.post-3').css({
            'transform': 'translate(' + Math.abs(offset) + 'px, ' + Math.abs(offset * 0.2) + 'px)'
        });
    }

}