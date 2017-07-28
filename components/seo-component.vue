<template>
    <span v-if="false"></span>
</template>

<script>
    // Test on: https://cards-dev.twitter.com/validator
    export default {
        props: ['info'],
        data: () => ({
            href: 'https://twitter.com/intent/tweet?url=' + encodeURIComponent('https://head-elements.now.sh/about')
        }),
        head() {
            return {
                title: this.info.title,
                meta: [
                    { name: 'twitter:card', content: 'summary_large_image' },
                    { name: 'twitter:url', content: '@eterra' },
                    { name: 'twitter:title', content: this.info.title },
                    { name: 'twitter:description', content: this.info.description },
                    { name: 'twitter:image', content: this.info.image },
                    { name: 'twitter:image:alt', content: this.info.alt },
                    { name: 'og:type', content: 'article' },
                    { name: 'og:url', content: '@eterra' },
                    { name: 'og:title', content: this.info.title },
                    { property: 'og:title', content: this.info.title },
                    { name: 'og:description', content: this.info.description },
                    { name: 'og:image', content: this.info.image },
                    { name: 'og:image:alt', content: this.info.alt },
                    { itemprop: 'name', content: this.info.title },
                    { itemprop: 'description', content: this.info.description },
                    { itemprop: 'image', content: this.info.image }
                ]
            }
        }
    }
</script>