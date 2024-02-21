<template>
    <div>
        <v-app>
        <!-- Barra de navegación -->
            <v-app-bar app color="primary" dark elevation="0">
            <v-spacer/>
            <v-toolbar-title :style="{ fontFamily: 'Courier New', fontSize: '30px', fontWeight: 'bold' }">Menú Principal 😉</v-toolbar-title>
            <v-spacer/>
        </v-app-bar>
        <!-- Contenido del menú -->
        <v-container>
        <!-- Opción para ingresar correo y contraseña -->
        <v-row justify="center">
            <v-col cols="12" class="text-center">
            <v-card style="margin: 0 auto; max-width: 400px;">
            <v-spacer/>
            <v-card-title>Iniciar Sesión</v-card-title>
                <v-card-text>
                  <v-text-field v-model="correo" label="Correo"></v-text-field>
                  <v-text-field v-model="contrasena" label="Contraseña" type="password"></v-text-field>
                  <v-btn block @click="iniciarSesion" color="primary">Iniciar Sesión</v-btn>
              </v-card-text>
            </v-card>
            </v-col>
        </v-row>
        <!-- Opción para acceder directamente a las tablas como invitado -->
        <v-row justify="center">
            <v-col cols="12" class="text-center">
              <v-card style="margin: 0 auto; max-width: 260px;">
                <v-card-text>
                  <v-btn @click="accederComoInvitado" color="primary">Acceder como Invitado</v-btn>
                </v-card-text>
              </v-card>
            </v-col>
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
          const response= await this.axios.post('/usuarios/iniciar_sesion', {
            correo,
            contrasena
          });

          const usuarioEncontrado = response.data;

          if (usuarioEncontrado){
            const login_correo = this.correo
            const api_data = await this.axios.get('/usuarios/un_usuario/'+login_correo.toString());
            this.id_usuario = JSON.stringify(api_data.data);
            this.$emit('clicked',this.id_usuario);
            this.contrasena='';
            this.correo=''
            this.$router.push('/menu_admin');
          } else {
            console.log('Credenciales Invalidas: ', correo,', ', contrasena);
          }

        } catch (error) {
          // Manejar el error, por ejemplo, mostrar un mensaje de error al usuario
          console.error('Error al iniciar sesión:', error);
        }
      },
      
      accederComoInvitado() {
        // Lógica para acceder a las tablas como invitado
        this.$router.push('/menu');
        console.log('Acceder como Invitado');
        // Puedes redirigir a la página de las tablas o realizar alguna acción específica
      },
    },
  };
  </script>