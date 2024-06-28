<title>Estructuras del coro por misa (Usuario)</title>

<template>
    <v-container style="padding: 112px 50px 10px;">
        <v-card class="mx-auto" width="500px">
            <v-card-title>
                <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line
                    hide-details></v-text-field>
            </v-card-title>
            <v-app-bar app color="blue darken-4" dark elevation="0">
                <v-btn color="error" elevation="0" @click="salir()">Salir</v-btn>
                <v-toolbar-title style=' font-family:"Courier New"; font-size:30px; font-weight:bold; padding-left: 40%;'>Usuario
                    🤓</v-toolbar-title>
                <v-spacer />
            </v-app-bar>
            <!-- Tabla de Misas -->
            <v-data-table elevation="0" :search="search" :headers="encabezados" :items="misas" :items-per-page="6"
                style="margin: 0 auto; max-width: 450px">
                <template v-slot:top>
                    <v-toolbar flat>
                        <v-toolbar-title
                            :style="{ fontFamily: 'Courier New', fontSize: '30px', fontWeight: 'bold' }">Misas</v-toolbar-title>
                        <v-spacer />
                        <v-btn dark elevation="0" outlined color="primary" @click="toggleDarkMode">
                            <v-icon dark>mdi-opacity</v-icon>
                            Cambiar Tema
                        </v-btn>
                    </v-toolbar>
                </template>
                <template v-slot:[`item.actions`]="{ item }">
                    <v-row align="center" justify="center">
                        <v-col>
                            <v-tooltip top color="teal darken-1">
                                <template #activator="{ on, attrs }">
                                    <v-btn v-bind="attrs" icon color="teal darken-1" @click="verDetalles(item)" v-on="on">
                                        <v-icon>mdi-eye</v-icon>
                                    </v-btn>
                                </template>
                                <span>Ver detalles de la misa {{ item.mi_fecha }}</span>
                            </v-tooltip>
                        </v-col>
                    </v-row>
                </template>
            </v-data-table>
            <v-dialog v-model="d_dialog" max-width="500px" persistent>
                    <v-card>
                        <v-card-title>Registro de misa</v-card-title>
                        <v-card-text>
                            <v-container v-if="misaSeleccionada">
                                <v-row>
                                    <v-col cols="6">
                                        <v-text-field dense label="Fecha" v-model="misaSeleccionada.mi_fecha"
                                            readonly></v-text-field>
                                        <v-text-field dense label="Tipo" v-model="misaSeleccionada.mi_tipo"
                                            readonly></v-text-field>
                                        <v-text-field dense label="Entrada" v-model="misaSeleccionada.mi_entrada"
                                            readonly></v-text-field>
                                        <v-text-field dense label="Piedad" v-model="misaSeleccionada.mi_piedad"
                                            readonly></v-text-field>
                                        <v-text-field dense label="Gloria" v-model="misaSeleccionada.mi_gloria"
                                            readonly></v-text-field>
                                        <v-text-field dense label="Salmo" v-model="misaSeleccionada.mi_salmo"
                                            readonly></v-text-field>
                                    </v-col>
                                    <v-col cols="6">
                                        <v-text-field dense label="Aleluya/Honor y gloria"
                                            v-model="misaSeleccionada.mi_aleluya" readonly></v-text-field>
                                        <v-text-field dense label="Ofertorio" v-model="misaSeleccionada.mi_ofertorio"
                                            readonly></v-text-field>
                                        <v-text-field dense label="Santo" v-model="misaSeleccionada.mi_santo"
                                            readonly></v-text-field>
                                        <v-text-field dense label="Cordero" v-model="misaSeleccionada.mi_cordero"
                                            readonly></v-text-field>
                                        <v-text-field dense label="Comunion" v-model="misaSeleccionada.mi_comunion"
                                            readonly></v-text-field>
                                        <v-text-field dense label="Salida" v-model="misaSeleccionada.mi_salida"
                                            readonly></v-text-field>
                                    </v-col>
                                    <v-textarea outlined label="Comentario" v-model="misaSeleccionada.mi_comentario"
                                        readonly rows="1" auto-grow></v-textarea>
                                </v-row>
                            </v-container>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn elevation="-1" color="error" @click="cancelar()">Salir</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
        </v-card>
    </v-container>
</template>

<script>
export default {
    name: 'home',
    metaInfo: {
        title: 'Menú principal',
    },
    components: {
    },
    data() {
        return {
            search: '',
            darkMode: false,
            // Encabezados Usuarios
            encabezados: [
                { text: 'Fecha', value: 'mi_fecha' },
                { text: 'Tipo', value: 'mi_tipo' },
                { text: 'Acciones', sortable: false, value: 'actions' }
            ],

            misas: [],

            bm_dialog: false,
            nm_dialog: false,
            d_dialog: false,
            fechaPickerVisible: false,
            mostrarDialogo: false,

            nueva_misa: {
                mi_fecha: '',
                mi_tipo: '',
                mi_entrada: '',
                mi_piedad: '',
                mi_gloria: '',
                mi_salmo: '',
                mi_aleluya: '',
                mi_ofertorio: '',
                mi_santo: '',
                mi_cordero: '',
                mi_comunion: '',
                mi_salida: '',
                mi_comentario: '',
            },

            misaSeleccionada: null,

            elevation: 'elevation-1',

            tipo: ['Ordinario', 'Contrato', 'XV años', 'Boda', 'Bautizo', 'Oficio', 'Otro'],

            entrada: [],

            piedad: [],

            gloria: [],

            salmo: [],

            aleluya: [],

            ofertorio: [],

            santo: [],

            cordero: [],

            comunion: [],

            salida: [],

            comentario: []
        };
    },

    created() {
        this.llenar_misas();
        this.obtenerDatosCanto('entrada', '/cantos/todos_entrada');
        this.obtenerDatosCanto('piedad', '/cantos/todos_piedad');
        this.obtenerDatosCanto('gloria', '/cantos/todos_gloria');
        this.obtenerDatosCanto('salmo', '/cantos/todos_salmo');
        this.obtenerDatosCanto('aleluya', '/cantos/todos_aleluya');
        this.obtenerDatosCanto('ofertorio', '/cantos/todos_ofertorio');
        this.obtenerDatosCanto('santo', '/cantos/todos_santo');
        this.obtenerDatosCanto('cordero', '/cantos/todos_cordero');
        this.obtenerDatosCanto('comunion', '/cantos/todos_comunion');
        this.obtenerDatosCanto('salida', '/cantos/todos_salida');
        this.obtenerDatosCanto('comentario', '/cantos/todos_comentario');
    },
    methods: {
        toggleDarkMode() {
            this.darkMode = !this.darkMode;
            this.$vuetify.theme.dark = this.darkMode; // Cambiar dinámicamente el tema oscuro
        },

        async obtenerDatosCanto(nombreArreglo, url) {
            try {
                const response = await this.axios.get(url)
                this[nombreArreglo] = response.data
            } catch (error) {
                console.error(error)
            }
        },
        async llenar_misas() {
            const api_data = await this.axios.get('/misa/misa_base/');
            this.misas = api_data.data.map((misa) => ({
                ...misa,
            }))
        },
        cancelar() {
            this.nueva_misa = {
                mi_fecha: '',
                mi_tipo: '',
                mi_entrada: '',
                mi_piedad: '',
                mi_gloria: '',
                mi_salmo: '',
                mi_aleluya: '',
                mi_ofertorio: '',
                mi_santo: '',
                mi_cordero: '',
                mi_comunion: '',
                mi_salida: '',
                mi_comentario: '',
            };
            this.d_dialog = false
            this.nm_dialog = false
            this.mostrarDialogo = false
            this.bm_dialog = false
            this.misaSeleccionada = null
        },
        async verDetalles(item) {
            const mi_id = item.mi_id;
            const api_data_uno = await this.axios.get(`/misa/misabase/${mi_id}`);
            const detallesMisa = api_data_uno.data;

            this.misaSeleccionada = detallesMisa; // Establecer la misa seleccionada
            this.d_dialog = true;
        },
        salir (){
            this.$router.push({
                path: '/'
            })
        }   
    }
};
</script>

<style>
.centered-title {
    text-align: center;
    margin: auto;
}
</style>