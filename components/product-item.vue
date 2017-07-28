<template>

    <div class="product-item col-md-1-4 col-sm-1-3  col-xs-1-2 frow" @click="storeProduct">
        <nuxt-link :to="{name: 'proizvodi-id-name', params: {id:product.id , name:beautifyString(product.naziv)}}" class="product-item_inner">
            <div class="certificates">
                <img src="~assets/images/icons/certificate_1.png" alt="Sertifikat">
                <img src="~assets/images/icons/certificate_2.png" alt="Sertifikat">
            </div>

            <div class="product-image">
                <img :src="'http://vps431876.ovh.net:3000/storage/'+product.slika" :alt="product.naziv">
            </div>

            <div class="text">
                <span class="caption serif no-padding">{{ product.kategorija_id.kategorija_name }}</span>
                <h4>{{ product.naziv }}</h4>
                <div class="price-quantity">
                    <span class="price">{{ product.cena }}<span class="currency">Rsd</span></span>
                    <span class="quantity">/ {{ product.zapremina }} {{ product.jedinica_mere.mera }}</span>
                </div>
                <div class="rating">
                    <span class="rating-star rating-star-checked" v-for="(star, index) in rating"></span>
                    <span class="rating-star" v-for="(star, index) in 5 - rating"></span>
                </div>
                <etr-btn-prod-add v-bind:product="product"></etr-btn-prod-add>
            </div>
        </nuxt-link>
    </div>

</template>
<script>
    import btnProdAdd from '../components/btn-prod-add.vue'
    import { EventBus } from '../event-bus.js';
    import store from '../app-store.js'

    export default {
        props: ['product'],
        data() {
            return {
            }
        },
        computed: {
            rating: function() {
                let ratingSum = 0
                let ratingNumber = 0
                if (this.product.comments && this.product.comments.length) {
                    _.forEach(this.product.comments, function(comment) {
                        ratingSum += comment.recenzija
                        ratingNumber += 1
                    })

                    return ratingSum / ratingNumber
                } else {
                    return 0
                }
            }
        },
        methods: {
            storeProduct() {
                EventBus.$emit('selectProduct', this.product)
            },
            beautifyString(string) {
                string = string.replace(/[^a-zA-Z0-9 ]/g, "")
                return string.replace(/\s/g, "-")
            }
        },
        components: {
            'etr-btn-prod-add': btnProdAdd
        }
    }
</script>