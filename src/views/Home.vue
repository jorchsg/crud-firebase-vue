<template>
  <h1 class="my-5">Formularios Con Vue JS</h1>
  <form @submit.prevent="procesarFormulario">
    <Input :tarea="tarea" />
  </form>

  <hr>
  <div>
    <p>{{mensaje}}</p>
  </div>

  <div>
    <ListaTareas />
  </div>
</template>

<script>
import Input from '@/components/Input';
import ListaTareas from '@/components/ListaTareas';
import {mapActions} from 'vuex';
const shortid = require('shortid');

export default {
  name: 'Home',
  components: {
    Input, ListaTareas    
  },
  data(){
    return {
      tarea: {
        id: '',
        nombre: '',
        categoria: [],
        estado: '',
        numero: 0
      },
      mensaje : ''
    }
  },
  methods: {
    ...mapActions(['setTareas']),
    procesarFormulario(){
      console.log(this.tarea)
      if(this.tarea.nombre.trim() === ''){
        this.mensaje= 'Favor de Llenar el Formulario'
        return
      }else{
        this.mensaje = "Formulario Enviado con Éxito"
        
        // Generar iD
        this.tarea.id = shortid.generate();

        // Enviar los datos
        this.setTareas(this.tarea);

        // Limpiar Formulario
        this.tarea = {
          id: '',
          nombre: '',
          categoria: [],
          estado: '',
          numero: 0
        };
      }      
    }
  },
 
}
</script>
