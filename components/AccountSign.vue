<script setup lang='ts'>

const client = useSupabaseClient()
const user = useSupabaseUser();

const username = ref("Guest")
const score = ref(0)

const loadDetails = async () => {
    if (!user.value) return;


    if (!user.value.email) return;

    const { data } = await client.from("user").select('username, score').eq('email', user.value.email).single()

    if (!data) return;

    username.value = data.username;
    score.value = data.score;
}

onMounted(() => {
    loadDetails()
})

</script>

<template>
    <div class="account-sign glass">
        <div class="account__name">{{ username }}</div>
        <div class="account__snowflakes">
            <span>{{ score }}</span>
            <Snowflake />
        </div>
    </div>
</template>

<style scoped>
.account-sign {
    position: fixed;
    bottom: 1em;
    right: 1em;
    border-radius: .5em;
    padding: 1em;
    color: white;
    font-size: 1.25em;
    z-index: 15;
    display: flex;
    gap: 1em;
}

.account__snowflakes {
    display: flex;
    gap: .5em;
}
</style>