<template>
    <div class="container">
        <Notification :display="status.display" :type="status.type" :message="status.message"/>
        <form @submit.prevent="edit">
            <div class="columns">
                <div class="column">
                    <b-field label="Property Price" expanded>
                        <b-input
                                placeholder="Property Price"
                                type="text"
                                v-model="price"
                                required
                        ></b-input>
                    </b-field>
                </div>
            </div>
            <b-field label="Description">
                <b-input v-model="text" maxlength="1000" type="textarea"></b-input>
            </b-field>
            <b-field v-for="(index) in count" :key="index" :label="`Image ` + index">
                <b-input :disabled="index < count" v-model="img[index - 1]" aria-placeholder="URL"></b-input>
            </b-field>
            <p v-if="display" class="has-text-primary" @click="addImage"> &#10010; Add another image</p>
            <div class="buttons is-right">
                <b-button native-type="submit" type="button is-primary"
                >Edit
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
        name: "Edit",
        components: {Notification},
        data() {
            return {
                count: 1,
                display: true,
                id: this.$route.params.id,
                price: null,
                img: [],
                text: '',
                status: {
                    display: false,
                    message: '',
                    type: '',
                },
            }
        },
        methods: {
            edit() {
                firebase
                    .firestore()
                    .collection("houses")
                    .doc(this.id)
                    .update({
                        price: this.price,
                        img: this.img,
                        text: this.text,
                    })
                    .then(() => {
                        this.status.display = true;
                        this.status.message = 'You successfully edit the property!';
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