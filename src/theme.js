
function setCollapses(top_ul) 
{
    var c = 0;
    jQuery(top_ul).find('li').each(function(){
        var li = jQuery(this);
        if( c < 3 ){
            console.log(li.children('span').html());
            console.log('ul children? ');
            console.log(li.has('ul'));
            c++;
        }
        
        if (li.has('ul').length  != 0) {
            li.find('a').first().addClass('nav_toggle');
            li.children('ul').addClass('collapse');
        }
    });
}

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

    setCollapses("#parts");

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

    jQuery('.nav_toggle').click(function(e){
        e.preventDefault();
        var a = $(this);
        var li = a.parents('li').first();
        var target = li.children('ul.collapse');

        if (target.hasClass('show')) {
            target.collapse('hide');
        } else {
            target.collapse('show');
        }
    });

});
