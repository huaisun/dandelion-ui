<template>
  <div class="form-structor">
    <SignUp></SignUp>
    <SignIn></SignIn>
  </div>
</template>

<script>
import SignIn from "./SignIn";
import SignUp from "./SignUp";

export default {
  name: "Sign",
  components: {
    SignIn,
    SignUp
  }
};
</script>

<style lang="scss" scoped>
.form-structor {
  background-color: #222;
  border-radius: 15px;
  height: 550px;
  width: 350px;
  position: relative;
  overflow: hidden;
  margin: 0 auto;

  &::after {
    content: "";
    opacity: 0.8;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-repeat: no-repeat;
    background-position: left bottom;
    background-size: 500px;
    background-image: url("https://images.unsplash.com/photo-1503602642458-232111445657?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=bf884ad570b50659c5fa2dc2cfb20ecf&auto=format&fit=crop&w=1000&q=100");
  }
}
</style>