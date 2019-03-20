<template>
  <div>
    哈哈哈哈啊我是 title
  </div>
</template>


<style lang="scss">
.article_page {
  box-sizing: border-box;
  ul,li {
    list-style: none;
  }
  .search_box {
    input[type=radio]{
      display: none;
    }
    input[type=radio]:checked+span{
      background-color: #23292F;
      color: #fff;
    }
    li {
      font-size: 18px;
      border-bottom: 1px dotted #666;
      padding: 5px 0;
      height: 50px;
      line-height: 50px;
      label {
        margin: 0 5px;
        font-size: 16px;
        span {
          padding: 5px;
          transition: background-color,color .6s;
          cursor: pointer;
        }
      }
      .search_input {
        margin: 0 5px;
        padding: 5px;
        width: 350px;
        line-height: 150%;
        outline: none;
        border: none;
        border-bottom: 1px dotted #ccc;
        transition: border-bottom-color .6s;
        &::-webkit-input-placeholder {
          color: #23292F; 
        }
        &:focus {
          border-bottom-color: #23292F;
        }
      }
    }
  }
  .article_list {
    padding-top: 20px;
    .article_item {
      display: flex;
      align-items:center;
      justify-content: center;
      text-align: center;
      word-break: break-all;  
      border-bottom: 1px solid #ccc;
      padding: 10px 0;
      .article_title {
        width: 200px;
      }
      .article_crate, .article_update {
        width: 300px;
      }
      .article_tags, .article_state {
        width: 100px;
      }
      .article_tags {
        span {
          display: block;
          margin: 5px auto;
        }
      }
      .article_operation {
        flex: 1;
      }
    }
  }
}
</style>
