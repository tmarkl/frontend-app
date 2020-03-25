import React from 'react';
import 'antd/lib/locale-provider/style/css';
import ConfigProvider from 'antd/lib/config-provider';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
import moment from 'moment';

moment.locale('zh-cn');

export default function CBLocaleProvider(props) {
  return <ConfigProvider locale={zh_CN}>{props.children}</ConfigProvider>;
}
