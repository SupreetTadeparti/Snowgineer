<template>
  <NuxtPage />
</template>

<style>
@font-face {
  font-family: Snow;
  src: url(~/assets/fonts/SnowtopCaps.ttf)
}

:root {
  --bg-clr: #7ad4e6;
}

* {
  box-sizing: border-box;
}

html,
body,
#__nuxt {
  height: 100%;
  font-family: Fredoka;
  background-color: var(--bg-clr);
  margin: 0;
  scrollbar-width: none;
  scroll-behavior: smooth;
  scroll-snap-type: y mandatory;
}

::-webkit-scrollbar {
  display: none;
}

.glass {
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(4px) saturate(110%);
  -webkit-backdrop-filter: blur(4px) saturate(110%);
  border: 2px solid white;
}

#tsparticles2900>canvas {
  z-index: -1 !important;
}
</style>