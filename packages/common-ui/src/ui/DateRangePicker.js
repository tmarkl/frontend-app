import styles from "./Picker.module.css";
import React, { Component } from "react";
import DatePicker from "../antd/DatePicker";
import Radio from "../antd/Radio";
import moment from "moment";

class DateRangePicker extends Component {
  handleDateRangeChange = (_, dateRange) => {
    const { onChange, dateCycle } = this.props;
    if (onChange) {
      onChange({ dateRange, dateCycle: dateCycle ? dateCycle.value : "0" });
    }
  };

  handleDateLatestChange = evt => {
    const { onChange } = this.props;
    const dateLatest = evt.target.value;

    if (onChange) {
      onChange({ dateRange: [], dateLatest, dateCycle: "0" });
    }
  };

  handleDateCycleChange = evt => {
    const { onChange } = this.props;
    const dateCycle = evt.target.value;

    if (onChange) {
      onChange({ dateCycle });
    }
  };

  renderDateRange() {
    const { dateRange, ...props } = this.props;

    if (!dateRange) {
      return null;
    }

    const { value } = dateRange;

    return (
      <DatePicker.RangePicker
        {...props}
        value={value && value.map(num => moment(num))}
        onChange={this.handleDateRangeChange}
      />
    );
  }

  renderDateLatest() {
    const { dateRange, dateLatest } = this.props;

    if (!dateRange || !dateLatest) {
      return null;
    }

    let value = dateLatest.value;
    if (!value) {
      value = "l7d";
    }
    if (dateRange.value && dateRange.value.length === 2) {
      value = undefined;
    }

    return (
      <Radio.Group
        {...dateLatest}
        value={value}
        onChange={this.handleDateLatestChange}
      >
        <Radio.Button value="l7d">近7天</Radio.Button>
        <Radio.Button value="l1m">近1个月</Radio.Button>
        <Radio.Button value="l3m">近3个月</Radio.Button>
        <Radio.Button value="l6m">近半年</Radio.Button>
        <Radio.Button value="l1y">近1年</Radio.Button>
      </Radio.Group>
    );
  }

  renderDateCycle() {
    const { dateCycle } = this.props;

    if (!dateCycle) {
      return null;
    }

    return (
      <span className={styles.drpItem}>
        <Radio.Group {...dateCycle} onChange={this.handleDateCycleChange}>
          <Radio.Button value="0">日</Radio.Button>
          <Radio.Button value="1">周</Radio.Button>
          <Radio.Button value="2">月</Radio.Button>
        </Radio.Group>
      </span>
    );
  }

  render() {
    return (
      <div className={styles.daterange}>
        {this.renderDateRange()}
        {this.renderDateLatest()}
        {this.renderDateCycle()}
      </div>
    );
  }
}

DateRangePicker.parse = (query = {}, dict = {}) => {
  dict = {
    dateRange: "dateRange",
    dateLatest: "dateLatest",
    dateCycle: "dateCycle",
    ...dict
  };

  let ret = {};

  const dateRange = query[dict.dateRange];
  const dateLatest = query[dict.dateLatest];
  const dateCycle = query[dict.dateCycle];

  if (
    Object.prototype.toString.call(dateRange) === "[object Array]" &&
    dateRange.length === 2 &&
    dateRange.every(date => moment(date).isValid())
  ) {
    ret[dict.dateRange] = dateRange;
  }

  if (
    typeof dateLatest === "string" &&
    ["l7d", "l1m", "l3m", "l6m", "l1y"].indexOf(dateLatest) !== -1
  ) {
    ret[dict.dateLatest] = dateLatest;
  }

  if (
    typeof dateCycle === "string" &&
    ["0", "1", "2"].indexOf(dateCycle) !== -1
  ) {
    ret[dict.dateCycle] = dateCycle;
  }

  return ret;
};

DateRangePicker.format = (data = {}, dict = {}) => {
  dict = {
    dateRange: "dateRange",
    dateLatest: "dateLatest",
    ...dict
  };

  let ret = {};

  const dateRange = data[dict.dateRange];
  const dateLatest = data[dict.dateLatest];

  if (Object.prototype.toString.call(dateRange) === "[object Array]") {
    ret[dict.dateRange] = dateRange;
  }
  if (typeof dateLatest === "string") {
    ret[dict.dateLatest] = dateLatest;
  }

  return ret;
};

DateRangePicker.parseTimeRange = timeRange => {
  let range = [];
  if (
    timeRange &&
    timeRange.length === 2 &&
    timeRange.every(date => moment(date).isValid())
  ) {
    range = timeRange;
  }

  return range;
};

export default DateRangePicker;
