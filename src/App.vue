<template>
  <div id="app">
    <div id="nav">
      <router-link to="/main/home">Home</router-link> |
      <router-link to="/main/about">About</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="less">
/* 滚动条样式 */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-track-piece {
  background-color: #eee;
}
::-webkit-scrollbar-thumb {
  background: #aaa;
  min-width: 150px;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:vertical:hover {
  background: #555555;
}
::-webkit-scrollbar-thumb:horizontal:hover {
  background: #555555;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
