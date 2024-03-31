<template>
  <div class="picker">
    <div class="card-grid">
      <div class="card-container" v-for="item in cards" :key="item.id">
        <div class="counter badge" v-if="item.number > 1">x{{ item.number }}</div>
        <card  
          @click="$emit('pick', item)"
          v-bind="item.card"
          size="s"
        />
      </div>
    </div>
  </div>
</template>
<script>
import Card from '@/components/Card.vue'


export default {
  name: 'CardPicker',
  components: { Card },
  props: {
    cards: Array
  },
  data() {
  },
  async created() {
  },
  methods: {
  },
  computed: {
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .picker{
    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 10;
    top: 0;
    left: 0;
    height: 110vh;
    width: 100vw;
    background-color: #000b;
    padding: 10px;
  }

  .card-grid{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    height: 100vh;
    overflow-y: scroll;
    grid-gap: 10px;
  }

  
.counter {
  background-color: #35a33a;
  top: -5px;
  left: -2px;
  padding: 2px 10px;
}

.badge {
  border-radius: 10px;
  position: absolute;
  color: #fff;
  width: fit-content;
}
.card-container {
  position: relative;
}
</style>
