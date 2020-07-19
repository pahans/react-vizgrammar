'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _victory = require('victory');

var _d = require('d3');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _BaseChart2 = require('./BaseChart');

var _BaseChart3 = _interopRequireDefault(_BaseChart2);

var _ChartContainer = require('./ChartContainer');

var _ChartContainer2 = _interopRequireDefault(_ChartContainer);

var _LegendComponent = require('./LegendComponent');

var _LegendComponent2 = _interopRequireDefault(_LegendComponent);

var _victoryDarkTheme = require('./resources/themes/victoryDarkTheme');

var _victoryDarkTheme2 = _interopRequireDefault(_victoryDarkTheme);

var _victoryLightTheme = require('./resources/themes/victoryLightTheme');

var _victoryLightTheme2 = _interopRequireDefault(_victoryLightTheme);

var _Constants = require('./util/Constants');

var _Constants2 = _interopRequireDefault(_Constants);

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
 * Class to handle visualization of Bar charts.
 */
var BarChart = function (_BaseChart) {
    _inherits(BarChart, _BaseChart);

    function BarChart(props) {
        _classCallCheck(this, BarChart);

        var _this = _possibleConstructorReturn(this, (BarChart.__proto__ || Object.getPrototypeOf(BarChart)).call(this, props));

        _this.handleMouseEvent = _this.handleMouseEvent.bind(_this);
        _this.handleLegendInteraction = _this.handleLegendInteraction.bind(_this);
        _this.getBarChartComponent = _this.getBarChartComponent.bind(_this);
        return _this;
    }

    _createClass(BarChart, [{
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
         * Check if the chart is horizontal.
         * @param {Object} config - chart configuration provided by the user.
         * @returns {Boolean} - true in the case of the chart alignment is horizontal false if not.
         */

    }, {
        key: 'getBarChartComponent',


        /**
         * Generate the chart components in the case where there's only Bar charts defined in the chart config.
         * @param {Array} chartArray - Array containing objects that has the information to visualize each area chart.
         * @param {String} xScale - xAxis scale to be used in the charts.
         * @param {Object} dataSets - object containing arrays of data after classification.
         * @param {Object} config - object containing user provided chart configuration
         * @param {Function} onClick - function to be executed on click event
         * @param {Array} ignoreArray - array that contains dataSets to be ignored in rendering the components.
         * @returns {{chartComponents: Array, legendComponents: Array}}
         */
        value: function getBarChartComponent(chartArray, dataSets, config, onClick, xScale, ignoreArray, currentTheme, isOrdinal) {
            var _this2 = this;

            var chartComponents = [];
            var legendComponents = [];
            var dataSetLength = 1;

            if (isOrdinal) {
                var xValueCollection = [];

                _lodash2.default.keys(dataSets).forEach(function (key) {
                    dataSets[key].forEach(function (d) {
                        if (_lodash2.default.indexOf(xValueCollection, d.x) === -1) {
                            xValueCollection.push(d.x);
                        }
                    });
                });

                _lodash2.default.keys(dataSets).forEach(function (key) {
                    var tempValueSet = [];

                    xValueCollection.forEach(function (xValue) {
                        var arrayIndex = _lodash2.default.findIndex(dataSets[key], function (obj) {
                            return obj.x === xValue;
                        });

                        if (arrayIndex > -1) {
                            tempValueSet.push(dataSets[key][arrayIndex]);
                        } else {
                            tempValueSet.push({ x: xValue, y: 0 });
                        }
                    });

                    dataSets[key] = tempValueSet;
                });
            }

            chartArray.forEach(function (chart, chartIndex) {
                var localSet = [];
                _lodash2.default.keys(chart.dataSetNames).forEach(function (dsName) {
                    legendComponents.push({
                        name: _this2.trimLegendLabel(16, dsName),
                        fullName: dsName,
                        symbol: { fill: _lodash2.default.indexOf(ignoreArray, dsName) > -1 ? '#d3d3d3' : chart.dataSetNames[dsName] },
                        chartIndex: chartIndex
                    });

                    if (xScale === 'time' && dataSets[dsName].length === 1) {
                        for (var i = 0; i < 2; i++) {
                            var simulatedDataSet = Object.assign({}, dataSets[dsName][0]);
                            simulatedDataSet.y = 0;
                            if (i === 0) {
                                simulatedDataSet.x += 10000;
                                dataSets[dsName].push(simulatedDataSet);
                            } else if (i === 1) {
                                simulatedDataSet.x -= 10000;
                                dataSets[dsName].push(simulatedDataSet);
                            }
                        }
                    }

                    if (dataSetLength < dataSets[dsName].length) dataSetLength = dataSets[dsName].length;
                    if (_lodash2.default.indexOf(ignoreArray, dsName) === -1) {
                        localSet.push(BarChart.getComponent(config, chartIndex, xScale, dataSets[dsName], chart.dataSetNames[dsName], onClick, currentTheme));
                    }
                });

                if (chart.mode === 'stacked') {
                    _this2.state.stacked = true;
                    chartComponents.push(_react2.default.createElement(
                        _victory.VictoryStack,
                        {
                            key: 'victoryStackGroup-' + chart.id,
                            name: 'blacked'
                        },
                        localSet
                    ));
                } else {
                    chartComponents.push.apply(chartComponents, localSet);
                }
            });

            var found0 = _lodash2.default.findIndex(_lodash2.default.values(dataSets), function (o) {
                if (o.length > 0) {
                    return o[0].x === 0;
                } else {
                    return false;
                }
            });

            if (found0 > -1 && !BarChart.isHorizontal(config)) {
                dataSetLength += 1;
            }

            return { chartComponents: chartComponents, legendComponents: legendComponents, dataSetLength: dataSetLength };
        }

        /**
         * Generate a single Area chart component to be visualized.
         * @param {Object} config - Chart configuration provided by the user.
         * @param {Number} chartIndex - Index of the chart definition in the chart Array.
         * @param {String} xScale - Scale to be used in the xAxis when plotting the chart.
         * @param {Array} data - Array of objects that containing the dataset to be plotted using this chart component.
         * @param {String} color - Color the chart should be plotted in.
         * @param {Function} onClick - Function to be executed in the case of an click event.
         * @returns {Element}
         */

    }, {
        key: 'calculateBarWidth',
        value: function calculateBarWidth(horizontal, height, width, range, timeStep) {
            var timeInterval = void 0;

            switch (timeStep) {
                case 'day':
                    timeInterval = _Constants2.default.MILLISECONDS_FOR_DAY;
                    break;
                case 'month':
                    timeInterval = _Constants2.default.MILLISECONDS_FOR_MONTH;
                    break;
                case 'year':
                    timeInterval = _Constants2.default.MILLISECONDS_FOR_YEAR;
                    break;
                case 'hour':
                    timeInterval = _Constants2.default.MILLISECONDS_FOR_HOUR;
                    break;
                case 'minute':
                    timeInterval = _Constants2.default.MILLISECONDS_FOR_MINUTE;
                    break;
                case 'second':
                    timeInterval = _Constants2.default.MILLISECONDS_FOR_SECOND;
                    break;
                default:
                    timeInterval = 1;
            }

            return (horizontal ? height - 120 : width - 280) / (range / timeInterval + 1);
        }
    }, {
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
                ignoreArray = _state.ignoreArray,
                isOrdinal = _state.isOrdinal,
                xAxisRange = _state.xAxisRange,
                xAxisType = _state.xAxisType;

            var currentTheme = theme === 'light' ? _victoryLightTheme2.default : _victoryDarkTheme2.default;

            var _getBarChartComponent = this.getBarChartComponent(chartArray, dataSets, config, this.handleMouseEvent, xScale, ignoreArray, currentTheme, isOrdinal),
                chartComponents = _getBarChartComponent.chartComponents,
                legendComponents = _getBarChartComponent.legendComponents,
                dataSetLength = _getBarChartComponent.dataSetLength;

            var fullBarWidth = (BarChart.isHorizontal(config) ? height - 120 : width - 280) / dataSetLength - 1;

            if (!isOrdinal) {
                if (xScale === 'time' && config.timeStep && xAxisRange[0]) {
                    fullBarWidth = this.calculateBarWidth(BarChart.isHorizontal(config), height, width, xAxisRange[1] - xAxisRange[0], config.timeStep.toLowerCase());
                } else {
                    fullBarWidth = (BarChart.isHorizontal(config) ? height - 120 : width - 280) / ((dataSetLength + 2 * (config.linearSeriesStep || 1)) / (config.linearSeriesStep || 1));
                }
            }

            fullBarWidth = fullBarWidth > 100 ? fullBarWidth * 0.8 : fullBarWidth;
            var barWidth = Math.floor(fullBarWidth / chartComponents.length);
            var legendColumns = Math.floor(width / 160);
            var maxLegendItems = Math.floor((height - 100) / 25);
            var legendOffset = config.legend === true && legendComponents.length > maxLegendItems ? Math.ceil(legendComponents.length / legendColumns) * 30 + 50 : 0;
            chartComponents = [_react2.default.createElement(
                _victory.VictoryGroup,
                {
                    name: 'blacked',
                    key: 'victoryMainGroup',
                    horizontal: BarChart.isHorizontal(config),
                    offset: barWidth,
                    style: { data: { width: barWidth } }
                },
                chartComponents
            )];

            return _react2.default.createElement(
                _ChartContainer2.default,
                {
                    width: width,
                    height: height,
                    xScale: xScale,
                    config: config,
                    disableContainer: true,
                    horizontal: BarChart.isHorizontal(config),
                    yDomain: yDomain,
                    theme: theme,
                    isOrdinal: isOrdinal,
                    dataSets: dataSets,
                    barData: { barWidth: barWidth, dataSetLength: dataSetLength, fullBarWidth: fullBarWidth },
                    legendOffset: legendOffset,
                    legendItems: legendComponents
                },
                config.legend === true ? _react2.default.createElement(_LegendComponent2.default, {
                    height: height,
                    width: width,
                    legendItems: legendComponents,
                    interaction: this.handleLegendInteraction,
                    config: config
                }) : null,
                chartComponents
            );
        }
    }], [{
        key: 'isHorizontal',
        value: function isHorizontal(config) {
            return _lodash2.default.find(config.charts, { orientation: 'left' });
        }
    }, {
        key: 'getComponent',
        value: function getComponent(config, chartIndex, xScale, data, color, _onClick, currentTheme) {
            return _react2.default.createElement(_victory.VictoryBar, {
                key: 'bar-' + chartIndex,
                name: 'blacked',
                labels: function () {
                    if (xScale === 'time' && config.tipTimeFormat) {
                        return function (d) {
                            if (Number(d.y) == Number(d.y).toFixed(2)) {
                                return config.x + ' : ' + (0, _d.timeFormat)(config.tipTimeFormat)(new Date(d.x)) + '\n' + (config.charts[chartIndex].y + ' : ' + Number(d.y));
                            } else {
                                return config.x + ' : ' + (0, _d.timeFormat)(config.tipTimeFormat)(new Date(d.x)) + '\n' + (config.charts[chartIndex].y + ' : ' + Number(d.y).toFixed(2));
                            }
                        };
                    } else {
                        return function (d) {
                            if (isNaN(d.x)) {
                                if (Number(d.y) == Number(d.y).toFixed(2)) {
                                    return config.x + ' : ' + d.x + '\n' + config.charts[chartIndex].y + ' : ' + Number(d.y);
                                } else {
                                    return config.x + ' : ' + d.x + '\n' + config.charts[chartIndex].y + ' : ' + Number(d.y).toFixed(2);
                                }
                            } else {
                                if (Number(d.y) == Number(d.y).toFixed(2) && Number(d.x) == Number(d.x).toFixed(2)) {
                                    return config.x + ' : ' + Number(d.x) + '\n' + (config.charts[chartIndex].y + ' : ' + Number(d.y));
                                } else if (Number(d.y) == Number(d.y).toFixed(2)) {
                                    return config.x + ' : ' + Number(d.x).toFixed(2) + '\n' + (config.charts[chartIndex].y + ' : ' + Number(d.y));
                                } else if (Number(d.x) == Number(d.x).toFixed(2)) {
                                    return config.x + ' : ' + Number(d.x) + '\n' + (config.charts[chartIndex].y + ' : ' + Number(d.y).toFixed(2));
                                } else {
                                    return config.x + ' : ' + Number(d.x).toFixed(2) + '\n' + (config.charts[chartIndex].y + ' : ' + Number(d.y).toFixed(2));
                                }
                            }
                        };
                    }
                }(),
                labelComponent: _react2.default.createElement(_victory.VictoryTooltip, {
                    orientation: BarChart.isHorizontal(config) ? 'left' : 'top',
                    pointerLength: 4,
                    cornerRadius: 2,
                    flyoutStyle: {
                        fill: currentTheme.tooltip.style.flyout.fill,
                        fillOpacity: currentTheme.tooltip.style.flyout.fillOpacity,
                        strokeWidth: currentTheme.tooltip.style.flyout.strokeWidth
                    },
                    style: { fill: currentTheme.tooltip.style.labels.fill }
                }),
                data: data,
                color: color,
                events: [{
                    target: 'data',
                    eventHandlers: {
                        onClick: function onClick() {
                            return [{ target: 'data', mutation: function mutation(props) {
                                    return _onClick(props);
                                } }];
                        }
                    }
                }],
                animate: config.animate ? { onEnter: { duration: 100 } } : null
            });
        }
    }]);

    return BarChart;
}(_BaseChart3.default);

exports.default = BarChart;