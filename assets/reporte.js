import axios from 'axios'

export default {
    data() {
        return {
            mensaje: "Reporte",
        };
    },
    mounted() {
        
    },
    computed: {

    },
    methods: {
        onClick() {
            alert("Señor Usuario su Pdf ya se esta generando, por favor espere unos segundos");
            axios({
                  url: 'http://localhost:3001/pdf/publicaciones',
                  method: 'GET',
                  responseType: 'blob',
              }).then((response) => {
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