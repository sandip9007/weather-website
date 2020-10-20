const request = require('request');

const geocode = (place, callback)=>{
	url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+place+".json?access_token=pk.eyJ1Ijoic2Fuc21hcnQiLCJhIjoiY2tkanNhd3A4MGhzcjJzbXJjZDBiMzB0ZCJ9.I6c-hVVimcfDxvF0XKovLA"

	request({url: url, json : true}, (error, response)=>{
		if(error){
			callback("Unable to connect", undefined);
		}
		else
		{
			callback(undefined, {
				lat : response.body.features[0].center[1],
				long : response.body.features[0].center[0]

			})
		}
	})


}



module.exports = geocode;