$( document ).ready(function() {


// swap svg to png for browsers that won't support it
if (!Modernizr.svg) {
    $('img[src$=".svg"]').each(function()
    {
        $(this).attr('src', $(this).attr('src').replace('.svg', '.png'));
    });
}


/* 
  Toggle Off-canvas Menu  */

   var $page = $('.nav'),
       $offCanvasMenu = $('.off-canvas'),
       $switch = $('.js-mobile-nav-toggle');

   $switch.on('touchstart click', function(e) {
      e.preventDefault();
      $page.toggleClass("open");
      $offCanvasMenu.toggleClass("off-canvas-is-open");
      $(this).toggleClass("open");
   });


}); //end