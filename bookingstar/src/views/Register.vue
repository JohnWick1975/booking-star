<template>
    <div class="container">
        <Notification :display="error.status" type="is-warning" :message="error.message"/>
        <form @submit.prevent="add">
            <div class="columns">
                <div class="column">
                    <div class="field">
                        <label class="label">First Name</label>
                        <div class="control">
                            <input v-model="fname" class="input" type="text" placeholder="e.g. John">
                        </div>
                    </div>
                </div>
                <div class="column">
                    <div class="field">
                        <label class="label">Last Name</label>
                        <div class="control">
                            <input v-model="sname" class="input" type="text" placeholder="e.g. Smith">
                        </div>
                    </div>
                </div>
            </div>
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
            <div class="buttons is-right">
                <button class="button is-info">Register</button>
            </div>
        </form>
    </div>
</template>

<script>
    import firebase from 'firebase/app';
    import 'firebase/auth';
    import 'firebase/firestore';
    import Notification from "../components/Notification";
    export default {
        name: 'Register',
        components: {Notification},
        data() {
            return {
                fname: '',
                sname: '',
                password: '',
                email: '',
                error: {
                    status: false,
                    message: '',
                },
            }
        },
        methods: {
            add() {
                firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
                    .then(cred => {
                        firebase
                            .firestore()
                            .collection("admin")
                            .doc(cred.user.uid)
                            .set({
                                name: this.fname,
                                surname: this.sname
                            })
                            .then(() => (this.$router.push('/')))
                            .catch(err => {
                                this.error.status = true;
                                this.error.message = err.message;
                            });
                    });
            },
        },
    }

</script>

<style scoped>

</style>


