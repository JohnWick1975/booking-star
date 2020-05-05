<template>
    <div class="container">
        <div v-for="inf in info" :key="inf.id" class="columns">
            <div class="column">
                <div class="card">
                    <div class="card-content">
                        <div class="media">
                            <div class="media-left">
                                <figure class="image">
                                    <img @click="redirectTo(inf.id)" :src="inf.img" alt="Placeholder image">
                                </figure>
                            </div>
                            <div class="media-content">
                                <p class="title is-4">{{inf.title}}</p>
                                <p class="subtitle is-6">{{inf.price}}&euro;</p>
                                <p class="subtitle is-4">{{inf.city}}</p>
                            </div>
                            <div class="media-right">
                                <p @click="redirectToEdit(inf.id)" class="button is-medium edit">Edit</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="buttons">
            <b-button>
                <router-link to="/properties">Add New Properties</router-link>
            </b-button>
        </div>
    </div>
</template>

<script>
    import firebase from 'firebase/app';
    import 'firebase/firestore';

    export default {
        name: "Projects",
        data() {
            return {
                info: [],
                img: [],
                title: '',
                price: null,
                city: '',
                text: '',
            }
        },
        methods: {
            redirectTo(id) {
                this.$router.push('/house/id/' + id);
            },
            redirectToEdit(id){
                this.$router.push('/edit/id/' + id);
            }
        },
        beforeMount() {
            firebase
                .firestore()
                .collection('houses')
                .get()
                .then((snapshot) => {
                    snapshot.docs.forEach((doc) => {
                        this.info.push({
                            id: doc.id,
                            city: doc.data().city,
                            price: doc.data().price,
                            img: doc.data().img[0],
                            title: doc.data().title,
                            text: doc.data().text
                        });
                    })
                })
        },
    }
</script>

<style scoped>

    figure > img {
        width: 140px;
    }

    figure > img:hover {
        opacity: 0.6;
        cursor: pointer;
    }

    .edit {
        cursor: pointer;
    }

</style>