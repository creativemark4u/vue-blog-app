<template>
    <div>
        <div class="row">
            <div class="col-8 offset-md-2">
                <div class="card" v-if="!loading">
                    <img :src="article.imageUrl" class="card-img-top" />
                    <div class="card-body border-top">
                        <div class="text-center pb-4">
                            <h1 class="mt-0 mb-2 font-weight-normal">{{ article.title }}</h1>
                            <h4 class="mb-2 mt-0">by {{ article.user.name }}</h4>
                            <p class="text-muted">{{ article.created_at }}</p>
                        </div>
                        <div class="mt-4 mb-4" v-html="article.content"></div>
                    </div>
                </div>
                <div class="text-center" v-else>
                    <i class="far fa-spin fa-spinner fa-5x text-muted"></i> 
                </div>

                <div class="comments">
                    <vue-disqus shortname="community-blog" :identifier="article.slug" :url="pageURL"></vue-disqus>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import Axios from 'axios';
    import config from '@/config';

    export default {
        mounted() {
            this.getArticles();
        },
        data() {
            return {
                article: {},
                loading: true,
                pageURL: window.location.href
            }
        },
        methods: {
            getArticles() {
                Axios.get(`${config.apiURL}/article/${this.$route.params.id}`).then(response => {
                    this.article = response.data.data;
                    this.loading = false;
                    console.log(response);
                });
            }
        }
    }
</script>