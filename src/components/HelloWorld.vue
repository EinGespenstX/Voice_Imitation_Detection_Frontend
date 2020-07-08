<template>
  <div id="app">
    <v-app id="inspire">
      <v-app id="inspire">
        <v-navigation-drawer
          v-model="drawer"
          app
          clipped
        >
          <v-list dense>
            <v-list-item link @click="showwhichpage(true)">
              <v-list-item-action>
                <v-icon color="blue darken-2">mdi-microphone</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>Voice Imitation</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item link @click="showwhichpage(false)">
              <v-list-item-action>
                <v-icon color="green darken-2" @click="showwhichpage(false)">mdi-checkerboard</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>Voice Dectation</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
    
        <v-app-bar
          app
          clipped-left
        >
          <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
          <v-toolbar-title>Voice Imitation Dectation</v-toolbar-title>
        </v-app-bar>
    
        <v-main>
          <div class="d1" v-if="showwhich">
            <div class="d2">
              <v-file-input 
                accept=".wav" 
                required
                show-size
                label="Upload the voice file."
                v-model="fileInfo"
                @change="uploadfile1"
                :loading="loading1"
              >
              </v-file-input>
            </div>
            <div class="d2">
              <v-textarea
                v-model="title"
                label="Input the words you wang to make the AI say."
                counter
                minlength="20"
                maxlength="480"
                full-width
                single-line
              ></v-textarea>
            </div>
            <div class="d2">              
              <v-btn
                color="blue"
                class="ma-2 white--text"
                fab
                @click="downloadfile"
                :loading="loading2"
              >
                <v-icon dark>mdi-cloud-download</v-icon>
              </v-btn>
              <span class="s1">
                Get the imitated voice.
              </span>
            </div>
          </div>
          <div class="d1" v-if="showwhich==false">
            <div class="d2">
               <v-file-input 
                accept=".wav" 
                required
                show-size
                label="Upload the voice file."
                v-model="fileInfo"
                @change="uploadfile2"
                :loading="loading3"
              >
              </v-file-input>
            </div>
            <div class="d3">
              <div>
                <v-alert type="success" v-if="alarttype==1">
                  It's a true voice.
                </v-alert>
                <v-alert type="info" v-if="alarttype==2">
                  Haven't receive file.
                </v-alert>
                <v-alert type="error" v-if="alarttype==3">
                  It's an imitation voice.
                </v-alert>
                    <v-alert type="warning" v-if="alarttype==4">
                  Waiting for detection.
                </v-alert>
              </div>
            </div>
          </div>
        </v-main>
    
        <v-footer app>
          <span>&copy; {{ new Date().getFullYear() }}&nbsp;Designed by 17072021&amp;17072006&amp;17072004</span>
        </v-footer>
      </v-app>
    </v-app>
  </div>
</template>

<script>
import axios from "axios";

  export default {
    name: 'HelloWorld',
    el: '#app',
    props: {
      source: String,
    },
    data () {
      return{
        drawer: null,
        showwhich: {
          type: Boolean,
          default: true
        },
        alarttype: 2,
        dlbc: "Grey",
        ulbc: "Blue",
        message: "",
        title: "",
        timer: 0,
        player: 30000,
        player2:20000,
        uploadformvalid: null,
        loading1: false,
        loading2: false,
        loading3: false
      }
    },
    computed: {
      ifvi: function () {
        return this.showwhich;
      },
      ifvd: function () {
        return this.showwhich;
      }
    },
    created () {
        this.$vuetify.theme.dark = true;
    },
    methods: {
      showwhichpage(data){
        this.showwhich = data;
      },
      uploadfile1: function () {
        this.loading1 = true;
        var formup = new FormData();
        formup.append('file', this.fileinfo);
        clearTimeout(this.timer);
        this.timer = setTimeout(()=>{
          this.loading1 = "success";
        },1000);
        axios({
          method: 'post',
          baseURL: '',
          url: '/api/upload1',
          headers: {
            "Content-Type": "multipart/form-data"
          },
          data: formup
        })
        .then(function (response) {
          console.log(response);
          this.message=JSON.stringify(response.data);
        })
        .catch(function (error) {
          console.log(error.response);
          this.message=JSON.stringify(error.response);
        });
      },
      uploadfile2: function () {
        this.loading3 = true;
        var formup = new FormData();
        formup.append('file', this.fileinfo);
        clearTimeout(this.timer);
        this.timer = setTimeout(()=>{
          this.loading3 = "warning";
          this.alarttype=4;
        },1000);
        this.timer = setTimeout(()=>{
          this.loading3 = "success";
          this.alarttype=3;
        },this.player2);
        axios({
          method: 'post',
          baseURL: '',
          url: '/api/upload2',
          headers: {
            "Content-Type": "multipart/form-data"
          },
          data: formup
        })
        .then(function (response) {
          console.log(response);
          this.message=JSON.stringify(response.data);
        })
        .catch(function (error) {
          console.log(error.response);
          this.message=JSON.stringify(error.response);
        });
      },
      downloadfile: function () {
        this.loading2 = true;
        var formup = new FormData();
        formup.append('text', this.title);
        clearTimeout(this.timer);
        this.timer = setTimeout(()=>{
          this.loading2 = "success";
        },this.player);
        axios({
          method: 'post',
          baseURL: '',
          url: '/api/download',
          headers: {
            "Content-Type": "multipart/form-data"
          },
          data: formup
        })
        .then(function (response) {
          console.log(response);
          this.message=JSON.stringify(response.data);
        })
        .catch(function (error) {
          console.log(error.response);
          this.message=JSON.stringify(error.response);
        });
      }
    }
  }
</script>

<style>
.d1
{
  margin: auto;
  max-width: 800px;
}
.d2
{
  margin: auto;
}
.d3
{
  margin-top: 40px;
}
.s1
{
  margin: auto;
  color: darkgray;
}
.i1
{
  max-width: 600px;
}
v-btn
{
  margin: auto;
}
</style>