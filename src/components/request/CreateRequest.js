import React from "react";

export default class CreateRequest extends React.Component {

    render(){
        return(
            <div>
                <br></br>
                
                    <input 
                        type="text" 
                        placeholder="Legajo"></input>
                    <input 
                        type="text" 
                        placeholder="Nombre"></input>
                    <input 
                        type="text" 
                        placeholder="Apellido"></input>
                    <input 
                        type="text" 
                        placeholder="Nro. de Documento"></input>

                
            </div>
        );
    }

}