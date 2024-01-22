import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import App from "./app/App";
import './app/config/i18n';
import JumboTheme from '@jumbo/components/JumboTheme';
import { config } from 'app/config/main';
// import themeConfig from '@jumbo/config/themeConfig';

ReactDOM.render(
  <JumboTheme theme={config.theme}>
  <App />
  </JumboTheme>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
