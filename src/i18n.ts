// Copyright (c) 2025 zdb
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import { mergeTranslations } from "react-admin";
import polyglotI18nProvider from "ra-i18n-polyglot";
import en from "ra-language-english";
import zh from "ra-language-chinese";

const customTranslations = {
  en: {
    custom: {
      dashboard: "Dashboard",
      books: "Books",
      create: "Create",
      edit: "Edit",
      welcome: "Welcome to the Book Management System",
      id: "ID",
      title: "Title",
      author: "Author",
      publishedAt: "Published Date",
      category: "Category",
    },
    ra: {
      configurable: {
        customize: "Customize",
      },
    },
  },
  zh: {
    custom: {
      dashboard: "仪表盘",
      books: "图书",
      create: "创建",
      edit: "编辑",
      welcome: "欢迎使用图书管理系统",
      id: "编号",
      title: "标题",
      author: "作者",
      publishedAt: "出版日期",
      category: "分类",
    },
    ra: {
      configurable: {
        customize: "自定义",
      },
    },
  },
};

export const i18nProvider = polyglotI18nProvider(
  (locale) => {
    const localeTranslations = customTranslations[locale as "en" | "zh"];
    return mergeTranslations(locale === "en" ? en : zh, localeTranslations);
  },
  "en", // 默认语言
  [
    { locale: "en", name: "English" },
    { locale: "zh", name: "中文" },
  ],
);
