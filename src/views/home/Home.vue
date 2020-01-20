<template>
  <div id="home">
    <div id="home-body">
      <div style="transform: translateY(0px);">
        <div class="home-body-div">
          <h2>
            <span>W</span>
            <span>ELCOME</span>
          </h2>
          <h5>DANDELION</h5>
        </div>
        <div class="logo home-body-div"></div>
      </div>
      <div class="home-container">
        <Sign :sign="sign"></Sign>
      </div>
    </div>
  </div>
</template>

<script>
import Sign from "./sign/Sign";

export default {
  name: "home",
  components: {
    Sign
  },
  data: () => ({
    sign: false,
  }),
  created() {
    // 获取路由传参
    this.sign = this.$route.params.sign;
  }
};
</script>

<style scoped>
#home {
  margin: 0;
  height: 100%;
  overflow-x: hidden;
  font-family: "Raleway", "Roboto", "Helvetica", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-font-smoothing: antialiased;
  -ms-font-smoothing: antialiased;
  background: rgba(18, 18, 26, 1);
  background-image: url(../../assets/photos/home.png);
  background-blend-mode: overlay;
  background-size: 15%;
}

#home-body {
  color: #aaaaaf;
  width: 100%;
  height: 100%;
  position: relative;
  padding: 100px;
  display: block;
  transition: transform 0.5s ease-in-out;
}

#home-body h2 {
  font-weight: 300;
  letter-spacing: 0.07em;
  margin-left: -20px;
}

#home-body h5 {
  margin-top: -20px;
  font-weight: 400;
  letter-spacing: 1.4em;
}

#home-body h2 > span:first-child {
  font-size: 3em;
}

#home-body h2 > span:nth-child(2) {
  font-size: 2em;
  margin-left: -0.2em;
  font-weight: 400;
}

.home-body-div {
  position: relative;
  display: inline-block;
  margin-right: 25px;
  vertical-align: middle;
  text-shadow: 0px 5px 10px rgba(0, 0, 0, 1);
}

h2 {
  display: block;
  font-size: 1.5em;
  margin-block-start: 0.83em;
  margin-block-end: 0.83em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
}

.logo {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-image: url(../../assets/photos/dandelion.png);
  background-size: 100%;
  background-position: 50% 50%;
  box-shadow: 0px 0px 20px -10px rgba(0, 0, 0, 0.5);
}
</style>