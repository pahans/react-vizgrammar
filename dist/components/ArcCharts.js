'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _victory = require('victory');

var _BaseChart2 = require('./BaseChart');

var _BaseChart3 = _interopRequireDefault(_BaseChart2);

var _VizGError = require('../VizGError');

var _VizGError2 = _interopRequireDefault(_VizGError);

var _ChartContainer = require('./ChartContainer');

var _ChartContainer2 = _interopRequireDefault(_ChartContainer);

var _LegendComponent = require('./LegendComponent');

var _LegendComponent2 = _interopRequireDefault(_LegendComponent);

var _victoryLightTheme = require('./resources/themes/victoryLightTheme');

var _victoryLightTheme2 = _interopRequireDefault(_victoryLightTheme);

var _victoryDarkTheme = require('./resources/themes/victoryDarkTheme');

var _victoryDarkTheme2 = _interopRequireDefault(_victoryDarkTheme);

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
 * Class to handle Visualization of Arc Charts.
 */
var ArcChart = function (_BaseChart) {
    _inherits(ArcChart, _BaseChart);

    function ArcChart(props) {
        _classCallCheck(this, ArcChart);

        var _this = _possibleConstructorReturn(this, (ArcChart.__proto__ || Object.getPrototypeOf(ArcChart)).call(this, props));

        _this.handleMouseEvent = _this.handleMouseEvent.bind(_this);
        _this.chartMode = 'pie';
        _this.state = {
            chartInfo: [],
            pieChartData: [],
            random: 0
        };

        _this.sortDataBasedOnConfig = _this.sortDataBasedOnConfig.bind(_this);
        return _this;
    }

    _createClass(ArcChart, [{
        key: 'handleMouseEvent',
        value: function handleMouseEvent(props) {
            var onClick = this.props.onClick;


            var data = {};
            data[props.datum.x] = props.datum.y;

            return onClick && onClick(data);
        }
    }, {
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
    }, {
        key: 'sortDataBasedOnConfig',
        value: function sortDataBasedOnConfig(props) {
            var _this2 = this;

            var config = props.config,
                metadata = props.metadata,
                data = props.data;
            var _state = this.state,
                chartInfo = _state.chartInfo,
                pieChartData = _state.pieChartData,
                random = _state.random;

            random++;
            // generate chart array from the config.
            if (chartInfo.length === 0) {
                chartInfo = _BaseChart3.default.generateChartArray(config.charts);
            }

            var dataSet = {};

            chartInfo.forEach(function (chart) {
                _this2.chartMode = chart.mode || _this2.chartMode;
                var xIndex = _lodash2.default.indexOf(metadata.names, chart.x);
                if (xIndex > -1) {
                    if (!config.percentage) {
                        var catIndex = _lodash2.default.indexOf(metadata.names, chart.colorCategoryName);

                        if (catIndex > -1) {
                            dataSet = _lodash2.default.groupBy(data.map(function (datum) {
                                return { x: datum[xIndex], color: datum[catIndex] };
                            }), function (d) {
                                return d.color;
                            });
                            _lodash2.default.keys(dataSet).forEach(function (key) {
                                var datIndex = _lodash2.default.findIndex(pieChartData, function (d) {
                                    return d.x === key;
                                });
                                if (datIndex > -1) {
                                    pieChartData[datIndex].y += _lodash2.default.sumBy(dataSet[key], function (d) {
                                        return d.x;
                                    });
                                } else {
                                    if (chart.colorIndex >= chart.colorScale.length) {
                                        chart.colorIndex = 0;
                                    }
                                    var color = chart.colorScale[chart.colorIndex++];
                                    if (chart.colorDomain.length > 0) {
                                        var colorDomIn = _lodash2.default.indexOf(chart.colorDomain, key);
                                        if (colorDomIn > -1 && colorDomIn < chart.colorScale.length) {
                                            color = chart.colorScale[colorDomIn];
                                        }
                                    }
                                    pieChartData.push({
                                        x: key,
                                        y: _lodash2.default.sumBy(dataSet[key], function (d) {
                                            return d.x;
                                        }),
                                        fill: color,
                                        symbol: { fill: color }
                                    });
                                }
                            });
                        } else {
                            throw new _VizGError2.default('ArcChart', 'color category of the chart not found among the metadata provided');
                        }
                    } else {
                        pieChartData = [{ y: data[data.length - 1][xIndex], fill: chart.colorScale[0] }, { y: 100 - data[data.length - 1][xIndex], fill: chart.colorScale[1] }];
                    }
                } else {
                    throw new _VizGError2.default('ArcChart', "'x' defined in the chart configuration not found among the metadata provided");
                }
            });

            this.setState({ chartInfo: chartInfo, pieChartData: pieChartData, random: random });
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var config = nextProps.config;


            if (!this.chartConfig || !_lodash2.default.isEqual(this.chartConfig, config) || !this.chartConfig.append) {
                this.state.chartInfo = [];
                this.state.pieChartData = [];
                this.chartConfig = config;
            }

            this.sortDataBasedOnConfig(nextProps);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var _props = this.props,
                config = _props.config,
                theme = _props.theme,
                height = _props.height,
                width = _props.width;
            var _state2 = this.state,
                pieChartData = _state2.pieChartData,
                random = _state2.random;

            var currentTheme = theme === 'light' ? _victoryLightTheme2.default : _victoryDarkTheme2.default;
            var legendColumns = Math.floor(width / 160);
            var maxLegendItems = Math.floor((height - 100) / 25);
            var legendOffset = config.legend === true && pieChartData.length > maxLegendItems ? Math.ceil(pieChartData.length / legendColumns) * 30 + 50 : 0;

            return _react2.default.createElement(
                _ChartContainer2.default,
                {
                    height: height,
                    width: width,
                    config: config,
                    xScale: 'linear',
                    theme: theme,
                    disableAxes: true,
                    disableContainer: true,
                    arcChart: !config.percentage,
                    legendOffset: legendOffset,
                    legendItems: pieChartData.map(function (data) {
                        return {
                            name: _this3.trimLegendLabel(16, data.x),
                            fullName: data.x,
                            symbol: data.symbol
                        };
                    })
                },
                _react2.default.createElement(_victory.VictoryPie, {
                    height: height,
                    width: width,
                    randomVal: random,
                    data: pieChartData,
                    labelComponent: config.percentage ? _react2.default.createElement(_victory.VictoryLabel, { text: '' }) : _react2.default.createElement(_victory.VictoryTooltip, {
                        orientation: 'top',
                        pointerLength: 4,
                        cornerRadius: 2,
                        flyoutStyle: {
                            fill: currentTheme.tooltip.style.flyout.fill,
                            fillOpacity: currentTheme.tooltip.style.flyout.fillOpacity,
                            strokeWidth: currentTheme.tooltip.style.flyout.strokeWidth
                        },
                        style: { fill: currentTheme.tooltip.style.labels.fill }
                    }),
                    innerRadius: this.chartMode === 'donut' || config.percentage ? (height > width ? width : height / 4) + (config.innerRadius || currentTheme.pie.style.data.innerRadius) : currentTheme.pie.style.data.innerRadius,
                    startAngle: config.startAngle ? config.startAngle : 0,
                    endAngle: config.endAngle ? config.endAngle : 360,
                    labels: config.percentage === true ? '' : function (d) {
                        var percentageValue = (d.y / _lodash2.default.sumBy(pieChartData, function (o) {
                            return o.y;
                        }) * 100).toFixed(2);
                        if (percentageValue - Math.floor(percentageValue) === 0.00) {
                            percentageValue = Math.floor(percentageValue);
                        }
                        return d.x + ' :' + d.y + ' (' + percentageValue + '%)';
                    },
                    style: { labels: { fontSize: 6 }, data: { strokeWidth: 0 } },
                    labelRadius: height / 3,
                    events: [{
                        target: 'data',
                        eventHandlers: {
                            onClick: function onClick() {
                                return [{ target: 'data', mutation: _this3.handleMouseEvent }];
                            }
                        }
                    }],
                    animate: config.animate ? { onEnter: { duration: 100 } } : null
                }),
                config.percentage ? _react2.default.createElement(_victory.VictoryLabel, {
                    textAnchor: 'middle',
                    x: '50%',
                    y: '48%',
                    text: Math.round(pieChartData.length > 0 ? pieChartData[0].y : 0) + '%',
                    style: {
                        fontSize: config.labelFontSize || currentTheme.pie.style.presentage.fontSize,
                        fill: config.labelColor || currentTheme.pie.style.labels.fill
                    }
                }) : config.legend === true ? _react2.default.createElement(_LegendComponent2.default, {
                    height: height,
                    width: width,
                    legendItems: pieChartData.map(function (data) {
                        return {
                            name: _this3.trimLegendLabel(16, data.x),
                            fullName: data.x,
                            symbol: data.symbol
                        };
                    }),
                    interaction: function interaction() {},
                    config: config
                }) : null
            );
        }
    }]);

    return ArcChart;
}(_BaseChart3.default);

exports.default = ArcChart;