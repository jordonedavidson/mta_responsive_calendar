
//open table of contents accordion to current page
function openToCurrentPage() {
    var this_page = lastPathItem(window.location.pathname);

    var current_link = jQuery('#table_of_contents').find('a[href="'+this_page+'"]');

    var toggle = current_link.next('.nav_toggle');

    var parent_li = current_link.parents('li').first();

    parent_li.addClass('active');
    
    current_link.parents('.collapse').each(function(){
        var ul = jQuery(this);
        var a = ul.parent('li').children('span').children('.nav_toggle');
        setToggle(a, ul);
    });

    if( toggle.length > 0 ){
        var target = current_link.parent('span').next('ul');
        setToggle(toggle, target);
    }   
}

// Collapse the table of contents structure
function setCollapses(top_ul) 
{
    var toggle = '<a href="#" class="nav_toggle fas fa-angle-down" role="button" title="expand"></a>';
    
    jQuery(top_ul).find('li').each(function(){
        var li = jQuery(this);
       
        if (li.has('ul').length  != 0) {
            var a =  li.find('a').first();
            a.after(toggle);
            li.children('ul').addClass('collapse');
        }
    });
}

//set the toggle state
function setToggle(a, target) {
    if (a.hasClass('open')) {
        target.collapse('hide');
        a.removeClass('open');
        a.removeClass('fa-angle-up').addClass('fa-angle-down');
        a.attr('title', 'Expand');
    } else {
        target.collapse('show');
        a.addClass('open');
        a.removeClass('fa-angle-down').addClass('fa-angle-up');
        a.attr('title', 'Collapse');
    }
}

function slideTableOfContents(closed)
{
    var i = jQuery('#toc_tab').children('i');
    
    if(typeof(closed) != 'boolean' ) {
        closed = false;
    }

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
}

function lastPathItem(path)
{
    var page = path.split("/").pop();
    
    if (page.indexOf('#') !== -1) {
        page = page.split('#')[0];
    }

    return page;
}

function getTOCLinks()
{
    var out = [];
    jQuery('#table_of_contents .toc').find('a').each(function(){
        var a = jQuery(this);
        if (!a.hasClass('nav_toggle')) {
            //only get real links,
            var link = a.attr('href');
            var label = a.text();
            out.push({'label' : label, 'link' : link});
        }
    });

    return out;
}

jQuery(document).ready(function($){

    $('[data-toggle="tooltip"]').tooltip();

    setCollapses("#parts");

    openToCurrentPage();

    jQuery('#toc_tab').click(function(e){
        e.preventDefault();
        var i = jQuery(this).children('i');
        var closed = i.hasClass('fa-arrow-right');
  
        slideTableOfContents(closed);
    });

    jQuery('.nav_toggle').click(function(e){
        e.preventDefault();
        var a = $(this);
        var li = a.parents('li').first();
        var target = li.children('ul.collapse');

       setToggle(a, target);
    });

    $('#toc_filter').autocomplete({
        source: getTOCLinks(),
        focus : function(event, ui){
            event.preventDefault();
            $(this).val(ui.item.label);
        },
        select : function(event, ui){
            event.preventDefault();
            $('#toc_filter_go').attr('data-link',  ui.item.link);
            $(this).val(ui.item.label);
            
            //window.location.href = ui.item.link;
        }
    });

    $('#table_of_contents').on('click, touchstart', '#toc_filter_go', function(e){
        e.preventDefault();
        var data = $(this).data();
        console.log(data);
        if (data.link.length) {
            if ($(window).width() <= 768) {
                slideTableOfContents();
            }
            $('#toc_filter').val("");
            window.location.href = data.link;
        }
    });
});
