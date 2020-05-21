import axios from "axios";

export default {
  data() {
    return {
      message: "crud Tareas",
      enEdicion: false,
      showTable: true,
      validacion: "",
      pu_tarea: {
        id: "",
        nombre: "",
        descripcion: "",
        modulo: "",
        acciones: true
      },
      lista_tareas: [],
      opciones_modulos: [
        { value: null, text: "Seleccione el Modulo al que pertenece la tarea", disabled: true },
        { value: "01", text: "01 - Gestión de propuestas de publicación" },
        { value: "02", text: "02 - Gestión Evaluación" },
        { value: "03", text: "03 - Gestión Publicación" },
      ],
    };
  },
  created() {
    this.listarTareas();
  },
  computed: {
    validacionId() {
      return this.validar_condicion(this.pu_tarea.id.length > 0);
    },
    validacionNombre() {
      return this.validar_condicion(this.pu_tarea.nombre.length > 0);
    },
    validaciondescripcion() {
      return this.validar_condicion(this.pu_tarea.descripcion.length > 0);
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
    listarTareas() {
      axios
        .get("http://127.0.0.1:3001/tareas")
        .then(response => {
          console.log(response);
          this.lista_tareas = response.data.info;
          for (let i in this.lista_tareas) {
            this.lista_tareas[i].acciones = true;
          }
          console.log(this.lista_tareas);
          //this.enEdicion = true;
        })
        .catch(error => {
          console.log(error);
        });
    },
    /**
     * Método que crea nuevas tareas haciendo una verificación con el identificador
     * al no existir el elemento, se agrega a la lista de tareas y esta al localStorage
     */
    crearTareas() {
      if (this.validacion == true) {
        axios
          .post("http://127.0.0.1:3001/tareas", this.pu_tarea)
          .then(response => {
            this.lista_tareas.push(response.data.info);
            this.pu_tarea = {
              id: "",
              nombre: "",
              descripcion: "",
              modulo: "",
              acciones: true
            };
            location.reload();
            alert("Tarea Creada Correctamente");
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        alert("LLene todos los campos correctamente");
      }
    },
    /**
     * Método que elimina elementos de la lista de tareas y actualiza el localStorage
     */
    eliminarTareas({ item }) {
      axios
        .delete(`http://127.0.0.1:3001/tareas/${item.id}`)
        .then(response => {
          let posicion = this.lista_tareas.findIndex(
            lista_tareas => lista_tareas.id == item.id
          );
          this.lista_tareas.splice(posicion, 1);

          console.log(response.data.info);
          console.log(item.id);
          alert("Tarea Eliminada");
        })
        .catch(error => {
          console.log(error);
        });
    },
    /**
     * Método que carga y lista las obras desde localStorage
     */
    cargarTarea({ item }) {
      axios
        .get(`http://127.0.0.1:3001/tareas/${item.id}`)
        .then(response => {
          var array = response.data.info;

          this.enEdicion = true;
          this.pu_tarea.id = array[0].id;
          this.pu_tarea.nombre = array[0].nombre;
          this.pu_tarea.descripcion = array[0].descripcion;
          this.pu_tarea.modulo = array[0].modulo;
          this.pu_tarea.acciones = true;
        })
        .catch(error => {
          console.log(error);
        });
    },
    /**
     * Método que actualiza un elemento tomando como base el identificadorde este
     * y luego actualiza en el localStorage
     */
    actualizarTarea() {
      if (this.validacion == true) {
        axios
          .put(
            `http://127.0.0.1:3001/tareas/${this.pu_tarea.id}`,
            this.pu_tarea
          )
          .then(response => {
            let posicion = this.lista_tareas.findIndex(
              pu_tarea => pu_tarea.id == this.pu_tarea.id
            );
            this.lista_tareas.splice(posicion, 1, this.pu_tarea);
            this.enEdicion = false;
            this.pu_tarea = {
              id: "",
              nombre: "",
              descripcion: "",
              modulo: "",
              acciones: true
            };
            alert("Tarea Actualizada Correctamente");
            location.reload();
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        alert("LLene todos los campos correctamente");
      }
    }
  }
};
