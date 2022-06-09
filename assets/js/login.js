$(function () {
  // 点击切换登录注册功能
  $('#link_reg').click(() => {
    $('.login-box').hide();
    $('.reg-box').show();
  });
  $('#link_login').click(() => {
    $('.login-box').show();
    $('.reg-box').hide();
  });
  // 先引入form 来自layui
  const form = layui.form;
  // 自定义校验规则
  form.verify({
    // 数组方式
    password: [/^[\S]{6,12}$/, '密码必须6到12位,且不能出现空格'],
    // 函数方式
    repwd: (value) => {
      // 先获取密码框的值
      const pwd = $('.reg-box [name=password]').val();
      // 判断两次密码是否一致
      if (pwd !== value) return '两次密码不一致';
    },
  });
  const layer = layui.layer;
  const baseUrl = 'http://www.liulongbin.top:3007';
  // 监听表单注册事件，发送注册表
  $('#form_reg').submit((e) => {
    e.preventDefault();
    // 发起注册请求
    $.ajax({
      type: 'POST',
      url: '/api/reguser',
      data: {
        username: $('#form_reg [name=username]').val(),
        password: $('#form_reg [name=password]').val(),
      },
      success: (res) => {
        console.log(res);
        if (res.status !== 0) return layer.msg(res.message);
        layer.msg('注册成功');
        // 模拟点击事件，跳转到登录
        $('#link_login').click();
      },
    });
  });
  // 监听登录表单提交事件，发送登录请求
  $('#form_login').submit(function (e) {
    e.preventDefault();
    $.ajax({
      type: 'POST',
      url: '/api/login',
      // 获取表单全部数据
      data: $(this).serialize(),
      success: (res) => {
        if (res.status !== 0) return layer.msg('登录失败');
        layer.msg('登录成功');
        // 把 token 存在本地
        localStorage.setItem('token', res.token);
        // 跳转到首页
        location.href = '/index.html';
      },
    });
  });
});
