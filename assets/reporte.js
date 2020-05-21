import axios from 'axios'
import config from "../assets/config";

export default {
    data() {
        return {
            token:"",
            mensaje: "Reporte",
        };
    },
    beforeMount(){
        this.cargarPagina();
    },
    mounted() {
        
    },
    computed: {

    },
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
        onClick() {
            let url = config.url_api + `pdf/publicaciones`;
            alert("Señor Usuario su Pdf ya se esta generando, por favor espere unos segundos");
            axios({
                  url: url,
                  method: 'GET',
                  responseType: 'blob',
                  headers: { token: this.token }  })
                  .then((response) => {
                   var fileURL = window.URL.createObjectURL(new Blob([response.data]));
                   var fileLink = document.createElement('a');
                   fileLink.href = fileURL;
                   fileLink.setAttribute('download', 'reporte.pdf');
                   document.body.appendChild(fileLink);
                   fileLink.click();
              }).catch(error => {
                console.log(error);
              });
        }
    }
};

/*let response = await this.$axios.get("http://localhost:3001/pdf/publicaciones")
     var link = document.createElement("reporte");
     link.href = url;
     link.target = "blank";
     document.body.appendChild(link);
     link.click();*/