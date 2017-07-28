<template>
    <div class="search-wrapper" :class="{'open': isOpen}">
        
        <div class="close-serach" @click="close()">
            <span></span>
            <span></span>
        </div>

        <div class="container">

            <div class="search-input">
                <input type="search" @input="filter" v-model="search" placeholder="Pretrazi">

                <div class="icon-serach">
                    <span></span>
                    <span></span>
                </div>
            </div>

            <div class="results frow">
                <div class="result-item-group result-products col-sm-1-1">
                    <span class="caption" v-show="filtered.products.length > 0">Proizvodi ({{ filtered.products.length }})</span>
                    <div class="result-group-inner frow justify-start">
                        <etr-product-item :product="product"
                                          v-for="(product, index) in filtered.products"
                                          :key="index"></etr-product-item>
                    </div>
                </div>
                <div class="result-item-group result-news col-sm-1-3">
                    <h4 v-show="filtered.herbs.length > 0">Biljke</h4>
                    <div class="result-group-inner">
                        <div class="result-item frow centered"
                             v-for="(herb, index) in filtered.herbs">
                        </div>
                    </div>
                </div>
                <div class="result-item-group result-herbs col-sm-1-3">
                    <h4 v-show="filtered.products.news > 0">Blog</h4>
                    <div class="result-group-inner">
                        <div class="result-item frow centered"
                             v-for="(item, index) in filtered.news">
                        </div>
                    </div>
                </div>
            </div>

        </div>

    </div>
</template>

<script>
    // Store
    import store from '../app-store.js'
    // Import router
    import router from '~router'
    // Event bus
    import { EventBus } from '../event-bus.js';
    import productItem from './product-item.vue'

    export default {
        data() {
            return {
                filtered: {
                    products: [],
                    herbs: [],
                    news: []
                },
                search: '',
                isOpen: false
            }
        },
        created() {
            let search = this
            EventBus.$on('openSearch', search.open)
            EventBus.$on('closeSearch', search.close)
        },
        methods: {
            filter() {
                let search = this
                search.filtered.products = []

                if (search.search.length < 2) {
                    search.filtered.products = []
                } else {
                    let filters = search.search.split(' ')
                    // products
                    _.forEach(store.state.products, (product) => {
                        let notMaches = _.some(filters, (filter) => {
                            return _.toLower(product.naziv).indexOf(_.toLower(filter)) === -1 &&
                                _.toString(product.zapremina).indexOf(_.toString(filter)) === -1
                        })

                        if (!notMaches) {
                            search.filtered.products.push(product)
                        }
                    })
                }
            },
            close() {
                this.isOpen = false
                this.search = ''
                this.filtered.products = []
                document.body.className = ''
            },
            open() {
                this.isOpen = true
                document.body.className = 'no-scroll'
            }
        },
        components: {
            'etr-product-item': productItem
        }
    }
</script>