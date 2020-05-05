<template>
    <div class="container">
        <Notification :display="status.display" :type="status.type" :message="status.message"/>
        <form @submit.prevent="addInfo">
            <div class="columns">
                <div class="column">
                    <b-field label="Property Name" expanded>
                        <b-input
                                placeholder="Property Title"
                                type="text"
                                v-model="title"
                                required
                        ></b-input>
                    </b-field>
                </div>
            </div>
            <div class="columns">
                <div class="column">
                    <b-field label="City">
                        <b-select v-model="city" expanded placeholder="Select a city">
                            <option value="Kaunas">Kaunas</option>
                            <option value="Vilnius">Vilnius</option>
                            <option value="Klaipeda">Klaipeda</option>
                        </b-select>
                    </b-field>
                </div>
                <div class="column">
                    <b-field label="Price per night">
                        <b-input placeholder="price" v-model="price" required></b-input>
                    </b-field>
                </div>
            </div>
            <b-field label="Description">
                <b-input v-model="text" maxlength="200" type="textarea"></b-input>
            </b-field>
            <b-field v-for="(index) in count" :key="index" :label="`Image ` + index">
                <b-input :disabled="index < count" v-model="img[index - 1]" aria-placeholder="URL"></b-input>
            </b-field>
            <p v-if="display" class="has-text-primary" @click="addImage"> &#10010; Add another image</p>
            <div class="buttons is-right">
                <b-button outlined native-type="submit" type="button is-primary"
                >Add
                </b-button
                >
            </div>
        </form>

    </div>
</template>

<script>
    import firebase from 'firebase/app';
    import 'firebase/firestore';
    import Notification from "../components/Notification";

    export default {
        name: "Properties",
        components: {Notification},
        data() {
            return {
                count: 1,
                display: true,
                status: {
                    display: false,
                    message: '',
                    type: '',
                },
                title: '',
                city: '',
                img: [],
                text: '',
                price: '',
            }
        },
        methods: {
            addInfo() {
                firebase
                    .firestore()
                    .collection('houses')
                    .add({
                        img: this.img,
                        price: this.price,
                        text: this.text,
                        city: this.city,
                        title: this.title,
                    })
                    .then(() => {
                        this.status.display = true;
                        this.status.message = 'You successfully add the property!';
                        this.status.type = 'is-success';
                    })
                    .catch((err) => {
                        this.status.display = true;
                        this.status.message = err.message;
                        this.status.type = 'is-warning';
                    });
            },
            addImage() {
                this.count++;
                if (this.count >= 5) {
                    this.display = false;
                }
            },

        },
    }
</script>

<style scoped>
    p {
        cursor: pointer;
    }
</style>