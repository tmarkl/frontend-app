import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";
import { app, Error403, Layout, Menu, Icon, Breadcrumb } from "common-ui";
import { createSelector } from "reselect";
import styles from "./Main.module.css";
import { paths, menuList } from "../../utils/paths";

import { connect } from "react-redux";
import { logoutAccount } from "actions";

@connect(
  createSelector(
    state => state.app,
    state => state.account.logout,
    (app, logout) => {
      return {
        ...app,
        logout
      };
    }
  ),
  { logoutAccount }
)
class Main extends Component {
  state = {
    selectedKeys: [],
    openKeys: [],
    breadcrumbTexts: [],
    collapsed: false
  };

  componentDidMount() {
    this.resetMenu(this.props.location.pathname);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.resetMenu(this.props.location.pathname);
    }
  }

  resetMenu(pathname) {
    const pathDetail = paths[pathname];

    this.setState(() => {
      if (!pathDetail) {
        return {
          selectedKeys: [],
          openKeys: [],
          breadcrumbTexts: []
        };
      }

      const belongKey = pathDetail.belongKey;
      let selectedKeys;
      let openKeys;
      let breadcrumbTexts;

      if (belongKey) {
        selectedKeys = [belongKey];
        openKeys = this.getOpenKeys(belongKey, menuList);
        breadcrumbTexts = this.getBreadcrumbTexts(
          (openKeys || []).concat(belongKey, pathname)
        );
      } else {
        selectedKeys = [pathname];
        openKeys = this.getOpenKeys(pathname, menuList) || [];
        breadcrumbTexts = this.getBreadcrumbTexts(
          (openKeys || []).concat(pathname)
        );
      }

      return {
        selectedKeys,
        openKeys,
        breadcrumbTexts
      };
    });
  }

  getOpenKeys(key, list) {
    let arr;

    list.some(item => {
      if (typeof item === "string") {
        if (item === key) {
          arr = [];
          return true;
        }
      } else {
        const [name, sub] = item;
        const subKeys = this.getOpenKeys(key, sub);

        if (subKeys) {
          arr = [name].concat(subKeys);
          return true;
        }
      }

      return false;
    });

    return arr;
  }

  getBreadcrumbTexts(keys) {
    return keys.reduce((arr, key) => {
      const pathDetail = paths[key];

      if (pathDetail) {
        arr.push(pathDetail.text);
      }

      return arr;
    }, []);
  }

  handleSiderToggle = () => {
    this.setState(prevState => ({
      collapsed: !prevState.collapsed
    }));
  };

  handlelogout = () => {
    const { logout, logoutAccount } = this.props;

    if (logout.saveStatus !== 1) {
      logoutAccount();
    }
  };

  handleSiderMenuClick = ({ key }) => {
    if (/^https?:/.test(key)) {
      window.location.href = key;
    } else {
      app.navigateTo(key);
    }
  };

  handleSiderMenuOpenChange = openKeys => {
    this.setState(prevState => {
      const latestOpenKey = openKeys.find(
        key => prevState.openKeys.indexOf(key) === -1
      );

      if (latestOpenKey && latestOpenKey.split("/").length <= 2) {
        return {
          openKeys: openKeys.filter(
            key => key === latestOpenKey || key.split("/").length > 2
          )
        };
      }

      return { openKeys };
    });
  };

  resetLocation = () => {
    const { location } = this.props;

    app.redirectTo({
      ...location,
      searchData: {}
    });
  };

  renderMenuList(list) {
    if (!list) {
      return this.renderMenuList(menuList);
    }

    return list.map(menuItem => {
      if (typeof menuItem === "string") {
        const key = menuItem;
        const pathDetail = paths[key];

        if (!pathDetail) {
          return null;
        }

        return (
          <Menu.Item key={key}>{this.renderMenuContent(pathDetail)}</Menu.Item>
        );
      }

      const [key, sub] = menuItem;
      const pathDetail = paths[key];

      if (!pathDetail) {
        return null;
      }

      return (
        <Menu.SubMenu key={key} title={this.renderMenuContent(pathDetail)}>
          {this.renderMenuList(sub)}
        </Menu.SubMenu>
      );
    });
  }

  renderMenuContent(pathDetail) {
    return (
      <span>
        {pathDetail.icon && (
          <Icon className={styles.size14} type={pathDetail.icon} />
        )}
        <span className={styles.size14}>{pathDetail.text}</span>
      </span>
    );
  }

  renderContent() {
    const { location, children } = this.props;

    if (!paths[location.pathname]) {
      return <Route component={Error403} />;
    }

    return children;
  }

  render() {
    const { collapsed, openKeys, selectedKeys, breadcrumbTexts } = this.state;

    return (
      <Layout className={styles.wrapper} style={{ height: "100%" }}>
        <Layout.Sider trigger={null} collapsible collapsed={collapsed}>
          <p className={styles.logo}>测试后台</p>
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={selectedKeys}
            openKeys={openKeys}
            onClick={this.handleSiderMenuClick}
            onOpenChange={this.handleSiderMenuOpenChange}
          >
            {this.renderMenuList()}
          </Menu>
        </Layout.Sider>
        <Layout>
          <Layout.Header className={styles.header}>
            <span className={styles.trigger} onClick={this.handleSiderToggle}>
              <Icon type={collapsed ? "menu-unfold" : "menu-fold"} />
            </span>
            {/* {this.props.own.name ? (
              <span className={styles.headerContent}>
                {`${this.props.own.name}，欢迎登陆　`}
                <span className={styles.buttonLink} onClick={this.handlelogout}>
                  退出登录
                </span>
              </span>
            ) : null} */}
          </Layout.Header>
          <div className={styles.content}>
            <Breadcrumb className={styles.breadcrumb}>
              {breadcrumbTexts.map((text, idx) => (
                <Breadcrumb.Item key={idx}>{text}</Breadcrumb.Item>
              ))}
            </Breadcrumb>
            {this.renderContent()}
          </div>
        </Layout>
      </Layout>
    );
  }
}

export default withRouter(Main);
