<script setup lang="ts">
type Build = {
  name: string;
  engineer: string;
  photos: string[];
  votes: number;
};

const client = useSupabaseClient();

const entries = ref<Build[]>([]);

const loadEntries = async () => {
  try {
    const { data, error } = await client
      .from("build")
      .select("engineer,votes,name");

    if (error) throw error;

    console.log("here");

    const entryData: Build[] = [];

    for (const build of data) {
      const { data } = await client
        .from("user")
        .select("username,email")
        .eq("id", build.engineer);

      const photos = [];

      if (data) {
        const { data: photoData } = await client.storage
          .from("Build Photos")
          .list(data[0].email);

        if (!photoData) return build;

        for (let i = 0; i < photoData.length; i++) {
          const { data: photoURL } = await client.storage
            .from("Build Photos")
            .createSignedUrl(`${data[0].email}/${i}`, 60);

          if (photoURL) photos.push(photoURL?.signedUrl);
        }

        build.engineer = data[0].username;
      }

      entryData.push({ ...build, photos: photos });
    }

    entries.value = entryData;
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  loadEntries();
});
</script>

<template>
  <div class="leaderboard">
    <div class="heading">Leaderboard</div>
    <LeaderboardEntry
      v-for="entry in entries"
      :username="entry.engineer"
      :name="entry.name"
      :votes="entry.votes"
      :photos="entry.photos"
    />
  </div>
</template>

<style scoped>
.leaderboard {
  scroll-snap-align: start;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2em;
  padding: 1em;
  position: relative;
  z-index: 100;
}
</style>
