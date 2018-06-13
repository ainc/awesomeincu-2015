/*
A Simple checkbox filter for tables built with List.js. 
To filter additional items:
1) add a counter for the filter type
2) add an additional if to the filter selector of each current change function
3) add an additional change function for the new filter and change the counter variable
*/
$(function() {
	
	// filtered vars
	var options = {
		valueNames: ['level', 'ages']
	};

	// counters for active filters of each type
	var numAges = 0;
	var numLevel = 0;
	
	var courseList = new List('courses', options);
	var filters = [];

	// level filter
    $('.level-filter').change(function() {
        var checked = this.checked; // true for selected value, false for deselected value
        var value = $(this).data("value"); // value changed in filter
        
        // add filter to list and increment
		if(checked){
			filters.push(value);
			numLevel++;
		}
		// remove filter from list and decrement
		else
		{
			filters.splice(filters.indexOf(value), 1);
			numLevel--;
		}
		// filter function, iterates through every course in the courselist, returning true to display a course
		courseList.filter(function (item) {
			// both filters active
			if(numLevel > 0 && numAges > 0){
				return filters.indexOf(item.values().level) > -1 && filters.indexOf(item.values().ages) > -1;
			// level filter active
			} else if(numLevel > 0){
				return filters.indexOf(item.values().level) > -1;
			// ages filter active
			} else if(numAges > 0){
				return filters.indexOf(item.values().ages) > -1;
			// no active filters
			} else{
				return true;
			}
		});
	});

    // ages filter
	$('.ages-filter').change(function() {
        var checked = this.checked; // true for selected value, false for deselected value
        var value = $(this).data("value"); // value changed in filter
      
		// add filter to list and increment
		if(checked){
			filters.push(value);
			numAges++;
		}
		// remove filter from list and decrement
		else
		{
			filters.splice(filters.indexOf(value), 1);
			numAges--;
		}
		// filter function, iterates through every course in the courselist, returning true to display a course
		courseList.filter(function (item) {
			// both filters active
			if(numLevel > 0 && numAges > 0){
				return filters.indexOf(item.values().level) > -1 && filters.indexOf(item.values().ages) > -1; //return true to display value
			// level filter active
			} else if(numLevel > 0){
				return filters.indexOf(item.values().level) > -1;
			// ages filter active
			} else if(numAges > 0){
				return filters.indexOf(item.values().ages) > -1;
			// no active filters
			} else{
				return true;
			}
		});
     });
});