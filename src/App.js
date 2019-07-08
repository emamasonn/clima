import React, {Component} from 'react';
import Header from './componentes/Header';
import Formulario from './componentes/Formulario';
import Error from './componentes/Error';
import Clima from './componentes/Clima';

class App extends Component{


  state = {
    error: '',
    consulta: {},
    resultado: {}
  }

  componentDidUpdate(prevProps, prevState){
    if(prevState.consulta !== this.state.consulta){
      this.consultaApi();
    }
    
  }
  componentDidMount(){
    this.setState({
      error: false
    });
  }

  consultaApi = () => {
    const {ciudad, pais} = this.state.consulta
    //if(!ciudad || !pais) return null;

    const appId = '72009e2d95b27ced6bb24c0d4c04c1b8';
    //query con fetch api
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;
    
    fetch(url)
      .then(respuesta => {
        return respuesta.json()
      })
      .then(datos => {
        if(datos.cod === '404'){
          this.setState({
            error: true
          })
        }else{
          this.setState({
            resultado: datos,
            error: false   
          })
        }
      })
      .catch(error =>{
        console.log(error);

      });
    //leer la url y agregar el API key

    //consultar con fetch
  }
  datosConsulta = respuesta => {
    if(respuesta.ciudad === '' || respuesta.pais === ''){
        this.setState({
          error: true
        });
    }else{
      this.setState({
        consulta: respuesta,
      });
    }
  }
  render(){
    const error = this.state.error;

    let resultado;

    if(error){ 
      resultado = <Error mensaje = 'Ambos campos son obligatorios o los datos ingresados son incorrectos' />
    }else{
      resultado = <Clima resultado = {this.state.resultado} />
    }

    return(
        <div className="app">
            <Header
              titulo= 'Clima'
            />
            <Formulario 
              datosConsulta ={this.datosConsulta}
            />
            {resultado}
        </div>
    );
  }
}

export default App;
