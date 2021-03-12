<template>
  <table cellpadding="0">
    <tr v-for="x in size" :key="x">
      <td v-for="y in size" :key="y">
        <slot />
      </td>
    </tr>
  </table>
</template>

<script>
export default {
  name : "WeirdPlanet",
  props : {
    size : {
      type : Number,
      required : true
    },
    obstacles : {
      type : Array,
      required : true
    }
  }
}
</script>

<style>
td {
  border: thin solid silver;
  min-width: 10px;
}

td.obstacle {
  background-color: silver;
}

td > .rover {
  opacity: 0;
  margin: auto;
}

td.active > .rover {
  opacity: 1;
}

tr {
  height: 10px;
}


</style>
