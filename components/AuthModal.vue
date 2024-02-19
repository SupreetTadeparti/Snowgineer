<script setup>
const client = useSupabaseClient();
const user = useSupabaseUser();

const loggedIn = ref(false);

if (user.value) loggedIn.value = true;

// Logout:
// onMounted(() => {
//     (async () => {
//         try {

//             const { error } = await client.auth.signOut();
//             if (error) throw error;
//         } catch (error) {
//             console.log(error.message);
//         }
//         console.log("Done");

//         console.log(user.value);
//     })()
// })

let authReverse = {
    "Login": "Register",
    "Register": "Login"
}

const authType = ref("Login");

const authTypeToggle = () => authType.value = authReverse[authType.value]

const username = ref("");
const email = ref("");
const password = ref("");

const errorMsg = ref(null);
const successMsg = ref(null);

async function signUp() {
    try {
        const { error } = await client.auth.signUp({
            email: email.value,
            password: password.value
        })

        if (error) throw error;

        const { data, err } = await client.from('user').insert([
            { username: username.value, email: email.value },
        ]).select();

        if (err) throw err;

        successMsg.value = "Check your email to confirm your account"
    } catch (error) {
        errorMsg.value = error.message
    }
}

async function signIn() {
    try {
        const { error } = await client.auth.signInWithPassword({
            email: email.value,
            password: password.value
        })

        if (error) throw error;

        loggedIn.value = true;
    } catch (error) {
        errorMsg.value = error.message
    }
}

const authenticate = () => {
    if (authType.value === "Login") signIn();
    else signUp();
}

</script>

<template>
    <div class="auth-modal-container" v-if="!loggedIn">
        <div class="auth-modal glass">
            <div class="auth__heading">{{ authType }}</div>
            <div class="success-message">{{ successMsg }}</div>
            <div class="error-message">{{ errorMsg }}</div>
            <form action="#" method="post" @submit="(e) => e.preventDefault()">
                <input v-model="username" type="text" placeholder="Username..." v-if="authType === 'Register'">
                <input v-model="email" type="email" placeholder="Email...">
                <input v-model="password" type="password" placeholder="Password...">
                <input type="submit" value="Submit" class="auth__submit" @click="authenticate">
            </form>
            <div class="auth-toggle" @click="authTypeToggle">{{ authReverse[authType] }}</div>
        </div>
    </div>
</template>

<style scoped>
.auth-modal-container {
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

.auth-modal {
    min-width: 22em;
    padding: 1em;
    border-radius: .5em;
}

.auth-modal,
.auth-modal>form {
    color: white;
    display: flex;
    gap: .75em;
    flex-direction: column;
}

.auth__heading {
    font-size: 1.75em;
}

.auth-modal input {
    font-size: 1.1em;
    padding: .5em;
    border-radius: .25em;

    &:not([type='submit']) {
        color: black;
    }

    &:focus {
        outline: none;
    }
}

.auth__submit {
    cursor: pointer;
    border: 2px solid white;
    transition: background-color 125ms ease-out,
        color 125ms ease-out;
}

.auth__submit:hover {
    background-color: white;
    color: var(--bg-clr);
}

.auth-toggle {
    cursor: pointer;
    text-decoration: underline;
    width: max-content;
}
</style>