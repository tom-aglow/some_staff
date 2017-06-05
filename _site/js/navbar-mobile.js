$(document).ready(function () {
    $(".navbar-mobile-toggle").click(function () {
        $(this).toggleClass("is-open");
        $(this).prev().toggleClass("is-open");
    });
});