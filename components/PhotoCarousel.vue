<script setup lang='ts'>

type Props = {
    photos: string[];
}

const props = defineProps<Props>();

</script>

<template>
    <UCarousel :items="photos" v-slot="{ item }" :ui="{ item: 'basis-full' }" class="rounded-lg overflow-hidden carousel"
        :prev-button="{ color: 'gray', class: 'left-3' }" :next-button="{ color: 'gray', class: 'right-3' }" arrows>
        <img :src="item" alt="" />
    </UCarousel>
</template>

<style>
.carousel,
.carousel>* {
    width: 10em;
    height: 100%;
}

.carousel img {
    object-fit: fill;
    margin: auto;
}
</style>