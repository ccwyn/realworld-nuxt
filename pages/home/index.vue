<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>
    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <a class="nav-link disabled" href="">Your Feed</a>
              </li>
              <li class="nav-item">
                <a class="nav-link active" href="">Global Feed</a>
              </li>
            </ul>
          </div>
          <div v-for="item in articles" :key="item.slug" class="article-preview">
            <div class="article-meta">
              <nuxt-link :to="{name:'profile',params:{username:item.author.username}}">
                <img :src="item.author.image">
              </nuxt-link>
              <div class="info">
                <nuxt-link
                  :to="{name:'profile',params:{username:item.author.username}}"
                  class="author"
                >{{item.author.username}}</nuxt-link>
                <span class="date">{{item.createdAt}}</span>
              </div>
              <button class="btn btn-outline-primary btn-sm pull-xs-right">
                <i class="ion-heart"></i>
                {{item.favoritesCount}}
              </button>
            </div>
            <nuxt-link :to="{name:'article',params:{slug:item.slug}}" class="preview-link">
              <h1>{{item.title}}</h1>
              <p>{{item.description}}</p>
              <span>Read more...</span>
            </nuxt-link>
          </div>
        </div>
        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>
            <div class="tag-list">
              <a href="" class="tag-pill tag-default">programming</a>
              <a href="" class="tag-pill tag-default">javascript</a>
              <a href="" class="tag-pill tag-default">emberjs</a>
              <a href="" class="tag-pill tag-default">angularjs</a>
              <a href="" class="tag-pill tag-default">react</a>
              <a href="" class="tag-pill tag-default">mean</a>
              <a href="" class="tag-pill tag-default">node</a>
              <a href="" class="tag-pill tag-default">rails</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticles } from "@/api/article";
export default {
  name: "",
  props: [""],
  async asyncData({query}) {
    let page = Number.parseInt(query.page||1)
    let limit = 2
    const { data } = await getArticles({ 
      limit: 2, 
      offset: (page -1) * limit
    });
    console.log(data);
    return {
      articles: data.articles,
      articleCount: data.articleCount,
    };
  },
  data() {
    return {};
  },

  components: {},

  computed: {},

  beforeMount() {},

  mounted() {},

  methods: {},

  watch: {},
};
</script>
<style lang='' scoped>
</style>