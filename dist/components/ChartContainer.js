'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _victory = require('victory');

var _d = require('d3');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _victoryLightTheme = require('./resources/themes/victoryLightTheme');

var _victoryLightTheme2 = _interopRequireDefault(_victoryLightTheme);

var _victoryDarkTheme = require('./resources/themes/victoryDarkTheme');

var _victoryDarkTheme2 = _interopRequireDefault(_victoryDarkTheme);

var _reactTooltip = require('react-tooltip');

var _reactTooltip2 = _interopRequireDefault(_reactTooltip);

var _CustomXaxisLabel = require('./CustomXaxisLabel');

var _CustomXaxisLabel2 = _interopRequireDefault(_CustomXaxisLabel);

var _CustomYaxisLabel = require('./CustomYaxisLabel');

var _CustomYaxisLabel2 = _interopRequireDefault(_CustomYaxisLabel);

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
 * React component that contains the logic for VictoryChart component.
 */
var ChartContainer = function (_React$Component) {
    _inherits(ChartContainer, _React$Component);

    function ChartContainer(props) {
        _classCallCheck(this, ChartContainer);

        var _this = _possibleConstructorReturn(this, (ChartContainer.__proto__ || Object.getPrototypeOf(ChartContainer)).call(this, props));

        _this.state = {
            counter: 0
        };
        return _this;
    }

    _createClass(ChartContainer, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this.setState({ counter: this.state.counter + 1 });
        }
    }, {
        key: 'xAxisTickFormat',
        value: function xAxisTickFormat(xScale, config, isOrdinal, arr) {
            if (xScale === 'time' && config.timeFormat) {
                return function (date) {
                    return (0, _d.timeFormat)(config.timeFormat)(new Date(date));
                };
            } else if (isOrdinal) {
                return function (data) {
                    if (data - Math.floor(data) !== 0) {
                        return '';
                    } else {
                        return Number(data) <= arr.length ? arr[Number(data) - 1].x : data;
                    }
                };
            } else if (xScale === 'linear') {
                return function (data) {
                    if (data % 1 !== 0) {
                        return data;
                    } else {
                        return Number(data).toFixed(0);
                    }
                };
            } else {
                return null;
            }
        }
    }, {
        key: 'yAxisTickFormat',
        value: function yAxisTickFormat() {
            return function (data) {
                if (data % 1 !== 0) {
                    return data;
                } else {
                    return Number(data).toFixed(0);
                }
            };
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                width = _props.width,
                height = _props.height,
                xScale = _props.xScale,
                legendOffset = _props.legendOffset,
                legendItems = _props.legendItems,
                theme = _props.theme,
                config = _props.config,
                horizontal = _props.horizontal,
                disableAxes = _props.disableAxes,
                yDomain = _props.yDomain,
                isOrdinal = _props.isOrdinal,
                dataSets = _props.dataSets,
                barData = _props.barData,
                arcChart = _props.arcChart,
                xDomain = _props.xDomain;

            var currentTheme = theme === 'light' ? _victoryLightTheme2.default : _victoryDarkTheme2.default;
            var maxLegendItems = Math.floor((height - 100) / 25);
            var arr = [];
            var arrTickLabel = [];
            var tickAngle = 0;
            var xDomainValue = xDomain;
            var xAxisPaddingBottom = config.style ? config.style.xAxisPaddingBottom || legendOffset : legendOffset;
            var domainPadding = this.props.domainPadding || 0;

            if (isOrdinal && !(_lodash2.default.findIndex(config.charts, function (o) {
                return o.orientation === 'left';
            }) > -1)) {
                Object.keys(dataSets).forEach(function (e) {
                    dataSets[e].forEach(function (t) {
                        Object.keys(t).forEach(function (k) {
                            if (k === "x") {
                                if (!arrTickLabel.includes(t[k])) {
                                    arrTickLabel.push(t[k]);
                                }
                            }
                        });
                    });
                });
            }

            if (arrTickLabel.toString().length * 7.5 > width - 100) {
                tickAngle = 45;
            }

            if (config.style && config.style.xAxisTickAngle || tickAngle === 45) {
                if (xAxisPaddingBottom === 0 && config.legendOrientation === 'bottom') {
                    xAxisPaddingBottom = 120;
                } else if (xAxisPaddingBottom === 0) {
                    xAxisPaddingBottom = 100;
                } else {
                    xAxisPaddingBottom = xAxisPaddingBottom + 50;
                }
            } else if (xAxisPaddingBottom === 0) {
                if (config.legend === true && config.legendOrientation === 'bottom') {
                    xAxisPaddingBottom = 80;
                } else {
                    xAxisPaddingBottom = 50;
                }
            }

            if (isOrdinal && _lodash2.default.findIndex(config.charts, function (o) {
                return o.type === 'bar';
            }) > -1) {
                arr = dataSets[Object.keys(dataSets)[0]] || [];
            } else if (_lodash2.default.findIndex(config.charts, function (o) {
                return o.type === 'bar';
            }) > -1) {
                var found0 = _lodash2.default.findIndex(_lodash2.default.values(dataSets), function (o) {
                    if (o.length > 0) {
                        return o[0].x === 0;
                    } else {
                        return false;
                    }
                });

                if (found0 > -1 && !horizontal) {
                    var maxOne = null;
                    _lodash2.default.keys(dataSets).forEach(function (key) {
                        var max = _lodash2.default.maxBy(dataSets[key], function (o) {
                            return o.x;
                        });
                        if (!maxOne) maxOne = max.x;else if (maxOne < max) maxOne = max.x;
                    });
                    xDomainValue = [-1, maxOne];
                }
            }

            if (barData) {
                domainPadding = Math.floor(barData.fullBarWidth / 2) + 1;
                domainPadding = domainPadding > 50 ? domainPadding + 30 : domainPadding;
            }

            return _react2.default.createElement(
                'div',
                { style: { width: '100%', height: '100%' } },
                _react2.default.createElement(
                    _victory.VictoryChart,
                    {
                        width: width,
                        height: height,
                        domainPadding: { x: horizontal ? 20 : domainPadding, y: horizontal ? domainPadding : 20 },
                        padding: function () {
                            if (config.legend === true) {
                                if (!config.legendOrientation && legendItems ? legendItems.length < maxLegendItems : false) return {
                                    left: 100, top: 30, bottom: xAxisPaddingBottom, right: 180
                                };else if (config.legendOrientation === 'left') {
                                    return { left: 210, top: 30, bottom: xAxisPaddingBottom, right: 30 };
                                } else if (config.legendOrientation === 'right') {
                                    return { left: 100, top: 30, bottom: xAxisPaddingBottom, right: 180 };
                                } else if (config.legendOrientation === 'top') {
                                    return { left: 100, top: xAxisPaddingBottom, bottom: 50,
                                        right: _lodash2.default.findIndex(config.charts, function (o) {
                                            return o.type === 'arc';
                                        }) > -1 ? 100 : 30 };
                                } else if (config.legendOrientation === 'bottom') {
                                    return { left: 100, top: 30, bottom: xAxisPaddingBottom,
                                        right: _lodash2.default.findIndex(config.charts, function (o) {
                                            return o.type === 'arc';
                                        }) > -1 ? 100 : 30 };
                                } else return { left: 100, top: 30, bottom: xAxisPaddingBottom,
                                    right: _lodash2.default.findIndex(config.charts, function (o) {
                                        return o.type === 'arc';
                                    }) > -1 ? 100 : 30 };
                            } else {
                                return { left: 100, top: 30, bottom: xAxisPaddingBottom,
                                    right: _lodash2.default.findIndex(config.charts, function (o) {
                                        return o.type === 'arc';
                                    }) > -1 ? 100 : 30 };
                            }
                        }(),
                        scale: horizontal ? { x: 'linear', y: xScale } : { x: xScale, y: 'linear' },
                        theme: currentTheme,
                        containerComponent: this.props.disableContainer ? config.brush ? _react2.default.createElement(_victory.VictoryZoomContainer, {
                            dimension: 'x'
                        }) : _react2.default.createElement(_victory.VictoryContainer, null) : config.brush ? _react2.default.createElement(_victory.VictoryZoomContainer, {
                            dimension: 'x'
                        }) : _react2.default.createElement(_victory.VictoryVoronoiContainer, {
                            voronoiDimension: 'x',
                            voronoiBlacklist: ['blacked']
                        }),
                        domain: { x: config.xDomain ? config.xDomain : xDomainValue, y: config.yDomain ? config.yDomain : yDomain },
                        style: { parent: { overflow: 'visible' } }

                    },
                    this.props.children,
                    disableAxes ? [_react2.default.createElement(_victory.VictoryAxis, {
                        key: 'xAxis',
                        crossAxis: true,
                        gridComponent: _react2.default.createElement('g', null),
                        tickComponent: _react2.default.createElement('g', null),
                        tickLabelComponent: _react2.default.createElement('g', null),
                        axisComponent: _react2.default.createElement('g', null)
                    }), _react2.default.createElement(_victory.VictoryAxis, {
                        key: 'yAxis',
                        dependentAxis: true,
                        crossAxis: true,
                        gridComponent: _react2.default.createElement('g', null),
                        tickComponent: _react2.default.createElement('g', null),
                        tickLabelComponent: _react2.default.createElement('g', null),
                        axisComponent: _react2.default.createElement('g', null)
                    })] : [_react2.default.createElement(_victory.VictoryAxis, {
                        key: 'xAxis',
                        crossAxis: true,
                        theme: currentTheme,
                        style: {
                            axis: {
                                stroke: config.style ? config.style.axisColor : currentTheme.axis.style.axis.stroke
                            },
                            axisLabel: {
                                fill: config.style ? config.style.axisLabelColor : currentTheme.axis.style.axisLabel.fill
                            }
                        },
                        gridComponent: config.disableVerticalGrid ? _react2.default.createElement('g', null) : _react2.default.createElement('line', {
                            style: {
                                stroke: config.style ? config.style.gridColor || currentTheme.axis.style.grid.stroke : currentTheme.axis.style.grid.stroke,
                                strokeOpacity: currentTheme.axis.style.grid.strokeOpacity,
                                fill: currentTheme.axis.style.grid.fill
                            }
                        }),
                        label: horizontal ? config.yAxisLabel || (config.charts.length > 1 ? '' : config.charts[0].y) : config.xAxisLabel || config.x,
                        axisLabelComponent: _react2.default.createElement(_victory.VictoryLabel, {
                            dy: config.style && config.style.xAxisTickAngle || tickAngle === 45 ? 50 : 0,
                            style: {
                                fill: config.style ? config.style.axisLabelColor || currentTheme.axis.style.axisLabel.fill : currentTheme.axis.style.axisLabel.fill
                            }
                        }),
                        tickFormat: horizontal ? null : this.xAxisTickFormat(xScale, config, isOrdinal, arr),
                        standalone: false,
                        tickLabelComponent: _react2.default.createElement(_CustomXaxisLabel2.default, {
                            config: config,
                            theme: currentTheme,
                            tickAngle: tickAngle
                        }),
                        tickCount: isOrdinal && config.charts[0].type === 'bar' ? arr.length : config.xAxisTickCount,
                        counter: this.state.counter
                    }), _react2.default.createElement(_victory.VictoryAxis, {
                        key: 'yAxis',
                        dependentAxis: true,
                        crossAxis: true,
                        theme: currentTheme,
                        style: {
                            axis: {
                                stroke: config.style ? config.style.axisColor || currentTheme.axis.style.axis.stroke : currentTheme.axis.style.axis.stroke
                            },
                            axisLabel: {
                                fill: config.style ? config.style.axisLabelColor || currentTheme.axis.style.axisLabel.fill : currentTheme.axis.style.axisLabel.fill
                            }
                        },
                        gridComponent: config.disableHorizontalGrid ? _react2.default.createElement('g', null) : _react2.default.createElement('line', {
                            style: {
                                stroke: config.gridColor || currentTheme.axis.style.grid.stroke,
                                strokeOpacity: currentTheme.axis.style.grid.strokeOpacity,
                                fill: currentTheme.axis.style.grid.fill
                            }
                        }),
                        label: horizontal ? config.xAxisLabel || config.x : config.yAxisLabel || (config.charts.length > 1 ? '' : config.charts[0].y),
                        standalone: false,
                        tickLabelComponent: _react2.default.createElement(_CustomYaxisLabel2.default, {
                            config: config,
                            theme: currentTheme
                        }),
                        tickFormat: !horizontal ? this.yAxisTickFormat() : this.xAxisTickFormat(xScale, config, isOrdinal, arr),
                        axisLabelComponent: _react2.default.createElement(_victory.VictoryLabel, {
                            angle: 0,
                            x: config.legendOrientation === 'left' ? 210 : 100,
                            y: config.legendOrientation === 'top' ? xAxisPaddingBottom : 25
                        }),
                        tickCount: config.yAxisTickCount
                    })]
                ),
                _react2.default.createElement(_reactTooltip2.default, null)
            );
        }
    }]);

    return ChartContainer;
}(_react2.default.Component);

exports.default = ChartContainer;


ChartContainer.defaultProps = {
    yDomain: null,
    xDomain: null,
    children: [],
    disableContainer: false,
    horizontal: false,
    disableAxes: false,
    domainPadding: 0
};

ChartContainer.propTypes = {
    width: _propTypes2.default.number.isRequired,
    height: _propTypes2.default.number.isRequired,
    xScale: _propTypes2.default.string.isRequired,
    yDomain: _propTypes2.default.arrayOf(_propTypes2.default.number),
    xDomain: _propTypes2.default.arrayOf(_propTypes2.default.number),
    domainPadding: _propTypes2.default.number,
    children: _propTypes2.default.arrayOf(_propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.node), _propTypes2.default.node])),
    config: _propTypes2.default.shape({
        x: _propTypes2.default.string,
        charts: _propTypes2.default.arrayOf(_propTypes2.default.shape({
            type: _propTypes2.default.string.isRequired,
            y: _propTypes2.default.string,
            fill: _propTypes2.default.string,
            color: _propTypes2.default.string,
            colorScale: _propTypes2.default.arrayOf(_propTypes2.default.string),
            colorDomain: _propTypes2.default.arrayOf(_propTypes2.default.string),
            mode: _propTypes2.default.string
        })),
        legendOrientation: _propTypes2.default.string,
        style: {
            tickLabelColor: _propTypes2.default.string,
            legendTitleColor: _propTypes2.default.string,
            legendTextColor: _propTypes2.default.string,
            axisColor: _propTypes2.default.string,
            axisLabelColor: _propTypes2.default.string,
            gridColor: _propTypes2.default.string,
            xAxisTickAngle: _propTypes2.default.number,
            yAxisTickAngle: _propTypes2.default.number
        },
        disableVerticalGrid: _propTypes2.default.bool,
        disableHorizontalGrid: _propTypes2.default.bool,
        xAxisLabel: _propTypes2.default.string,
        yAxisLabel: _propTypes2.default.string,
        yAxisTickCount: _propTypes2.default.number,
        xAxisTickCount: _propTypes2.default.number,
        axisTickLength: _propTypes2.default.number,
        height: _propTypes2.default.number,
        width: _propTypes2.default.number,
        maxLength: _propTypes2.default.number
    }).isRequired,
    disableContainer: _propTypes2.default.bool,
    horizontal: _propTypes2.default.bool,
    disableAxes: _propTypes2.default.bool
};