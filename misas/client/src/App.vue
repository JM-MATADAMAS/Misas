<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-toolbar-title>misas</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <router-view /> <!-- Asegúrate de tener esta línea para mostrar el componente actual -->
    </v-main>
  </v-app>
</template>

<script>
import router from './router'; // Asegúrate de importar el enrutador

export default {
  name: "App",
  data: () => ({}),
  components: { router },
};
</script>

<style>
#app {
  background: url('../../Night.jpg');
  background-size: cover;
}
</style>
