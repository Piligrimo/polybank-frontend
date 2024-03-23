<template>
  <div class="unpacking">
    <img class="pack" :class="{shaking: isWaiting, open: !isWaiting}" :src="pack">
    <div class="animated-card-container" v-if="cards && cards.length && !isWaiting">
      <card 
        v-for="(card, i) in cards" 
        v-bind="card" 
        :key="card.id"  
        class="animated-card"
        :class="classes(i)"
        @click="select(i)"
      />
    </div>
    <button v-if="!isWaiting" @click="$emit('unpacked')">Забрать</button>
  </div>
</template>
<script>
import pack from '@/assets/pack.png'
import { api } from '@/api';
import Card from '@/components/Card.vue'


export default {
  name: 'CardUnpacking',
  components: { Card },
  data() {
    return{
      artificialDelay: true,
      isPending: true,
      pack,
      cards: [],
      selected: null
    }
  },
  async created() {
    console.log('unpack');
    const vue = this
    this.getCardsFromPack()
    setTimeout(() => {
      vue.artificialDelay = false
    }, 3000);
  },
  methods: {
    async getCardsFromPack() {
      this.isPending = true
      this.cards = await api.openPack()
      this.isPending = false
    },
    classes(index) {
      const classes = []
      classes.push(`card_${index}`)
      if (this.selected === index)
        classes.push(`_selected`)
      return classes
    },
    select(i) {
      if (i === this.selected) {
        this.selected = null
      } else {
        this.selected = i
      }
    }
  },
  computed: {
    isWaiting() {
      return this.isPending || this.artificialDelay
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .animated-card-container {
    width: 100%;
    height: 100%;
    position: relative;
    transform: scale(0.4);
  }
  .animated-card {
    position: absolute;
    left: calc(50% - 150px);
    top: 25%;
    animation-duration: 2s;
    animation-timing-function: ease-in-out;
    animation-iteration-count: 1;
    transition: all 0.5s;
  }

  .card_0 {
    animation-name: c0;
    transform: translate(0, -750px);
  } 

  @keyframes c0 {
    from {transform: translate(0, 0);}
    to {transform: translate(0, -750px);}  
  }

  .card_1 {
    animation-name: c1;
    transform: translate(-220px, -300px);
  } 

  @keyframes c1 {
    from {transform: translate(0, 0);}
    to {transform: translate(-220px, -300px);}  
  }
  .card_2 {
    animation-name: c2;
    transform: translate(220px, -300px);
  } 

  @keyframes c2 {
    from {transform: translate(0, 0);}
    to {transform: translate(220px, -300px);}  
  }

  .card_3 {
    animation-name: c3;
    transform: translate(160px, 200px);
  } 

  @keyframes c3 {
    from {transform: translate(0, 0);}
    to {transform: translate(160px, 200px);}  
  }

  .card_4 {
    animation-name: c4;
    transform: translate(-160px, 200px);
  } 

  @keyframes c4 {
    from {transform: translate(0, 0);}
    to {transform: translate(-160px, 200px);}  
  }

  ._selected {
    transform: scale(2) translate(0, -200px);
    z-index: 3;
  }

  .pack {
    position: absolute;
    top: 100px;
    width: 300px;
    transition: all 1s;
  }

  .open {
    opacity: 0;
    transform: scale(5);
  }

  .shaking {
    animation-name: shaking;
    animation-duration: 2s;
    animation-iteration-count: infinite;
    animation-timing-function: cubic-bezier();
  }

  @keyframes shaking {
    0%   {transform: rotate(10deg);}
    5%   {transform: rotate(-10deg);}
    10%   {transform: rotate(10deg);}
    15%   {transform: rotate(-10deg);}
    20%   {transform: rotate(10deg);}
    25%   {transform: rotate(2deg);}
    50%   {
      transform: rotate(2deg) scaleY(1.1);
    }
    60%   {
      transform: rotate(5deg) scaleY(0.9);
    }
    70%   {
      transform: rotate(3deg) scaleY(1.1);
    }
    80%   {
      transform: rotate(4deg) scaleY(0.9);
    }
  }
  .unpacking{
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
  }

  button {
    position: absolute;
    bottom: 200px;
  }

</style>
