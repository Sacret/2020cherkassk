$(document).ready(function(){

    //turn image rows into galleries with previous/next navigation
    $(".content .gallery-grid").each(function(){
        var $images = $(this).find("img").filter(function(){
            return !$(this).closest("a").length;
        });

        $images.each(function(index){
            var imageSource = (this.currentSrc || this.src).split("#")[0];

            $(this).wrap(
                $("<a>", {
                    "class": "gallery-preview",
                    "href": imageSource,
                    "data-featherlight": "image",
                    "aria-label": "Открыть изображение " + (index + 1) + " из " + $images.length
                })
            );
        });

        $(this).find("a.gallery-preview").featherlightGallery({
            previousIcon: "&#10094;",
            nextIcon: "&#10095;"
        });
    });



    //open content images that are not links in the photo viewer
    $(".content img").filter(function(){
        return !$(this).closest("a").length;
    }).addClass("zoomable").click(function(){
        $.featherlight({ image: this.currentSrc || this.src });
    });



    //mobile menu toggling
    $("#menu_icon").click(function(){
        $("header nav ul").toggleClass("show_menu");
        $("#menu_icon").toggleClass("close_menu");
        return false;
    });



    //Contact Page Map Centering
    var hw = $('header').width() + 50;
    var mw = $('#map').width();
    var wh = $(window).height();
    var ww = $(window).width();

    $('#map').css({
        "max-width" : mw,
        "height" : wh
    });

    if(ww>1100){
         $('#map').css({
            "margin-left" : hw
        });
    }





    //Tooltip
    $("a").mouseover(function(){

        var attr_title = $(this).attr("data-title");

        if( attr_title == undefined || attr_title == "") return false;

        $(this).after('<span class="tooltip"></span>');

        var tooltip = $(".tooltip");
        tooltip.append($(this).data('title'));


        var tipwidth = tooltip.outerWidth();
        var a_width = $(this).width();
        var a_hegiht = $(this).height() + 3 + 4;

        //if the tooltip width is smaller than the a/link/parent width
        if(tipwidth < a_width){
            tipwidth = a_width;
            $('.tooltip').outerWidth(tipwidth);
        }

        var tipwidth = '-' + (tipwidth - a_width)/2;
        $('.tooltip').css({
            'left' : tipwidth + 'px',
            'bottom' : a_hegiht + 'px'
        }).stop().animate({
            opacity : 1
        }, 200);


    });

    $("a").mouseout(function(){
        var tooltip = $(".tooltip");
        tooltip.remove();
    });


});
