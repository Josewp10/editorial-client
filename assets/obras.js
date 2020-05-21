import axios from "axios";
import config from "../assets/config";

export default {
  data() {
    return {
      mensaje: "CRUD De Obra",
      token: "",
      enEdicion: false,
      nombreObra: "",
      seguimiento: {
        id: "",
        titulo: "",
        acciones: true
      },
      lista_obra: []
    };
  },beforeMount(){
    this.cargarPagina();
},
  created() {
    this.listarObras();
    this.guardar_token();
  },
  computed: {},
  methods: {
    cargarPagina(){
      let url = config.url_api ;
      let token = localStorage.getItem("token"); this.token = token; 
    },
    guardar_token() { 
      if (typeof window !== "undefined"){ 
        this.url = config.url_api; 
        this.token = localStorage.getItem("token"); 
      } }, 
    listarObras() {
      
      console.log("TOKEN: "+this.token);
      
      let url = config.url_api + `obra`;
      let arreglo = [];
      let arregloNombre = [];
      axios
        .get(url, { headers: { token: this.token } } )
        .then(response => {
          console.log(response);

          arreglo = response.data.info;

          if (this.nombreObra == "") {
            this.lista_obra = arreglo;

            for (let i in this.lista_obra) {
              this.lista_obra[i].acciones = true;
            }
          } else {
            for (let i in arreglo) {
              if (
                arreglo[i].titulo.toLowerCase() == this.nombreObra.toLowerCase()
              ) {
                this.lista_obra = [];
                this.lista_obra.push(arreglo[i]);
              }
            }

            for (let i in this.lista_obra) {
              this.lista_obra[i].acciones = true;
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    almacenarDatos(item) {
      let object = this.lista_obra[item.index];
      sessionStorage.setItem("obra", JSON.stringify(object));
      this.$router.push("/seguimiento");
    }
  }
};
