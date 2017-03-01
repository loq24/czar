jQuery(document).ready(function($){
	//Get devices by Account ID
	$('#account_id').keydown(function(e){
	    if (e.keyCode == 13) { //when the user presses the enter
	    	var id = $(this).val();
	        $.getJSON('https://czar.brightideacloud.com/'+id+'/wp-json/digital-signage/devices',function(json){
	        	$('.container').load('select-device.html', function() {
				    var device = '';
		        	var length = json.length;
		        	for(var i = 0; i < length; i++){
		        		device += '<div class="device">';
		         		device += '<h2>'+json[i]['name']+'</h2>';
		         		device += '<span class="address">'+json[i]['location']+'</span>';
		         		//device += '<a class="device_view" data-href="https://czar.brightideacloud.com/'+id+'/digital-signage/?device='+json[i]['id']+'">View Device</a>';
		         		device += '<a class="device_view" onclick="window.open(\'https://czar.brightideacloud.com\')">View Device</a>';
		         		device += '</div>';
		         	}
		         	$('.devices').html(device);		         			         	
				});
	        	
			}).fail(function() {
			    $('#account_id').css('border', '1px solid red');
			    $('.form-signin .error').text('Account not found.');
			    $('.form-signin .error').show();
			});
	    }
	    else{
	    	$('#account_id').css('border', '0');
		    $('.form-signin .error').text('');
		    $('.form-signin .error').hide();
	    }
	});	
	//* when device view on click
	$('body').on('click', 'a.device_view', function() {
    	var href = $(this).data('href');
    	var ref = window.open(href, '_blank', 'location=no');
	});
});


