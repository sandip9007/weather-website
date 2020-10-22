const express = require('express');
const path = require('path');
const hbs = require('hbs');
const app = express();

const port = process.env.port || 5000
const foreCast = require('./utils/forecast.js');

const geoCode = require('./utils/geocode.js');

console.log(__dirname+"\\index.html");
// console.log(__filename);

const pathDir = path.join(__dirname, '../public')

const viewPath = path.join(__dirname, '../templates/views')

const partialPath = path.join(__dirname,'../templates/partials');
// console.log(pathDir);

app.use(express.static(pathDir));

app.set('view engine', 'hbs');

app.set('views', viewPath);

hbs.registerPartials(partialPath);

// app.use('/help',express.static(path.join(__dirname,'../public/help.html')));

// app.use('/about',express.static(path.join(__dirname,'../public/about.html')));

app.get('',(req, res)=>{
	// res.send("Hello Express");
	res.render('index', {
		name : "Sandip Ghoshal",
		title : "Weather App"
	})

})

app.get('/about', (req, res)=>{

	res.render('about',{
		title : "About Me",
		name : "Sandip Ghoshal"
	});
})


app.get('/help', (req, res)=>{
	res.render('help', {
		title : "Help",
		name : "Sandip Ghoshal",
		helpText : "Some help text"
	})
})




// app.get('/help', (req, res)=>{
// 	// res.send("Help Page");
	
// })

// app.get('/about', (req, res)=>{
// 	res.send("<h1>About</h1>");
// })

app.get('/weather', (req, res)=>{

	const address = req.query.address;

	if(!address){
		return res.send({
			error : "Please enter an address"
		})
	}
	geoCode(address,(error, data)=>{
	console.log("Error", error);
	console.log("Data", data);

	foreCast(data.lat, data.long, (error, data)=>
	{
		console.log("Error", error);
		console.log("Data", data);
		if(error){
			return res.send({
				error : error
			});
		}

		res.send({
			timezone : data.timezone,
			region : data.region,
			weather : data.weather
		})
	})
})
	// res.send({
	// 	location : address,
	// 	forecast : {
	// 		Temparature : data.lat,
	// 		windspeed : data.long,
	// 		precepation : 0.5
	// 	}
	// });
})


app.get('/products', (req, res)=>{
	console.log(req.query.search);
	if(!req.query.search){
		return res.send({
			error : "You must provide a search query"
		})
	}
	console.log(req.query.search);
	res.send({
		products : []
	})
})	
app.get('/*',(req, res)=>{
	// res.send('404 not found')
	res.render('error',{
		title : "Error Page"
	})
})
app.listen(port, ()=>{
	console.log('Server is up on port 4000')
})