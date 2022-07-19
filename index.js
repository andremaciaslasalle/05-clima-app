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
                //mostrar mensaje
                const termino = await leerInput("Ciudad: ");
                const lugares = await busqueda.ciudad(termino);
                const id = await listarLugares(lugares);
                const lugarSeleccionado = lugares.find( l => l.id === id);
                //buscar los lugares
                //seleccionar el lugar
                //clima
                //mostrar 
                if(lugarSeleccionado){
                    console.log("\nInformación de la ciudad\n".green);
                    console.log("Ciudad:",lugarSeleccionado.nombre);
                    console.log("Lat:",lugarSeleccionado.lat);
                    console.log("Long:",lugarSeleccionado.lng);
                    console.log("Temperatura:",);
                    console.log("Mínima:",);
                    console.log("Máxima:",);
                }
                
                break;
        }
        if(menu!==0) await pausa();
    }while(menu!==0)
}

main();