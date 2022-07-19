const {inquirerMenu,leerInput,pausa,listarLugares} = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");
require("dotenv").config();

const main = async() =>{
    let menu = 1;
    const busqueda = new Busquedas();
    do{
        menu = await inquirerMenu();
        switch(menu){
            case 1:
                const termino = await leerInput("Ciudad: ");
                const lugares = await busqueda.ciudad(termino);
                const id = await listarLugares(lugares);
                const lugarSeleccionado = lugares.find( l => l.id === id);
                if(lugarSeleccionado){
                    const clima= await busqueda.climaLugar(lugarSeleccionado.lat,lugarSeleccionado.lng);
                    console.log("\nInformación de la ciudad\n".green);
                    console.log("Ciudad:",lugarSeleccionado.nombre.green);
                    console.log("Lat:",lugarSeleccionado.lat);
                    console.log("Long:",lugarSeleccionado.lng);
                    console.log("Temperatura:",clima.temp);
                    console.log("Mínima:",clima.min);
                    console.log("Máxima:",clima.max);
                    console.log("Descripción del clima:",clima.desc.green);
                    busqueda.agregarHistorial(lugarSeleccionado.nombre);
                }
                break;
            case 2:
                busqueda.HistorialCapitalizado.forEach((lugar,i) => {
                    const idx = `${i+1}`.green;
                    console.log(`${idx} ${lugar}`);
                })
                break;
        }
        if(menu!==0) await pausa();
    }while(menu!==0)
}

main();