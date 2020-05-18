<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container">
            <router-link class="navbar-brand" to="/home">
                <img alt="Blog App" src="../assets/logo.png" width="30" height="30" />
            </router-link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active" v-if="authUser">
                        <router-link class="nav-link" to="/home">Home</router-link>
                    </li>
                    <li class="nav-item" v-if="authUser">
                        <router-link class="nav-link" to="#">Articles</router-link>
                    </li>
                    <li class="nav-item" v-if="authUser">
                        <router-link class="nav-link" to="/articles/create">Create Article</router-link>
                    </li>
                </ul>

                <ul class="navbar-nav ml-auto">
                    <li class="nav-item" v-if="!authUser">
                        <router-link class="nav-link" to="/login">Login</router-link>
                    </li>
                    <li class="nav-item" v-if="!authUser">
                        <router-link class="nav-link" to="/signup">Signup</router-link>
                    </li>
                    <li class="nav-item dropdown ml-auto" v-if="authUser">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Hey {{ authUser.name }}
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a class="dropdown-item" href="javascript:void(0);" @click="logout()">Logout</a>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
    export default {
        mounted() {
            console.log(this.$root);
        },
        computed: {
            authUser() {
                return this.$root.auth.user;
            }
        },
        methods: {
            homeRedirect() {
                if(this.$root.auth.user) {
                    this.$router.push('home');
                } else {
                    this.$router.ush('login');
                }
            },
            logout() {
                localStorage.removeItem('auth');
                this.$root.auth = {};
                this.$router.push('login');
                this.$noty.success('Successfully Logged Out!');
            }
        }
    }
</script>