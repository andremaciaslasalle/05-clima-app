const inquirer = require("inquirer");
require("colors");

const preguntas = [
    {
        type:"list",
        name:"opcion",
        message:"¿Qué desea hacer?".white,
        choices:[
            {
                value:"1",
                name:""
            },
            {
                value:"2",
                name:""
            },
            {
                value:"3",
                name:""
            }
        ]
    }
]

const inquirerMenu = async() =>{
    console.clear();
    console.log("=================================".green);
    console.log("     Seleccione una opción ".white);
    console.log("=================================\n".green);

    const { opcion } = await inquirer.prompt(preguntas);

    return opcion;

}

const leerInput = async(message) =>{
    const question = [
        {
            type:"input",
            name:"desc",
            message,
            validate (value){
                if (value.length===0){
                    return "Por favor ingrese un valor";
                }
                return true;
            }
        }
    ]
    const {desc} = await inquirer.prompt(question);
    return desc;
}

module.exports = {
    inquirerMenu,
    leerInput
}