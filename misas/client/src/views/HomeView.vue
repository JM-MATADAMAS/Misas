<template>
  <div>
    <v-app>
      <!-- Barra de navegación -->
      <v-app-bar app color="blue darken-4" dark elevation="0">
        <v-spacer />
        <v-toolbar-title :style="{ fontFamily: 'Courier New', fontSize: '30px', fontWeight: 'bold' }">Menú Principal
        </v-toolbar-title>
        <v-spacer />
      </v-app-bar>
      <!-- Contenido del menú -->
      <v-container style="padding: 112px 0px 0px;">
        <!-- Opción para ingresar correo y contraseña -->
        <v-row justify="center">
          <v-col cols="12" class="text-center">
            <v-card style="margin: 0 auto; max-width: 400px;">
              <v-spacer />
              <v-card-title style="margin: 0 auto; text-align: center;">Iniciar Sesión</v-card-title>
              <v-card-text>
                <v-text-field v-model="correo" label="Correo" @keydown.enter="iniciarSesion"></v-text-field>

                <v-text-field v-model="contrasena" label="Contraseña" type="password"
                  @keydown.enter="iniciarSesion"></v-text-field>

                <v-btn elevation="-1" block @click="iniciarSesion" dark color="blue darken-4">
                  Iniciar Sesión
                </v-btn>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <!-- Opción para acceder directamente a las tablas como invitado -->
        <v-row justify="center">
          <v-card style="margin: 0 auto; max-width: 260px;">
            <v-btn elevation="-1" @click="accederComoInvitado" dark color="green darken-2">Acceder como Invitado</v-btn>
          </v-card>
        </v-row>
      </v-container>
    </v-app>
  </div>
</template>

<script>
export default {
  metaInfo: {
    title: 'Inicio de sesión',
  },
  data() {
    return {
      correo: [],
      contrasena: '',
      id_usuario: ''
    };
  },
  methods: {
    async iniciarSesion() {
      try {
        const correo = this.correo;
        const contrasena = this.contrasena;
        // Manejar la respuesta del servidor, por ejemplo, redirigir a la página de misas
        const response = await this.axios.post('http://localhost:3000/usuarios/iniciar_sesion', {
          correo,
          contrasena
        });

        const usuarioEncontrado = response.data;

        if (usuarioEncontrado) {
          // Emitir un evento con toda la información del usuario
          this.$emit('usuario-iniciado', usuarioEncontrado);
          localStorage.setItem('token', response.data.contrasena,)
          setTimeout(() => {
            localStorage.removeItem('token')
          }, (1000 * 60 * 60 * 1))
          this.contrasena = '';
          this.correo = '';
          this.$router.push('/menu_admin');
        } else {
          console.log('Credenciales Invalidas: ', correo, ', ', contrasena);
        }

      } catch (error) {
        // Manejar el error, por ejemplo, mostrar un mensaje de error al usuario
        console.error('Error al iniciar sesión:', error);
      }
    },

    accederComoInvitado() {
      this.$router.push('/menu');
    },
  },
};
</script>

<style>
.centered-title {
  text-align: center;
  margin: auto;
}
</style>