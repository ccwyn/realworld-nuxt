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
          <nav>
            <ul class="pagination">
              <li
                class="page-item"
                :class="{active:item === page}"
                v-for="item in totalPage"
                :key="item"
              >
                <nuxt-link
                  class="page-link"
                  :to="{
                  name:'home',
                  query:{
                    page:item,
                    tag:$route.query.tag
                  }
                }"
                >{{item}}</nuxt-link>
              </li>
            </ul>
          </nav>
        </div>
        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>
            <div class="tag-list">
              <nuxt-link v-for="item in tags" :key="item+1" :to="{
                name:'home',
                query:{
                  tag:item
                }
              }" class="tag-pill tag-default">{{item}}</nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticles } from "@/api/article";
import { getTags } from "@/api/tag";
import { Promise } from "q";
export default {
  name: "HomeIndex",
  props: [""],
  async asyncData({ query }) {
    let page = Number.parseInt(query.page || 1);
    let limit = 20;
    const [articleRes, tagRes] = await Promise.all([
      getArticles({
        limit,
        offset: (page - 1) * limit,
        tag:query.tag
      }),
      getTags(),
    ]);
    const { articles, articlesCount } = articleRes.data;
    const { tags } = tagRes.data;
    return {
      articles,
      articlesCount,
      limit,
      page,
      tags,
    };
  },
  watchQuery: ["page","tag"], // 监听asyncData query 参数改变
  data() {
    return {};
  },

  components: {},

  computed: {
    totalPage() {
      console.log(this.articlesCount, this.limit);
      return Math.ceil(this.articlesCount / this.limit);
    },
  },

  beforeMount() {},

  mounted() {},

  methods: {},

  watch: {},
};
</script>
<style lang='' scoped>
</style>