const axios = require("axios");


class Busquedas{
    historial = [];
    constructor(){
        //TODO: Leer db si existe
    }

    get paramsMapbox(){
        return{
            'access_token':process.env.MAPBOX_KEY,
            'limit':5,
            'language':'es'
        }
    }

    async ciudad(lugar = ""){
        try{
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params:this.paramsMapbox
            })
            const resp=await instance.get();
            return resp.data.features.map(lugar => ({
                id: lugar.id,
                nombre: lugar.place_name,
                lng:lugar.center[0],
                lat:lugar.center[1]
            }));
        }catch(error){
            return [];
        }
    }

    async clima(lugar = []){
        try{
            const instance = axios.create({
                baseURL:`https://api.openweathermap.org/data/2.5/weather?lat=${lugar[0]}&lon=${lugar[1]}&appid=${process.env.OPENWEATHER_KEY}`,
                params:this.paramsOpenWeather
            })
            const resp = await instance.get();
        }catch(error){
            console.log(error);
        }
    }
}

module.exports = Busquedas;