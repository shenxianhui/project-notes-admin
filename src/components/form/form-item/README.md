# Form Item 表单项

## API

### Attributes

#### 公共
|参数|说明|类型|默认值|可选值|
|:-|:-|:-|:-|:-|
|item-type|form-item 类型|String|-|<a href="#itemType">查看</a>|
|value/v-model|绑定值|-|-|-|
|col|栅格占据的列数|Number|24|-|
|item-width|form-item 实际宽度|String|300px|-|
|inline|行内模式, 打开时 col/itemWidth 会失效|Boolean|true|false|
|options|选项列表|{ label, value }[]|-|-|
|label|标签文本|String|-|-|
|prop|表单域 model 字段, 在使用 validate、resetFields 方法的情况下, 该属性是必填的|String|-|-|
|name|原生属性|String|-|-|
|placeholder|占位符|String|请输入XX/请选择XX|-|
|type|类型|String|-|-|
|disabled|禁用|Boolean|false|true|
|clearable|是否可清空|Boolean|true|false|
|size|用于控制该表单域下组件的尺寸|String|small|medium/small/mini|

#### 输入框
|参数|说明|类型|默认值|可选值|
|:-|:-|:-|:-|:-|
|show-password|是否显示切换密码图标|Boolean|false|true|
|minlength|原生属性，最小输入长度|Number|-|-|
|maxlength|原生属性，最大输入长度|Number|-|-|
|rows|输入框行数, 只对 type="textarea" 有效|Number|2|-|
|showWordLimit|显示输入字数统计, 只在 `type="text"` 或 `type="textarea"` 时有效|Boolean|||

#### 选择器
|参数|说明|类型|默认值|可选值|
|:-|:-|:-|:-|:-|
|loading|加载中|Boolean|false|true|
|filterable|是否可搜索|Boolean|true|false|
|multiple|是否多选|Boolean|false|true|
|multiple-limit|多选时用户最多可以选择的项目数，为 0 则不限制|Number|0|-|
|collapse-tags|多选时是否将选中值按文字的形式展示|Boolean|false|true|
|remote|是否为远程搜索|Boolean|false|true|
|filter-method|自定义搜索方法|Function|-|-|
|remote-method|远程搜索方法|Function|-|-|

#### 级联选择器
|参数|说明|类型|默认值|可选值|
|:-|:-|:-|:-|:-|
|props|[配置选项](https://element.eleme.cn/#/zh-CN/component/cascader#props)|Object|-|-|
|filterable|是否可搜索|Boolean|true|false|
|show-all-levels|输入框中是否显示选中值的完整路径|Boolean|true|false|

#### 多选框
|参数|说明|类型|默认值|可选值|
|:-|:-|:-|:-|:-|
|show-check-all|是否开启全选功能|Boolean|false|true|
|check-all|是否默认全选 (只在 `:show-check-all="true"` 时有效)||||
|indeterminate|已选且非全选状态 (只负责样式控制)|Boolean|false|true|

#### 日期时间选择器
|参数|说明|类型|默认值|可选值|
|:-|:-|:-|:-|:-|
|start-placeholder|范围选择时开始日期的占位内容|String|开始日期|-|
|end-placeholder|范围选择时结束日期的占位内容|String|结束日期|-|
|default-time|选中日期后的默认具体时刻|非范围选择时: string / 范围选择时: string[]|-|-|
|value-format|绑定值的格式|String|timestamp|[日期格式](https://element.eleme.cn/#/zh-CN/component/date-picker#ri-qi-ge-shi)|

#### 计数器
|参数|说明|类型|默认值|可选值|
|:-|:-|:-|:-|:-|
|step|步长|Number|1|-|
|min|设置计数器允许的最小值|Number|-Infinity|-|
|max|设置计数器允许的最大值|Number|Infinity|-|
|step-strictly|是否只能输入 step 的倍数|Boolean|false|true|
|precision|数值精度|Number|-|large/small|
|controls-position|控制按钮位置|String|-|right|

#### 滑块
|参数|说明|类型|默认值|可选值|
|:-|:-|:-|:-|:-|
|step|步长|Number|1|-|
|show-tooltip|是否显示 tooltip|Boolean|true|false|
|format-tooltip|格式化 tooltip message|Function|-|-|
|show-stops|是否显示间断点|Boolean|false|true|
|range|是否为范围选择|Boolean|false|true|
|vertical|是否竖向模式|Boolean|false|true|
|height|Slider 高度, 竖向模式时必填|String|-|-|
|marks|标记, key 的类型必须为 number 且取值在闭区间 `[min, max]` 内，每个标记可以单独设置样式|Object|-|-|

#### 开关
|参数|说明|类型|默认值|可选值|
|:-|:-|:-|:-|:-|
|width|switch 的宽度 (像素)|Number|40|-|
|active-color|switch 打开时的背景色|String|#409EFF|-|
|inactive-color|switch 关闭时的背景色|String|#C0CCDA|-|
|active-text|switch 打开时的文字描述|String|-|-|
|inactive-text|switch 关闭时的文字描述|String|-|-|

### Events
|事件名|说明|参数|
|:-|:-|:-|
|input|在 Input 值改变时触发|改变后的值|
|change|输入框失去焦点/用户按下回车/选中值发生变化时触发|当前值|
|fetch-suggestions|模糊搜索|-|
|select|点击选中建议项时触发|选中建议项|
|check-all|点击多选框的全选按钮时触发|当前值|

### Methods
|方法名|说明|参数|
|:-|:-|:-|
|resetField|对该表单项进行重置，将其值重置为初始值并移除校验结果|-|
|clearValidate|移除该表单项的校验结果|-|

#### <a id="itemType">itemType</a>
|名称|说明|
|:-:|:-:|
|input|输入框|
|autocomplete|远程搜索|
|select|选择器|
|cascader|级联选择器|
|date-picker|日期时间选择器|
|radio|单选框|
|checkbox|多选框|
|input-number|计数器|
|switch|开关|
|slider|滑块|
