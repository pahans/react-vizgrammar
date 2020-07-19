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

var _BaseChart2 = require('./BaseChart');

var _BaseChart3 = _interopRequireDefault(_BaseChart2);

var _LineChart = require('./LineChart');

var _LineChart2 = _interopRequireDefault(_LineChart);

var _AreaChart = require('./AreaChart');

var _AreaChart2 = _interopRequireDefault(_AreaChart);

var _BarChart = require('./BarChart');

var _BarChart2 = _interopRequireDefault(_BarChart);

var _ChartContainer = require('./ChartContainer');

var _ChartContainer2 = _interopRequireDefault(_ChartContainer);

var _LegendComponent = require('./LegendComponent');

var _LegendComponent2 = _interopRequireDefault(_LegendComponent);

var _victoryDarkTheme = require('./resources/themes/victoryDarkTheme');

var _victoryDarkTheme2 = _interopRequireDefault(_victoryDarkTheme);

var _victoryLightTheme = require('./resources/themes/victoryLightTheme');

var _victoryLightTheme2 = _interopRequireDefault(_victoryLightTheme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
 * Class to handle visualization of Charts consisting of Area, Bar and Line Charts.
 */
var ComposedChart = function (_BaseChart) {
    _inherits(ComposedChart, _BaseChart);

    function ComposedChart(props) {
        _classCallCheck(this, ComposedChart);

        var _this = _possibleConstructorReturn(this, (ComposedChart.__proto__ || Object.getPrototypeOf(ComposedChart)).call(this, props));

        _this.handleMouseEvent = _this.handleMouseEvent.bind(_this);
        _this.handleLegendInteraction = _this.handleLegendInteraction.bind(_this);
        return _this;
    }

    _createClass(ComposedChart, [{
        key: 'render',
        value: function render() {
            var finalLegend = [];
            var chartComponents = [];
            var _props = this.props,
                config = _props.config,
                height = _props.height,
                width = _props.width,
                theme = _props.theme;
            var _state = this.state,
                chartArray = _state.chartArray,
                dataSets = _state.dataSets,
                xScale = _state.xScale,
                ignoreArray = _state.ignoreArray;

            var currentTheme = theme === 'light' ? _victoryLightTheme2.default : _victoryDarkTheme2.default;

            chartArray.forEach(function (chart, chartIndex) {
                var localChartSet = [];
                var dataSetLength = 1;
                _lodash2.default.keys(chart.dataSetNames).forEach(function (dsName) {
                    finalLegend.push({
                        name: dsName,
                        symbol: { fill: _lodash2.default.indexOf(ignoreArray, dsName) > -1 ? '#d3d3d3' : chart.dataSetNames[dsName] },
                        chartIndex: chartIndex
                    });
                    if (dataSetLength < dataSets[dsName].length) dataSetLength = dataSets[dsName].length;
                    var component = {
                        line: function line() {
                            return _LineChart2.default.getComponent(config, chartIndex, xScale, dataSets[dsName], chart.dataSetNames[dsName], null, currentTheme);
                        },
                        area: function area() {
                            return _AreaChart2.default.getComponent(config, chartIndex, xScale, dataSets[dsName], chart.dataSetNames[dsName], null, currentTheme);
                        },
                        bar: function bar() {
                            return _BarChart2.default.getComponent(config, chartIndex, xScale, dataSets[dsName], chart.dataSetNames[dsName], null, currentTheme);
                        }
                    };

                    if (_lodash2.default.indexOf(ignoreArray, dsName) === -1) {
                        localChartSet.push(component[chart.type]());
                    }
                });

                if (chart.mode === 'stacked') {
                    chartComponents.push(_react2.default.createElement(
                        _victory.VictoryStack,
                        null,
                        localChartSet
                    ));
                } else if (chart.type === 'bar') {
                    var barWidth = (_BarChart2.default.isHorizontal(config) ? height - 80 : width - 280) / (dataSetLength * localChartSet.length) - 1;

                    chartComponents.push(_react2.default.createElement(
                        _victory.VictoryGroup,
                        {
                            horizontal: chart.orientation === 'left',
                            offset: barWidth,
                            style: { data: { width: barWidth } }
                        },
                        localChartSet
                    ));
                } else {
                    chartComponents.push.apply(chartComponents, localChartSet);
                }
            });

            var columnWidth = 160;
            var leftLineHeight = 25;
            var bottomLineHeight = 30;
            var xAxisLabelOffset = 50;
            var legendColumns = Math.floor(width / columnWidth);
            var maxLegendItems = Math.floor((height - 100) / leftLineHeight);
            var legendOffset = config.legend === true && finalLegend.length > maxLegendItems ? Math.ceil(finalLegend.length / legendColumns) * bottomLineHeight + xAxisLabelOffset : 0;

            return _react2.default.createElement(
                _ChartContainer2.default,
                {
                    width: width,
                    height: height,
                    xScale: xScale,
                    config: config,
                    theme: theme,
                    disableContainer: true,
                    legendOffset: legendOffset
                },
                config.legend === true ? _react2.default.createElement(_LegendComponent2.default, {
                    height: height,
                    width: width,
                    legendItems: finalLegend,
                    interaction: this.handleLegendInteraction,
                    config: config
                }) : null,
                chartComponents
            );
        }
    }]);

    return ComposedChart;
}(_BaseChart3.default);

exports.default = ComposedChart;