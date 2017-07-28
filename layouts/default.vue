<template>
    <main id="etr" v-bind:class="{ 'main-overlay': isCartOpen || isNavOpen || isLoginOpen, 'transition': transition, 'contactOpen': isContactOpen}">
        <!-- USER LOGIN MODAL -->
        <etr-login></etr-login>
        <!-- Contact Modal-->
        <etr-contact></etr-contact>
        <!-- NAVIGATION -->
        <etr-nav v-on:navopen="hideScroll"
                 v-on:opencart="openCart"></etr-nav>
        <!-- SHOPPING CART -->
        <etr-cart v-bind:isCartOpen="isCartOpen"
                  v-on:closecart="closeCart"></etr-cart>
        <nuxt/>
        <!-- FOOTER -->
        <etr-footer></etr-footer>
    </main>
</template>

<script>
    // Import the EventBus
    import { EventBus } from '../event-bus.js'
    import { HTTP } from '../helpers/http-helper.vue';
    import store from '../app-store.js'
    import Nav from '../components/nav.vue'
    import Cart from '../components/cart.vue'
    import Footer from '../components/footer.vue'
    import Contact from '../components/contact.vue'
    import LogIn from '../components/login.vue'

    export default {
        transition: {
            name: 'test',
            mode: 'out-in'
        },
        data() {
            return {
                products: [],
                isCartOpen: false,
                isNavOpen: false,
                isLoginOpen: false,
                transition: false,
                isContactOpen: false
            }
        },
        created() {
            let app = this

            // when product is selected
            EventBus.$on('selectProduct', (product) => {
                EventBus.$emit('closeSearch')
                store.state.selectedProduct[0] = product
            })

            // login modal open
            EventBus.$on('loginOpen', data => {
                app.isLoginOpen = true
                document.body.className = 'no-scroll'
            })

            // login modal close
            EventBus.$on('loginClose', data => {
                app.isLoginOpen = false
                document.body.className = ''
            })

            // navigation close
            EventBus.$on('navClose', data => {
                if (app.isNavOpen) {
                    app.hideScroll()
                }
            })

            // contact open event
            EventBus.$on('contactOpen', data => {
                app.isContactOpen = !app.isContactOpen
            })

            // open cart
            EventBus.$on('opencart', () => {
                this.openCart()
            })

            // get products and store them
            HTTP.get(`products`)
                .then(response => {
                    store.state.products = response.data.products
                })
                .catch(e => {
                    console.log(e)
                })

            // Get User from local storage
//            if (this.$localStorage.get('user')) {
//                store.state.user = this.$localStorage.get('user')
//            }
        },
        components: {
            'etr-nav': Nav,
            'etr-cart': Cart,
            'etr-footer': Footer,
            'etr-login': LogIn,
            'etr-contact': Contact
        },
        methods:{
            closeCart: function() {
                this.isCartOpen = false;
                document.body.className = this.isNavOpen ? 'no-scroll' : ''
            },
            openCart: function() {
                this.isCartOpen = true;
                document.body.className = 'no-scroll'
            },
            hideScroll: function() {
                this.isNavOpen = !this.isNavOpen;
                document.body.className = this.isNavOpen ? 'no-scroll' : ''
            },
            beautifyString(string) {
                return string.replace(/\W/g, '-')
            }
        }
    }
</script>