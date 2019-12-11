/**
 * Created by liaoxt on 2019/7/8
 * 用 tablePage 模板生成的混入，可以存放都会执行的方法，或者都需要定义的变量等等
 */
const tablePageMixin = {
  mounted() {
    this.$_tablePageMixin_setStyle();
    window.onresize = () => {
      this.$_tablePageMixin_setStyle();
    };
  },
  beforeRouteLeave(to, from, next) {
    window.removeEventListener('resize', this.$_tablePageMixin_setStyle());
    next();
  },
  methods: {
    // 样式修改
    $_tablePageMixin_setStyle() {
      let tableSearch = this.$refs.tableSearch;
      let tableContent = this.$refs.tableContent;
      let tableContentBody = this.$refs.tableContentBody;

      // 根据搜索区高度自适应
      tableContent.style.height = `calc(100% - ${tableSearch.offsetHeight + 20}px)`;
      // 表格宽度必须设置, 否则布局会出现问题
      tableContentBody.style.width = `${tableContent.offsetWidth - 40}px`;
    }
  }
};

export { tablePageMixin };
