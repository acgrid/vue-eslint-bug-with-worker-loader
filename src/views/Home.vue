<template>
  <div class="home">
    <button @click="test">Test</button>
  </div>
</template>

<script>
// @ is an alias to /src
import Worker from 'worker-loader!../worker/test'
// this line violates eslint
export default {
  name: 'home',
  methods: {
    test () {
      const w = new Worker()
      w.onmessage = ({ data }) => alert(JSON.stringify(data))
      w.postMessage('foo')
    }
  }
}
</script>
