<script setup lang="ts"></script>

<template>
    <div style="" id="searchBar">
        <input placeholder="search..." />
        <Icon name="material-symbols:search-rounded" class="search-icon" />
    </div>
</template>

<style scoped>
#searchBar {
    position: absolute;
    top: 1vh;
    left: 50%;
    transform: translateX(-50%);

    width: fit-content;
    height: 5vh;
    display: flex;
    align-items: center;
    justify-content: center;
    /*background: var(--background-1);
*/
    border-radius: 10px;

    z-index: 100;
}

input {
    width: 35vw;
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

.search-icon {
    font-size: 3.5rem;
    filter: invert(1);
    margin-left: 1rem;
}
</style>
