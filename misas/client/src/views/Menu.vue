<title>Estructuras del coro por misa (Usuario)</title>

<template>
    <v-container>
        <v-app-bar app color="primary" dark elevation="0">
            <v-spacer/>
            <v-toolbar-title :style="{ fontFamily: 'Courier New', fontSize: '30px', fontWeight: 'bold' }">Usuario 🤓</v-toolbar-title>
            <v-spacer/>
            <!--v-toolbar-title :style="{ fontFamily: 'Courier New', fontSize: '30px', fontWeight: 'bold' }">SH</v-toolbar-title-->
        </v-app-bar>
        <!-- Tabla de Misas -->
        <v-data-table :headers="encabezados" :items="misas" :items-per-page="15" :class="elevation-1"  style="margin: 0 auto; max-width: 400px">
            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title :style="{ fontFamily: 'Courier New', fontSize: '30px', fontWeight: 'bold' }">Misas</v-toolbar-title>
                </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
                <v-icon @click="verDetalles(item)" small>
                    mdi-eye
                </v-icon>
            </template>
        </v-data-table>
        <v-dialog v-model="d_dialog" max-width="500px">
        <v-card>
            <v-card-title>Cantos de la misa</v-card-title>
            <v-card-title>Pulsar salir SI o SI</v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row v-for="(item, index) in misas" :key="index">
                            <v-col cols="12">
                                <v-text-field class="centered-title" label="Fecha" v-model="item.mi_fecha" 
                                :style="{ fontFamily: 'Courier New', fontSize: '30px', fontWeight: 'bold' }" disabled></v-text-field>
                                <v-text-field label="Tipo" v-model="item.mi_tipo"
                                :style="{ fontFamily: 'Courier New', fontSize: '30px', fontWeight: 'bold' }" disabled></v-text-field>
                                <v-text-field label="Entrada" v-model="item.mi_entrada" disabled></v-text-field>
                                <v-text-field label="Piedad" v-model="item.mi_piedad" disabled></v-text-field>
                                <v-text-field label="Gloria" v-model="item.mi_gloria" disabled></v-text-field>
                                <v-text-field label="Salmo" v-model="item.mi_salmo" disabled></v-text-field>
                                <v-text-field label="Aleluya/Honor y gloria" v-model="item.mi_aleluya" disabled></v-text-field>
                                <v-text-field label="Ofertorio" v-model="item.mi_ofertorio" disabled></v-text-field>
                                <v-text-field label="Santo" v-model="item.mi_santo" disabled></v-text-field>
                                <v-text-field label="Cordero" v-model="item.mi_cordero" disabled></v-text-field>
                                <v-text-field label="Comunion" v-model="item.mi_comunion" disabled></v-text-field>
                                <v-text-field label="Salida" v-model="item.mi_salida" disabled></v-text-field>
                                <v-textarea label="Comentario" v-model="item.mi_comentario" disabled auto-grow ></v-textarea>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="error" @click="cancelar()">Salir</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
export default {
    name: 'home',
    metaInfo: {
        title: 'Menú principal',
    },
    components:{
    },
    data() {
        return {
            
            // Encabezados Usuarios
            encabezados: [
                {text: 'Fecha',value: 'mi_fecha'},
                {text: 'Tipo',value: 'mi_tipo'},
                {text: 'Acciones', sortable: false,value: 'actions'}
            ],

            misas: [],
            
            bm_dialog: false,
            nm_dialog: false,
            d_dialog:false,
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

            misasSeleccionadas: [], 

            elevation: 'elevation-1',
            
            tipo:['Ordinario', 'Contrato', 'XV años', 'Boda', 'Bautizo', 'Oficio', 'Otro'],

            entrada: [],

            piedad:[],

            gloria:[],

            salmo: [],

            aleluya:[],
            
            ofertorio:[],
            
            santo:[],

            cordero: [],

            comunion: [],
            
            salida:[],

            comentario:[]
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
        this.obtenerDatosCanto('comentario','/cantos/todos_comentario');
    },
    methods: {
        async obtenerDatosCanto(nombreArreglo, url) {
            try {
                const response = await this.axios.get(url);
                this[nombreArreglo] = response.data;
            } catch (error) {
                console.error(error);
            }
        },
        async llenar_misas() {
            const api_data = await this.axios.get('/misa/misa_base/');
            this.misas = api_data.data.map((misa) => ({
                ...misa,
            }));
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
            this.d_dialog = false;
            this.nm_dialog = false;
            this.mostrarDialogo= false;
            this.bm_dialog = false;
            this.llenar_misas();
        },
        async verDetalles(item) {
            const mi_id = item.mi_id;
            const api_data = await this.axios.get(`/misa/misabase/${mi_id}`);
            const detallesMisa = api_data.data;
            this.misas = []; // Vaciar el arreglo de misas
            this.misas.push(detallesMisa); // Agregar los detalles de la misa actual al arreglo
            this.d_dialog = true;
        },
    }
};
</script>

<style>
    .centered-title {
        text-align: center;
        margin: auto;
    }
</style>