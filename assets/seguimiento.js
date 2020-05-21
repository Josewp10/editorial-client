import axios from "axios";

export default {
  data() {
    return {
      mensaje: "CRUD De   Seguimiento",
      enEdicion: false,
      modal: true,
      
      titulo: "",
      obra: null,
      indice: 0,
      disabled: 0,
      seguimiento: {
        id: "",
        id_propuesta:"",
        id_tarea: "",
        fecha: "",
        estado: "",
        comentario: "",
        archivo: "",
        acciones: true
      },
      autor: [],
      notificacion: {
        tipo: "",
        comentario: ""
      },
      lista_seguimiento: [],
      lista_tareas: [],
      opciones_estados: [
        { value: null, text: "Seleccione el tipo de estado", disabled: true },
        { value: "Aprobado", text: "Activo" },
        { value: "En Revisión", text: "En Revisión" },
        { value: "Reprobado", text: "Reprobado" },
        { value: "Cancelado", text: "Cancelado" }
      ],
      opciones_notificacion: [
        {
          value: null,
          text: "Seleccione el tipo de Notificación",
          disabled: true
        },
        { value: "Con Ajustes", text: "Con Ajustes" },
        {
          value: "Versión Maquetada para revisión",
          text: "Versión Maquetada para revisión"
        },
        { value: "Versión Final", text: "Versión Final" }
      ]
    };
  },
  mounted() {
    this.obra = JSON.parse(sessionStorage.getItem("obra"));
    this.titulo = this.obra.titulo;
    this.seguimiento.id_propuesta = this.obra.idobra;
    this.infoAutor();
    this.listarSeguimientos();
    this.listarTareas();
    this.disabled = 0;
  },
  computed: {
    validacionTarea() {
      return this.validar_condicion(this.seguimiento.id_tarea.length > 0);
    },
    validacionFecha() {
      return this.validar_condicion(this.seguimiento.fecha.length > 0);
    },
    validacionComentario() {
      return this.validar_condicion(this.seguimiento.comentario.length > 0);
    },
    validacionArchivo() {
      return this.validar_condicion(this.seguimiento.archivo.length > 0);
    },
    validacionEstado() {
      return this.validar_condicion(this.seguimiento.estado.length > 0);
    }
  },
  methods: {
    validar_condicion(bool) {
      if (bool == false) {
        this.validacion = false;
        return false;
      } else {
        this.validacion = true;
        return true;
      }
    },
    asignar() {
      this.titulo = this.$route.query.titulo;
    },
    //TRAE LOS SEGUIMIENTOS DE LA BASE DE DATOS FILTRADOS POR OBRA
    listarSeguimientos() {
      //let id = this.obra.idobra;
      console.log("ID OBRA: " + this.obra.idobra);
      console.log("OBRA: " + this.obra.titulo);
      axios
        .get(`http://127.0.0.1:3001/seguimiento/${this.obra.idobra}`)
        .then(response => {
          console.log(response);

          this.lista_seguimiento = response.data.info;
          for (let i in this.lista_seguimiento) {
            this.lista_seguimiento[i].acciones = true;
          }

          //this.enEdicion = true;
        })
        .catch(error => {
          console.log(error);
        });
    },
    //TRAE LAS TAREAS DE LA BASE DE DATOS PARA SELECCIONARLAS EN EL FORMULARIO
    listarTareas() {
      axios
        .get("http://127.0.0.1:3001/obra/tareas")
        .then(response => {
          console.log(response);
          this.lista_tareas = response.data.info;

          console.log(this.lista_tareas);
          //alert(lista_tareas)
        })
        .catch(error => {
          console.log(error);
        });
    },
    //CREA UN NUEVO SEGUIMIENTO EN LA BASE DE DATOS
    crearSeguimiento() {
      //console.log(this.seguimiento);

      if (this.validacion == true) {
        axios
          .post("http://127.0.0.1:3001/seguimiento", this.seguimiento)
          .then(response => {
            console.log(response);
            this.lista_seguimiento.push(response.data);
            this.disabled = 0;
            this.seguimiento = {
              id: "",
              id_tarea: "",
              fecha: "",
              estado: "",
              comentario: "",
              archivo: "",
              acciones: true
            };
            this.$router.push({
              path: "seguimiento",
              query: { titulo: response.data["titulo"] }
            });
            location.reload(true);
            alert("Seguimiento de la Obra Creado");
          })
          .catch(error => {
            console.log(error.response);
          });
      } else {
        alert("LLene todos los campos correctamente");
      }
    },
    //ELIMINA SEGUIMIENTOS DE LA BASE DE DATOS
    eliminarSeguimiento({ item }) {
      axios
        .delete(`http://127.0.0.1:3001/seguimiento/${item.id}`)
        .then(response => {
          let posicion = this.lista_seguimiento.findIndex(
            lista_seguimiento => lista_seguimiento.id == item.id
          );
          this.lista_seguimiento.splice(posicion, 1);

          console.log(response.data.info);
          console.log(item.id);
          alert("Seguimiento Eliminado");
        })
        .catch(error => {
          console.log(error);
        });
    },
    //CREA UN NUEVO SEGUIMIENTO EN LA BASE DE DATOS
    cargarSeguimiento({ item }) {
      axios
        .get(`http://127.0.0.1:3001/seguimiento/seg/${item.id}`)
        .then(response => {
          var array = response.data.info;
          this.disabled = 1;
          this.enEdicion = true;
          this.seguimiento.id = array[0].id;
          this.seguimiento.id_tarea = array[0].id_tarea;
          this.seguimiento.fecha = array[0].fecha;
          this.seguimiento.comentario = array[0].comentario;
          this.seguimiento.estado = array[0].estado;
          this.seguimiento.archivo = array[0].archivo;
          this.seguimiento.acciones = true;
        })
        .catch(error => {
          console.log(error);
        });
    },
    //ALMACENA LOS VALORES DEL SEGUIMIENTO MODIFICADO EN LA BASE DE DATOS
    actualizarSeguimiento() {
      if (this.validacion == true) {
        axios
          .put(
            `http://127.0.0.1:3001/seguimiento/${this.seguimiento.id}`,
            this.seguimiento
          )
          .then(response => {
            let posicion = this.lista_seguimiento.findIndex(
              seguimiento => seguimiento.id == this.seguimiento.id
            );
            this.lista_seguimiento.splice(posicion, 1, this.seguimiento);
            this.enEdicion = false;
            this.listarTareas();
            this.seguimiento = {
              id: "",
              id_tarea: "",
              fecha: "",
              estado: "",
              comentario: "",
              archivo: "",
              acciones: true
            };
            location.reload(true);
            alert("Seguimiento Actualizado");
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        alert("LLene todos los campos correctamente");
      }
    },
    ///ENVÍO DE CORREO
    enviarCorreo() {
      this.notificacion = {
        titulo: this.obra.titulo,
        tarea: this.lista_seguimiento[this.indice].tarea,
        tipo: "",
        estado: this.lista_seguimiento[this.indice].estado,
        comentario: ""
      };
      /////CONEXIÓN CON BACKEND PARA ENVÍO DE CORREO
      axios
        .post(
          `http://127.0.0.1:3001/enviarCorreo/notificacion`,
          this.notificacion
        )
        .then(response => {
          console.log(response);
          this.modal = true;
        })
        .catch(error => {
          console.log(error);
        });
    },
    //ALMACENA EL INDICE DEL SEGUIMIENTO SELECCIONADO Y ACTIVA LA NOTIFICACIÓN
    almacenarIndice(row) {
      this.modal = false;
      this.indice = row.index;
      console.log("INDICE: " + this.indice);
    },
    //TRAE LA INFORMACIÓN DEL AUTOR PARA UTILIZARLA EN LA NOTIFICACIÓN
    infoAutor() {
      axios
        .get(`http://127.0.0.1:3001/obra/autor/${this.obra.idobra}`)
        .then(response => {
          console.log("RESPONSE: " + response);
          this.autor = response.data.info;
          console.log("EMAIL: " + this.autor[0].email);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
