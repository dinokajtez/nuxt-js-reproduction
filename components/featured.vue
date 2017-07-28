<template>
    <section class="featured">
        <div class="container">
            <div class="featured_image"
                 v-bind:style="{ 'background-image': 'url(http://vps431876.ovh.net:3000/storage/' + herb.slika + ')' }"></div>
            <div class="featured_text frow centered justify-end">
                <div class="featured_text-inner col-sm-1-2">
                    <span class="caption">{{ herb.naziv }}</span>
                    <h2 class="big">{{ herb.podnaslov }}</h2>
                    <p class="p-big" v-html="herb.text"></p>
                    <div class="btn-holder">
                        <div class="btn btn-green">Saznaj više</div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        props: ['herb'],
        data() {
            return {}
        }
    }
</script>