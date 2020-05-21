<template>
  <div>
    <br />
    <b-container class="bv-example-row mb-3">
      <b-row>
        <b-col>
          <!--FORMULARIO PARA CREAR SEGUIMIENTO-->
          <br>
          <b-card title="Gestión de seguimiento a la Propuesta: " v-if="modal">
            <b>
              <label>{{titulo}}</label>
            </b>
            <b-card-text>El sello editorial realizara un seguimiento de las propuestas aprobadas:</b-card-text>

            <b-form action="javascript:void(0)" @submit="crearSeguimiento()">
              <b-form-group label="Código" label-for="id">
                <b-form-input
                  class="form-control"
                  type="number"
                  required
                  v-model="seguimiento.id"
                  placeholder="Ingrese Id Seguimiento"
                  id="id"
                />
                <b-form-invalid-feedback :state="validacionId"></b-form-invalid-feedback>
              </b-form-group>

              <b-form-group label="Id Propuesta" label-for="id">
                <b-form-input
                  class="form-control"
                  type="number"
                  required
                  v-model="seguimiento.id_propuesta"
                  :disabled = true
                  placeholder="Id Propuesta"
                  id="id"
                />
                <b-form-invalid-feedback :state="validacionId"></b-form-invalid-feedback>
              </b-form-group>

              <b-form-group label="Tarea">
                <b-form-select
                  v-model="seguimiento.id_tarea"
                  :options="lista_tareas"
                  value-field="id"
                  text-field="nombre"
                  class="mb-3"
                ></b-form-select>
                <b-form-invalid-feedback :state="validacionTarea"></b-form-invalid-feedback>
              </b-form-group>

              <b-form-group label="Fecha">
                <b-form-input
                  v-model="seguimiento.fecha"
                  required
                  placeholder="aaaa/mm/dd"
                  type="text"
                ></b-form-input>
                <b-form-invalid-feedback :state="validacionFecha"></b-form-invalid-feedback>
              </b-form-group>

              <b-form-group label="Estado">
                <b-form-select v-model="seguimiento.estado" :options="opciones_estados" required></b-form-select>
                <b-form-invalid-feedback :state="validacionEstado"></b-form-invalid-feedback>
              </b-form-group>

              <!--
              <b-form-group label="Archivo">
                <b-form-input
                  class="form-control"
                  type="text"
                  required
                  v-model="seguimiento.archivo"
                  placeholder="Ingrese archivo"
                  id="archivo"
                />
                <b-form-invalid-feedback :state="validacionArchivo"></b-form-invalid-feedback>
              </b-form-group>
              -->
              <b-form-textarea
                v-model="seguimiento.comentario"
                id="Comentario"
                size="lg"
                placeholder="Comentario"
              ></b-form-textarea>
              <b-form-invalid-feedback :state="validacionComentario"></b-form-invalid-feedback>
              <br />

              <b-button type="submit" variant="outline-danger" v-if="!enEdicion">Crear Seguimiento</b-button>
              <b-button @click="actualizarSeguimiento()" variant="primary" v-else>Actualizar</b-button>
            </b-form>
          </b-card>
          <!--FORMULARIO DE NOTIFICACIÓN-->
          <br>
          <b-card title="Gestión de seguimiento a la Propuesta: " v-if="!modal">
            <b-form-group label-class="font-weight-bold pt-0" class="mb-1">
              <b-form-group>
                <b-img left="1px" src="@/static/images/revision.png" width="80" height="80"></b-img>
                <b-img right src="@/static/images/selloeditorial.png" width="80" height="80"></b-img>
              </b-form-group>
            </b-form-group>
            <b-form-group
              label-cols-sm="3"
              label="Tipo de Notificación:"
              label-align-sm="right"
              label-for="tipo"
            >
              <b-form-select :options="opciones_notificacion" v-model="notificacion.tipo"></b-form-select>
            </b-form-group>
            <b-form-group
              label-cols-sm="3"
              label="Comentario:"
              label-align-sm="right"
              label-for="comentario"
            >
              <b-form-textarea
                id="textarea-large"
                v-model="notificacion.comentario"
                size="lg"
                placeholder="Comentario"
              ></b-form-textarea>
              <br />
              <b-button
                size="40"
                class="mr-4"
                variant="warning"
                @click="enviarCorreo()"
              >Enviar Correo</b-button>
            </b-form-group>
          </b-card>
        </b-col>
        <!--COLUMNA DE SEGUIMIENTOS-->
        <b-col>
          <br>
          <b-table
            striped
            responsive
            hover
            :items="lista_seguimiento"
            class="border border-danger text-center"
          >
            <template v-slot:cell(acciones)="row">
              <b-button
                size="sm"
                @click="cargarSeguimiento(row)"
                class="mr-2"
                variant="outline-primary"
              >
                <b-img left src="@/static/images/edit.png" width="20" height="20"></b-img>Modificar
              </b-button>
              <br />
              <br />
              <b-button
                size="sm"
                @click="eliminarSeguimiento(row)"
                class="mr-2"
                variant="outline-danger"
              >
                <b-img left src="@/static/images/delete.png" width="20" height="20"></b-img>Eliminar
              </b-button>
              <br />
              <br />
              <div>
                <b-button variant="outline-danger" @click="almacenarIndice(row)">Enviar Notificación</b-button>
              </div>
            </template>
          </b-table>
        </b-col>
      </b-row>
      <br />
      <br />
    </b-container>
  </div>
</template>

<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script src="../assets/seguimiento.js"/>