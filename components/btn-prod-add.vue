<template>
    <div class="btn btn-green" :class="{'btn-disabled': outOfStock}" @click.prevent="addToCart">
        <span v-if="!outOfStock">Stavi u korpu</span>
        <span v-else>Van zaliha</span>
    </div>
</template>
<script>
    import { EventBus } from '../event-bus.js';

    export default {
        props: ['product', 'quantity', 'disabled'],
        data() {
            return {
                outOfStock: parseInt(this.product.zalihe) === 0
            }
        },
        methods: {
            addToCart: function() {
                if(!this.disabled && !this.outOfStock) {
                    EventBus.$emit('addToCart', {product: this.product, quantity: this.quantity ? this.quantity:1})
                }
            }
        }
    }
</script>