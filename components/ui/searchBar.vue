<script setup lang="ts">

</script>

<template>
<div style="" id="searchBar">
  <input placeholder="search...">
  <nuxt-img
    src="/icons/search.png"
    width="28"
    height="28"
    alt="search icon"
    class="search-icon"
     />
</div>
</template>

<style scoped>
#searchBar{
  position: absolute;
  top: 1vh;
  left: 50%;
  transform: translateX(-50%);

  width: 40vw;
  height: 5vh;
  /*background: var(--background-1);
*/
  border-radius: 10px;

  z-index: 100;
}

input{
  width: 85%;
  height: 80%;
  margin-top: 5px;
  margin-left: 10px;
  padding: 0 2.5%;

  background: transparent;
  outline: none;

  border: 2px solid #ccc;
  border-radius: 20px;

  color: white !important;
}

.search-icon{
  position: absolute;
  top: 50%;
  left: 100%;
  transform: translateY(-50%) translateX(-150%);

  filter: invert(1);
}

</style>