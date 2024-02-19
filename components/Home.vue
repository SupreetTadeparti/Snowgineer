<script setup lang="ts">
const user = useSupabaseUser()

const theme: string = "snowman"

const displayAuth = ref(false);
const displaySubmit = ref(false);

const toggleAuth = () => {
    displayAuth.value = !displayAuth.value
}

const toggleSubmit = () => {
    displaySubmit.value = !displaySubmit.value;
}

const toggleModal = () => {
    if (user.value) toggleSubmit();
    else toggleAuth();
}
</script>

<template>
    <AuthModal v-if="displayAuth" />
    <SubmitModal v-if="displaySubmit" />
    <div class="container">
        <div class="left">
            <div class="figure">
                <img src="~/assets/img/snowman.svg" alt="">
            </div>
        </div>
        <div class="right">
            <div class="heading">
                <span v-for="(letter, index) in theme.split('')" :key="index" :style="{ '--idx': index }" class="letter">{{
                    letter
                }}</span>
            </div>
            <Btn text="Participate" @click="toggleModal" />
        </div>
        <LeaderboardSign />
    </div>
</template>

<style scoped>
@keyframes heading {
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.container {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 7.5em;
    width: 100%;
    height: 100%;
    scroll-snap-align: start;
    overflow: hidden;
}

.left {
    display: flex;
    justify-content: flex-end;
    align-items: center;
}

.figure>img {
    width: 35em;
    transform: scale(1.8) rotate(-15deg);
}

.right {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-bottom: 10em;
    gap: 5em;
}

.heading>.letter {
    opacity: 0;
    transform: translateY(-20em);
    animation: heading 2s ease-out forwards;
    animation-delay: calc(var(--idx) * 0.15s);
}
</style>