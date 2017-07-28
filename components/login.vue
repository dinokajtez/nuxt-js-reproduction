<template>
    <div class="login-wrapper" :class="{open: open}">
        <div class="login-modal">
            <!-- ERROR -->
            <div v-show="error.message" class="login-modal-error">
                {{ error.message }}
            </div>

            <div class="login-inner">
                <div>
                    <h4 v-show="login">Ulogujte se</h4>
                    <h4 v-show="!login">Prijavite se</h4>
                    <form action="">
                        <div v-show="!login" class="input-group">
                            <input v-model="user.name" id="name" type="text" name="name" required>
                            <label for="name">Ime</label>
                        </div>

                        <div class="input-group">
                            <input v-model="user.email" id="email" v-validate="'required|email'" type="text" name="email" required>
                            <label for="email">Korisnički email</label>
                            <span v-show="errors.hasOwnProperty('email')" class="help is-danger">{{  }}</span>
                        </div>

                        <div class="input-group">
                            <input id="password" v-model="user.password" type="password" name="password" required>
                            <label for="password">Šifra</label>
                        </div>

                        <span v-show="login" class="reset-pass-link">Zaboravili ste šifru?</span>
                        <div v-show="!login" class="input-group">
                            <input id="password-check" v-model="user.passwordCheck" type="password" name="password-check" required>
                            <label for="password-check">Ponovite Šifru</label>
                            <span v-show="customErrors.hasOwnProperty('passMissmatch')" class="help is-danger">{{ customErrors.passMissmatch }}</span>
                        </div>
                    </form>

                    <div v-show="login" class="btn btn-grey" :class="{'btn-spinner btn-disabled': loader.loading}" @click="signIn">
                        <clip-loader :loading="loader.loading" :size="loader.options.size" :color="loader.options.color"></clip-loader>
                        <span v-show="!loader.loading">Uloguj se</span>
                    </div>
                    <p v-show="login" class="p-small modal-footer">Nemate nalog? <span class="caption small" @click="toggleView">Prijavite se</span></p>

                    <div v-show="!login" class="btn btn-grey" :class="{'btn-spinner btn-disabled': loader.loading}" @click="signUp">
                        <clip-loader :loading="loader.loading" :size="loader.options.size" :color="loader.options.color"></clip-loader>
                        <span v-show="!loader.loading">Prijavite se</span>
                    </div>
                    <p v-show="!login" class="p-small modal-footer">Vec imate nalog? <span class="caption small" @click="toggleView">Ulogujte se</span></p>
                </div>

                <!-- Clos modal btn -->
                <div class="delete-btn" @click="closeModal"></div>
            </div>
        </div>
    </div>
</template>

<script>
    // Import the EventBus
    import { EventBus } from '../event-bus.js'
    //
    import {HTTP} from '../helpers/http-helper.vue'
    // Store
    import store from '../app-store.js'
    // Router
    import router from '~router'
    // Spinner
    import ClipLoader from 'vue-spinner/src/ClipLoader.vue'

    export default {
        data() {
            return {
                open: false,
                user: {
                    email: '',
                    password: '',
                    name: '',
                    passwordCheck: ''
                },
                loader: {
                    loading: false,
                    options: {
                        size: '16px',
                        color: '#000'
                    }
                },
                customErrors: {},
                login: true,
                error: {}
            }
        },
        created() {
            let login = this

            EventBus.$on('loginOpen', data => {
                login.open = true
                login.resetData()
            });

            EventBus.$on('loginClose', data => {
                login.open = false
            });
        },
        methods: {
            resetData() {
                this.resetUser()
                delete this.error.message
            },
            toggleView() {
              this.login = !this.login
            },
            closeModal() {
                EventBus.$emit('loginClose');
            },
            resetUser() {
              this.user = {
                  email: '',
                  password: '',
                  name: '',
                  passwordCheck: ''
              }
            },
            signIn() {
                let login = this
                login.loader.loading = true
                if (!this.errors.any()) {

                    HTTP.post(`user/signin`, {
                        email: login.user.email,
                        password: login.user.password
                    })
                        .then(response => {
                            login.loader.loading = false
                            this.getUserInfo(response.data.token)
                        }, (error) => {
                            login.loader.loading = false
                            login.error.message = error.response.data.error

                        })
                } else {
                    login.loader.loading = false
                }
            },
            signUp() {
                let login = this
                login.loader.loading = true
                if(login.user.passwordCheck === login.user.password) {
                    HTTP.post(`user`, {
                        name: login.user.name,
                        email: login.user.email,
                        password: login.user.password
                    })
                        .then(response => {
                            login.loader.loading = false
                            login.customErrors = {}
                            login.signIn()
                        })
                        .catch(e => {
                            login.loader.loading = false
                            console.log(e)
                        })
                } else {
                    login.loader.loading = false
                    login.customErrors.passMissmatch = 'Sifre se ne podudaraju'
                }

            },
            getUserInfo(token) {
                let login = this
                HTTP.get('user?token='+token)
                    .then(response => {
                        // close modal
                        login.closeModal()
                        login.resetUser()
                        store.state.user = response.data.user
                        store.state.user.loggedIn = true
                        this.$localStorage.set('user', store.state.user)
                        // redirect to profile page
                        router.push({ name: 'profil-informacije' })
                    })
                    .catch(e => {
                        console.log(e)
                    })
            }
        },
        components: {
            ClipLoader: ClipLoader
        }
    }
</script>