/* =============================================================
 * flatui-checkbox.js v0.0.3
 * ============================================================ */
 
!function ($) {

 /* CHECKBOX PUBLIC CLASS DEFINITION
	* ============================== */

	var Checkbox = function (element, options) {
		this.init(element, options);
	}

	Checkbox.prototype = {
		
		constructor: Checkbox
		
	, init: function (element, options) {			 
			var $el = this.$element = $(element)
			
			this.options = $.extend({}, $.fn.checkbox.defaults, options);			 
			$el.before(this.options.template);		
			this.setState(); 
		}	 
	 
	, setState: function () {		 
			var $el = this.$element
				, $parent = $el.closest('.checkbox');
				
				$el.prop('disabled') && $parent.addClass('disabled');		
				$el.prop('checked') && $parent.addClass('checked');
		}	 
		
	, toggle: function () {		 
			var ch = 'checked'
				, $el = this.$element
				, $parent = $el.closest('.checkbox')
				, checked = $el.prop(ch)
				, e = $.Event('toggle')
			
			if ($el.prop('disabled') == false) {
				$parent.toggleClass(ch) && checked ? $el.removeAttr(ch) : $el.prop(ch, ch);
				$el.trigger(e).trigger('change'); 
			}
		}	 
		
	, setCheck: function (option) {		 
			var d = 'disabled'
				, ch = 'checked'
				, $el = this.$element
				, $parent = $el.closest('.checkbox')
				, checkAction = option == 'check' ? true : false
				, e = $.Event(option)
			
			$parent[checkAction ? 'addClass' : 'removeClass' ](ch) && checkAction ? $el.prop(ch, ch) : $el.removeAttr(ch);
			$el.trigger(e).trigger('change');				
		}	 
			
	}


 /* CHECKBOX PLUGIN DEFINITION
	* ======================== */

	var old = $.fn.checkbox

	$.fn.checkbox = function (option) {
		return this.each(function () {
			var $this = $(this)
				, data = $this.data('checkbox')
				, options = $.extend({}, $.fn.checkbox.defaults, $this.data(), typeof option == 'object' && option);
			if (!data) $this.data('checkbox', (data = new Checkbox(this, options)));
			if (option == 'toggle') data.toggle()
			if (option == 'check' || option == 'uncheck') data.setCheck(option)
			else if (option) data.setState(); 
		});
	}
	
	$.fn.checkbox.defaults = {
		template: '<span class="icons"><span class="first-icon icon-icon-not-checked"></span><span class="second-icon icon-icon-checked"></span></span>'
	}


 /* CHECKBOX NO CONFLICT
	* ================== */

	$.fn.checkbox.noConflict = function () {
		$.fn.checkbox = old;
		return this;
	}


 /* CHECKBOX DATA-API
	* =============== */

	$(document).on('click.checkbox.data-api', '[data-toggle^=checkbox], .checkbox', function (e) {
	  var $checkbox = $(e.target);
		if (e.target.tagName != "A") {			
			e && e.preventDefault() && e.stopPropagation();
			if (!$checkbox.hasClass('checkbox')) $checkbox = $checkbox.closest('.checkbox');
			$checkbox.find(':checkbox').checkbox('toggle');
		}
	});
	
	$(function () {
		$('[data-toggle="checkbox"]').each(function () {
			var $checkbox = $(this);
			$checkbox.checkbox();
		});
	});

}(window.jQuery);
/* =============================================================
 * flatui-radio.js v0.0.3
 * ============================================================ */

!function ($) {

 /* RADIO PUBLIC CLASS DEFINITION
	* ============================== */

	var Radio = function (element, options) {
		this.init(element, options);
	}

	Radio.prototype = {
	
		constructor: Radio
		
	, init: function (element, options) {			 
			var $el = this.$element = $(element)
			
			this.options = $.extend({}, $.fn.radio.defaults, options);			
			$el.before(this.options.template);		
			this.setState();
		}		
		
	, setState: function () {		 
			var $el = this.$element
				, $parent = $el.closest('.radio');
				
				$el.prop('disabled') && $parent.addClass('disabled');		
				$el.prop('checked') && $parent.addClass('checked');
		} 
		
	, toggle: function () {		 
			var d = 'disabled'
				, ch = 'checked'
				, $el = this.$element
				, checked = $el.prop(ch)
				, $parent = $el.closest('.radio')			 
				, $parentWrap = $el.closest('form').length ? $el.closest('form') : $el.closest('body')
				, $elemGroup = $parentWrap.find(':radio[name="' + $el.attr('name') + '"]')
				, e = $.Event('toggle')
				
				$elemGroup.not($el).each(function () {
					var $el = $(this)
						, $parent = $(this).closest('.radio');
						
						if ($el.prop(d) == false) {
							$parent.removeClass(ch) && $el.removeAttr(ch).trigger('change');
						} 
				});
			
				if ($el.prop(d) == false) {
					if (checked == false) $parent.addClass(ch) && $el.attr(ch, true);
					$el.trigger(e);
					
					if (checked !== $el.prop(ch)) {
						$el.trigger('change'); 
					}
				}								
		} 
		 
	, setCheck: function (option) {		 
			var ch = 'checked'
				, $el = this.$element
				, $parent = $el.closest('.radio')
				, checkAction = option == 'check' ? true : false
				, checked = $el.prop(ch)
				, $parentWrap = $el.closest('form').length ? $el.closest('form') : $el.closest('body')
				, $elemGroup = $parentWrap.find(':radio[name="' + $el['attr']('name') + '"]')
				, e = $.Event(option)
				
			$elemGroup.not($el).each(function () {
				var $el = $(this)
					, $parent = $(this).closest('.radio');
					
					$parent.removeClass(ch) && $el.removeAttr(ch);
			});
						
			$parent[checkAction ? 'addClass' : 'removeClass'](ch) && checkAction ? $el.prop(ch, ch) : $el.removeAttr(ch);
			$el.trigger(e);	 
					
			if (checked !== $el.prop(ch)) {
				$el.trigger('change'); 
			}
		}	 
		 
	}


 /* RADIO PLUGIN DEFINITION
	* ======================== */

	var old = $.fn.radio

	$.fn.radio = function (option) {
		return this.each(function () {
			var $this = $(this)
				, data = $this.data('radio')
				, options = $.extend({}, $.fn.radio.defaults, $this.data(), typeof option == 'object' && option);
			if (!data) $this.data('radio', (data = new Radio(this, options)));
			if (option == 'toggle') data.toggle()
			if (option == 'check' || option == 'uncheck') data.setCheck(option)
			else if (option) data.setState(); 
		});
	}
	
	$.fn.radio.defaults = {
		template: '<span class="icons"><span class="first-icon fui-radio-unchecked"></span><span class="second-icon fui-radio-checked"></span></span>'
	}


 /* RADIO NO CONFLICT
	* ================== */

	$.fn.radio.noConflict = function () {
		$.fn.radio = old;
		return this;
	}


 /* RADIO DATA-API
	* =============== */

	$(document).on('click.radio.data-api', '[data-toggle^=radio], .radio', function (e) {
		var $radio = $(e.target);
		if (e.target.tagName != "A") {		
			e && e.preventDefault() && e.stopPropagation();
			if (!$radio.hasClass('radio')) $radio = $radio.closest('.radio');
			$radio.find(':radio').radio('toggle');
		}
	});
	
	$(function () {
		$('[data-toggle="radio"]').each(function () {
			var $radio = $(this);
			$radio.radio();
		});
	});

}(window.jQuery);
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