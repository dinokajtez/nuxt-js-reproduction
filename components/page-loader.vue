<template>
    <div id="transition-element" v-show="loading" :class="{animate: loading && !endLoading, endAnimate: endLoading}">
    </div>
</template>
<script>
    export default {
        data: () => ({
            loading: false,
            endLoading: false,
            percent: '0%'
        }),
        methods: {
            start () {
                this.loading = true
            },
            finish () {
                let loader = this
                loader.endLoading = true

                setTimeout(function() {
                    loader.loading = false
                    loader.endLoading = false
                }, 500)
            },
            increase(num) {
            }
        }
    }
</script>