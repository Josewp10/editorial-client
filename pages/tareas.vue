<template>
  <div>
    <br />
    <b-container class="bv-example-row mb-3">
      <br />
      <b-row cols="2">
        <b-col>
          <br />
          <b-card title="Gestión de Tareas">
            <b-card-text>A continuación inserte las tareas que ejecutara el módulo de gestión de la publicación :</b-card-text>

            <b-form action="javascript:void(0)" @submit="crearTareas()">
              <br />
              <b-form-group label="Código" label-for="id">
                <b-form-input
                  class="form-control"
                  type="number"
                  required
                  v-model="pu_tarea.id"
                  :disabled="enEdicion"
                  placeholder="Ingrese Id de la Tarea"
                  id="id"
                />
                <b-form-invalid-feedback :state="validacionId">Campo obligatorio</b-form-invalid-feedback>
              </b-form-group>
              <b-form-group label="Nombre" label-for="nombre">
                <b-form-input
                  class="form-control"
                  v-model="pu_tarea.nombre"
                  required
                  placeholder="Ingrese Nombre de la Tarea"
                  id="nombre"
                />
                <b-form-invalid-feedback :state="validacionNombre">Campo obligatorio</b-form-invalid-feedback>
              </b-form-group>

              <b-form-group label="Descripción" label-for="descripcion">
                <b-form-textarea
                  class="form-control"
                  v-model="pu_tarea.descripcion"
                  id="descripcion"
                  required
                  placeholder="Ingrese Descripción de la tarea"
                />
                <b-form-invalid-feedback :state="validaciondescripcion">Campo obligatorio</b-form-invalid-feedback>
              </b-form-group>

              <b-form-group label="Módulo" label-for="modulo">
                <b-form-select v-model="pu_tarea.modulo" :options="opciones_modulos" required></b-form-select>
              </b-form-group>

              <b-button type="submit" variant="danger" v-if="!enEdicion">Crear Tarea</b-button>
              <b-button @click="actualizarTarea()" variant="primary" v-else>Actualizar Tarea</b-button>
            </b-form>
          </b-card>
        </b-col>
        <b-col>
          <br />
          <b-table
            striped
            responsive
            hover
            :items="lista_tareas"
            v-show="showTable"
            class="border border-danger text-center"
          >
            <template v-slot:cell(acciones)="row">
              <b-button size="sm" @click="cargarTarea(row)" class="mr-2" variant="outline-primary">
                <b-img left src="@/static/images/edit.png" width="15" height="15"></b-img>Modificar
              </b-button>
              <br />
              <br />
              <b-button
                size="sm"
                @click="eliminarTareas(row)"
                class="mr-2"
                variant="outline-danger"
              >
                <b-img left src="@/static/images/delete.png" width="15" height="15"></b-img>Eliminar
              </b-button>
            </template>
          </b-table>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script src="../assets/tareas.js"/>
