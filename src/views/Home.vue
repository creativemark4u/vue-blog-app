<template>
    <div>
        <nav class="my-5 d-flex justify-content-center">
            <ul class="pagination">
                <li :class="articles.prev_page_url === null ? 'page-item disabled' : 'page-item'" class="page-item"><a class="page-link" href="javascript:void(0);" @click="getPrevArticles()">Previous</a></li>
                <li :class="articles.next_page_url === null ? 'page-item disabled' : 'page-item'"><a class="page-link" href="javascript:void(0);" @click="getNextArticles()">Next</a></li>
            </ul>
        </nav>

        <div class="row" v-if="!loading">
            <div class="col-8 offset-md-2 mb-3" v-for="article in articles.data" :key="article.id">
                <Articles :article="article" />
            </div>
        </div>
        
        <div class="text-center" v-else>
            <i class="far fa-spin fa-spinner fa-5x text-muted"></i> 
        </div>

        <nav class="my-5 d-flex justify-content-center">
            <ul class="pagination">
                <li :class="articles.prev_page_url === null ? 'page-item disabled' : 'page-item'" class="page-item"><a class="page-link" href="javascript:void(0);" @click="getPrevArticles()">Previous</a></li>
                <li :class="articles.next_page_url === null ? 'page-item disabled' : 'page-item'"><a class="page-link" href="javascript:void(0);" @click="getNextArticles()">Next</a></li>
            </ul>
        </nav>
    </div>
</template>

<script>
    import Axios from 'axios';
    import config from '@/config';
    import Articles from '@/components/Articles';
    // import ArticleDetail from '@/views/ArticleDetail';

    export default {
        components: {
            Articles
        },
        mounted() {
            this.getArticles();
        },
        data() {
            return {
                articles: {},
                loading: true
            }
        },
        methods: {
            getArticles(url = `${config.apiURL}/articles`) {
                this.loading = true;
                Axios.get(url).then(response => {
                    this.articles = response.data.data;
                    this.loading = false;
                    console.log(this.articles);
                });
            },
            getPrevArticles() {
                this.getArticles(this.articles.prev_page_url)
            },
            getNextArticles() {
                this.getArticles(this.articles.next_page_url)
            }
        }
    }
</script>