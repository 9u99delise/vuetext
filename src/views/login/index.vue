<template>
  <div class="login-wrap">
    <div class="login-box"></div>
    <img src="../../assets/login_banner_ele.png" alt />
  </div>
</template>
<script>
export default {};
</script>
<style>
.login-wrap {
  width: 100%;
  height: 100%;
  background: linear-gradient(
    225deg,
    rgba(20, 147, 250, 1),
    rgba(1, 198, 250, 1)
  );
  display: flex;
  justify-content: space-around;
  align-items:center;
}
.login-wrap img {
    width: 633px;
    height: 435px;
    margin-right:10%;
}
.login-box {
  width: 478px;
  height: 550px;
  background: rgba(245, 245, 245, 1);
  margin-left: 10%;
}
</style>
