<template>
  <div>
      <h1 class="text-center mt-3">Editar</h1>
      <div>
        <p> <strong>Nombre:</strong>{{tarea.nombre}} </p>
        <p> <strong>Id: </strong> {{$route.params.id}} </p>
      </div>
      <form @submit.prevent="updateTarea(tarea)">
        <Input 
            :tarea= "tarea"
        />
      </form>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex';
import Input from '../components/Input';

export default {
    components:{
        Input
    },
    computed:{
        ...mapState(['tarea'])
    },
    methods:{
        ...mapActions(['editTarea', 'updateTarea'])
    },
    created(){
        this.editTarea(this.$route.params.id)
    }

}
</script>