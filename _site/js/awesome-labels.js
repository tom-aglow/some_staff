$(document).ready(function () {
    $('.awesome-form .input-group input').focusout(function () {
        var $this = $(this);
        var inputValue = $this.val();

        if (inputValue === '') {
            $this.removeClass('has-value');
        } else {
            $this.addClass('has-value');
        }
    });
});