<template>
  <div>
    <br />
    <center>
      <b-card class="container">
        <p>El sello editorial podrá llevar un control de informes de las propuestas presentadas</p>
        <b-button type="submit" variant="danger" @click="onClick()">Generar Reporte</b-button>
      </b-card>
    </center>
  </div>
</template>

<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script src="../assets/reporte.js"/>