import { EventBus } from '../event-bus.js'

if (process.BROWSER_BUILD) {
    window.addEventListener('scroll', function(e) {
        EventBus.$emit('windowScroll', e)
    })
}
