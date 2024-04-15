<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
      elevation="0"
    >
      <v-toolbar-title>misas</v-toolbar-title>
    </v-app-bar>
    <v-main style="padding: 0px 0px 0px;" elevation="0">
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
.custom-padding {
  padding: 0px 0px 0px 56px; /* Ajusta el valor según tus necesidades */
  }

</style>
