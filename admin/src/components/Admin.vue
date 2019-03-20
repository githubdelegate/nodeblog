<template>
  <div class="admin_page">
    <div class="left">
      <div class="avatar">
        <img src="/static/img/avatar.jpg" alt>
      </div>
      <div class="logo">
        <span>{{$store.state.adminInfo.admin_id}}xxxx</span>
      </div>
      <ul class="nav">
        <li>
          <router-link to="/admin/article">文章管理</router-link>
        </li>
        <li>
          <router-link to="/admin/article">文章管理</router-link>
        </li>
        <li>
          <router-link to="/admin/article">文章管理</router-link>
        </li>
        <li>
          <router-link to="/admin/article">文章管理</router-link>
        </li>
      </ul>
    </div>
    <div class="right">
      <router-view class="views"></router-view>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.admin_page {
  display: flex;
  height: 100vh;
  overflow: hidden;
  .left {
    min-width: 200px;
    width: 200px;
    text-align: center;
    box-shadow: 0 0 2px #ccc;
    background-color: #23292f;
    color: #ccc;
    .logo {
      margin: 10px auto;
      font-size: 32px;
      border-bottom: 1px solid #ccc;
      padding: 5px;
      cursor: pointer;
    }
    .avatar {
      padding-top: 10px;
      img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
      }
    }
    .nav {
      padding-top: 50%;
      li {
        margin: 10px 0;
      }
      a {
        color: inherit;
        text-decoration: none;
        font-size: 18px;
        transition: color 0.4s;
        &:hover {
          color: #666;
        }
      }
      .router-link-exact-active {
        color: #666;
      }
    }
  }
  .right {
    flex: 1;
    overflow: auto;
    height: 100%;
    padding: 20px;
    box-sizing: border-box;
    .btn {
      font-size: 12px;
      padding: 5px 10px;
      margin: 0 5px;
      border: none;
      color: #fff;
      cursor: pointer;
      background-color: #23292f;
      outline: none;
      &:active {
        opacity: 0.6;
      }
    }
    .del {
      background-color: #ea4747;
    }
    .alter {
      background-color: #409eff;
    }
    .look {
      background-color: #67c23a;
    }
    .table_th {
      font-weight: bold;
      color: #23292f;
    }
    .views {
      min-width: 1200px;
    }
    a {
      text-decoration: none;
      color: inherit;
      transition: color 0.3s;
      &:hover {
        color: #62be93;
      }
    }
    .tool {
      padding-bottom: 10px;
      border-bottom: 1px dotted #ccc;
      margin-bottom: 10px;
    }
    .item {
      display: flex;
      align-items: center;
      justify-content: center;
      word-break: break-all;
      border-bottom: 1px solid #ccc;
      padding: 10px 0;
      li {
        list-style: none;
        padding: 0 5px;
      }
    }
  }
}
</style>
