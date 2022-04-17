import React from "react";
import {collegeSubect} from '../../utils/mock.js';
import Select from 'react-select';
import './CreateRequest.css';
import { FcCancel } from "react-icons/fc";
import * as ReactDOM from 'react-dom';

export default class CreateRequest extends React.Component {

    constructor(props){
        super(props);
        this.state={
            legajo:'',
            nroDocumento:'',
            materias :[],
            subOptions: [],
            materiaTemp: {},
            comisionTemp: {}
        };
        this.opcionesMaterias = collegeSubect.map( function(elem){
         var ret = {"value": elem, "label": elem.nombre} 
         return ret;          
        });
        this.subCommi=true;
    }
    _submit(e){
        e.preventDefault();
        console.log('Solicitud de cupo', this.state);
        this._clean(e);
    }
    _setValueInput = (e) => {
        e.preventDefault();
        console.log(e.target.id + e.target.value);
        this.setState({
            [e.target.id] : e.target.value
        });
    }
    _clean(e) {
        e.preventDefault();
        this.setState({
            legajo:'',
            nroDocumento:'',
            materias :[],
            subOptions:[]
        })
    }
    _onSelectCom(com){
        console.log(com.value);
        if(this.state.materias.filter(mat => mat.codigo == com.value.codigo).length == 0){
            let mats = this.state.materias;
            mats.push(com.value);
            this.setState({'materias': mats});
        }else{
            let mats = this.state.materias.filter(mat => mat.codigo != com.value.codigo);
            mats.push(com.value);        
            this.setState({'materias': mats});

        }
        this.setState({materiaTemp: '', comisionTemp: ''});
    }
    _onSelectChange = (materia) => {
        this.subCommi = false;
        this.setState({'subOptions':materia.value.comisiones.map(function(comision){
            return {"value":{ 'codigo':materia.value.codigo , 'codComision': comision.codComision, 'nombre':materia.value.nombre, 'horario':comision.horaInicio+ "-"+comision.horaFin }, "label": comision.codComision + " - Horario:" + 
            "" + comision.horaInicio+ "-"+comision.horaFin }
        }), materiaTemp: materia});
      }
    _cleanCom(com, evt){
        evt.preventDefault();
        console.log(com);
    }
    _getOptions(){
        return(<span>
            {this.state.materias.map(matSelect => {
                return (<div>
                    Materia: {matSelect.nombre}  - Comision: {matSelect.codComision} - Horario: {matSelect.horario} <button onClick={ e => this._cleanCom(matSelect, e)}><FcCancel  /></button>
                </div>)
            }) }
            
        </span>)
    }const 


    render(){
        return(
            <div>
                <br/>
                <div className="box">
                    <h4>Completa la siguiente solicitud para pedir Cupo: </h4>
                    <br/>
                        <form onSubmit={ e=> this._submit(e)}>
                            <input className="input"
                                type="text"
                                name="legajo"
                                id="legajo" 
                                placeholder="Legajo"
                                onChange={ e => this._setValueInput(e)}></input>
                            <br/>
                            <input className="input"
                                type="number"
                                id="nroDocumento"
                                placeholder="Nro. de Documento"
                                name="nroDocumento"
                                onChange={ e => this._setValueInput(e)}></input>
                            <br/>
                            <br/>
                            <Select id="selectMateria" 
                                    options={this.opcionesMaterias} 
                                    onChange={ materia => this._onSelectChange(materia)}
                                    value={this.state.materiaTemp || ''} />
                            <br/>
                            <Select id="selectComision" 
                                    options={this.state.subOptions} 
                                    onChange={     
                                    comision =>this._onSelectCom(comision)}
                                    value={this.state.comisionTemp} >
                            </Select>
                            <div>
                                <br/>
                                { this.state.materias.length == 0 ? <div></div> :  this._getOptions()}
                            </div>
                            <div>
                                <button className="button" type="submit">Solicitar Cupo</button>
                            </div>
                        </form>
                </div>    
            </div>
        );
    }

}