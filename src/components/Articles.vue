<template>
    <div class="card">
        <div class="card-header font-weight-bold"><h5 class="card-title m-0">{{ article.title }}</h5></div>
        <div class="card-body">
            <div class="card-text">
                <div class="pb-4" v-html="article.content.substring(0, 500)"></div>

                <router-link class="btn btn-success mt-4" :to="`/article/${article.slug}`">Read full article</router-link>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['article']
    }
</script>