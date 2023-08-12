<template>
  <div class="container">
    <!-- Heading -->
    <h2 class="text-center mt-5">Route Generator</h2>
    <div class="d-flex ml-auto mt-5">
      <button type="button" class="btn btn-outline-success ml-auto" data-toggle="modal"
              data-target="#exampleModalCenter">
        Route Olustur
      </button>
    </div>
    <div class="input-group col-8 mt-2">
      <input v-model="keyword" type="text" class="form-control" placeholder="Search by name or url or host Name">
    </div>
    <div class="modal fade bd-example-modal-xl" id="exampleModalCenter" tabindex="-1" role="dialog"
         aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Route</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div>
              <div class="d-flex mt-2" style="align-items: end;">
                <div class="col-4">
                  <input
                      type="text"
                      v-model="route.name"
                      placeholder="Enter route name"
                      class="w-100 form-control mr-2"
                  />
                </div>
                <div class="col-4">
                  <input
                      type="text"
                      v-model="route.hostname"
                      placeholder="Enter route host name"
                      class="w-100 form-control mr-2"
                  />
                </div>
                <div class="col-4">
                  <input
                      type="text"
                      v-model="route.url"
                      placeholder="Enter route url"
                      class="w-100 form-control mr-2"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button v-if="!popUp" type="button" class="btn btn-secondary" data-dismiss="modal" @click="clearRoute">
              Close
            </button>
            <button v-if="popUp" type="button" class="btn btn-secondary" data-dismiss="modal"
                    @click="deleteRoute(route)">
              Delete
            </button>
            <button v-if="!popUp" type="button" class="btn btn-primary" @click="saveRoute">Save Route</button>
            <button v-if="popUp" type="button" class="btn btn-primary" @click="updateRoute(route)">Update</button>
          </div>
        </div>
      </div>
    </div>
    <div class="row col-12 mt-3">
      <div class="col-3">
        <select v-model="selectedFilter" class="form-control">
          <option value="">Filter By</option>
          <option value="name">Name</option>
          <option value="hostname">Host Name</option>
          <option value="url">URL</option>
        </select>
      </div>
      <div class="col-6 mb-2">
        <input v-model="filterKeyword" type="text" class="form-control" placeholder="Filter keyword">
      </div>
      <div class="col-xl-3 col-lg-6 col-sm-12">
        <button @click="applyFilter" class="btn btn-primary">Apply Filter</button>
        <button @click="clearFilter" class="btn btn-secondary ml-2">Clear Filter</button>
      </div>
    </div>
    <table class="table table-bordered mt-5">
      <thead>
      <tr>
        <th scope="col" class="text-center">Route Name</th>
        <th scope="col" class="text-center">Route Host Name</th>
        <th scope="col" style="width: 120px">Route Url</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(route, index) in routes" :key="index">
        <td>
          {{ route.name }}
        </td>
        <td>
          {{ route.hostname }}
        </td>
        <td>
          {{ route.url }}
        </td>
        <td>
          <div class="d-flex">
            <button class="btn btn-outline-info mr-1" @click="update(route)">
              Operations
            </button>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

import Multiselect from 'vue-multiselect'
import axios from "axios";
import Vue from "vue";
import header from "@/components/Header.vue";

export default {
  name: "Routes",
  components: {Multiselect},
  data() {
    return {
      route: {
        name: null,
        hostname: null,
        url: null
      },
      selectedFilter: "",
      filterKeyword: "",
      upstream: {
        upstream: {
          "type": "roundrobin",
          "nodes": {
            "127.0.0.1:1980": 1
          }
        }
      },
      headers: {
        'X-API-KEY':
            'edd1c9f034335f136f87ad84b625c8f1'
      },
      keyword: '',
      routes: [],
      value: '',
      popUp: false,
    };
  },
  watch: {
    keyword(newKeyword, oldKeyword) {
      if (newKeyword !== oldKeyword) {
        this.getAllRoutes(newKeyword)
      }
    }
  },
  created() {
    this.getAllRoutes()

  },
  methods: {
    applyFilter() {
      axios.get(`/api/dashboard/?${this.selectedFilter}=${this.filterKeyword}`).then(r => {
          this.routes = r.data
        }).catch((r) => {
        console.log("r",r)
      } )
    },
    clearFilter() {
      this.selectedFilter = "";
      this.filterKeyword = "";
      this.getAllRoutes();
    },
    getAllRoutes(search_query = '') {
      if (search_query === '') {
        axios.get('/api/dashboard/').then(r => {
          this.routes = r.data
        })
      } else {
        axios.get(`/api/dashboard/?search=${search_query}`).then((r) => {
          this.routes = r.data
        })
      }

    },
    update(v) {
      $('#exampleModalCenter').modal('toggle')
      this.route = {...v}
      this.popUp = true
    },
    updateRoute(s) {
      axios.put(`/api/dashboard/${s.id}/`, this.route).then(r => {
        axios.patch(`/apisix/admin/routes/${r.data.id}`, {
              ...this.upstream,
              "name": this.route.name,
              "host": this.route.hostname,
              "uri": this.route.url
            },
            {
              headers: {...this.headers}
            }
        ).then(s => {
          this.clearRoute()
        })
        this.getAllRoutes()
        Vue.notify({
          type: 'success',
          title: 'Başarılı',
          text: 'Başarıyla güncellediniz!',
        });
      })
      $('#exampleModalCenter').modal('hide')
    },
    deleteRoute(s) {
      axios.delete(`/api/dashboard/${s.id}/`).then(r => {
        axios.delete(`/apisix/admin/routes/${s.id}`,
            {
              headers: {...this.headers}
            }
        ).then(s => {
          this.getAllRoutes()
          this.clearRoute()
        })
        Vue.notify({
          type: 'success',
          title: 'Başarılı',
          text: 'Başarıyla sildiniz!',
        });
      })

    },
    saveRoute() {
      axios.post('/api/dashboard/', this.route).then(r => {
        axios.put(`/apisix/admin/routes/${r.data.id}`, {
              ...this.upstream,
              "name": this.route.name,
              "host": this.route.hostname,
              "uri": this.route.url
            },
            {
              headers: {...this.headers}
            }
        ).then(s => {
          this.clearRoute()
        })
        this.getAllRoutes()
        Vue.notify({
          type: 'success',
          title: 'Başarılı',
          text: 'Başarıyla route oluşturdunuz!',
        });
      })
      $('#exampleModalCenter').modal('hide')
    },
    clearRoute() {
      this.route = {
        name: null,
        hostname: null,
        url: null
      }
    }
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>


<style scoped>
.pointer {
  cursor: pointer;
}


</style>