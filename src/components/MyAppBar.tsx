// Copyright (c) 2025 zdb
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import React, { useState } from "react";
import { TitlePortal } from "ra-ui-materialui";
import { AppBar, Title } from "react-admin";
import { Button, Menu, MenuItem } from "@mui/material";
import { useTranslate } from "react-admin";

type ThemeOption = {
  key: string;
  name: string;
  light: object;
  dark: object;
};

interface MyAppBarProps {
  themeIndex: number;
  setThemeIndex: (index: number) => void;
  // isDarkMode: boolean;
  // setIsDarkMode: (v: boolean) => void;
  themeOptions: ThemeOption[];
  [key: string]: any; // 允许透传其他 props
}

const MyAppBar = ({
  themeIndex,
  setThemeIndex,
  themeOptions,
  ...props
}: MyAppBarProps) => {
  const translate = useTranslate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleThemeSelect = (index: number) => {
    setThemeIndex(index);
    handleMenuClose();
  };

  return (
    <AppBar {...props}>
      <TitlePortal />
      <Title title="图书管理系统仪表盘" />
      <Button color="inherit" sx={{ mx: 2 }} onClick={handleMenuOpen}>
        {translate("custom.theme", { _: "Theme" })}：
        {translate(`custom.theme_${themeOptions[themeIndex].key}`, {
          _: themeOptions[themeIndex].name,
        })}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {themeOptions.map((option, index) => (
          <MenuItem
            key={option.name}
            selected={index === themeIndex}
            onClick={() => handleThemeSelect(index)}
          >
            {translate(`custom.theme_${option.key}`, { _: option.name })}
          </MenuItem>
        ))}
      </Menu>
    </AppBar>
  );
};

export default MyAppBar;
