<template>
    <div>
        <!-- Hero -->
        <section class="hero hero_main">
            <div class="container frow">
                <div class="hero__text col-lg-1-2 col-sm-1-2">
                    <h1>Dosegnite himalajske visine zdravlja uz ETERRA proizvode</h1>
                    <p class="under-h1 p-big">Drevna tajna koja je pažljivo čuvana od savremenog sveta sada je dostupna i vama</p>
                    <div class="btn btn-green">Poručite proizvode</div>
                </div>
            </div>
        </section>
        <!--// Hero -->
        <!-- Slider -->
        <etr-slider-big :items="sliderBig"></etr-slider-big>
        <!--// Slider -->
        <!-- Featured -->
        <etr-featured :herb="lastHerb"></etr-featured>
        <!--// Featured -->
        <!-- Popular products -->
        <etr-popular-products :products="popularProducts"></etr-popular-products>
        <!--// Popular products -->

        <!-- SEO -->
        <etr-seo :info="info"></etr-seo>
    </div>
</template>

<script>
    import Slider from '~components/slider-big.vue'
    import Featured from '~components/featured.vue'
    import Popular from '~components/similar-products.vue'
    import seoComponent from '~/components/seo-component.vue'
    import {HTTP} from '~/helpers/http-helper.vue'

    export default {
        asyncData() {
            return HTTP.get(`homepage`).then(response => {
                return {
                    sliderBig: response.data['products-slider'],
                    lastHerb: response.data['last_herb'],
                    popularProducts: response.data['featured_products']
                }
            })
        },
        data() {
            return {
                info: {
                    title: 'Eterra - eterična ulja',
                    description: 'Eterra proizvodi sa područja Himalaja koji se vekovima koriste za zdravlje i bolji život ljudi. Eterra proizvodi – prirodni biljni preparati kao što su Brahmi, Ashwagandha, Revitalum, Moringa prah, ulje divljeg origana, koštica kajsije, pšeničnih klica i drugi, samo su odgovori prirode na probleme savremenog čoveka. Potražite Eterra proizvode u prodavnicama zdrave hrane, apotekama ili naručite od nas!',
                    image: '',
                    alt: 'Eterra - eterična ulja',
                    sliderBig: [],
                    lastHerb: {},
                    popularProducts: []
                }
            }
        },
//        created() {
//            let homepage = this
//            HTTP.get(`homepage`).then(response => {
//                homepage.sliderBig = response.data['products-slider']
//                homepage.lastHerb = response.data['last_herb']
//                homepage.popularProducts = response.data['featured_products']
//            })
//        },
        components: {
            'etr-slider-big': Slider,
            'etr-featured': Featured,
            'etr-popular-products': Popular,
            'etr-seo': seoComponent
        }
    }
</script>