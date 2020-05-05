<template>
    <div id="app">
        <nav class="navbar" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
                <router-link to="/projects" class="navbar-item">
                    <img class="image is-96x96" src="./assets/bookstar-logo.png" alt="logo">
                </router-link>

                <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false"
                   data-target="navbarBasicExample">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div id="navbarBasicExample" class="navbar-menu">
                <div class="navbar-start">
                    <a v-if="loggedIn" class="navbar-item">
                        <router-link to="/projects">My Projects</router-link>
                    </a>

                    <a v-if="loggedIn" class="navbar-item">
                        <router-link to="/properties">My Properties</router-link>
                    </a>
                </div>

                <div class="navbar-end">
                    <div class="navbar-item">
                        <div class="buttons">
                            <a v-if="!loggedIn" class="button is-primary">
                                <router-link class="has-text-white" to="/register">Register</router-link>
                            </a>
                            <a v-if="!loggedIn" class="button is-light">
                                <router-link to="/">Login</router-link>
                            </a>
                            <a v-else @click="signOut" class="button is-warning">
                                Sign Out
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
        <section class="hero">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title">
                        {{getTitle}}
                    </h1>
                </div>
            </div>
        </section>
        <section class="section">
            <div class="container">
                <router-view/>
            </div>
        </section>
    </div>
</template>

<script>
    import firebase from 'firebase/app';
    import 'firebase/auth';

    export default {
        name: 'App',
        data() {
            return {
                loggedIn: null,
            }
        },
        methods: {
            signOut() {
                firebase.auth().signOut()
                    .then(() => (this.$router.push('/')));
            },
        },
        computed: {
            getTitle() {
                const title = this.$route.path;
                if (title.length > 1) {
                    return title[1].toUpperCase() + title.slice(2);
                } else {
                    return 'Please login...';
                }
            }
        },
        beforeMount() {
            firebase.auth()
                .onAuthStateChanged(user => user ? this.loggedIn = true : this.loggedIn = false)
        }
    }

</script>

<style scoped>
    /*#app {
      font-family: Avenir, Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-align: center;
      color: #2c3e50;
    }*/
    .hero {
        margin-top: 10px;
        box-shadow: 0 0 10px -5px rgba(0, 0, 0, 0.75);
    }

</style>
