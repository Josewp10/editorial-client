<template>
  <div>
    <b-container class="bv-example-row mb-3">
      <b-row cols="1">
        <b-col></b-col>
        <br />
        <b-col>
          <b-input-group class="mt-3">
            <b-form-input v-model="nombreObra"></b-form-input>
            <b-input-group-append>
              <b-button variant="danger" v-model="nombreObra" @click="listarObras()">
                <b-img center src="@/static/images/buscar.png" width="25" height="25"></b-img>
              </b-button>
              <b-button @click="recargar()" variant="link">Recargar</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-col>

        <b-col>
          <br />
          <b-table
            striped
            responsive
            hover
            :items="lista_obra"
            class="border border-danger text-center"
          >
            <template v-slot:cell(acciones)="row">
              <b-button @click="almacenarDatos(row)" size="sm" class="mr-2" variant="link">
                <b-img center src="@/static/images/revisar.png" width="40" height="40"></b-img>Revisar
              </b-button>
            </template>
          </b-table>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script src="../assets/obras.js"/>


