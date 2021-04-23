# remove-file-content-webpack-pluginn

移除文件中指定内容

## 用法

```js
{

  plugins: [
    new RemoveFileContentpWebpackPlugin({
      preset: 'strict'
    })
  ]
}
```

## 选项

#### preset

Type: `string`  
Default: ''

使用预设的处理模式，可选值：'strict'

#### match

Type: `regexp`  
Default: ''

正则匹配需要移除的内容，优先级高于 preset


## License

[MIT](http://opensource.org/licenses/MIT)
