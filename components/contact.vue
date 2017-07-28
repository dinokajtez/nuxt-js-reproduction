<template>
    <div class="contact" :class="{'open': isOpen}">
        <div class="container contact-wrapper frow centered">
            <div class="contact_inner">
                <!-- Clos modal btn -->
                <div class="delete-btn animated-horizontal" @click="closeContact"></div>
                <h3 class="contact-title">Kontaktirajte nas</h3>

                <div class="savet-form">
                    <div>
                        <p>Želimo da Vas čujemo! Pišite nam a mi ćemo Vas kontantirati u što kraćem periodu.</p>
                        <form action=""
                              class="frow gutters">
                            <div class="input-group col-sm-1-1">
                                <input type="text"
                                       v-model="contact.email"
                                       name="email"
                                       id="email"
                                       required
                                       v-validate="'required|email'">
                                <label for="email">Email</label>
                                <span v-show="errors.has('email')" class="is-danger">{{ errors.first('email') }}</span>
                            </div>
                            <div class="input-group col-sm-1-1">
                                <input type="text"
                                       name="name"
                                       v-model="contact.name"
                                       required
                                       v-validate="'required'">
                                <label for="">Ime i Prezime</label>
                                <span v-show="errors.has('name')" class="is-danger">{{ errors.first('name') }}</span>
                            </div>
                            <div class="input-group col-sm-1-1">
                                        <textarea required
                                                  name="poruka"
                                                  v-model="contact.poruka"
                                                  v-validate="'required'">
                                        </textarea>
                                <label for="">Vaša poruka</label>
                                <span v-show="errors.has('poruka')" class="is-danger">{{ errors.first('poruka') }}</span>
                            </div>
                        </form>

                        <div class="btn-holder">
                            <div class="btn btn-green"
                                 :class="{'btn-disabled': btnDisable || busy, 'btn-spinner': busy}"
                                 :disabled="btnDisable || busy"
                                 @click="sendMessage">
                                <clip-loader
                                        :loading="busy"
                                        :size="loader.options.size"
                                        :color="loader.options.color"></clip-loader>
                                <span v-show="!busy">Pošalji</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>
<script>
    // HTTP
    import { HTTP } from '../helpers/http-helper.vue'
    // Spinner
    import ClipLoader from 'vue-spinner/src/ClipLoader.vue'
    // EventBus
    import { EventBus } from '../event-bus.js';

    export default{
        data() {
            return {
                isOpen: false,
                contact: {
                    name: '',
                    email: '',
                    poruka: ''
                },
                busy: false,
                loader: {
                    options: {
                        size: '16px',
                        color: '#000'
                    }
                }
            }
        },
        created() {
            let contact = this
            // contact open event
            EventBus.$on('contactOpen', data => {
                contact.isOpen = !contact.isOpen
                document.body.className = contact.isOpen ? 'no-scroll' : ''
            });
        },
        computed: {
            btnDisable: function() {
                return _.some(this.contact, field => {
                    return field.length < 1
                })
            }
        },
        methods: {
            sendMessage() {
                let page = this
                if (_.some(page.contact, field => {
                        return field.length < 1
                    }))
                {
                    page.showError()
                } else {
                    page.busy = true
                    HTTP.post('advice', page.contact)
                        .then(response => {
                            page.busy = false
                            page.contact = {
                                name: '',
                                email: '',
                                poruka: ''
                            }
                        })
                        .catch(response => {
                            page.busy = false
                        })
                }
            },
            closeContact() {
                EventBus.$emit('contactOpen')
            }
        },
        components: {
            ClipLoader: ClipLoader
        }
    }
</script>