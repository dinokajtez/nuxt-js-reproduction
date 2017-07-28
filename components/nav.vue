<template>
    <nav class="nav fixed" :class="{ open: navOpen, small: fixed, paddingTop:  contactOpen}">
        <div class="container container_full frow justify-between items-center">
            <div class="burger-icon" v-on:click="openNav">
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div class="links frow justify-between items-center">
                <div class="logo">
                    <router-link to="/" exact>
                        <img src="../assets/images/eterra-logo-green.png" alt="">
                    </router-link>
                </div>

                <ul class="frow gutters nav-links" v-bind:class="{ open: navOpen }">
                    <router-link to="/proizvodi" tag="li">Proizvodi</router-link>
                    <router-link to="/savet" tag="li">Savet</router-link>
                    <router-link to="/herbarijum" tag="li">Herbarijum</router-link>
                    <router-link to="/novosti" tag="li">Novosti</router-link>
                    <li class=""><a href="https://moringadrvozivota.wordpress.com" target="_blank">Blog</a></li>
                    <li class=""
                        @click="openContact"><a :class="{'router-link-active': contactOpen}">Kontakt</a></li>
                </ul>
            </div>

            <ul class="frow nav-options">
                <li class="nav-icon search" @click="openSearch">Search</li>
                <li class="nav-icon user" @click="openLoginModal">
                    <span v-if="user.loggedIn">{{ user.email }}</span>
                </li>
                <li class="nav-icon cart" @click="openCart">Cart <span class="cart-product-number"  v-if="productsLength > 0">{{ productsLength }}</span></li>
            </ul>
        </div>

        <etr-search></etr-search>

    </nav>
</template>

<script>
    // Store
    import store from '../app-store.js'
    // Import the EventBus
    import { EventBus } from '../event-bus.js';
    // Router
    import router from '~router'
    // Search
    import Search from '../components/search.vue'

    export default {
        data() {
            return {
                productsLength: 0,
                navOpen: false,
                fixed: false,
                user: store.state.user,
                contactOpen: false
            }
        },
        created() {
            let that = this
            // Listen to product added to cart event
            EventBus.$on('productAdded', data => {
                that.productsLength = data;
            });
            // Listen to product removed from cart event
            EventBus.$on('productRemoved', data => {
                that.productsLength = data;
            });
            //
            EventBus.$on('navClose', data => {
                that.navOpen = false
            });
            // contact open event
            EventBus.$on('contactOpen', data => {
                that.contactOpen = !that.contactOpen
            });
            // On empty cart remove counter
            EventBus.$on('empty-cart', that.resetCounter)
            // Listen to window scroll event
            EventBus.$on('windowScroll', this.handleScroll)
        },
        methods: {
            openCart() {
                this.$emit('opencart');
            },
            openNav() {
                this.navOpen = !this.navOpen;
                this.$emit('navopen');
            },
            openLoginModal() {
                if (!store.state.user.loggedIn) {
                    EventBus.$emit('loginOpen');
                } else {
                    // redirect to profile page
                    router.push({ name: 'profil-informacije' })
                }
            },
            openSearch() {
                EventBus.$emit('openSearch')
            },
            openContact() {
                EventBus.$emit('contactOpen');
            },
            handleScroll(e) {
                this.fixed = e.srcElement.scrollingElement.scrollTop > 100
            },
            resetCounter() {
                this.productsLength = 0
            }
        },
        watch: {
            '$route': function() {
                EventBus.$emit('navClose');
            }
        },
        components: {
            etrSearch: Search
        }
    }
</script>