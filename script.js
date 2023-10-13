var app = new Vue({
    el: "#app",
    data: {
        columns: {
            id: 'ID',
            name: 'Full Name',
            phone: 'Phone',
        },
        rows: [],
        sortOrder: 1,
        sortProperty: 'ID'
    },
    methods: {
        getPosts() {
            get("https://jsonplaceholder.typicode.com/users")
        },

        toggleSortOrder(property) {
            if(property === this.sortProperty){
                  this.sortOrder *= -1;
            }
            else{
              this.sortOrder = 1;
              this.sortProperty = property
            }
                  console.log('Changed',this.sortOrder)
                  console.log('Sorting base on',this.sortProperty)
                  this.sortApp()
            },
        sortApp() {
          this.rows.sort((a, b) => {
            if(this.sortProperty === 'ID'){
              if (a.id < b.id) return -this.sortOrder;
              if (a.id > b.id) return this.sortOrder;
              return 0;
            }
            else if (this.sortProperty === 'name'){
            if (a.name < b.name) return -this.sortOrder;
            if (a.name > b.name) return this.sortOrder;
            return 0;
            }
          });
          console.log("Sorting")
        }

    },
    watch: {
      sortOrder() {
        this.sortApp;
      }
    },
    mounted() {
      this.sortApp();
    }

});

app.getPosts();

async function get(url){
    const response = await fetch(url)
    var data = await response.json()
    data.forEach(element => {
        console.log(element.id)
        console.log(element.name)
        console.log(element.phone)
        });
        app.rows = data
   
}
