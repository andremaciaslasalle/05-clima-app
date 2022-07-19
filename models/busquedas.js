const fs = require("fs");
const axios = require("axios");
const { restoreDefaultPrompts } = require("inquirer");
const { pausa } = require("../helpers/inquirer");


class Busquedas{
    historial = [];
    dbPath = "./db/database.json";
    constructor(){
        this.leerDB();
    }

    get HistorialCapitalizado(){
        /* const arreglo = []
        this.historial.forEach(lugar => {
            arreglo.push(this.capitalizar(lugar));
        })
        return arreglo; */

        return this.historial.map(lugar => {
            let palabras = lugar.split(" ");
            palabras = palabras.map( p => p[0].toUpperCase()+ p.substring(1));
            return palabras.join(" ");
        })
    }

    get paramsMapbox(){
        return{
            'access_token':process.env.MAPBOX_KEY,
            'limit':5,
            'language':'es'
        }
    }

    get paramsOpenWeather(){
        return{
            "appid":process.env.OPENWEATHER_KEY,
            "lang":"es",
            "units":"metric"
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

    async climaLugar(lat,lon){
        try{
            const instance = axios.create({
                baseURL:"https://api.openweathermap.org/data/2.5/weather",
                params:{ ...this.paramsOpenWeather,lat,lon }
            })
            const resp = await instance.get();
            return {
                desc:resp.data.weather[0].description,
                min:resp.data.main.temp_min,
                max:resp.data.main.temp_max,
                temp:resp.data.main.temp
            };
        }catch(error){
            console.log(error);
        }
        return resp;
    }

    agregarHistorial(lugar = ""){
        if(this.historial.includes(lugar.toLowerCase()))
            return;
        else{
            this.historial = this.historial.splice(0,5);
            this.historial.unshift(lugar.toLowerCase());
            this.guardarDB();
        }    
    }

    guardarDB(){
        const payload ={
            historial:this.historial
        }
        fs.writeFileSync(this.dbPath,JSON.stringify(payload));
    }

    leerDB(){
        try{
            const info = fs.readFileSync(this.dbPath,{encoding:"utf-8"});
            if(info){
                const data= JSON.parse(info);
                /* data.historial.forEach(lugar =>{
                    this.historial.push(lugar);
                }) */
                this.historial = data.historial;
            }
        }catch(error){
            return;
        }
    }

    capitalizar(palabra = ""){
        const temp = palabra.split(" ");
        for(let i=0;i<temp.length;i++){
            temp[i]=temp[i].charAt(0).toUpperCase()+temp[i].slice(1);
        }
        return temp.join(" ");
    }
}

module.exports = Busquedas;