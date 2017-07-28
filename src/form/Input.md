---
imports:
    import {Input} from '../';
---
::: demo 基础用法|基础的输入框的用法
```jsx
 <Input placeholder="默认text" />
 <Input type="text" defaultValue="默认值defaultValue" placeholder="请输入" />
 <Input type="text" value={this.state.name} onChange={::this.setValue.bind(this,"name")} placeholder="请输入" />
```
:::

::: demo 多选框|支持多选框的使用
```jsx
<Input type="checkbox" label="西瓜" disabled/>            
```
:::
