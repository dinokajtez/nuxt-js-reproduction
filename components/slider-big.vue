<template>
    <!-- Slider -->
    <section class="product-slider">
        <slider class="slider-wrapper" ref="slick" :options="slickOptions">
            <!-- SLIDE -->
            <div class="slide" v-for="(slide, index) in items" :key="index">
                <div class="slide-inner frow">
                    <div class="slide-image col-md-7-12"
                         v-bind:style="{ 'background-image': 'url(http://vps431876.ovh.net:3000/storage/' + slide.slika + ')' }">
                    </div>
                    <div class="slide-content frow col-md-5-12">
                        <!--<img class="slide-product-image" :src="slide.productImage" alt="">-->
                        <div class="slide-text">
                            <h3>{{ slide.naslov }}</h3>
                            <p>{{ slide.tekst }}</p>
                            <nuxt-link :to="{name: 'proizvodi-id-name', params: {id: slide.product_id , name:beautifyString(slide.naslov)}}">
                                <div class="btn btn-green">POGLEDAJ</div>
                            </nuxt-link>
                        </div>
                    </div>
                </div>
            </div>
        </slider>
    </section>
    <!--// Slider -->
</template>

<script>
    const Slick = process.BROWSER_BUILD ? require('vue-slick') : null
    export default {
        props: ['items'],
        data() {
            return {
                slickOptions: {
                    centerMode: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    speed: 600,
                    infinite: false,
                    prevArrow: '<div class="slider-arrow slider-prev"></div>',
                    nextArrow: '<div class="slider-arrow slider-next"></div>',
                    responsive: [
                        {
                            breakpoint: 1024,
                            settings: {
                                dots: true,
                                arrows: false,
                                swipe: true
                            }
                        }
                    ]
                }
            }
        },
        methods: {
            beautifyString(string) {
                string = string.replace(/[^a-zA-Z0-9 ]/g, "")
                return string.replace(/\s/g, "-")
            }
        },
        components: {
            'slider': Slick
        }
    }
</script>