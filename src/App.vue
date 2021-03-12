<template>
  <div>
    <Form :dirs="dirs" :size="size" v-if="size!== null"
          @relocate-rover="setRover" @move-rover="moveRover" />
    <WeirdPlanet :size="size" v-if="size!== null" :obstacles="obstacles">
      <Rover />
    </WeirdPlanet>
  </div>
</template>

<script>
import WeirdPlanet from "@/components/WeirdPlanet";
import Rover from "@/components/Rover";
import Form from "@/components/Form";

export default {
  name : 'App',
  components : { Form, Rover, WeirdPlanet },
  data : () => ({
    dirs : ['N', 'S', 'E', 'W'],
    currentDir : 'F',
    currentPos : {},
    size : null,
    obstacles : [],
    stop : false
  }),
  mounted() {
    this.size = Number( prompt( "Set the planet size:" ) )
  },
  methods : {
    setRover( { x, y, dir } ) {
      this.createObstacles()
      this.currentDir = dir
      this.currentPos = { x, y }
      this.movement()
    },
    moveRover( cmds ) {
      const mvs = cmds.split( '' )
      mvs.every( m => {
        this.checkDir( m )
        this.checkObstacles()
        if ( this.stop === true ) {
          alert( `Sequence aborted, obstacle at coordinates x:${ this.currentPos.x }, y:${ this.currentPos.y }` )
          return false
        }
        document.querySelector( 'td.active' ).classList.remove( 'active' )
        this.movement()
        return true
      } )
    },
    checkDir( n ) {
      switch ( this.currentDir ) {
        case 'N':
          if ( n === 'F' ) {
            this.currentDir = 'N'
            this.currentPos.y--
          } else if ( n === 'L' ) {
            this.currentDir = 'W'
            this.currentPos.x--
          } else {
            this.currentDir = 'E'
            this.currentPos.x++
          }
          break;
        case 'S':
          if ( n === 'F' ) {
            this.currentDir = 'S'
            this.currentPos.y++
          } else if ( n === 'L' ) {
            this.currentDir = 'E'
            this.currentPos.x++
          } else {
            this.currentDir = 'W'
            this.currentPos.x--
          }
          break;
        case 'E':
          if ( n === 'F' ) {
            this.currentDir = 'E'
            this.currentPos.x++
          } else if ( n === 'L' ) {
            this.currentDir = 'N'
            this.currentPos.y--
          } else {
            this.currentDir = 'S'
            this.currentPos.y++
          }
          break;
        case 'W':
          if ( n === 'F' ) {
            this.currentDir = 'W'
            this.currentPos.x--
          } else if ( n === 'L' ) {
            this.currentDir = 'S'
            this.currentPos.y++
          } else {
            this.currentDir = 'N'
            this.currentPos.y--
          }
          break;
      }
    },
    movement() {
      const table = document.querySelector( 'table' )
      const row = table.children[this.currentPos.y - 1]
      const col = row.children[this.currentPos.x - 1]
      col.classList.add( 'active' )
    },
    createObstacles( s ) {
      const td = document.querySelectorAll( 'td' )
      let ind = 0
      for ( let i = 0; i < s; i++ ) {
        this.obstacles[i] = new Array( s )
        for ( let k = 0; k < s; k++ ) {
          let n = this.$randomNumber( 2 )
          this.obstacles[i][k] = n
          n === 1
              ? td[ind].classList.add( 'obstacle' )
              : null
          ind++
        }
      }
    },
    checkObstacles() {
      if ( this.obstacles[this.currentPos.y - 1][this.currentPos.x - 1] === 1 || this.obstacles[this.currentPos.y - 1][this.currentPos.x - 1] === undefined) {
        this.stop = true
      }
    }
  },
  watch : {
    size : function ( val ) {
      setTimeout( () => {
        this.createObstacles( val )

      }, 200 )
    }
  }
}
</script>

<style>
* {
  box-sizing: border-box
}

body {
  font-family: Arial, sans-serif;
  font-size: 13px;
}
</style>
