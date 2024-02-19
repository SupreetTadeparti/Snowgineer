<script setup lang='ts'>

const props = defineProps({
    /* 
    Size:
    0 -> Small
    1 -> Medium
    2 -> Large
    */
    size: Number,
    type: String
})

const isUp: boolean = props.type === 'up';
const isDown: boolean = props.type === 'down';

</script>

<template>
    <div :class='{ arrow: true, up: isUp, down: isDown, small: size === 0, medium: size === 1, large: size === 2 }'></div>
</template>

<style scoped>
.arrow {
    transform: rotate(45deg);
    border: 3px solid white;
}

.arrow.small {
    width: .75em;
    height: .75em;
}

.arrow.medium {
    width: 1.4em;
    height: 1.4em;
}

.arrow.large {
    width: 2em;
    height: 2em;
}

.arrow.up {
    border-right: 2px solid transparent;
    border-bottom: 2px solid transparent;
    transform: translateY(25%) rotate(45deg);
}

.arrow.down {
    border-left: 2px solid transparent;
    border-top: 2px solid transparent;
    transform: translateY(-25%) rotate(45deg);
}
</style>