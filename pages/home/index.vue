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
              <li class="nav-item" v-if="user">
                <nuxt-link
                  exact
                  class="nav-link"
                  :class="{active:tab=='your_feed'}"
                  :to="{
                  name:'home',
                  query:{
                    tab:'your_feed'
                  }
                }"
                >Your Feed</nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link
                  exact
                  class="nav-link"
                  :class="{active:tab=='global_feed'}"
                  :to="{
                  name:'home',
                  query:{
                    tab:'global_feed'
                  }
                }"
                >Global Feed</nuxt-link>
              </li>
              <li v-if="tag" class="nav-item">
                <nuxt-link
                  exact
                  class="nav-link"
                  :class="{active:tab=='tag'}"
                  :to="{
                  name:'home',
                  query:{
                    tab:'tag',
                    tag:tag
                  }
                }"
                ># {{tag}}</nuxt-link>
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
                <span class="date">{{item.createdAt|date('MMM DD, YYYY')}}</span>
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
                    tag:$route.query.tag,
                    tab:tab
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
              <nuxt-link
                v-for="item in tags"
                :key="item+1"
                :to="{
                name:'home',
                query:{
                  tag:item,
                  tab:'tag'
                }
              }"
                class="tag-pill tag-default"
              >{{item}}</nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticles, getYourFeddArticles } from "@/api/article";
import { getTags } from "@/api/tag";
import { mapState } from "vuex";

export default {
  name: "HomeIndex",
  props: [""],
  async asyncData({ query }) {
    console.log(query);
    const page = Number.parseInt(query.page || 1);
    const limit = 20;
    const tab = query.tab || "global_feed";
    const tag = query.tag;
    const loadArticles =
      tab === "global_feed" ? getArticles : getYourFeddArticles;
    const [articleRes, tagRes] = await Promise.all([
      loadArticles({
        limit,
        offset: (page - 1) * limit,
        tag,
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
      tag,
      tab,
    };
  },
  watchQuery: ["page", "tag", "tab"], // 监听asyncData query 参数改变
  data() {
    return {};
  },

  components: {},

  computed: {
    ...mapState(["user"]),
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