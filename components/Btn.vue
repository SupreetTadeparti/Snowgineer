<script setup>
const props = defineProps(["text"])
</script>

<template>
    <div class="btn glass">
        {{ text }}
    </div>
</template>

<style scoped>
@keyframes popIn {
    to {
        transform: scale(1);
    }
}

.btn {
    cursor: pointer;
    font-size: 1.4em;
    color: white;
    width: max-content;
    border: 2px solid white;
    box-shadow: 0 0 5px 0 hsl(0, 0%, 100%, .5);
    border-radius: .5em;
    padding: .75em 1.5em;
    z-index: 10;
    transform: scale(0);
    animation: popIn 200ms forwards;
    animation-delay: 2.5s;
    transition: background-color 125ms ease-out,
        color 125ms ease-out,
        scale 125ms ease-out;

    background: rgba(255, 255, 255, .25);
    backdrop-filter: blur(4px) saturate(110%);
    -webkit-backdrop-filter: blur(4px) saturate(110%);
}

.btn:hover {
    background-color: white;
    color: var(--bg-clr);
    scale: 1.1;
}
</style>