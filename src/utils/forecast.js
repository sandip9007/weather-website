const request = require('request');




const forecast = (lat, long, callback)=>{
	const url = "http://api.weatherstack.com/current?access_key=9f5aa42cd56156743243d57f7cd9487b&query="+lat+","+long+"";

	request({url, json : true}, (error, response)=>{

		//const data = JSON.parse(response.body);
		if(error){
			callback("Could not connect to the server", undefined)
		}
		else{
			callback(undefined, 
			{
				timezone : response.body.location.timezone_id,
				region : response.body.location.region,
				weather : response.body.current.weather_descriptions[0]

			})
		}
	})
}

module.exports = forecast;