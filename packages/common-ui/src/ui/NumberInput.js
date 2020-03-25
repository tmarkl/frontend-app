import React, { Component } from "react";
import InputNumber from "../antd/InputNumber";

class NumberInput extends Component {
  handleChange = num => {
    const { name, data, onChange } = this.props;
    if (onChange) {
      onChange({
        target: {
          name,
          value: num,
          data
        }
      });
    }
  };

  render() {
    const props = this.props;
    return <InputNumber {...props} onChange={this.handleChange} />;
  }
}

export default NumberInput;
