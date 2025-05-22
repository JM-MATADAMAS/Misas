<template>
  <v-app>
    <v-container>
      <!-- Botón para regresar -->
      <v-row justify="start" class="mb-4">
        <v-col cols="auto">
          <v-btn color="primary" outlined @click="$router.go(-1)">
            <v-icon left>mdi-arrow-left</v-icon>
            Regresar
          </v-btn>
        </v-col>
      </v-row>

      <!-- Contenido existente -->
      <v-row justify="center" class="mt-5">
        <v-col cols="12" md="8">
          <v-card outlined>
            <v-card-title class="headline text-center">Quitar Canto</v-card-title>
            <v-card-subtitle class="text-center">
              Selecciona un tipo de registro y un canto para eliminarlo.
            </v-card-subtitle>
            <v-card-text>
              <v-row class="mb-4">
                <v-col>
                  <!-- Primer v-select para seleccionar el tipo de registro -->
                  <v-select 
                    :items="campos" 
                    label="Selecciona el tipo de registro" 
                    v-model="tipoSeleccionado"
                    @change="cargarCantosPorTipo"
                    outlined
                  ></v-select>
                </v-col>
              </v-row>
              <v-row v-if="tipoSeleccionado" class="mb-4">
                <v-col>
                  <!-- Segundo v-select para mostrar los cantos correspondientes -->
                  <v-select 
                    :items="cantos" 
                    label="Selecciona un canto" 
                    v-model="cantoSeleccionado"
                    outlined
                  ></v-select>
                </v-col>
              </v-row>
              <v-row v-if="cantoSeleccionado" justify="center" class="mb-4">
                <v-col cols="auto">
                  <!-- Botón para eliminar el canto -->
                  <v-btn color="red" dark @click="mostrarConfirmacion = true">
                    <v-icon left>mdi-delete</v-icon>
                    Eliminar canto
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Alertas -->
      <v-row justify="center" class="mt-4">
        <v-col cols="12" md="8">
          <v-alert 
            v-if="mostrarAlerta"
            type="success" 
            dismissible 
            @input="mostrarAlerta = false"
          >
            Canto eliminado exitosamente.
          </v-alert>
          <v-alert 
            v-if="mostrarError"
            type="error" 
            dismissible 
            @input="mostrarError = false"
          >
            No se pudo borrar el canto. Verifique si el canto ha sido eliminado de todos los registros donde fue puesto.
          </v-alert>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: 'Quitar_canto',
  data() {
    return {
      campos: ["Entrada", "Piedad", "Gloria", "Salmo", "Aleluya", "Ofertorio", "Santo", "Cordero", "Comunion", "Salida"],
      tipoSeleccionado: null, // Almacena el tipo de registro seleccionado
      cantoSeleccionado: null, // Almacena el canto seleccionado
      cantos: [], // Lista de cantos cargados dinámicamente
      mostrarConfirmacion: false, // Controla la visibilidad de la tarjeta de confirmación
      mostrarAlerta: false, // Controla la visibilidad del mensaje de éxito
      mostrarError: false, // Controla la visibilidad del mensaje de error
    };
  },
  methods: {
    async cargarCantosPorTipo() {
      if (!this.tipoSeleccionado) return;

      const rutas = {
        Entrada: '/cantos/todos/entrada',
        Piedad: '/cantos/todos/piedad',
        Gloria: '/cantos/todos/gloria',
        Salmo: '/cantos/todos/salmo',
        Aleluya: '/cantos/todos/aleluya',
        Ofertorio: '/cantos/todos/ofertorio',
        Santo: '/cantos/todos/santo',
        Cordero: '/cantos/todos/cordero',
        Comunion: '/cantos/todos/comunion',
        Salida: '/cantos/todos/salida',
      };

      const url = rutas[this.tipoSeleccionado];
      try {
        const response = await this.axios.get(url);
        this.cantos = response.data;
      } catch (error) {
        console.error('Error al cargar los cantos:', error);
      }
    },
    async eliminarCanto() {
      if (!this.tipoSeleccionado || !this.cantoSeleccionado) return;

      try {
        const body = {
          tipo: this.tipoSeleccionado.toLowerCase(),
          nombre: this.cantoSeleccionado,
        };

        await this.axios.delete('/cantos/eliminar', { data: body });

        // Actualizar la lista de cantos después de eliminar
        this.cargarCantosPorTipo();
        this.cantoSeleccionado = null;
        this.mostrarConfirmacion = false;

        // Mostrar alerta de éxito
        this.mostrarAlerta = true;

        console.log('Canto eliminado exitosamente.');
      } catch (error) {
        console.error('Error al eliminar el canto:', error);

        // Mostrar alerta de error
        this.mostrarError = true;
      }
    },
  },
};
</script>