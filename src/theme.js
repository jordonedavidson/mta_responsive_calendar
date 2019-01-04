
//open table of contents accordion to current page
function openToCurrentPage() {
    var this_page = lastPathItem(window.location.pathname);

    var current_link = jQuery('#table_of_contents').find('a[href="'+this_page+'"]');

    var parent_li = current_link.parents('li').first();

    parent_li.addClass('active');
    
    current_link.parents('.collapse').each(function(){
        var ul = jQuery(this);
        ul.addClass('show');
        ul.parent('li').children('span').children('a').addClass('follow');
    });

    if( current_link.hasClass('nav-toggle') ){
        var target = current_link.parent('span').next('ul');
        current_link.addClass('follow');
        target.collapse('show');
    }   
}

// Collapse the table of contents structure
function setCollapses(top_ul) 
{
    jQuery(top_ul).find('li').each(function(){
        var li = jQuery(this);
       
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

    openToCurrentPage();

    jQuery('#toc_tab').click(function(e){
        e.preventDefault();
        var i = jQuery(this).children('i');
        var closed = i.hasClass('fa-arrow-right');
  
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
        var href = a.attr('href');
        var li = a.parents('li').first();
        var target = li.children('ul.collapse');

        if (a.hasClass('follow')) {
            window.location.href = href;
        } else {
            target.collapse('show');
            a.addClass('follow');
        }
    });

});
