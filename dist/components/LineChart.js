'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _victory = require('victory');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _d = require('d3');

var _BaseChart2 = require('./BaseChart');

var _BaseChart3 = _interopRequireDefault(_BaseChart2);

var _ChartContainer = require('./ChartContainer');

var _ChartContainer2 = _interopRequireDefault(_ChartContainer);

var _BarChart = require('./BarChart');

var _BarChart2 = _interopRequireDefault(_BarChart);

var _LegendComponent = require('./LegendComponent');

var _LegendComponent2 = _interopRequireDefault(_LegendComponent);

var _victoryLightTheme = require('./resources/themes/victoryLightTheme');

var _victoryLightTheme2 = _interopRequireDefault(_victoryLightTheme);

var _victoryDarkTheme = require('./resources/themes/victoryDarkTheme');

var _victoryDarkTheme2 = _interopRequireDefault(_victoryDarkTheme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (c) 2018, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
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
 * Class to handle the visualization of line charts.
 */
var LineChart = function (_BaseChart) {
    _inherits(LineChart, _BaseChart);

    function LineChart(props) {
        _classCallCheck(this, LineChart);

        var _this = _possibleConstructorReturn(this, (LineChart.__proto__ || Object.getPrototypeOf(LineChart)).call(this, props));

        _this.sortDataBasedOnConfig = _this.sortDataBasedOnConfig.bind(_this);
        _this.handleMouseEvent = _this.handleMouseEvent.bind(_this);
        _this.handleLegendInteraction = _this.handleLegendInteraction.bind(_this);
        return _this;
    }

    _createClass(LineChart, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                config = _props.config,
                height = _props.height,
                width = _props.width,
                yDomain = _props.yDomain,
                theme = _props.theme;
            var _state = this.state,
                chartArray = _state.chartArray,
                dataSets = _state.dataSets,
                xScale = _state.xScale,
                ignoreArray = _state.ignoreArray;

            var currentTheme = theme === 'light' ? _victoryLightTheme2.default : _victoryDarkTheme2.default;

            var _LineChart$getLineCha = LineChart.getLineChartComponent(chartArray, xScale, dataSets, config, this.handleMouseEvent, ignoreArray, currentTheme),
                chartComponents = _LineChart$getLineCha.chartComponents,
                legendComponents = _LineChart$getLineCha.legendComponents;

            var legendColumns = Math.floor(width / 160);
            var maxLegendItems = Math.floor((height - 100) / 25);
            var legendOffset = config.legend === true && legendComponents.length > maxLegendItems ? Math.ceil(legendComponents.length / legendColumns) * 30 + 50 : 0;

            return _react2.default.createElement(
                _ChartContainer2.default,
                {
                    width: width,
                    height: height,
                    xScale: xScale,
                    config: config,
                    horizontal: _BarChart2.default.isHorizontal(config),
                    yDomain: yDomain,
                    theme: theme,
                    legendOffset: legendOffset,
                    legendItems: legendComponents
                },
                config.legend === true ? _react2.default.createElement(_LegendComponent2.default, {
                    height: height,
                    width: width,
                    legendItems: legendComponents,
                    interaction: this.handleLegendInteraction,
                    config: config,
                    theme: theme
                }) : null,
                chartComponents
            );
        }
    }], [{
        key: 'trimLegendLabel',
        value: function trimLegendLabel(characterLength, text) {
            if (text) {
                if (text.length > characterLength) {
                    return text.slice(0, 6) + '...' + text.slice(-(characterLength - 7));
                } else {
                    return text + new Array(16 - text.length).join(' ');
                }
            }
        }

        /**
         * Generate the chart components in the case where there's only Line charts defined in the chart config.
         * @param {Array} chartArray - Array containing objects that has the information to visualize each area chart.
         * @param {String} xScale - xAxis scale to be used in the charts.
         * @param {Object} dataSets - object containing arrays of data after classification.
         * @param {Object} config - object containing user provided chart configuration
         * @param {Function} onClick - function to be executed on click event
         * @param {Array} ignoreArray - array that contains dataSets to be ignored in rendering the components.
         * @returns {{chartComponents: Array, legendComponents: Array}}
         */

    }, {
        key: 'getLineChartComponent',
        value: function getLineChartComponent(chartArray, xScale, dataSets, config, onClick, ignoreArray, currentTheme) {
            var _this2 = this;

            var chartComponents = [];
            var legendComponents = [];

            chartArray.forEach(function (chart, chartIndex) {
                _lodash2.default.keys(chart.dataSetNames).forEach(function (dsName) {
                    legendComponents.push({
                        name: _this2.trimLegendLabel(16, dsName),
                        fullName: dsName,
                        symbol: { fill: _lodash2.default.indexOf(ignoreArray, dsName) > -1 ? '#d3d3d3' : chart.dataSetNames[dsName] },
                        chartIndex: chartIndex
                    });
                    if (_lodash2.default.indexOf(ignoreArray, dsName) === -1) {
                        chartComponents.push.apply(chartComponents, _toConsumableArray(LineChart.getComponent(config, chartIndex, xScale, dataSets[dsName], chart.dataSetNames[dsName], onClick, currentTheme)));
                    }
                });
            });

            return { chartComponents: chartComponents, legendComponents: legendComponents };
        }

        /**
         * Generate a single Line chart component to be visualized.
         * @param {Object} config - Chart configuration provided by the user.
         * @param {Number} chartIndex - Index of the chart definition in the chart Array.
         * @param {String} xScale - Scale to be used in the xAxis when plotting the chart.
         * @param {Array} data - Array of objects that containing the dataset to be plotted using this chart component.
         * @param {String} color - Color the chart should be plotted in.
         * @param {Function} onClick - Function to be executed in the case of an click event.
         * @returns {Element}
         */

    }, {
        key: 'getComponent',
        value: function getComponent(config, chartIndex, xScale, data, color, _onClick, currentTheme) {
            return [_react2.default.createElement(_victory.VictoryLine, {
                key: 'lineChart-' + chartIndex,
                style: {
                    data: {
                        strokeWidth: config.charts[chartIndex].style ? config.charts[chartIndex].style.strokeWidth || currentTheme.line.style.data.strokeWidth : currentTheme.line.style.data.strokeWidth,
                        stroke: color
                    }
                },
                animate: config.animate ? { onEnter: { duration: 100 } } : null,
                data: data,
                name: 'blacked'
            }), _react2.default.createElement(_victory.VictoryScatter, {
                key: 'lineScatter-' + chartIndex,
                style: {
                    data: {
                        fill: color
                    }
                },
                data: data,
                labels: function () {
                    if (xScale === 'time' && config.tipTimeFormat) {
                        return function (d) {
                            return config.x + ' : ' + (0, _d.timeFormat)(config.tipTimeFormat)(new Date(d.x)) + '\n' + (config.charts[chartIndex].y + ' : ' + Number(d.y).toFixed(2));
                        };
                    } else {
                        return function (d) {
                            if (isNaN(d.x)) {
                                return config.x + ' : ' + d.x + '\n' + config.charts[chartIndex].y + ' : ' + Number(d.y).toFixed(2);
                            } else {
                                return config.x + ' : ' + Number(d.x).toFixed(2) + '\n' + (config.charts[chartIndex].y + ' : ' + Number(d.y).toFixed(2));
                            }
                        };
                    }
                }(),
                labelComponent: _react2.default.createElement(_victory.VictoryTooltip, {
                    pointerLength: 4,
                    cornerRadius: 2,
                    flyoutStyle: {
                        fill: currentTheme.tooltip.style.flyout.fill,
                        fillOpacity: currentTheme.tooltip.style.flyout.fillOpacity,
                        strokeWidth: currentTheme.tooltip.style.flyout.strokeWidth
                    },
                    style: { fill: currentTheme.tooltip.style.labels.fill }
                }),
                size: config.charts[chartIndex].style ? config.charts[chartIndex].style.markRadius || currentTheme.scatter.style.data.markRadius : currentTheme.scatter.style.data.markRadius,
                events: [{
                    target: 'data',
                    eventHandlers: {
                        onClick: function onClick() {
                            return [{ target: 'data', mutation: function mutation(props) {
                                    return _onClick(props);
                                } }];
                        }
                    }
                }]
            })];
        }
    }]);

    return LineChart;
}(_BaseChart3.default);

exports.default = LineChart;