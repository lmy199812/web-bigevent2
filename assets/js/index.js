// 获取用户基本信息
function getUserInfo() {
  $.ajax({
    type: 'GET',
    url: '/my/userinfo',
    headers: {
      Authorization: localStorage.getItem('token'),
    },
    success: (res) => {
      //   console.log(res);
      if (res.status !== 0) return layer.msg(res.message);
      layer.msg('获取用户基本信息成功');
      //   调用渲染函数
      renderAvatar(res.data);
    },
  });
}
// 渲染用户信息
const renderAvatar = (user) => {
  const name = user.nickname || user.username;
  // 渲染欢迎语
  $('#welcome').html(`欢迎 ${name}`);
  if (user.user_pic !== null) {
    $('.layui-nav-img').attr('src', user.user_pic).show();
    $('.text-avatar').hide();
  } else {
    $('.layui-nav-img').hide();
    let first = name[0].toUpperCase();
    $('.text-avatar').html(first).show();
  }
};
// 退出登录
$('#btnLogout').click(() => {
  layer.confirm('是否退出登录？', { icon: 3, title: '提示' }, function (index) {
    // 清除本地储存的 token
    localStorage.removeItem('token');
    // 跳转到登录页面
    location.href = '/login.html';
  });
});
// 获取用户列表
getUserInfo();
