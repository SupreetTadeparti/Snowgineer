<script lang="ts" setup>
const client = useSupabaseClient();
const user = useSupabaseUser();

const open = ref<boolean>(true);

const errorMsg = ref<string | null>(null);
const successMsg = ref<string | null>(null);

const name = ref<string>("");
const buildFiles = ref<FileList | null>(null);
const buildPhotos = ref<string[]>([]);

const displayUploadedPhotos = (e: Event) => {
  buildFiles.value = (e.target as HTMLInputElement).files;

  if (!buildFiles.value) return;

  buildPhotos.value = Array.from(buildFiles.value).map((file) =>
    URL.createObjectURL(file)
  );
};

const submitBuild = async () => {
  if (buildFiles.value === null) return;
  if (!user.value) return;

  const email = user.value.email;

  if (!email) return;

  try {
    for (let i = 0; i < buildFiles.value?.length; i++) {
      const { data, error } = await client.storage
        .from("Build Photos")
        .upload(`${user.value?.email}/${i}`, buildFiles.value[i], {
          upsert: true,
        });

      if (error) throw error;
    }

    const { data: dbUser } = await client
      .from("user")
      .select("id, email")
      .eq("email", email);

    if (!dbUser) return;

    const { error } = await client
      .from("project")
      .insert({ engineer: dbUser[0].id, name: name.value });

    if (error) throw error;

    open.value = false;
  } catch (error: any) {
    errorMsg.value = error.message;
  }
};
</script>

<template>
  <div class="submit-modal-container" v-if="open">
    <div class="submit-modal glass">
      <div class="submit__heading">Submit Build</div>
      <div class="success-message">{{ successMsg }}</div>
      <div class="error-message">{{ errorMsg }}</div>
      <form action="#" method="post" @submit="(e) => e.preventDefault()">
        <input
          type="file"
          accept="image/*"
          @change="displayUploadedPhotos"
          multiple
        />
        <PhotoCarousel :photos="buildPhotos" />
        <input type="text" placeholder="Name of your Build..." v-model="name" />
        <input
          type="submit"
          value="Submit"
          class="submit__submit"
          @click="submitBuild"
        />
      </form>
    </div>
  </div>
</template>

<style scoped>
.submit-modal-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.submit-modal {
  min-width: 22em;
  padding: 1em;
  border-radius: 0.5em;
}

.submit-modal,
.submit-modal > form {
  color: white;
  display: flex;
  gap: 0.75em;
  flex-direction: column;
}

.submit__heading {
  font-size: 1.75em;
}

.submit-modal input {
  font-size: 1.1em;
  padding: 0.5em;
  border-radius: 0.25em;

  &[type="text"],
  &[type="password"] {
    color: black;
  }

  &:focus {
    outline: none;
  }
}

.submit__submit {
  cursor: pointer;
  border: 2px solid white;
  transition: background-color 125ms ease-out, color 125ms ease-out;
}

.submit__submit:hover {
  background-color: white;
  color: var(--bg-clr);
}
</style>
