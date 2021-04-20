# Form Item 表单项

## API

### Attributes
|参数|说明|类型|默认值|可选值|
|:-|:-|:-|:-|:-|
|model|表单数据对象|Object|-|-|
|rules|表单验证规则|Object|-|-|
|inline|行内表单模式|Boolean|false|true|
|label-position|表单域标签的位置, 如果值为 left 或者 right 时, 则需要设置 `label-width`|String|right|right/left/top|
|label-width|表单域标签的宽度, 作为 Form 直接子元素的 form-item 会继承该值|String|-|-|
|disabled|是否禁用该表单内的所有组件。若设置为 true, 则表单内组件上的 disabled 属性不再生效|Boolean|false|true|
|button-position|按钮位置|String|right|left/center/right|

### Slots
|名称|说明|
|:-|:-|
|-|Form Item 的内容|
|button-inline-left|行内左侧按钮组|
|button-inline-right|行内右侧按钮组|
|button-top-left|上方组左侧按钮组|
|button-top-center|上方组中间按钮组|
|button-top-right|上方组右侧按钮组|
|button-bottom-left|下方组左侧按钮组|
|button-bottom-center|下方组中间按钮组|
|button-bottom-right|下方组右侧按钮组|

### Events
|事件名|说明|参数|
|:-|:-|:-|
|validate|任一表单项被校验后触发|被校验的表单项 prop 值, 校验是否通过, 错误消息（如果存在）|

### Methods
|方法名|说明|参数|
|:-|:-|:-|
|validate|对整个表单进行校验的方法, 参数为一个回调函数|Function(callback: Function(boolean, object))|
