(function ( $ ) {
 
    $.fn.gradient = function( options ) {
 
        // Set default options.
        settings = $.extend($.fn.gradient.defaults, options );
        
        console.log('setup');	
        	
		//add elements for fallback
		for (i=0; i<settings.elements; i++) {
			$(this).append('<div id="gradElem'+i+'" class="gradientElement"></div>')
		}
		
		$(this).prepend('<div id="gradientOverlay"></div>');
		$('#gradientOverlay').css({
			'height':'100%',
			'z-index':2,
			'width':'100%',
			'position':'absolute',
			'top':0,
			'left':0
		});
		
		elemHeight = 100/settings.elements;
		$('.gradientElement').css('height',elemHeight+'%');
		
        return this; 
    };
    
    $.fn.gradient.defaults = {
        elements: 5,
 		data: null,
 		sensitivity: 1
    };
    
    var settings;
        
    $.fn.gradient.setData = function(data) {
    	m = minMax(data);
    	
    	for (i=0; i<settings.elements; i++) {
    		$('#gradElem'+i).css('background-color',getColor(data[i],m));
    	}
    	
    	gradient = buildGradient(data, m);
    	$('#gradientOverlay').css('background',gradient);    	
    };
    
    function buildGradient(data, m) {
    	stops = "";
    	for (i = 0; i<settings.elements; i++) {
    		percent = i*(100/(settings.elements-1));
    		col = getColor(data[i],m);
    		stops += ", color-stop("+percent+"%,"+col+")";
    	}
    	
    	bg = "-webkit-gradient(linear, left top, left bottom "+stops+")"
    	return bg;
    }
    
    function getColor(value, m) {
    	min = m[0]-settings.sensitivity;
		max = m[1]+settings.sensitivity;
		value = value - min;
		mult = 255/(max-min);
		red = Math.round(value * mult);
		blue = Math.round(255-(value*mult));
		
		return 'rgba(' + red + ',30,' + blue + ',1)';
    }
    
    function minMax(data) {
    	min = max = null;
	 	$.each(data, function(key,val) {
	 		//set default
	 		if (max == null || min == null)
	 			max = min = val;

	 		if (val < min)
	 			min = val;
	 		
	 		if (val > max)
	 			max = val;
	 	});
	 	return [min,max]; 
    }
 
}( jQuery ));

