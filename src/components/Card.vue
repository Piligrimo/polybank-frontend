<template>
  <div class="card">
    <img :src="getPath(picture)">
    <div class="circle" :class="rarity">
      <div v-if="rarity === 'legendary'" class="circle shadow"></div>
    </div>
    <h3>{{ name }}</h3>
    <p class="description" v-html="description"/>
  </div>
</template>
<script>
import picDictionary from '@/assets/card pics'
export default {
  name: 'MainPage',
  data() {
    return{}
  },
  props: {
    name: String,
    rarity: String,
    picture: String,
    description: String,
    is_unique: Boolean,
    is_action: Boolean
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
  margin: auto;
  margin-bottom: 24px;
  max-width: 300px;
  box-shadow: 5px 5px 21px -1px rgba(0, 0, 0, 0.5);
  -webkit-box-shadow: 5px 5px 21px -1px rgba(0,0,0,0.5);
  -moz-box-shadow: 5px 5px 21px -1px rgba(0,0,0,0.5);
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
  top:0;
  left: 0;
}
</style>
