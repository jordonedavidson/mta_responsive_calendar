
function lastPathItem(path)
{
    var page = path.split("/").pop();
    
    if (page.indexOf('#') !== -1) {
        page = page.split('#')[0];
    }

    return page;
}

jQuery(document).ready(function($){

    $('[data-toggle="tooltip"]').tooltip();

    jQuery('#toc_tab').click(function(e){
        e.preventDefault();
        var i = jQuery(this).children('i');
        var closed = i.hasClass('fa-arrow-right');
        console.log('closed is: '+closed);
        if (closed) {
            jQuery('#table_of_contents .toc').css({display: "block"});
            jQuery("#table_of_contents").css({
                width: "50%",
                "overflow-y": "auto"
            });
            i.removeClass('fa-arrow-right').addClass('fa-arrow-left');
        } else {
            jQuery("#table_of_contents").css({
                width: "24px",
                "overflow-y": "hidden"
            });
            jQuery('#table_of_contents .toc').css({display: "none"});
            i.removeClass('fa-arrow-left').addClass('fa-arrow-right');
        }
    });

});
