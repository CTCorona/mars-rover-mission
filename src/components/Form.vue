<template>
  <div class="form-container">
    <div class="col">
      <div class="input-group">
        <label for="coordinate-x">Position X:</label>
        <input id="coordinate-x" type="text" v-model="posX">
      </div>

      <div class="input-group">
        <label for="coordinate-y">Position Y:</label>
        <input id="coordinate-y" type="text" v-model="posY">
      </div>

      <div class="input-group">
        <label for="direction">Direction:</label>
        <input id="direction" type="text" v-model="dir">
      </div>

      <button @click="$emit('relocate-rover', {x: posX, y: posY, dir})">
        Locate rover
      </button>
    </div>

    <div class="col">
      <div class="input-group">
        <label for="route">Insert the commands:</label>
        <input id="route" type="text" v-model="route">
      </div>

      <button @click="$emit('move-rover', route)">
        Move rover
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name : 'Form',
  props : {
    dirs : {
      type : Array,
      required : true
    },
    size : {
      type : Number,
      required : true
    }
  },
  data : () => ({
    posX : null,
    posY : null,
    dir : null,
    route : 'FFRRFFFRL'
  }),
  mounted() {
    this.dir = this.dirs[this.$randomNumber( this.dirs.length )] || null
    this.posX = this.$randomNumber( this.size, 1 )
    this.posY = this.$randomNumber( this.size, 1 )
  }
}
</script>

<style>

.form-container {
  display: flex;
  margin-bottom: 20px;
}

.col {
  display: flex;
  flex-flow: column nowrap;
  width: 200px;
  margin-right: 20px;
}

.input-group {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
}

label {
  width: 100px;
  margin-right: 10px;
}

input {
  width: 100px;
}
</style>
