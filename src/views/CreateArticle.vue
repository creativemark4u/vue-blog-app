<template>
    <div>
        <div class="row">
            <div class="col-8 offset-md-2">
                <div class="card">
                    <div class="card-body pb-0">
                        <div class="form-group">
                            <label>Article Category</label>
                            <select v-model="category" class="form-control">
                                <option value="" selected>Select category</option>
                                <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Article Title</label>
                            <input v-model="title" type="text" class="form-control" placeholder="Enter article title" />
                        </div>
                        <div class="form-group">
                            <label>Article Content</label>
                            <wysiwyg v-model="content" />
                        </div>
                        <div class="form-group">
                            <picture-input 
                                accept="image/jpeg,image/png" 
                                size="5" 
                                button-class="btn btn-danger"
                                @change="onChange">
                            </picture-input>
                        </div>
                    </div>
                </div>
                <div class="form-group text-right mt-3">
                    <button :disabled="loading" @click="createArticle()" class="btn btn-primary">
                        <i class="far fa-spin fa-spinner text-light" v-if="loading"></i> {{ loading ? '' : 'Create Article' }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Axios from 'axios';
    import PictureInput from 'vue-picture-input';
    import config from '@/config';

    export default {
        beforeRouteEnter(to, from, next) {
            if(!localStorage.getItem('auth')) {
                return next({ path: '/login'});
            }
            next();
        },
        mounted() {
            this.getCategories();
        },
        components: {
            PictureInput
        },
        data() {
            return {
                title: '',
                content: '',
                image: null,
                category: '',
                categories: [],
                loading: false
            }
        },
        methods: {
            onChange(image) {
                this.image = image;
                console.log(image);
            },
            createArticle() {
                if(!this.title || !this.content || !this.image || !this.category) {
                    this.$noty.error('Please fill in all fields.');
                    return;
                }
                this.loading = true;
                const form = new FormData();
                form.append('file', this.image);
                form.append('upload_preset', process.env.VUE_APP_CLOUDINARY_PRESET);
                form.append('api_key', process.env.VUE_APP_CLOUDINARY_API_KEY);

                Axios.post(process.env.VUE_APP_CLOUDINARY_URL, form).then(response => {
                    console.log(response);
                    Axios.post(`${config.apiURL}/articles`, {
                        title: this.title,
                        content: this.content,
                        category_id: this.category,
                        imageUrl: response.data.secure_url
                    }, 
                    {
                        headers: {
                            Authorization: `Bearer ${this.$root.auth.token}`
                        }
                    }).then(() => {
                        this.$noty.success('Article created successully!');                        
                        this.loading = false;
                        this.$router.push('/home');
                    }).catch(() => {
                        this.loading = false;
                        this.$noty.error('Oops something went wrong!');
                    })
                }).catch(() => {                    
                    this.loading = false;
                    this.$noty.error('Oops something went wrong!');
                });
                console.log(this.title, this.content, this.image);
            },
            getCategories() {
                const categories = localStorage.getItem('categories');
                if(categories) {
                    this.categories = JSON.parse(categories);
                    return;
                }
                Axios.get(`${config.apiURL}/categories`).then(response => {
                    this.categories = response.data.categories;
                    localStorage.setItem('categories', JSON.stringify(this.categories));
                    console.log(this.categories);
                });
            }
        }
    }
</script>