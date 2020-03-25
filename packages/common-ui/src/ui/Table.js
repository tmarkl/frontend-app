import styles from "./Table.module.css";
import React, { Component, Fragment } from "react";
import Table from "../antd/Table";
import Pagination from "../antd/Pagination";

const PAGE_SIZE_OPTIONS = ["10", "20", "50", "100"];

class CBTable extends Component {
  handleTableChange = (pagination, filters, sorter) => {
    const { onChange } = this.props;

    if (sorter) {
      const { columnKey: sort, order: sortOrder } = sorter;

      if (onChange) {
        onChange({ sort, sortOrder });
      }
    }
  };

  handlePaginationChange = (page, pageSize) => {
    const { onChange } = this.props;

    if (onChange) {
      onChange({ page, pageSize });
    }
  };

  render() {
    const {
      onChange,
      pagination,
      sumary,
      dataSource,
      ...tableProps
    } = this.props;

    let data = dataSource || [];

    if (sumary) {
      if (tableProps.rowKey) {
        sumary[tableProps.rowKey] = "0";
      }

      data = data.concat(sumary);
    }

    return (
      <Fragment>
        <Table
          size="middle"
          bordered
          scroll={{ x: true }}
          {...tableProps}
          dataSource={data}
          pagination={false}
          onChange={this.handleTableChange}
        />
        {pagination && (
          <div className={styles.pagination}>
            <Pagination
              showQuickJumper
              showSizeChanger
              showTotal={total => `共 ${total} 条`}
              pageSizeOptions={PAGE_SIZE_OPTIONS}
              {...pagination}
              onChange={this.handlePaginationChange}
              onShowSizeChange={this.handlePaginationChange}
            />
          </div>
        )}
      </Fragment>
    );
  }
}

let localPageSize = localStorage.getItem("PAGE_SIZE");

CBTable.parse = (query = {}, dict = {}) => {
  dict = {
    page: "page",
    pageSize: "pageSize",
    sort: "sort",
    sortOrder: "sortOrder",
    ...dict
  };

  let ret = {};

  const page = query[dict.page];
  const pageSize = query[dict.pageSize];
  const sort = query[dict.sort];
  const sortOrder = query[dict.sortOrder];

  ret[dict.page] = +page || 1;
  if (
    typeof pageSize === "string" &&
    PAGE_SIZE_OPTIONS.indexOf(pageSize) !== -1
  ) {
    ret[dict.pageSize] = +pageSize;

    if (localPageSize !== pageSize) {
      localPageSize = pageSize;
      localStorage.setItem("PAGE_SIZE", pageSize);
    }
  } else if (typeof localPageSize === "string") {
    ret[dict.pageSize] = +localPageSize;
  } else {
    ret[dict.pageSize] = 10;
  }
  if (typeof sort === "string") {
    ret[dict.sort] = sort;
  }
  if (
    typeof sortOrder === "string" &&
    ["ascend", "descend"].indexOf(sortOrder) !== -1
  ) {
    ret[dict.sortOrder] = sortOrder;
  }

  return ret;
};

CBTable.format = (data = {}, dict = {}) => {
  dict = {
    page: "page",
    pageSize: "pageSize",
    sort: "sort",
    sortOrder: "sortOrder",
    ...dict
  };

  let ret = {};

  const page = data[dict.page];
  const pageSize = data[dict.pageSize];
  const sort = data[dict.sort];
  const sortOrder = data[dict.sortOrder];

  if (typeof page === "number") {
    ret[dict.page] = "" + page;
  }
  if (typeof pageSize === "number") {
    ret[dict.pageSize] = "" + pageSize;
  }
  if (typeof sort === "string") {
    ret[dict.sort] = sort;
  }
  if (typeof sortOrder === "string") {
    ret[dict.sortOrder] = sortOrder;
  }

  return ret;
};

export default CBTable;
