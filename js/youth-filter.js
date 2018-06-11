$(function() {
	
	var options = {
		valueNames: ['level', 'ages']
	};
	
	var courseList = new List('courses', options);
	
	var levelFilters = [];
	var ageFilters = [];

    $('.level-filter').change(function() {
        var checked = this.checked;
        var value = $(this).data("value");
      
		if(checked){
			levelFilters.push(value);
		}
		else
		{
			levelFilters.splice(levelFilters.indexOf(value), 1);
		}
		
		courseList.filter(function (item) {
			if(levelFilters.length > 0)
			{
				return levelFilters.indexOf(item.values().level) > -1;
			}
			return true;
		});
	});

	$('.ages-filter').change(function() {
        var checked = this.checked;
        var value = $(this).data("value");
      
		if(checked){
			ageFilters.push(value);
		}
		else
		{
			ageFilters.splice(ageFilters.indexOf(value), 1);
		}
		
		courseList.filter(function (item) {
			if(ageFilters.length > 0)
			{
				return ageFilters.indexOf(item.values().ages) > -1;
			}
			return true;
		});
     });
});