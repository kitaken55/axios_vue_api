<template>
   <div id="app">
     <h3>掲示板に投稿する</h3>
     <label for="name">なまえ: </label>
     <input id="name" type="text" v-model="name">
     <br><br>
     <label for="comment">コメント：</label>
     <textarea id="comment" v-model="comment"></textarea>
     <br><br>
     <button @click="createComment">コメントをサーバーに送る</button>
     <h2>掲示板</h2>
     <div class="board" v-for="post in posts" :key="post.name">
       <hr>
       <div>名前: {{ post.fields.name.stringValue }}</div>
       <div>コメント: {{ post.fields.comment.stringValue }}</div>
       <br>
     </div>
   </div>
</template>


<script>
import axios from './axios-auth'; //カスタムインスタンスでurl取得
export default {
  data() {
    return {
      name: "",
      comment: "",
      posts: []
    };
  },
  created() {
    axios.get('comments')
      .then(response => {
        this.posts = response.data.documents;
      });
  },
  methods: {
    createComment() {
      axios.post('comments',
        {
          fields: {
            name: {
              stringValue: this.name
            },
            comment: {
              stringValue: this.comment
            }
          }
        }
      )
      .then(response => {
        console.log(response);
        location.reload("App.vue");
      })
      .catch(error => {
        console.log(error);
      });
      console.log("createComment");
      this.name = "";
      this.comment = "";
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.board {
  width: 70%;
  margin: auto;
}
</style>