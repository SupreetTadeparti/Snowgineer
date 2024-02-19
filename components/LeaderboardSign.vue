<script setup>
const scrollToNextSection = () => {
    document.querySelector(".leaderboard").scrollIntoView();
}
</script>

<template>
    <div class="ldb-help">
        <div class="ldb-help__icon">
            <span></span>
            <span></span>
            <span></span>
        </div>
        <div class="ldb-help__text" @click="scrollToNextSection">Leaderboard</div>
        <Arrow type="down" :size="0" />
    </div>
</template>

<style scoped lang="scss">
.ldb-help {
    cursor: pointer;
    position: absolute;
    left: 50%;
    bottom: .5em;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    gap: .5em;
    z-index: 10;
}

.ldb-help__icon {
    display: flex;
    align-items: flex-end;
    gap: .2em;

    &>span {
        width: .75em;
        border-radius: .25em;
        background-color: white;

        &:nth-child(1) {
            height: 1em;
        }

        &:nth-child(2) {
            height: 2.25em;
        }

        &:nth-child(3) {
            height: 1.5em;
        }
    }
}

.ldb-help__text {
    font-size: 1.3em;
    color: #fff;
}
</style>