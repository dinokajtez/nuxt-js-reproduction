const webpack = require('webpack')

module.exports = {
    loading: '~components/page-loader.vue',
    // loading: {
    //     height: '80px',
    //     color: '#a0b046'
    // },
    build: {
        vendor: ['moment', '~plugins/window.js'],
        plugins: [
            new webpack.ProvidePlugin({
                '_': 'lodash',
                jQuery: 'jquery',
                $: 'jquery',
                jquery: 'jquery'
            })
        ]
    },
    plugins: [
        {src: '~plugins/vue-validate.js'},
        {src: '~plugins/social-sharing.js', ssr: false},
        {src: '~plugins/youtube-embed.js', ssr: false},
        {src: '~plugins/date-format.js'},
        {src: '~plugins/analytics.js', ssr: false},
        {src: '~plugins/localstorage.js', ssr: false}
    ],
    head: {
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' }
        ],
        link: [
            { rel: 'author', href: 'http://www.brainzined.com'},
            { rel: 'favicon', href: 'favicon.ico' }
        ]
    },
    css: [
        { src: '~assets/styles/main.scss', lang: 'scss' }
    ]
}