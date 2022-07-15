const {inquirerMenu,leerInput} = require("./helpers/inquirer");

const main = async() =>{
    const texto = await leerInput("Un mensaje");
    console.log(texto);
}

main();