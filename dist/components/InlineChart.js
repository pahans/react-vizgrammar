'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _victory = require('victory');

var _VizGError = require('../VizGError');

var _VizGError2 = _interopRequireDefault(_VizGError);

var _BaseChart2 = require('./BaseChart');

var _BaseChart3 = _interopRequireDefault(_BaseChart2);

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
 * Class to handle visualization of spark charts.
 */
var InlineChart = function (_BaseChart) {
    _inherits(InlineChart, _BaseChart);

    function InlineChart(props) {
        _classCallCheck(this, InlineChart);

        var _this = _possibleConstructorReturn(this, (InlineChart.__proto__ || Object.getPrototypeOf(InlineChart)).call(this, props));

        _this.sortDataBasedOnConfig = _this.sortDataBasedOnConfig.bind(_this);
        return _this;
    }

    _createClass(InlineChart, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                config = _props.config,
                height = _props.height,
                width = _props.width;
            var _state = this.state,
                chartArray = _state.chartArray,
                dataSets = _state.dataSets;

            var chartComponents = [];
            var horizontal = false;
            var lineCharts = [];
            var areaCharts = [];
            var barCharts = [];

            chartArray.map(function (chart, chartIndex) {
                switch (chart.type) {
                    case 'spark-line':
                        Object.keys(chart.dataSetNames).map(function (dataSetName) {
                            lineCharts.push(_react2.default.createElement(
                                _victory.VictoryGroup,
                                {
                                    key: 'chart-' + chart.id + '-' + chart.type + '-' + dataSetName,
                                    data: dataSets[dataSetName],
                                    color: chart.dataSetNames[dataSetName],
                                    height: height,
                                    width: width,
                                    padding: 0,
                                    style: {
                                        data: {
                                            strokeWidth: config.strokeWidth || 0.5
                                        }
                                    }

                                },
                                _react2.default.createElement(_victory.VictoryLine, {
                                    domain: { y: _this2.props.yDomain || null }
                                })
                            ));
                            return null;
                        });
                        break;
                    case 'spark-area':
                        {
                            var areaLocal = [];
                            Object.keys(chart.dataSetNames).map(function (dataSetName) {
                                areaLocal.push(_react2.default.createElement(
                                    _victory.VictoryGroup,
                                    {
                                        key: 'chart-' + chart.id + '-' + chart.type + '-' + dataSetName,
                                        data: dataSets[dataSetName],
                                        style: {
                                            data: {
                                                fillOpacity: config.fillOpacity || 0.5,
                                                strokeWidth: config.strokeWidth || 0.5,
                                                fill: chart.dataSetNames[dataSetName],
                                                stroke: chart.dataSetNames[dataSetName]
                                            }
                                        },
                                        height: height,
                                        width: width,
                                        padding: 0
                                    },
                                    _react2.default.createElement(_victory.VictoryArea, {
                                        domain: { y: _this2.props.yDomain || null }
                                    })
                                ));
                                return null;
                            });

                            if (chart.mode === 'stacked') {
                                areaCharts.push(_react2.default.createElement(
                                    _victory.VictoryStack,
                                    {
                                        height: height,
                                        width: width,
                                        padding: 0
                                    },
                                    areaLocal
                                ));
                            } else {
                                areaCharts = areaCharts.concat(areaLocal);
                            }
                            break;
                        }
                    case 'spark-bar':
                        {
                            var localBar = [];

                            horizontal = horizontal || chart.orientation === 'left';

                            Object.keys(chart.dataSetNames).map(function (dataSetName) {
                                localBar.push(_react2.default.createElement(_victory.VictoryBar, {
                                    labels: function labels(d) {
                                        return config.x + ':' + d.x + '\n' + config.charts[chartIndex].y + ':' + d.y;
                                    },
                                    labelComponent: _react2.default.createElement(_victory.VictoryTooltip, {
                                        orientation: 'bottom'
                                    }),
                                    data: dataSets[dataSetName],
                                    color: chart.dataSetNames[dataSetName],
                                    height: height,
                                    width: width,
                                    padding: 0
                                }));
                                return null;
                            });

                            if (chart.mode === 'stacked') {
                                barCharts.push(_react2.default.createElement(
                                    _victory.VictoryStack,
                                    {
                                        height: height,
                                        width: width,
                                        padding: 0
                                    },
                                    localBar
                                ));
                            } else {
                                barCharts = barCharts.concat(localBar);
                            }
                            break;
                        }
                    default:
                        throw new _VizGError2.default('InlineChart', 'Unsupported chart type defined in the config.');
                }
                return null;
            });

            if (areaCharts.length > 0) chartComponents = chartComponents.concat(areaCharts);
            if (lineCharts.length > 0) chartComponents = chartComponents.concat(lineCharts);
            if (barCharts.length > 0) {
                var barWidth = (horizontal ? height : width) / (config.maxLength * (barCharts.length > 1 ? barCharts.length : 2)) - 3;
                chartComponents.push(_react2.default.createElement(
                    _victory.VictoryGroup,
                    {
                        horizontal: horizontal,
                        offset: barWidth,
                        style: { data: { width: barWidth } },
                        height: height,
                        width: width,
                        padding: 5
                    },
                    barCharts
                ));
            }

            return _react2.default.createElement(
                'div',
                { style: { height: height, width: width } },
                chartComponents
            );
        }
    }]);

    return InlineChart;
}(_BaseChart3.default);

exports.default = InlineChart;


InlineChart.defaultProps = {
    height: 100,
    width: 200
};