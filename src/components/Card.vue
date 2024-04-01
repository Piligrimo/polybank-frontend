<template>
  <div class="card" :class="{pink: rarity === 'legendary', _smol: size === 's' }">
    <img :src="getPath(picture)">
    <div class="circle" :class="rarity">
      <div class="blick"></div>
      <div v-if="rarity === 'legendary'" class="circle shadow"></div>
    </div>
    <div v-if="is_action" class="action-badge">Действие</div>
    <h3>{{ name }}</h3>
    <p class="description" v-html="description"/>
    
    <button v-if="isUsable" @click="$emit('use-actions')">Применить</button>
  </div>
</template>
<script>
import picDictionary from '@/assets/card pics'
export default {
  name: 'TheCard',
  data() {
    return{}
  },
  props: {
    name: String,
    size: String,
    rarity: String,
    picture: String,
    description: String,
    is_unique: Number,
    is_action: Number,
    isUsable: Boolean
  },
  methods: {
    getPath(pic) {
      return picDictionary[pic]
    },
    formatedDesrciption(description) {
      return description.replaceAll('\n','<br>')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.card {
  border-radius: 10px;
  background-color: #fff;
  color: #333333;
  padding: 30px;
  margin-bottom: 24px;
  width: 300px;
  height: 550px;
  text-align: center;
  box-shadow: 5px 5px 21px -1px rgba(0, 0, 0, 0.5);
  -webkit-box-shadow: 5px 5px 21px -1px rgba(0,0,0,0.5);
  -moz-box-shadow: 5px 5px 21px -1px rgba(0,0,0,0.5);
}

.card._smol {
  max-width: 100px;
  width: 100%;
  border-radius: 3px;
  padding: 10px;
  height: 200px;
}

.card._smol h3{
  font-size: 6px;
}

.card._smol .description{
  font-size: 6px;
}

.card._smol .circle{
  width: 17px;
  height: 17px;
  top: -15px;
  left: -5px;
}

.pink {
  background-color: #f6d8ff;
  color: #2c0126;
}

img {
  width: 100%;
  image-rendering: -o-crisp-edges;
  image-rendering: -moz-crisp-edges;
  image-rendering: crisp-edges;
  image-rendering: pixelated;
}

h3 {
  margin-top: 0;
}

.description {
  color: #606060;
  font-style: italic;
}
.circle {
  position: relative;
  top: -30px;
  left: -15px;
  z-index: 3;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: lawngreen;
  box-shadow: 5px 5px 21px -1px rgba(0, 0, 0, 0.5);
  -webkit-box-shadow: 5px 5px 21px -1px rgba(0,0,0,0.5);
  -moz-box-shadow: 5px 5px 21px -1px rgba(0,0,0,0.5);
}

.trash {
  background: rgb(236,236,236);
  background: radial-gradient(circle, rgba(236,236,236,1) 0%, rgba(103,103,103,1) 100%);
}

.common {
  background: rgb(255,237,152);
  background: radial-gradient(circle, rgba(255,237,152,1) 0%, rgba(255,211,0,1) 100%);
}

.rare {
  background: rgb(141,255,34);
  background: radial-gradient(circle, rgba(141,255,34,1) 0%, rgba(0,170,10,1) 100%);
}

.epic {
  background: rgb(255,149,248);
  background: radial-gradient(circle, rgba(255,149,248,1) 0%, rgba(84,0,170,1) 100%);
}

.legendary {
  background: rgb(255,156,156);
  background: linear-gradient(346deg, rgba(255,156,156,1) 0%, rgba(245,206,156,1) 20%, rgba(232,238,176,1) 40%, rgba(200,225,204,1) 60%, rgba(198,212,224,1) 80%, rgba(208,156,255,1) 100%);  
}

.shadow {
  background: transparent;
  background: radial-gradient(circle, rgba(255,156,156,0) 0%, rgba(170, 82, 247, 0.6) 100%);
  background-blend-mode: multiply;
  top:0 !important;
  left: 0 !important;
  box-shadow: none;
}

.blick {
  background: rgb(255,255,255);
  background: linear-gradient(180deg, #ffffffcc 0%, #ffffff00 100%);
  position: absolute;
  border-radius: 50%;
  z-index: 4;
  top:5px;
  left: 20%;
  width: 30%;
  height: 20%;
}

.action-badge{
  position: relative;
  top: -80px;
  left: -15px;
  z-index: 2;
  height: 50px;
  width: min-content;
  padding: 15px 30px 15px 70px;
  border-radius: 25px;
  line-height: 20px;
  font-size: 20px;
  font-weight: bold;
  background-color: #fff;
  box-shadow: 5px 5px 21px -1px rgba(0, 0, 0, 0.5);
  -webkit-box-shadow: 5px 5px 21px -1px rgba(0,0,0,0.5);
  -moz-box-shadow: 5px 5px 21px -1px rgba(0,0,0,0.5);
}

.card._smol .action-badge{
  padding: 5px 10px 5px 23px;
  height: 17px;
  font-size: 7px;
  line-height: 7px;
  top: -32px;
  left: -5px;
}

.card._smol button {
  display: none;
}

</style>
