<template>
    <div class="row">
        <div class="col-6 offset-md-3">
            <div class="card my-5">
                <div class="card-body">
                    <h5 class="card-title text-center font-weight-bold mb-4">Login to Community Blog</h5>
                    <div class="form-group">
                        <input v-bind:class="{ 'is-invalid' : errors.email, 'is-valid' : !errors.email && this.submitted }" v-model="email" type="text" class="form-control" placeholder="Enter email" />
                        <label class="text-danger" v-if="errors.email">
                            <small v-for="error in errors.email" v-bind:key="error">{{ error }}</small>
                        </label>
                    </div>
                    <div class="form-group">
                        <input v-bind:class="{ 'is-invalid' : errors.password, 'is-valid' : !errors.password && this.submitted }" v-model="password" type="password" class="form-control" placeholder="Enter password" />
                        <label class="text-danger" v-if="errors.password">
                            <small v-for="error in errors.password" v-bind:key="error">{{ error }}</small>
                        </label>
                    </div>
                    <div class="form-group mb-0">
                        <button :disabled="loading" @click="loginUser()" class="btn btn-success btn-block">
                            <i class="far fa-spin fa-spinner text-light" v-if="loading"></i> 
                            {{ loading ? '' : 'Login' }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Axios from 'axios';
    import config from '@/config';

    export default {
        beforeRouteEnter (to, from, next) {
            if(localStorage.getItem('auth')) {
                next({ path: '/home' });
            } 
            next();
            // console.log(to, from, next);
        },
        data() {
            return {
                email: '',
                password: '',
                errors: {},
                submitted: false,
                loading: false
            }
        },
        methods: {
            loginUser() {
                this.loading = true;
                Axios.post(`${config.apiURL}/auth/login`, {
                    email: this.email,
                    password: this.password
                }).then(response => {
                    this.loading = false;
                    this.submitted = true;
                    this.$root.auth = response.data.data;
                    localStorage.setItem('auth', JSON.stringify(response.data.data));
                    this.$router.push('home');
                    this.$noty.success('Successfully logged in');
                    // console.log(response);
                }).catch(({ response }) => {
                    this.loading = false;
                    this.submitted = true;
                    if(response.status === 401) {
                        this.errors = {
                            email: ['These credentials do not match our records.']
                        }
                    } else {
                        this.errors = response.data;
                    }
                    this.$noty.error('Oops something went wrong');
                    // console.log(response);
                });
                // this.loading = true;
                // console.log(this.email, this.password);
            }
        }
    }
</script>