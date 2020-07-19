'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _victory = require('victory');

var _VizGError = require('../VizGError');

var _VizGError2 = _interopRequireDefault(_VizGError);

var _victoryLightTheme = require('./resources/themes/victoryLightTheme');

var _victoryLightTheme2 = _interopRequireDefault(_victoryLightTheme);

var _victoryDarkTheme = require('./resources/themes/victoryDarkTheme');

var _victoryDarkTheme2 = _interopRequireDefault(_victoryDarkTheme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (c) 2017, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * WSO2 Inc. licenses this file to you under the Apache License,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Version 2.0 (the "License"); you may not use this file except
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * in compliance with the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * You may obtain a copy of the License at
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *   http://www.apache.org/licenses/LICENSE-2.0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Unless required by applicable law or agreed to in writing,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * software distributed under the License is distributed on an
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * KIND, either express or implied.  See the License for the
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * specific language governing permissions and limitations
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * under the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

/**
 * Class to handle visualization of Number Charts.
 */
var NumberCharts = function (_React$Component) {
    _inherits(NumberCharts, _React$Component);

    function NumberCharts(props) {
        _classCallCheck(this, NumberCharts);

        var _this = _possibleConstructorReturn(this, (NumberCharts.__proto__ || Object.getPrototypeOf(NumberCharts)).call(this, props));

        _this.state = {
            value: null,
            prevValue: null
        };
        return _this;
    }

    _createClass(NumberCharts, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (this.props.metadata !== null) {
                this._handleData(this.props);
            }
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (this.props.metadata !== null) {
                this._handleData(nextProps);
            }
        }

        /**
         * handles data received by the props
         * @param props
         * @private
         */

    }, {
        key: '_handleData',
        value: function _handleData(props) {
            var config = props.config,
                data = props.data,
                metadata = props.metadata;
            var _state = this.state,
                prevValue = _state.prevValue,
                value = _state.value;

            var xIndex = metadata.names.indexOf(config.x);

            if (xIndex === -1) {
                throw new _VizGError2.default('MapChart', "Unknown 'x' field defined in the Number Chart config.");
            }

            if (data.length > 0) {
                prevValue = value;
                value = data[data.length - 1][xIndex];
            }

            this.setState({ value: value, prevValue: prevValue });
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                config = _props.config,
                width = _props.width,
                height = _props.height,
                theme = _props.theme;

            var currentTheme = theme === 'light' ? _victoryLightTheme2.default : _victoryDarkTheme2.default;
            var _state2 = this.state,
                prevValue = _state2.prevValue,
                value = _state2.value;

            var highValueColor = config.highValueColor || currentTheme.number.style.labels.highValue.fill;
            var lowValueColor = config.lowValueColor || currentTheme.number.style.labels.lowValue.fill;
            var viewBoxWidth = config.title.length * 20;
            var viewBoxHeight = 120;

            if (config.showDifference && config.showPercentage) {
                viewBoxHeight = 180;
            } else if (config.showDifference || config.showPercentage) {
                viewBoxHeight = 160;
            }

            return _react2.default.createElement(
                'svg',
                { height: '100%', width: '100%', viewBox: '0 0 ' + viewBoxWidth + ' ' + viewBoxHeight },
                _react2.default.createElement(_victory.VictoryLabel, {
                    textAnchor: 'middle',
                    verticalAnchor: 'middle',
                    x: '50%',
                    y: '30',
                    text: config.title,
                    style: { fill: currentTheme.number.style.labels.title.fill, fontSize: 40 }
                }),
                _react2.default.createElement(_victory.VictoryLabel, {
                    textAnchor: 'middle',
                    verticalAnchor: 'middle',
                    x: '50%',
                    y: '85',
                    text: value === null ? value : config.showDecimal === true ? value.toFixed(3) : value.toFixed(0),
                    style: { fill: currentTheme.number.style.labels.mainValue.fill, fontSize: 53 }
                }),
                config.showDifference ? [_react2.default.createElement(_victory.VictoryLabel, {
                    textAnchor: 'middle',
                    verticalAnchor: 'middle',
                    x: viewBoxWidth / 2 + 40,
                    y: '128',
                    text: function () {
                        if (prevValue < value) {
                            return '+';
                        } else if (prevValue === value) {
                            return '';
                        } else {
                            return '-';
                        }
                    }(),
                    style: { fill: currentTheme.number.style.labels.difference.fill, fontSize: 26 }
                }), _react2.default.createElement(_victory.VictoryLabel, {
                    textAnchor: 'middle',
                    verticalAnchor: 'middle',
                    x: '50%',
                    y: '130',
                    text: config.showDecimal === true ? Math.abs(Number(prevValue - value)).toFixed(3) : Math.abs(Number(prevValue - value)).toFixed(0),
                    style: { fill: currentTheme.number.style.labels.difference.fill, fontSize: 26 }
                })] : null,
                config.showPercentage ? [_react2.default.createElement(_victory.VictoryLabel, {
                    key: 'percentVal',
                    textAnchor: 'middle',
                    verticalAnchor: 'middle',
                    x: '49%',
                    y: config.showDifference ? 160 : 130,
                    text: Math.abs(100 * ((value - prevValue) / prevValue)).toFixed(2) + '%',
                    style: { fill: prevValue < value ? highValueColor : lowValueColor, fontSize: 26 }
                }), _react2.default.createElement(_victory.VictoryLabel, {
                    key: 'incrementDecrementSymbol',
                    textAnchor: 'middle',
                    verticalAnchor: 'middle',
                    x: viewBoxWidth / 2 + 60,
                    y: config.showDifference ? 158 : 128,
                    text: function () {
                        if (prevValue < value) {
                            return '↑';
                        } else if (prevValue === value) {
                            return '';
                        } else {
                            return '↓';
                        }
                    }(),
                    style: { fill: prevValue < value ? highValueColor : lowValueColor, fontSize: 26 }
                })] : null
            );
        }
    }]);

    return NumberCharts;
}(_react2.default.Component);

exports.default = NumberCharts;


NumberCharts.propTypes = {
    config: _propTypes2.default.shape({
        x: _propTypes2.default.string,
        title: _propTypes2.default.string,
        charts: _propTypes2.default.arrayOf(_propTypes2.default.shape({
            type: _propTypes2.default.string
        })),
        showDifference: _propTypes2.default.bool,
        showPercentage: _propTypes2.default.bool
    }).isRequired,
    metadata: _propTypes2.default.shape({
        names: _propTypes2.default.arrayOf(_propTypes2.default.string),
        types: _propTypes2.default.arrayOf(_propTypes2.default.string)
    }).isRequired,
    data: _propTypes2.default.array,
    height: _propTypes2.default.number,
    width: _propTypes2.default.number
};

NumberCharts.defaultProps = {
    height: 450,
    width: 800,
    data: []
};