<script setup lang="ts">
defineProps<{
  username: string;
  name: string;
  photos: string[];
  votes: number;
}>();

const upvote = () => {};

const downvote = () => {};
</script>

<template>
  <div class="ldb-entry glass">
    <div class="ldb-entry__photos">
      <PhotoCarousel :photos="photos" />
    </div>
    <div class="ldb-entry__user">
      <div class="ldb-entry__username">{{ username }}'s</div>
      <div class="ldb-entry__buildname">{{ name }}</div>
    </div>
    <div class="ldb-entry__score">
      <span>{{ votes }}</span>
      <img src="~/assets/img/snowflake.svg" width="40" alt="snowflake" />
    </div>
    <div class="ldb-entry-voting">
      <div class="ldb-entry-upvote glass">
        <Arrow type="up" :size="1" @click="upvote" />
      </div>
      <div class="ldb-entry-downvote glass">
        <Arrow type="down" :size="1" @click="downvote" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.ldb-entry {
  width: 50em;
  height: 10em;
  border-radius: 0.5em;
  padding: 1em;
  display: flex;
  align-items: center;
  gap: 1em;
  position: relative;
}

.ldb-entry-voting {
  position: absolute;
  left: calc(100% + 0.5em);
  display: flex;
  flex-direction: column;
  width: 6em;
  height: 10em;
  gap: 0.5em;

  & > * {
    cursor: pointer;
    border-radius: 0.5em;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-color 125ms ease-out;

    &:hover {
      background-color: rgba(255, 255, 255, 0.5);
    }
  }
}

.ldb-entry__user > * {
  font-weight: bold;
  font-size: 1.75em;
  color: white;

  &.ldb-entry__username {
    font-size: 1.15em;
  }
}

.ldb-entry__photos {
  height: 100%;
}

.ldb-entry__score {
  margin-left: auto;
  display: flex;
  align-items: center;
  color: white;
  font-weight: bold;
  font-size: 1.5em;
  gap: 0.5em;
}
</style>
