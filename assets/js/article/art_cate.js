$(function () {
  const form = layui.form;
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
    indexAdd = layer.open({
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

  let indexEdit = null;
  $('tbody').on('click', '.btn_edit', function () {
    const id = $(this).attr('data-id');
    indexEdit = layer.open({
      type: 1,
      area: ['500px', '250px'],
      title: '修改文章分类',
      content: $('#dialog-edit').html(),
    });
    $.ajax({
      type: 'GET',
      url: '/my/article/cates/' + id,
      success: (res) => {
        if (res.status !== 0) return layer.msg('获取分类数据失败！');
        form.val('form-edit', res.data);
      },
    });
  });
  // 修改文章分类
  $('body').on('submit', '#form-edit', function (e) {
    e.preventDefault();
    $.ajax({
      type: 'POST',
      url: '/my/article/updatecate',
      data: $(this).serialize(),
      success: (res) => {
        if (res.status !== 0) return layer.msg('更新分类数据失败！');
        layer.msg('更新分类数据成功！');
        initartCateList();
        layer.close(indexEdit);
      },
    });
  });
  // 删除文章分类
  $('tbody').on('click', '.btn-delete', function () {
    const id = $(this).attr('data-id');
    layer.confirm('确定删除吗？', { icon: 3, title: '提示' }, function (index) {
      $.ajax({
        type: 'GET',
        url: '/my/article/deletecate/' + id,
        success: (res) => {
          if (res.status !== 0) return layer.msg('删除分类失败！');
          layer.msg('删除分类成功！');
          initartCateList();
          layer.close(index);
        },
      });
    });
  });
  initartCateList();
});
