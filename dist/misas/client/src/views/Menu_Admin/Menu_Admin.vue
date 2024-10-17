<title>Estructuras del coro por misa(Admin)</title>
<template>
    <v-app>
        <v-btn  
            @click="toggleDrawer" 
            class="floating-button"
            color="primary"
            plain 
        >
            <v-icon>mdi-menu</v-icon>
        </v-btn>
        <v-navigation-drawer
            v-model="drawer"
            app
            class="pt-2"
            elevation="0"
            :mini-variant.sync="mini"
            expand-on-hover
            :clipped="$vuetify.breakpoint.width >= 700"
            :temporary="$vuetify.breakpoint.width < 700" 
        >
            <v-list-item class="px-2">
                <v-list-item-avatar>
                    <v-img src="../../../../messi_mundial.webp"></v-img>
                </v-list-item-avatar>
                <v-list-item-title class="font-weight-bold" style="font-family: 'Courier New';">
                    Javier Matadamas
                </v-list-item-title>
            </v-list-item>
            <v-divider />
            <v-list style="padding: 0;">
                <v-list-item-group color="#9575CD">
                    <v-list-item @click="agregarCanto = true">
                        <v-list-item-icon>
                            <v-icon color="deep-purple lighten-2">mdi-database-plus</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title class="font-weight-bold" style="font-family: 'Courier New';">
                            Agregar canto
                        </v-list-item-title>
                    </v-list-item>
                </v-list-item-group>
                <v-divider />
                <v-list-item-group color="primary">
                    <v-list-item @click="toggleDarkMode">
                        <v-list-item-icon>
                            <v-icon dark color="primary">mdi-opacity</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title class="font-weight-bold" style="font-family: 'Courier New';">
                            Cambiar Tema
                        </v-list-item-title>
                    </v-list-item>
                </v-list-item-group>
                <v-divider />
                <v-list-item-group color="success">
                    <v-list-item @click="abrirCuadernillo">
                        <v-list-item-icon>
                            <v-icon dark color="success">mdi-book-open-variant</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title class="font-weight-bold" style="font-family: 'Courier New';">
                            Cuadernillo
                        </v-list-item-title>
                    </v-list-item>
                </v-list-item-group>
                <v-divider />
                <v-list-item-group color="error">
                    <v-list-item @click="salir()">
                        <v-list-item-icon>
                            <v-icon dark color="error">mdi-logout</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title class="font-weight-bold" style="font-family: 'Courier New';">
                            Salir
                        </v-list-item-title>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>

        <v-container app fluid class="py-2">
            <v-card class="mx-auto" max-width="90%" style="width: auto; min-width: 300px;">
                <v-card-title>
                    <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line
                        hide-details></v-text-field>
                </v-card-title>
                <v-data-table :search="search" :headers="encabezados" :items="misas" :items-per-page="5"
                    class="mx-auto">
                    <template v-slot:top>
                        <v-toolbar flat>
                            <v-toolbar-title class="font-weight-bold" style="font-family: 'Courier New';">
                                Misas
                            </v-toolbar-title>
                            <v-spacer/>
                            <v-btn color="success" outlined @click="mostrarDialogo = true">
                                Agregar Misa
                            </v-btn>
                        </v-toolbar>
                    </template>
                    <template v-slot:[`item.actions`]="{ item }">
                        <v-row>
                            <v-col cols="12" sm="12">
                                <v-tooltip top>
                                    <template #activator="{ on, attrs }">
                                        <v-btn v-bind="attrs" icon color="red darken-3" @click="beforeDelete(item)"
                                            v-on="on">
                                            <v-icon>mdi-delete</v-icon>
                                        </v-btn>
                                    </template>
                                    <span>Borrar la misa {{ item.mi_fecha }}</span>
                                </v-tooltip>
                                <v-tooltip top>
                                    <template #activator="{ on, attrs }">
                                        <v-btn v-bind="attrs" icon color="amber darken-2" @click="editarMisa(item)"
                                            v-on="on">
                                            <v-icon>mdi-pencil</v-icon>
                                        </v-btn>
                                    </template>
                                    <span>Modificar la misa {{ item.mi_fecha }}</span>
                                </v-tooltip>
                                <v-tooltip top>
                                    <template #activator="{ on, attrs }">
                                        <v-btn v-bind="attrs" icon color="teal darken-1" @click="verDetalles(item)"
                                            v-on="on">
                                            <v-icon>mdi-eye</v-icon>
                                        </v-btn>
                                    </template>
                                    <span>Ver detalles de la misa {{ item.mi_fecha }}</span>
                                </v-tooltip>
                            </v-col>
                        </v-row>
                    </template>
                </v-data-table>
                <v-dialog v-model="nm_dialog" max-width="500px" persistent>
                    <v-card>
                        <v-card-title>
                            {{ nueva_misa.mi_id ? 'Editar Misa' : 'Nueva Misa' }}
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-row justify="center">
                                    <v-col cols="6" class="text-center">
                                        <v-menu v-model="fechaPickerVisible" :close-on-content-click="false"
                                            transition="scale-transition" offset-y>
                                            <template v-slot:activator="{ on }">
                                                <v-text-field dense v-model="nueva_misa.mi_fecha" label="Fecha" readonly
                                                    v-on="on"></v-text-field>
                                            </template>
                                            <v-date-picker show-adjacent-months v-model="nueva_misa.mi_fecha"
                                                @keydown.enter="guardar_misa"></v-date-picker>
                                        </v-menu>
                                    </v-col>
                                    <v-col cols="6" align-self="auto">
                                        <v-select dense v-model="nueva_misa.mi_tipo" :items="tipo" label="Tipo"
                                            @keydown.enter="guardar_misa"></v-select>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="6">
                                        <v-select dense v-model="nueva_misa.mi_entrada" :items="entrada" label="Entrada"
                                            @keydown.enter="guardar_misa"></v-select>
                                    </v-col>
                                    <v-col cols="6">
                                        <v-select dense v-model="nueva_misa.mi_piedad" :items="piedad" label="Piedad"
                                            @keydown.enter="guardar_misa"></v-select>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="6">
                                        <v-select dense v-model="nueva_misa.mi_gloria" :items="gloria" label="Gloria"
                                            @keydown.enter="guardar_misa"></v-select>
                                    </v-col>
                                    <v-col cols="6">
                                        <v-select dense v-model="nueva_misa.mi_salmo" :items="salmo" label="Salmo"
                                            @keydown.enter="guardar_misa"></v-select>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="6">
                                        <v-select dense v-model="nueva_misa.mi_aleluya" :items="aleluya" label="Aleluya"
                                            @keydown.enter="guardar_misa"></v-select>
                                    </v-col>
                                    <v-col cols="6">
                                        <v-select dense v-model="nueva_misa.mi_ofertorio" :items="ofertorio"
                                            label="Ofertorio" @keydown.enter="guardar_misa"></v-select>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="6">
                                        <v-select dense v-model="nueva_misa.mi_santo" :items="santo" label="Santo"
                                            @keydown.enter="guardar_misa"></v-select>
                                    </v-col>
                                    <v-col cols="6">
                                        <v-select dense v-model="nueva_misa.mi_cordero" :items="cordero" label="Cordero"
                                            @keydown.enter="guardar_misa"></v-select>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="6">
                                        <v-select dense v-model="nueva_misa.mi_comunion" :items="comunion"
                                            label="Comunión" @keydown.enter="guardar_misa"></v-select>
                                    </v-col>
                                    <v-col cols="6">
                                        <v-select dense v-model="nueva_misa.mi_salida" :items="salida" label="Salida"
                                            @keydown.enter="guardar_misa"></v-select>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="12">
                                        <v-textarea outlined v-model="nueva_misa.mi_comentario" label="Comentario"
                                            rows="1" auto-grow></v-textarea>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn elevation="-1" color="error" @click="cancelar">Cancelar</v-btn>
                            <v-spacer />
                            <v-btn elevation="-1" color="success" @click="guardar_misa">Guardar</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
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
                <v-dialog v-model="mostrarDialogo" max-width="500px" persistent>
                    <v-card>
                        <v-card-title>Agregar Misa</v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="6">
                                        <v-menu v-model="fechaPickerVisible" :close-on-content-click="false"
                                            transition="scale-transition" offset-y>

                                            <template v-slot:activator="{ on }">
                                                <v-text-field dense v-model="nueva_misa.mi_fecha" label="Fecha" readonly
                                                    v-on="on"></v-text-field>
                                            </template>
                                            <v-date-picker show-adjacent-months
                                                v-model="nueva_misa.mi_fecha"></v-date-picker>
                                        </v-menu>
                                    </v-col>
                                    <v-col cols="6">
                                        <v-autocomplete dense v-model="nueva_misa.mi_tipo" :items="tipo"
                                            label="Tipo"></v-autocomplete>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="6">
                                        <v-select dense v-model="nueva_misa.mi_entrada" :items="entrada"
                                            label="Entrada"></v-select>
                                    </v-col>
                                    <v-col cols="6">
                                        <v-select dense v-model="nueva_misa.mi_piedad" :items="piedad"
                                            label="Piedad"></v-select>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="6">
                                        <v-select dense v-model="nueva_misa.mi_gloria" :items="gloria"
                                            label="Gloria"></v-select>
                                    </v-col>
                                    <v-col cols="6">
                                        <v-select dense v-model="nueva_misa.mi_salmo" :items="salmo"
                                            label="Salmo"></v-select>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="6">
                                        <v-select dense v-model="nueva_misa.mi_aleluya" :items="aleluya"
                                            label="Aleluya"></v-select>
                                    </v-col>
                                    <v-col cols="6">
                                        <v-select dense v-model="nueva_misa.mi_ofertorio" :items="ofertorio"
                                            label="Ofertorio"></v-select>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="6">
                                        <v-select dense v-model="nueva_misa.mi_santo" :items="santo"
                                            label="Santo"></v-select>
                                    </v-col>
                                    <v-col cols="6">
                                        <v-select dense v-model="nueva_misa.mi_cordero" :items="cordero"
                                            label="Cordero"></v-select>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="6">
                                        <v-select dense v-model="nueva_misa.mi_comunion" :items="comunion"
                                            label="Comunión"></v-select>
                                    </v-col>
                                    <v-col cols="6">
                                        <v-select dense v-model="nueva_misa.mi_salida" :items="salida"
                                            label="Salida"></v-select>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="12">
                                        <v-textarea outlined v-model="nueva_misa.mi_comentario" label="Comentario"
                                            rows="1" no-resize auto-grow></v-textarea>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn elevation="-1" color="error" @click="cancelar">Cancelar</v-btn>
                            <v-spacer />
                            <v-btn elevation="-1" color="success" @click="guardarNuevaMisa">Guardar</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <v-dialog v-model="dialogDelete" max-width="350" persistent>
                    <v-card>
                        <v-card-title class="text-h5">Eliminar misa</v-card-title>
                        <v-card-text>¿Esta seguro de querer eliminar el registro?</v-card-text>
                        <v-card-actions>
                            <v-spacer />
                            <v-btn elevation="-1" color="success" text @click="dialogDelete = false">
                                Cancelar
                            </v-btn>
                            <v-btn elevation="-1" color="error" text @click="eliminar_misa">
                                Eliminar
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <v-dialog v-model="agregarCanto" fullscreen hide-overlay transition="dialog-bottom-transition">
                    <v-card>
                        <v-toolbar dark color="blue darken-4" elevation="0">
                            <v-btn icon dark @click="agregarCanto = false">
                                <v-icon>mdi-close</v-icon>
                            </v-btn>
                            <v-toolbar-title :style="{ fontFamily: 'Courier New', fontSize: '24px', fontWeight: 'bold' }">
                                Agregar canto
                            </v-toolbar-title>
                            <v-spacer></v-spacer>
                        </v-toolbar>

                        <v-list dense>
                            <v-list-item>
                                <v-row>
                                    <v-col cols="12" sm="6" md="2">
                                        <v-list-item-content>
                                            <v-btn @click="dialogEntrada = true">
                                                Canto de entrada
                                            </v-btn>
                                        </v-list-item-content>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="2">
                                        <v-list-item-content>
                                            <v-btn @click="dialogPiedad = true">
                                                Canto de piedad
                                            </v-btn>
                                        </v-list-item-content>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="2">
                                        <v-list-item-content>
                                            <v-btn @click="dialogGloria = true">
                                                Canto de gloria
                                            </v-btn>
                                        </v-list-item-content>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="2">
                                        <v-list-item-content>
                                            <v-btn @click="dialogSalmo = true">
                                                Salmo
                                            </v-btn>
                                        </v-list-item-content>
                                    </v-col>
                                    <v-col cols="12" md="4">
                                        <v-list-item-content>
                                            <v-btn @click="dialogAleluya = true">
                                                Canto de aleluya / honor y gloria
                                            </v-btn>
                                        </v-list-item-content>
                                    </v-col>
                                </v-row>
                            </v-list-item>

                            <v-list-item>
                                <v-row>
                                    <v-col cols="12" sm="6" md="2">
                                        <v-list-item-content>
                                            <v-btn @click="dialogOfertorio = true">
                                                Canto de ofertorio
                                            </v-btn>
                                        </v-list-item-content>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="2">
                                        <v-list-item-content>
                                            <v-btn @click="dialogSanto = true">
                                                Canto de santo
                                            </v-btn>
                                        </v-list-item-content>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="2">
                                        <v-list-item-content>
                                            <v-btn @click="dialogCordero = true">
                                                Canto de cordero
                                            </v-btn>
                                        </v-list-item-content>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="2">
                                        <v-list-item-content>
                                            <v-btn @click="dialogComunion = true">
                                                Canto de comunión
                                            </v-btn>
                                        </v-list-item-content>
                                    </v-col>
                                    <v-col cols="12" md="4">
                                        <v-list-item-content>
                                            <v-btn @click="dialogSalida = true">
                                                Canto de salida
                                            </v-btn>
                                        </v-list-item-content>
                                    </v-col>
                                </v-row>
                            </v-list-item>
                        </v-list>

                        <v-alert v-model="alertaIngresado" class="mx-auto" type="success" max-width="500px" transition="scale-transition">
                            El canto se ingresó correctamente
                        </v-alert>
                        <v-alert v-model="alertaVacio" class="mx-auto" type="error" max-width="500px" transition="scale-transition">
                            Campo vacío
                        </v-alert>
                        <v-alert v-model="alertaExistente" class="mx-auto" type="error" max-width="500px" transition="scale-transition">
                            El canto ya existe
                        </v-alert>
                    </v-card>
                </v-dialog>
                <v-dialog v-model="dialogEntrada" max-width="500px" persistent>
                    <v-card>
                        <v-card-title>Agregar canto de entrada</v-card-title>
                        <v-container>
                            <v-text-field label="Inroduzca el canto de entrada"
                                v-model="nuevo_canto.nu_entrada"></v-text-field>
                            <v-card-actions>
                                <v-btn color="error" @click="cancelarNuevoCanto">Cancelar</v-btn>
                                <v-spacer />
                                <v-btn color="success" @click="GuardarEntrada">Guardar</v-btn>
                            </v-card-actions>
                        </v-container>
                    </v-card>
                </v-dialog><!--Fin del dialogo de Canto de entrada -->
                <v-dialog v-model="dialogPiedad" max-width="500px" persistent>
                    <v-card>
                        <v-card-title>Agregar canto de piedad</v-card-title>
                        <v-container>
                            <v-text-field label="Inroduzca el canto de piedad"
                                v-model="nuevo_canto.nu_piedad"></v-text-field>
                            <v-card-actions>
                                <v-btn color="error" @click="cancelarNuevoCanto">Cancelar</v-btn>
                                <v-spacer />
                                <v-btn color="success" @click="GuardarPiedad">Guardar</v-btn>
                            </v-card-actions>
                        </v-container>
                    </v-card>
                </v-dialog><!--Fin del dialogo de Canto de piedad -->
                <v-dialog v-model="dialogGloria" max-width="500px" persistent>
                    <v-card>
                        <v-card-title>Agregar canto de gloria</v-card-title>
                        <v-container>
                            <v-text-field label="Inroduzca el canto de gloria"
                                v-model="nuevo_canto.nu_gloria"></v-text-field>
                            <v-card-actions>
                                <v-btn color="error" @click="cancelarNuevoCanto">Cancelar</v-btn>
                                <v-spacer />
                                <v-btn color="success" @click="GuardarGloria">Guardar</v-btn>
                            </v-card-actions>
                        </v-container>
                    </v-card>
                </v-dialog><!--Fin del dialogo de Canto de gloria -->
                <v-dialog v-model="dialogSalmo" max-width="500px" persistent>
                    <v-card>
                        <v-card-title>Agregar ritmo para salmo</v-card-title>
                        <v-container>
                            <v-text-field label="Inroduzca el ritmo del salmo"
                                v-model="nuevo_canto.nu_salmo"></v-text-field>
                            <v-card-actions>
                                <v-btn color="error" @click="cancelarNuevoCanto">Cancelar</v-btn>
                                <v-spacer />
                                <v-btn color="success" @click="GuardarSalmo">Guardar</v-btn>
                            </v-card-actions>
                        </v-container>
                    </v-card>
                </v-dialog><!--Fin del dialogo de ritmo de salmo -->
                <v-dialog v-model="dialogAleluya" max-width="500px" persistent>
                    <v-card>
                        <v-card-title>Agregar canto de Aleluya/Honor y Gloria</v-card-title>
                        <v-container>
                            <v-text-field label="Inroduzca el canto de Aleluya/Honor y Gloria"
                                v-model="nuevo_canto.nu_aleluya"></v-text-field>
                            <v-card-actions>
                                <v-btn color="error" @click="cancelarNuevoCanto">Cancelar</v-btn>
                                <v-spacer />
                                <v-btn color="success" @click="GuardarAleluya">Guardar</v-btn>
                            </v-card-actions>
                        </v-container>
                    </v-card>
                </v-dialog><!--Fin del dialogo de Canto de aleluya -->
                <v-dialog v-model="dialogOfertorio" max-width="500px" persistent>
                    <v-card>
                        <v-card-title>Agregar canto de ofertorio</v-card-title>
                        <v-container>
                            <v-text-field label="Inroduzca el canto de ofertorio"
                                v-model="nuevo_canto.nu_ofertorio"></v-text-field>
                            <v-card-actions>
                                <v-btn color="error" @click="cancelarNuevoCanto">Cancelar</v-btn>
                                <v-spacer />
                                <v-btn color="success" @click="GuardarOfertorio">Guardar</v-btn>
                            </v-card-actions>
                        </v-container>
                    </v-card>
                </v-dialog><!--Fin del dialogo de ritmo de ofertorio -->
                <v-dialog v-model="dialogSanto" max-width="500px" persistent>
                    <v-card>
                        <v-card-title>Agregar canto de santo</v-card-title>
                        <v-container>
                            <v-text-field label="Inroduzca el canto de santo"
                                v-model="nuevo_canto.nu_santo"></v-text-field>
                            <v-card-actions>
                                <v-btn color="error" @click="cancelarNuevoCanto">Cancelar</v-btn>
                                <v-spacer />
                                <v-btn color="success" @click="GuardarSanto">Guardar</v-btn>
                            </v-card-actions>
                        </v-container>
                    </v-card>
                </v-dialog><!--Fin del dialogo de Canto de Santo -->
                <v-dialog v-model="dialogCordero" max-width="500px" persistent>
                    <v-card>
                        <v-card-title>Agregar canto de cordero</v-card-title>
                        <v-container>
                            <v-text-field label="Inroduzca el canto de cordero"
                                v-model="nuevo_canto.nu_cordero"></v-text-field>
                            <v-card-actions>
                                <v-btn color="error" @click="cancelarNuevoCanto">Cancelar</v-btn>
                                <v-spacer />
                                <v-btn color="success" @click="GuardarCordero">Guardar</v-btn>
                            </v-card-actions>
                        </v-container>
                    </v-card>
                </v-dialog><!--Fin del dialogo de ritmo de Cordero -->
                <v-dialog v-model="dialogComunion" max-width="500px" persistent>
                    <v-card>
                        <v-card-title>Agregar canto de comunión</v-card-title>
                        <v-container>
                            <v-text-field label="Inroduzca el canto de comunión"
                                v-model="nuevo_canto.nu_comunion"></v-text-field>
                            <v-card-actions>
                                <v-btn color="error" @click="cancelarNuevoCanto">Cancelar</v-btn>
                                <v-spacer />
                                <v-btn color="success" @click="GuardarComunion">Guardar</v-btn>
                            </v-card-actions>
                        </v-container>
                    </v-card>
                </v-dialog><!--Fin del dialogo de Canto de Comunion -->
                <v-dialog v-model="dialogSalida" max-width="500px" persistent>
                    <v-card>
                        <v-card-title>Agregar canto de salida</v-card-title>
                        <v-container>
                            <v-text-field label="Inroduzca el canto de salida"
                                v-model="nuevo_canto.nu_salida"></v-text-field>
                            <v-card-actions>
                                <v-btn color="error" @click="cancelarNuevoCanto">Cancelar</v-btn>
                                <v-spacer />
                                <v-btn color="success" @click="GuardarSalida">Guardar</v-btn>
                            </v-card-actions>
                        </v-container>
                    </v-card>
                </v-dialog><!--Fin del dialogo de ritmo de Salida -->
            </v-card>
        </v-container>
    </v-app>
</template>

<script>
export default {
    name: 'home',
    metaInfo: {
        title: 'Vista de administrador',
    },

    data() {
        return {
            search: '',
            darkMode: false,
            drawer: true,
            alertaIngresado: false,
            alertaVacio: false,
            alertaExistente: false,
            // Encabezados Usuarios
            encabezados: [
                { text: 'Fecha', value: 'mi_fecha', align: 'center' },
                { text: 'Tipo', value: 'mi_tipo', align: 'center' },
                { text: 'Acciones', sortable: false, value: 'actions', align: 'center' }
            ],

            mini: true,

            misas: [],

            bm_dialog: false,
            nm_dialog: false,
            d_dialog: false,
            dialogDelete: false,
            dialogEntrada: false,
            dialogPiedad: false,
            dialogGloria: false,
            dialogSalmo: false,
            dialogAleluya: false,
            dialogOfertorio: false,
            dialogSanto: false,
            dialogCordero: false,
            dialogComunion: false,
            dialogSalida: false,
            fechaPickerVisible: false,
            mostrarDialogo: false,
            agregarCanto: false,

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
                mi_comentario: ''
            },

            nuevo_canto: {
                nu_entrada: '',
                nu_piedad: '',
                nu_gloria: '',
                nu_salmo: '',
                nu_aleluya: '',
                nu_ofertorio: '',
                nu_santo: '',
                nu_cordero: '',
                nu_comunion: '',
                nu_salida: '',
            },

            misaSeleccionada: null,

            drawer: false,  // Controla la visibilidad del panel lateral

            mini: false,    // Controla si el panel lateral es mini o no

            elevation: '-1',

            tipo: ['Ordinario', 'Adviento', 'Cuaresma', 'Festividad', 'XV años', 'Boda',
                'Bautizo', 'Oficio del Jueves', 'Oficio del Viernes', 'Pascua', 'Envío', 'Otro'],

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

            comentario: [],

            IdDelete: ''
        };
    },

    mounted() {
        const token = localStorage.getItem('Usuario')
        if (!token) {
            this.$router.push({ path: '/' });
        }
    },

    computed: {
        misasFiltradas() {
            return this.misas.filter((misa) =>
                misa.mi_fecha.toLowerCase().includes(this.searchDate.toLowerCase())
            );
        },
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
    },

    methods: {
        toggleDrawer() {
            this.drawer = !this.drawer;
        },

        toggleDarkMode() {
            this.darkMode = !this.darkMode;
            this.$vuetify.theme.dark = this.darkMode; // Cambiar dinámicamente el tema oscuro
        },

        abrirCuadernillo() {
            window.open('https://drive.google.com/file/d/1KFy3SvvgoxGO_6A7-jySlt3RFrqUqHgi/view', '_blank')
        },

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

        beforeDelete(item) {
            this.IdDelete = item
            console.log('ID a eliminar:', this.IdDelete.mi_id);
            this.dialogDelete = true
        },

        async eliminar_misa() {
            try {
                const body = {
                    mi_id: this.IdDelete.mi_id,
                };

                await this.axios.delete('misa/eliminar_misa', {
                    data: body
                });

                this.llenar_misas();
                this.dialogDelete = false; // Cierra el diálogo después de la eliminación
            } catch (error) {
                console.error(error);
            }
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
            this.misaSeleccionada = null;
            this.d_dialog = false;
            this.nm_dialog = false;
            this.mostrarDialogo = false;
            this.bm_dialog = false;
        },

        cancelarNuevoCanto() {
            this.dialogEntrada = false
            this.dialogPiedad = false
            this.dialogGloria = false
            this.dialogSalmo = false
            this.dialogAleluya = false
            this.dialogOfertorio = false
            this.dialogSanto = false
            this.dialogCordero = false
            this.dialogComunion = false
            this.dialogSalida = false
            this.nuevo_canto = {
                nu_entrada: '',
                nu_piedad: '',
                nu_gloria: '',
                nu_salmo: '',
                nu_aleluya: '',
                nu_ofertorio: '',
                nu_santo: '',
                nu_cordero: '',
                nu_comunion: '',
                nu_salida: ''
            };
        },

        async guardar_misa() {
            if (this.nueva_misa.mi_id) {
                await this.axios
                    .put(`/misa/editar_misa/${this.nueva_misa.mi_id}`, this.nueva_misa)
                    .then((response) => {
                        console.log(response.data); // Opcional: muestra la respuesta del servidor si es necesario
                        this.llenar_misas();
                        this.cancelar();
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            } else {
                console.error("ID de misa no definido.");
            }
        },

        editarMisa(item) {
            this.nueva_misa = {
                mi_id: item.mi_id,
                mi_fecha: item.mi_fecha,
                mi_tipo: item.mi_tipo,
                mi_entrada: item.mi_entrada,
                mi_piedad: item.mi_piedad,
                mi_gloria: item.mi_gloria,
                mi_salmo: item.mi_salmo,
                mi_aleluya: item.mi_aleluya,
                mi_ofertorio: item.mi_ofertorio,
                mi_santo: item.mi_santo,
                mi_cordero: item.mi_cordero,
                mi_comunion: item.mi_comunion,
                mi_salida: item.mi_salida,
                mi_comentario: item.mi_comentario,
            };
            this.nm_dialog = true;
        },

        async verDetalles(item) {
            const mi_id = item.mi_id;
            const api_data_uno = await this.axios.get(`/misa/misabase/${mi_id}`);
            const detallesMisa = api_data_uno.data;

            this.misaSeleccionada = detallesMisa; // Establecer la misa seleccionada
            this.d_dialog = true;
        },

        guardarNuevaMisa() {
            // Realizar acciones para guardar la nueva misa
            // Puedes acceder a los datos de la nueva misa a través de this.nuevaMisa
            // Por ejemplo, puedes enviar los datos al backend utilizando Axios

            // Ejemplo de envío de datos utilizando Axios:
            this.axios
                .post('/misa/nueva_misa', this.nueva_misa)
                .then(() => {
                    // Procesar respuesta exitosa (si es necesario)
                    this.llenar_misas(); // Actualizar la lista de misas
                    this.cancelar(); // Cerrar el diálogo
                })
                .catch((error) => {
                    // Procesar error (si es necesario)
                    console.error(error);
                });
        },

        GuardarEntrada() {
            // Verificar si el nuevo canto de entrada no está vacío
            if (this.nuevo_canto.nu_entrada.trim() === '') {
                console.error('El canto de entrada no puede estar vacío.');
                this.alertaVacio = true;
                setTimeout(() => {
                    this.alertaVacio = false;
                }, 2000);
                return;
            }

            // Crear el objeto con los datos del nuevo canto de entrada
            const nuevoCantoEntrada = {
                ca_entrada: this.nuevo_canto.nu_entrada,
            };

            // Realizar la operación de guardado en la base de datos utilizando Axios
            this.axios
                .post('/cantos/insertar_entrada', nuevoCantoEntrada)
                .then((response) => {
                    // Procesar respuesta exitosa (si es necesario)
                    console.log('Respuesta del servidor:', response.data);
                    this.obtenerDatosCanto('entrada', '/cantos/todos_entrada'); // Actualizar la lista de cantos de entrada
                    this.dialogEntrada = false; // Cerrar el diálogo
                    this.alertaIngresado = true;
                    setTimeout(() => {
                        this.alertaIngresado = false;
                    }, 2000);
                })
                .catch((error) => {
                    if (error.response) {
                        // El servidor respondió con un código de estado fuera del rango 2xx
                        console.error('Error de respuesta del servidor:', error.response.data);
                        this.alertaExistente = true;
                        setTimeout(() => {
                            this.alertaExistente = false;
                        }, 2000);
                    } else if (error.request) {
                        // La solicitud fue hecha pero no se recibió respuesta
                        console.error('Error de solicitud sin respuesta del servidor:', error.request);
                    } else {
                        // Otros tipos de errores
                        console.error('Error general al intentar la solicitud:', error.message);
                    }
                }
                );
        },

        GuardarPiedad() {
            // Verificar si el nuevo canto de entrada no está vacío
            if (this.nuevo_canto.nu_piedad.trim() === '') {
                console.error('El campo de salmo no puede estar vacío.');
                this.alertaVacio = true;
                setTimeout(() => {
                    this.alertaVacio = false;
                }, 2000);
                return;
            }

            // Crear el objeto con los datos del nuevo canto de entrada
            const nuevoCantoPiedad = {
                ca_piedad: this.nuevo_canto.nu_piedad,
            };

            // Realizar la operación de guardado en la base de datos utilizando Axios
            this.axios
                .post('/cantos/insertar_piedad', nuevoCantoPiedad)
                .then((response) => {
                    // Procesar respuesta exitosa (si es necesario)
                    console.log('Respuesta del servidor:', response.data);
                    this.obtenerDatosCanto('piedad', '/cantos/todos_piedad'); // Actualizar la lista de cantos de entrada
                    this.dialogSalmo = false; // Cerrar el diálogo
                    this.alertaIngresado = true;
                    setTimeout(() => {
                        this.alertaIngresado = false;
                    }, 2000);
                })
                .catch((error) => {
                    if (error.response) {
                        // El servidor respondió con un código de estado fuera del rango 2xx
                        console.error('Error de respuesta del servidor:', error.response.data);
                        this.alertaExistente = true;
                        setTimeout(() => {
                            this.alertaExistente = false;
                        }, 2000);
                    } else if (error.request) {
                        // La solicitud fue hecha pero no se recibió respuesta
                        console.error('Error de solicitud sin respuesta del servidor:', error.request);
                    } else {
                        // Otros tipos de errores
                        console.error('Error general al intentar la solicitud:', error.message);
                    }
                }
                );
        },

        GuardarGloria() {
            // Verificar si el nuevo canto de entrada no está vacío
            if (this.nuevo_canto.nu_gloria.trim() === '') {
                console.error('El campo de salmo no puede estar vacío.');
                this.alertaVacio = true;
                setTimeout(() => {
                    this.alertaVacio = false;
                }, 2000);
                return;
            }

            // Crear el objeto con los datos del nuevo canto de entrada
            const nuevoCantoGloria = {
                ca_salmo: this.nuevo_canto.nu_gloria,
            };

            // Realizar la operación de guardado en la base de datos utilizando Axios
            this.axios
                .post('/cantos/insertar_gloria', nuevoCantoGloria)
                .then((response) => {
                    // Procesar respuesta exitosa (si es necesario)
                    console.log('Respuesta del servidor:', response.data);
                    this.obtenerDatosCanto('salmo', '/cantos/todos_gloria'); // Actualizar la lista de cantos de entrada
                    this.dialogGloria = false; // Cerrar el diálogo
                    this.alertaIngresado = true;
                    setTimeout(() => {
                        this.alertaIngresado = false;
                    }, 2000);
                })
                .catch((error) => {
                    if (error.response) {
                        // El servidor respondió con un código de estado fuera del rango 2xx
                        console.error('Error de respuesta del servidor:', error.response.data);
                        this.alertaExistente = true;
                        setTimeout(() => {
                            this.alertaExistente = false;
                        }, 2000);
                    } else if (error.request) {
                        // La solicitud fue hecha pero no se recibió respuesta
                        console.error('Error de solicitud sin respuesta del servidor:', error.request);
                    } else {
                        // Otros tipos de errores
                        console.error('Error general al intentar la solicitud:', error.message);
                    }
                }
                );
        },

        GuardarSalmo() {
            // Verificar si el nuevo canto de entrada no está vacío
            if (this.nuevo_canto.nu_salmo.trim() === '') {
                console.error('El campo de salmo no puede estar vacío.');
                this.alertaVacio = true;
                setTimeout(() => {
                    this.alertaVacio = false;
                }, 2000);
                return;
            }

            // Crear el objeto con los datos del nuevo canto de entrada
            const nuevoCantoSalmo = {
                ca_salmo: this.nuevo_canto.nu_salmo,
            };

            // Realizar la operación de guardado en la base de datos utilizando Axios
            this.axios
                .post('/cantos/insertar_salmo', nuevoCantoSalmo)
                .then((response) => {
                    // Procesar respuesta exitosa (si es necesario)
                    console.log('Respuesta del servidor:', response.data);
                    this.obtenerDatosCanto('salmo', '/cantos/todos_salmo'); // Actualizar la lista de cantos de entrada
                    this.dialogSalmo = false; // Cerrar el diálogo
                    this.alertaIngresado = true;
                    setTimeout(() => {
                        this.alertaIngresado = false;
                    }, 2000);
                })
                .catch((error) => {
                    if (error.response) {
                        // El servidor respondió con un código de estado fuera del rango 2xx
                        console.error('Error de respuesta del servidor:', error.response.data);
                        this.alertaExistente = true;
                        setTimeout(() => {
                            this.alertaExistente = false;
                        }, 2000);
                    } else if (error.request) {
                        // La solicitud fue hecha pero no se recibió respuesta
                        console.error('Error de solicitud sin respuesta del servidor:', error.request);
                    } else {
                        // Otros tipos de errores
                        console.error('Error general al intentar la solicitud:', error.message);
                    }
                }
                );
        },

        GuardarAleluya() {
            // Verificar si el nuevo canto de entrada no está vacío
            if (this.nuevo_canto.nu_aleluya.trim() === '') {
                console.error('El canto no puede estar vacío.');
                this.alertaVacio = true;
                setTimeout(() => {
                    this.alertaVacio = false;
                }, 2000);
                return;
            }

            // Crear el objeto con los datos del nuevo canto de entrada
            const nuevoCantoAleluya = {
                ca_aleluya: this.nuevo_canto.nu_aleluya,
            };

            // Realizar la operación de guardado en la base de datos utilizando Axios
            this.axios
                .post('/cantos/insertar_aleluya', nuevoCantoAleluya)
                .then((response) => {
                    // Procesar respuesta exitosa (si es necesario)
                    console.log('Respuesta del servidor:', response.data);
                    this.obtenerDatosCanto('aleluya', '/cantos/todos_aleluya'); // Actualizar la lista de cantos de entrada
                    this.dialogEntrada = false; // Cerrar el diálogo
                    this.alertaIngresado = true;
                    setTimeout(() => {
                        this.alertaIngresado = false;
                    }, 2000);
                })
                .catch((error) => {
                    if (error.response) {
                        // El servidor respondió con un código de estado fuera del rango 2xx
                        console.error('Error de respuesta del servidor:', error.response.data);
                        this.alertaExistente = true;
                        setTimeout(() => {
                            this.alertaExistente = false;
                        }, 2000);
                    } else if (error.request) {
                        // La solicitud fue hecha pero no se recibió respuesta
                        console.error('Error de solicitud sin respuesta del servidor:', error.request);
                    } else {
                        // Otros tipos de errores
                        console.error('Error general al intentar la solicitud:', error.message);
                    }
                }
                );
        },

        GuardarOfertorio() {
            // Verificar si el nuevo canto de entrada no está vacío
            if (this.nuevo_canto.nu_ofertorio.trim() === '') {
                console.error('El campo no puede estar vacío.');
                this.alertaVacio = true;
                setTimeout(() => {
                    this.alertaVacio = false;
                }, 2000);
                return;
            }
            // Crear el objeto con los datos del nuevo canto de entrada
            const nuevoCantoOfertorio = {
                ca_ofertorio: this.nuevo_canto.nu_ofertorio,
            };

            // Realizar la operación de guardado en la base de datos utilizando Axios
            this.axios
                .post('/cantos/insertar_ofertorio', nuevoCantoOfertorio)
                .then((response) => {
                    // Procesar respuesta exitosa (si es necesario)
                    console.log('Respuesta del servidor:', response.data);
                    this.obtenerDatosCanto('ofertorio', '/cantos/todos_ofertorio'); // Actualizar la lista de cantos de entrada
                    this.dialogSalmo = false; // Cerrar el diálogo
                    this.alertaIngresado = true;
                    setTimeout(() => {
                        this.alertaIngresado = false;
                    }, 2000);
                })
                .catch((error) => {
                    if (error.response) {
                        // El servidor respondió con un código de estado fuera del rango 2xx
                        console.error('Error de respuesta del servidor:', error.response.data);
                        this.alertaExistente = true;
                        setTimeout(() => {
                            this.alertaExistente = false;
                        }, 2000);
                    } else if (error.request) {
                        // La solicitud fue hecha pero no se recibió respuesta
                        console.error('Error de solicitud sin respuesta del servidor:', error.request);
                    } else {
                        // Otros tipos de errores
                        console.error('Error general al intentar la solicitud:', error.message);
                    }
                }
                );
        },

        GuardarSanto() {
            // Verificar si el nuevo canto de entrada no está vacío
            if (this.nuevo_canto.nu_santo.trim() === '') {
                console.error('El campo no puede estar vacío.');
                this.alertaVacio = true;
                setTimeout(() => {
                    this.alertaVacio = false;
                }, 2000);
                return;
            }
            // Crear el objeto con los datos del nuevo canto de entrada
            const nuevoCantoSanto = {
                ca_santo: this.nuevo_canto.nu_santo,
            };
            // Realizar la operación de guardado en la base de datos utilizando Axios
            this.axios
                .post('/cantos/insertar_santo', nuevoCantoSanto)
                .then((response) => {
                    // Procesar respuesta exitosa (si es necesario)
                    console.log('Respuesta del servidor:', response.data);
                    this.obtenerDatosCanto('santo', '/cantos/todos_santo'); // Actualizar la lista de cantos de entrada
                    this.dialogSanto = false; // Cerrar el diálogo
                    this.alertaIngresado = true;
                    setTimeout(() => {
                        this.alertaIngresado = false;
                    }, 2000);
                })
                .catch((error) => {
                    if (error.response) {
                        // El servidor respondió con un código de estado fuera del rango 2xx
                        console.error('Error de respuesta del servidor:', error.response.data);
                        this.alertaExistente = true;
                        setTimeout(() => {
                            this.alertaExistente = false;
                        }, 2000);
                    } else if (error.request) {
                        // La solicitud fue hecha pero no se recibió respuesta
                        console.error('Error de solicitud sin respuesta del servidor:', error.request);
                    } else {
                        // Otros tipos de errores
                        console.error('Error general al intentar la solicitud:', error.message);
                    }
                }
                );
        },

        GuardarCordero() {
            // Verificar si el nuevo canto de entrada no está vacío
            if (this.nuevo_canto.nu_cordero.trim() === '') {
                console.error('El campo no puede estar vacío.');
                this.alertaVacio = true;
                setTimeout(() => {
                    this.alertaVacio = false;
                }, 2000);
                return;
            }

            // Crear el objeto con los datos del nuevo canto de entrada
            const nuevoCantoCordero = {
                ca_cordero: this.nuevo_canto.nu_cordero,
            };

            // Realizar la operación de guardado en la base de datos utilizando Axios
            this.axios
                .post('/cantos/insertar_cordero', nuevoCantoCordero)
                .then((response) => {
                    // Procesar respuesta exitosa (si es necesario)
                    console.log('Respuesta del servidor:', response.data);
                    this.obtenerDatosCanto('cordero', '/cantos/todos_cordero'); // Actualizar la lista de cantos de entrada
                    this.dialogCordero = false; // Cerrar el diálogo
                    this.alertaIngresado = true;
                    setTimeout(() => {
                        this.alertaIngresado = false;
                    }, 2000);
                })
                .catch((error) => {
                    if (error.response) {
                        // El servidor respondió con un código de estado fuera del rango 2xx
                        console.error('Error de respuesta del servidor:', error.response.data);
                        this.alertaExistente = true;
                        setTimeout(() => {
                            this.alertaExistente = false;
                        }, 2000);
                    } else if (error.request) {
                        // La solicitud fue hecha pero no se recibió respuesta
                        console.error('Error de solicitud sin respuesta del servidor:', error.request);
                    } else {
                        // Otros tipos de errores
                        console.error('Error general al intentar la solicitud:', error.message);
                    }
                }
                );
        },

        GuardarComunion() {
            // Verificar si el nuevo canto de entrada no está vacío
            if (this.nuevo_canto.nu_comunion.trim() === '') {
                console.error('El campo no puede estar vacío.');
                this.alertaVacio = true;
                setTimeout(() => {
                    this.alertaVacio = false;
                }, 2000);
                return;
            }
            // Crear el objeto con los datos del nuevo canto de entrada
            const nuevoCantoComunion = {
                ca_comunion: this.nuevo_canto.nu_comunion,
            };
            // Realizar la operación de guardado en la base de datos utilizando Axios
            this.axios
                .post('/cantos/insertar_comunion', nuevoCantoComunion)
                .then((response) => {
                    // Procesar respuesta exitosa (si es necesario)
                    console.log('Respuesta del servidor:', response.data);
                    this.obtenerDatosCanto('comunion', '/cantos/todos_comunion'); // Actualizar la lista de cantos de entrada
                    this.dialogComunion = false; // Cerrar el diálogo
                    this.alertaIngresado = true;
                    setTimeout(() => {
                        this.alertaIngresado = false;
                    }, 2000);
                })
                .catch((error) => {
                    if (error.response) {
                        // El servidor respondió con un código de estado fuera del rango 2xx
                        console.error('Error de respuesta del servidor:', error.response.data);
                        this.alertaExistente = true;
                        setTimeout(() => {
                            this.alertaExistente = false;
                        }, 2000);
                    } else if (error.request) {
                        // La solicitud fue hecha pero no se recibió respuesta
                        console.error('Error de solicitud sin respuesta del servidor:', error.request);
                    } else {
                        // Otros tipos de errores
                        console.error('Error general al intentar la solicitud:', error.message);
                    }
                }
                );
        },

        GuardarSalida() {
            // Verificar si el nuevo canto de entrada no está vacío
            if (this.nuevo_canto.nu_salida.trim() === '') {
                console.error('El campo no puede estar vacío.');
                this.alertaVacio = true;
                setTimeout(() => {
                    this.alertaVacio = false;
                }, 2000);
                return;
            }

            // Crear el objeto con los datos del nuevo canto de entrada
            const nuevoCantoSalida = {
                ca_salida: this.nuevo_canto.nu_salida,
            };

            // Realizar la operación de guardado en la base de datos utilizando Axios
            this.axios
                .post('/cantos/insertar_salida', nuevoCantoSalida)
                .then((response) => {
                    // Procesar respuesta exitosa (si es necesario)
                    console.log('Respuesta del servidor:', response.data);
                    this.obtenerDatosCanto('salida', '/cantos/todos_salida'); // Actualizar la lista de cantos de entrada
                    this.dialogSalida = false; // Cerrar el diálogo
                    this.alertaIngresado = true;
                    setTimeout(() => {
                        this.alertaIngresado = false;
                    }, 2000);
                })
                .catch((error) => {
                    if (error.response) {
                        // El servidor respondió con un código de estado fuera del rango 2xx
                        console.error('Error de respuesta del servidor:', error.response.data);
                        this.alertaExistente = true;
                        setTimeout(() => {
                            this.alertaExistente = false;
                        }, 2000);
                    } else if (error.request) {
                        // La solicitud fue hecha pero no se recibió respuesta
                        console.error('Error de solicitud sin respuesta del servidor:', error.request);
                    } else {
                        // Otros tipos de errores
                        console.error('Error general al intentar la solicitud:', error.message);
                    }
                }
                );
        },
        salir() {
            localStorage.clear('Usuario')
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

.custom-table {
    text-align: center;
    /* Para centrar el texto en las celdas */
}

.floating-button {
  /*position: fixed;*/
  top: 5px;       /* Ajusta esta distancia según lo necesites */
  left: 0vh;     /* Ajusta esta distancia según lo necesites */
  /*z-index: 1000;   /* Asegúrate de que esté por encima de otros elementos */
  /*box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Sombra para hacer que el botón resalte */
}

@media (max-width: 600px) {
    .v-toolbar-title {
        font-size: 24px !important;
    }

    .v-list-item-title {
        font-size: 16px !important;
    }
}
</style>