// Copyright (c) 2025 zdb
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

// 创建一个单独的类型定义文件，例如：src/types/react-admin-chinese.d.ts
// 确保这个文件在你的 tsconfig.json 的 include 范围内

// 定义翻译字符串或嵌套的翻译对象
type TranslationValue = string | TranslationDictionary;

// 定义翻译字典的递归类型
interface TranslationDictionary {
  [key: string]: TranslationValue;
}

// 声明模块
declare module "ra-language-chinese" {
  // 默认导出的是一个 TranslationDictionary 类型的对象
  const zh: TranslationDictionary;
  export default zh;
}
