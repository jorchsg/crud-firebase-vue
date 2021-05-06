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
    set(state, payload) {
      state.tareas.push(payload);
      localStorage.setItem('tareas', JSON.stringify(state.tareas));
    },

    delete(state, payload) {
      state.tareas = state.tareas.filter(item => item.id !== payload);
      localStorage.setItem('tareas', JSON.stringify(state.tareas));
    },

    edit(state, payload) {
      if (!state.tareas.find(item => item.id === payload)) {
        router.push('/')
        return
      }
      state.tarea = state.tareas.find(item => item.id === payload);
      localStorage.setItem('tareas', JSON.stringify(state.tareas));
    },

    update(state, payload) {
      state.tareas = state.tareas.map(item => item.id === payload.id ? payload : item);
      localStorage.setItem('tareas', JSON.stringify(state.tareas));
      router.push('/');
    },
    upload(state, payload) {
      state.tareas = payload;
    }
  },
  actions: {
    setTareas({ commit }, tarea) {
      commit('set', tarea);
    },

    deleteTarea({ commit }, id) {
      commit('delete', id);
    },

    editTarea({ commit }, id) {
      commit('edit', id);
    },

    updateTarea({ commit }, tarea) {
      commit('update', tarea);
    },

    uploadLocalStorage({ commit }) {
      if (localStorage.getItem('tareas')) {
        console.log('Exists');
        const tareas = JSON.parse(localStorage.getItem('tareas'));
        commit('upload', tareas);
        return;
      }
      localStorage.setItem('tareas', JSON.stringify([]));
    }
  }
})
