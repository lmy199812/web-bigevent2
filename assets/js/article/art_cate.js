$(function () {
  // // 获取 表格数据
  const initartCateList = () => {
    $.ajax({
      type: 'GET',
      url: '/my/article/cates',
      success: (res) => {
        if (res.status !== 0) return layer.msg('获取表格数据失败');
        const htmlStr = template('tpl-table', res);
        $('tbody').empty().html(htmlStr);
      },
    });
  };
  const layer = layui.layer;
  let indexAdd = null;
  $('#btnAddCate').click(() => {
    layer.open({
      type: 1,
      area: ['500px', '250px'],
      title: '添加文章分类',
      content: $('#dialog-add').html(),
    });
  });
  // 通过代理监听 submit 事件
  $('body').on('submit', '#form-add', function (e) {
    e.preventDefault();
    $.ajax({
      type: 'POST',
      url: '/my/article/addcates',
      data: $(this).serialize(),
      success: (res) => {
        if (res.status !== 0) return layer.msg('新增分类失败');
        layer.msg('新增分类成功');
        initartCateList();
        layer.close(indexAdd);
      },
    });
  });

  initartCateList();
});
