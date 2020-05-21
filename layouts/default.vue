<template>
  <div>
    <div>
      <b-navbar toggleable type="light" variant="faded">
        <b-img
          src="https://redunete.net/wp-content/uploads/2019/02/logo-blanco-Udem-700x300.jpg"
          fluid
          alt="Fluid image"
          width="200px"
        ></b-img>

        <div class="title">Gestión de la Publicación</div>

        <b-navbar-toggle target="navbar-toggle-collapse">
          <a href="principal">
            <b-icon icon="house-fill" variant="danger" font-scale="2"></b-icon>
          </a>
           <a href="index">
            <b-icon icon="box-arrow-left" variant="danger" font-scale="2"></b-icon>
          </a>
        </b-navbar-toggle>
      </b-navbar>

      <div>
        <b-navbar toggleable="md" type="dark" variant="danger">
          <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

          <b-collapse is-nav id="nav_collapse">
            <b-navbar-nav>
              <b-nav-item href="tareas">Gestión de Tareas</b-nav-item>
              <b-nav-item href="consultarobras">Consultar Obras</b-nav-item>
              <b-nav-item href="reportes">Reportes</b-nav-item>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
      </div>
    </div>
    <nuxt />
  </div>
</template>

<script>
import Vue from "vue";
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
export default {};
</script>

<style src="../css/estilos.css" />


