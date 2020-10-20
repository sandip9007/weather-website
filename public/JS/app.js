// const fetch = require('fetch');

	const weatherform = document.querySelector('form');
	const searchLocation = document.querySelector('#searchLocation');
	const region_data = document.querySelector('#region_data');
	const weather_data = document.querySelector('#weather_data');

	// searchLocation
	weatherform.addEventListener('submit', (e)=>{
		e.preventDefault();
		
		console.log(searchLocation.value);
		// searchLocation.value = "";

		fetch('http://localhost:5000/weather?address=' + searchLocation.value + '').then((response)=>{
		// console.log(JSON.parse(response))
		response.json().then((data)=>{
			if(data.error){
				console.log(data.error)
			}
			else{
				console.log(data.region)
				console.log(data.weather)
				region_data.innerHTML = data.region;
				weather_data.innerHTML = data.weather;
			}
		})
	})
	})

	

	// console.log('Testing')