import { createStore } from 'vuex'
import router from '../router';

export default createStore({
  state: {
    tareas: [],
    tarea: {
      id: '',
      nombre: '',
      categoria: [],
      estado: '',
      numero: 0
    },
  },
  mutations: {
    load(state, payload) {
      state.tareas = payload;
    },

    set(state, payload) {
      state.tareas.push(payload);
    },

    delete(state, payload) {
      state.tareas = state.tareas.filter(item => item.id !== payload);
    },

    edit(state, payload) {
      if (!state.tareas.find(item => item.id === payload)) {
        router.push('/')
        return
      }
      state.tarea = state.tareas.find(item => item.id === payload);
    },

    update(state, payload) {
      state.tareas = state.tareas.map(item => item.id === payload.id ? payload : item);
      router.push('/');
    }
  },
  actions: {
    async loadLocalStorage({ commit }) {
      try {
        const response = await fetch('https://crud-form-vue-default-rtdb.firebaseio.com/tareas.json');
        const dataDB = await response.json();

        const arrayTasks = []

        for (let id in dataDB) {
          arrayTasks.push(dataDB[id]);
        }
        commit('load', arrayTasks)

      } catch (err) {
        console.error('Upps!, Something Wrong: ', err)
      }
    },

    async setTareas({ commit }, tarea) {
      try {
        const response = await fetch(`https://crud-form-vue-default-rtdb.firebaseio.com/tareas/${tarea.id}.json`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(tarea)
        });
        const db = await response.json();
        console.log(db);
        commit('set', tarea);
      } catch (err) {
        console.error('Opps Something Wronng', err)
      }
    },

    async deleteTarea({ commit }, id) {
      try {
        await fetch(`https://crud-form-vue-default-rtdb.firebaseio.com/tareas/${id}.json`, {
          method: 'Delete'
        });
        commit('delete', id);
      } catch (error) {
        console.error('Ups, something wrong: ', error);
      }
    },

    editTarea({ commit }, id) {
      commit('edit', id);
    },

    async updateTarea({ commit }, tarea) {
      try {

        const response = await fetch(`https://crud-form-vue-default-rtdb.firebaseio.com/tareas/${tarea.id}.json`, {
          method: 'PATCH',
          body: JSON.stringify(tarea)
        });
        const dataDB = await response.json();
        console.log(dataDB);
        commit('update', dataDB);

      } catch (err) {
        console.error('Ups, something wrong: ', err)
      }
    }

  }
})
