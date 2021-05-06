<template>
    <table class="table">
        <thead>
            <tr>
                <th scope="col">Id</th>
                <th scope="col">Nombre</th>
                <th scope="col">Categoria</th>
                <th scope="col">Estado</th>
                <th scope="col">Número</th>
                <th scope="col">Acciones</th>
                
            </tr>
        </thead>
        <tbody>
            <tr v-for="(tarea) in tareas" :key="tarea.id">
                <th scope="row">{{tarea.id}}</th>
                <td>{{tarea.nombre}}</td>
                <td>{{tarea.categoria.join(', ')}}</td>
                <td>{{tarea.estado}}</td>
                <td>{{tarea.numero}}</td>
                <td>
                    <button 
                        class="btn btn-danger btn-sm" 
                        @click="deleteTarea(tarea.id)"
                    >
                        Eliminar
                    </button>
                    <router-link
                        class="btn btn-warning btn-sm ml-2"
                        :to="{
                            name: 'Editar',
                            params: {
                                id: tarea.id
                            }
                        }"
                    >
                        Editar
                    </router-link>
                </td>
            </tr>
                
        </tbody>
    </table>
</template>

<script>
import {mapState, mapActions} from 'vuex';

export default {
    computed: {
        ...mapState(['tareas']),
    },
    methods: {
         ...mapActions(['deleteTarea'])
    }
}
</script>