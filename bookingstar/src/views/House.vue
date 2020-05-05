<template>
    <div class="container">
        <div class="buttons">
            <b-button>
                <router-link to="/projects">Back to projects</router-link>
            </b-button>
        </div>
        <hr>
        <h1 class="title">{{title}}</h1>
        <div class="columns">
            <div class="column">
                <div class="flex-image">
                    <b-carousel class="carousel" :indicator="false" :pause-info="false">
                        <b-carousel-item v-for="(carousel, i) in img" :key="i">
                            <img class="image" :src="carousel"/>
                        </b-carousel-item>
                    </b-carousel>
                    <!--<img class="image" :src="img" alt="image">-->
                </div>
            </div>
        </div>
        <div class="columns">
            <div class="column">
                <p class="title has-text-centered">Price: {{price}}&euro;</p>
                <p class="subtitle"><strong>Description</strong>: {{text}}</p>
            </div>
        </div>
    </div>
</template>

<script>
    import firebase from 'firebase/app';
    import 'firebase/firestore';

    export default {
        name: "house",
        data() {
            return {
                id: this.$route.params.id,
                title: '',
                price: null,
                text: '',
                city: '',
                img: [],
            }
        },
        beforeMount() {
            firebase
                .firestore()
                .collection("houses")
                .doc(this.id)
                .get()
                .then(data => {
                    console.log(data.data());
                    this.id = data.id;
                    this.title = data.data().title;
                    this.img = data.data().img;
                    this.price = data.data().price;
                    this.city = data.data().city;
                    this.text = data.data().text;
                });
        },
    }
</script>

<style scoped>

    img {
        height: 400px;
    }

    .flex-image {
        display: flex;
        justify-content: center;
    }

</style>