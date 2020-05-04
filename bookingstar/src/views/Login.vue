<template>
    <div class="container">
        <Notification :display="error.status" type="is-warning" :message="error.message"/>
        <form @submit.prevent="signIn">
            <div class="field">
                <label class="label">E-mail</label>
                <div class="control">
                    <input v-model="email" class="input" type="email" placeholder="e.g. john@gmail.com">
                </div>
            </div>
            <div class="field">
                <label class="label">Password</label>
                <div class="control">
                    <input v-model="password" class="input" type="password" placeholder="...">
                </div>
            </div>
            <div class="buttons is is-right">
                <button class="button is-info">Login</button>
            </div>
        </form>
    </div>
</template>

<script>
    import firebase from 'firebase/app';
    import 'firebase/auth';
    import Notification from "../components/Notification";

    export default {
        name: 'Login',
        components: {Notification},
        data() {
            return {
                email: '',
                password: '',
                error: {
                    status: false,
                    message: '',
                },
            }
        },
        methods: {
            signIn() {
                firebase
                    .auth()
                    .signInWithEmailAndPassword(this.email, this.password)
                    .then(() => (this.$router.push('/')))
                    .catch(err => {
                        this.error.status = true;
                        this.error.message = err.message;
                    });
            },
        }
    }

</script>

<style scoped>

</style>
