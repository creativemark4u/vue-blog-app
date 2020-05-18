<template>
    <div class="row">
        <div class="col-6 offset-md-3">
            <div class="card my-5">
                <div class="card-body">
                    <h5 class="card-title text-center font-weight-bold mb-4">Signup to Community Blog</h5>
                    <div class="form-group">
                        <input v-bind:class="{ 'is-invalid' : errors.name, 'is-valid' : !errors.name && this.submitted }" v-model="name" type="text" class="form-control" placeholder="Enter name" />
                        <label class="text-danger" v-if="errors.name">
                            <small v-for="error in errors.name" :key="error">{{ error }}</small>
                        </label>
                    </div>
                    <div class="form-group">
                        <input v-bind:class="{ 'is-invalid' : errors.email, 'is-valid' : !errors.email && this.submitted }" v-model="email" type="text" class="form-control" placeholder="Enter email" />
                        <label class="text-danger" v-if="errors.email">
                            <small v-for="error in errors.email" :key="error">{{ error }}</small>
                        </label>
                    </div>
                    <div class="form-group">
                        <input v-bind:class="{ 'is-invalid' : errors.password, 'is-valid' : !errors.password && this.submitted }" v-model="password" type="password" class="form-control" placeholder="Enter password" />
                        <label class="text-danger" v-if="errors.password">
                            <small v-for="error in errors.password" :key="error">{{ error }}</small>
                        </label>
                    </div>
                    <div class="form-group mb-0">
                        <button @click="registerUser" :disabled="loading" class="btn btn-success btn-block">
                            <i class="far fa-spin fa-spinner text-light" v-if="loading"></i> 
                            {{ loading ? '' : 'Signup' }}
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
        },
        data() {
            return {
                name: '',
                email: '',
                password: '',
                errors: {},
                submitted: false,
                loading: false
            }
        },
        methods: {
            // registerUser() {
            //     Axios.post('https://react-blog-api.bahdcasts.com/api/auth/register', {
            //         name: this.name,
            //         email: this.email,
            //         password: this.password
            //     }).then(response => {
            //         localStorage.setItem('auth', JSON.stringify(response.data.data));
            //         this.$root.auth = response.data.data;
            //         console.log(response);
            //     }).catch(({response}) => {
            //         console.log(response);
            //     });
            //     console.log(this.name, this.email, this.password)
            // }
            registerUser() {
                this.loading = true;
                Axios.post(`${config.apiURL}/auth/register`, {
                    name: this.name,
                    email: this.email,
                    password: this.password
                }).then((response) => {
                    this.submitted = true;
                    this.loading = false;
                    const { data } = response.data;
                    localStorage.setItem('auth', JSON.stringify(data));
                    this.$root.auth = data;
                    this.$router.push('home');
                    this.$noty.success('Successfully Registered!');
                    // console.log(data);
                }).catch(({response}) => {
                    this.submitted = true;
                    this.loading = false;
                    this.errors = response.data;
                    this.$noty.error('Oops! something went wrong');
                    // console.log(response);
                });
                console.log(this.name, this.email, this.password)
            }
        }
    }
</script>