<template>
    <div class="shopping-cart" v-bind:class="{ open: isCartOpen }">
        <div class="cart-container">
            <div class="cart-inner">
                <div class="cart-header">
                    <div class="cart-header_title">
                        <h5>
                            Moja korpa
                            <span class="cart-header_number">
                            ({{ products.length }})
                        </span>
                        </h5>
                    </div>
                    <div class="arrow-icon" v-on:click="close"></div>
                </div>

                <div class="cart-products">
                    <div v-for="(item,index) in products" class="cart-product">
                        <div class="delete-btn" v-on:click="removeProduct(index)"></div>
                        <figure>
                            <img v-bind:src="'http://vps431876.ovh.net:3000/storage/'+item.product.slika" :alt="item.product.naziv">
                        </figure>
                        <div class="cart-products_info">
                            <h5>
                                <span class="caption small no-padding">{{ item.product.kategorija_id.kategorija_name }}</span>
                                {{ item.product.naziv }}
                            </h5>
                            <div class="cart-products_quantity">
                                <div class="quantity-input">
                                    <span class="quantity-minus" @click="item.amount > 0 ? item.amount -= 1 : item.amount = 0"></span>
                                    <span class="quantity-number big">{{ item.amount }}</span>
                                    <span class="quantity-plus" @click="item.amount += 1"></span>
                                </div>
                                <div class="price-quantity">
                                    <span class="price">{{ item.product.cena }}<span class="currency">Rsd</span></span>
                                    <span class="quantity">/ {{ item.product.zapremina }}ml</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="cart-footer">
                    <div class="cart-sum">
                        <span>Ukupno</span>
                        <div class="price-quantity">
                            <span class="price">{{ sum }}<span class="currency">rsd</span></span>
                        </div>
                    </div>
                    <div class="btn btn-grey" @click="goToCheckout()">Zavrsi kupovinu</div>
                    <p class="p-small">*Za kupovinu robe preko 2000rsd Eterra snosi troskove dostave</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    // Import the EventBus
    import { EventBus } from '../event-bus.js';
    // Import router
    import router from '~router'
    // Store
    import store from '../app-store.js'

    export default {
        props: ['isCartOpen'],
        data() {
            return{
                products: [],
                fixed: false
            }
        },
        created: function() {
            let that = this

            EventBus.$on('addToCart', data => {
                that.addToCart({product: data.product, amount: data.quantity});
                EventBus.$emit('opencart');
            });

            // Empty cart
            EventBus.$on('empty-cart', that.emptyCart)

            // Listen to window scroll event
            EventBus.$on('windowScroll', this.handleScroll);
        },
        computed: {
            sum: function(){
                let sum = 0;
                this.products.forEach(function(item) {
                    sum += parseInt(item.product.cena) * parseInt(item.amount);
                });
                return sum;
            }
        },
        methods: {
            close: function() {
                this.$emit('closecart');
            },
            addToCart: function(product) {
                let cart = this
                if (cart.products.length > 0 && _.some(cart.products, prod => {
                    return prod.product.id === product.product.id
                    })) {

                    let indexState = _.findIndex(store.state.cart, function(o) {
                        return o.product.id === product.product.id
                    })

                    let indexCart = _.findIndex(cart.products, function(o) {
                        return o.product.id === product.product.id
                    })

                    cart.products[indexCart].amount += product.amount
                    // store.state.cart[indexState].amount += product.amount

                } else {
                    this.products.push(product)
                    store.state.cart.push(product)
                }
                EventBus.$emit('productAdded', this.products.length)
            },
            removeProduct: function(index) {
                this.products.splice(index, 1)
                store.state.cart.splice(index, 1)
                EventBus.$emit('productRemoved', this.products.length)
            },
            handleScroll(e) {
                this.fixed = e.srcElement.scrollingElement.scrollTop > 100
            },
            goToCheckout() {
                this.$emit('closecart');
                router.push({ name: 'checkout'})
            },
            emptyCart() {
                this.products = []
                store.state.cart = []
            }
        }
    }
</script>