(function($) {
    $.fn.l2block = function() {
        this.each(function() {
            var $this = $(this);
            $(".l2error" + this.id).remove();
            $(".l2success" + this.id).remove();

            var bgcolor = '#FFFFFF';
            var opacity = 50;
            var bwith = $this.width();
            var bheight = $this.height();
            var opacity2 = opacity / 100;

            $this.prepend('<div class="l2loader" id="l2loader' + this.id + '"></div>');
            $this.children(".l2loader").css({
                'width': bwith + 'px',
                'height': bheight + 'px',
                'background': bgcolor,
                'position': 'absolute',
                'filter': 'alpha(opacity=' + opacity + ')',
                'opacity': opacity2,
                'z-index': '99'
            });

            var loaderHtml = `
                <div class="loader2">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            `;
            $this.prepend('<div class="l2loader2 loader" id="l2loader2' + this.id + '">' + loaderHtml + '</div>');
            $this.children(".l2loader2").css({
                'width': bwith + 'px',
                'height': bheight + 'px',
                'position': 'absolute',
                'z-index': '9999',
                'display': 'flex',
                'justify-content': 'center',
                'align-items': 'center'
            });
        });
    }

    $.fn.l2unblock = function() {
        this.each(function() {
            var $this = $(this);
            $("#l2loader" + this.id).remove();
            $("#l2loader2" + this.id).remove();
            $this.show();
        });
    }

    $.fn.l2load = function() {
        this.each(function() {
            var $this = $(this);
            $(".l2error" + this.id).remove();
            $(".l2success" + this.id).remove();
            $this.before('<div class="l2loader" id="l2loader' + this.id + '"><div class="loader2"></div></div>');
            $this.hide();
        });
    }

    $.fn.l2error = function(msg) {
        this.each(function() {
            var $this = $(this);
            $this.before('<div class="alert alert-danger l2error' + this.id + ' error_box" role="alert" style="display:none">' + msg + '</div>');
            $(".l2error" + this.id).fadeIn();
        });
    }

    $.fn.l2success = function(msg) {
        this.each(function() {
            var $this = $(this);
            $this.before('<div class="alert alert-success l2success' + this.id + ' success_box" role="alert" style="display:none">' + msg + '</div>');
            $(".l2success" + this.id).fadeIn();
        });
    }

    $.fn.l2adblock = function(bgcolor, opacity) {
        this.each(function() {
            $(".l2error" + this.id).remove();
            $(".l2success" + this.id).remove();
            var $this = $(this);
            var bwith = $this.width();
            var bheight = $this.height();
            var opacity2 = opacity / 100;
            $this.prepend('<div class="l2adblocked"></div>');
            $this.children(".l2adblocked").css({
                'width': bwith + 'px',
                'height': bheight + 'px',
                'background': bgcolor,
                'position': 'absolute',
                'filter': 'alpha(opacity=' + opacity + ')',
                'opacity': opacity2
            });
        });
    }

    $.fn.l2adunblock = function() {
        this.each(function() {
            var $this = $(this);
            $this.children(".l2adblocked").remove();
        });
    }
})(jQuery);
