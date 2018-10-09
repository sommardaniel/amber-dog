<script>
export default {
  name: "app",

  data() {
    return {
      msg: "Bildarkivet",
      photos: []
    };
  },
  created: function() {
    fetch("http://localhost:3000/api/photos/", {
      credentials: "same-origin"
    }).then(res =>
      res.json().then(res => {
        console.log(res);
        this.photos = res;
      })
    );
  },
  methods: {
    updatePhoto: function(photo) {
      let header = new Headers();
      header.append("Content-Type", "application/json");
      if (photo.title.length == 0) {
        alert("Please write something first");
      } else {
        fetch("http://localhost:3000/api/photos/update", {
          credentials: "same-origin",
          headers: header,
          method: "POST",
          body: JSON.stringify(photo)
        }).then(res =>
          res.json().then(res => {
            //this.photo = res;
            alert(res.message);
          })
        );
      }
    }
  }
};
</script>

<template>
  <div id="app">
    <div class="top">
    <h1>{{msg}}</h1>
      </div>
    
    <div class="photo" v-for="photo in photos">
      <img :src='photo.url'>
      <h2>{{photo.title}}</h2>
      <input v-model="photo.title" placeholder="...">
      <button v-on:click="updatePhoto(photo)">Submit</button>
    </div>
  
  </div>
</template>

<style lang="scss">
body {
  background-color: rgb(41, 37, 37);
  margin-left: auto;
  margin-right: auto;
  width: 800px;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  margin-top: 60px;
}

.top {
  background-color: white;
  width: 800px;
  height: 100px;
  text-align: center;
  padding: 10px;
}
.photo {
  background-color: white;
  width: 800px;
  height: 800px;
  text-align: center;
  margin-top: 20px;
}
.photo img {
  width: 800px;
  height: 600px;
  object-fit: cover;
}

.photo input,
button {
  width: 400px;
  height: 30px;
  border-radius: 5px;
  /*border: 1px soild rgba(238, 248, 248, 0.918); */
  text-align: center;
  border-style: none;
  display: inline-block;
}

.photo button {
  color: rgb(83, 83, 83);
  font-size: 100%;
  background-color: rgba(238, 248, 248, 0.918);
}

.photo button:hover {
  box-shadow: 3px 3px 3px 3px rgba(155, 152, 152, 0.829);
  transition: 1s;
}

.photo input:hover {
  background-color: rgb(224, 255, 229);
  transition: 1s;
}

* {
  box-sizing: border-box;
}
h1,
h2 {
  font-weight: normal;
  color: black;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
