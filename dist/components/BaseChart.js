'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _VizGError = require('../VizGError');

var _VizGError2 = _interopRequireDefault(_VizGError);

var _helper = require('./helper');

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
 * Base Chart that contain most common methods that requires for the charts.
 */
var BaseChart = function (_React$Component) {
    _inherits(BaseChart, _React$Component);

    _createClass(BaseChart, null, [{
        key: 'getXScale',

        /**
         * returns which x scale to be used for the current chart based on the metadata type.
         * @param {String} type - type defined in the metadata one of values 'linear', 'ordinal', or 'time'
         * @returns {string} type of the xScale that should be used in the chart.
         */
        value: function getXScale(type) {
            switch (type.toLowerCase()) {
                case 'linear':
                    return 'linear';
                case 'ordinal':
                    return 'ordinal';
                default:
                    return 'time';
            }
        }

        /**
         * returns a dataSet object that contains arrays not longer than maxLength provided
         * @param {Object} dataSets
         * @param {number} maxLength
         * @returns {*}
         */

    }, {
        key: 'trimDataSet',
        value: function trimDataSet(dataSets, maxLength) {
            _lodash2.default.keys(_lodash2.default.pickBy(dataSets, function (obj) {
                return obj.length > maxLength;
            })).forEach(function (key) {
                var lengthDiff = dataSets[key].length - maxLength;
                dataSets[key].splice(0, lengthDiff);
            });

            return dataSets;
        }

        /**
         * Generates an array of objects containing chart information that needed to be plotted.
         * @param {Array} charts - Charts array provided in the config.
         * @returns {Array} - Array of objects containing chart information that needed to be plotted
         */

    }, {
        key: 'generateChartArray',
        value: function generateChartArray(charts) {
            return charts.map(function (chart, chartIndex) {
                return {
                    type: chart.type,
                    dataSetNames: {},
                    mode: chart.mode,
                    orientation: chart.orientation || 'bottom',
                    color: Object.prototype.hasOwnProperty.call(chart, 'color'),
                    colorCategoryName: chart.color || '',
                    colorScale: Array.isArray(chart.colorScale) ? chart.colorScale : (0, _helper.getDefaultColorScale)(),
                    colorDomain: chart.colorDomain || [],
                    colorIndex: chartIndex,
                    id: chartIndex,
                    y: chart.y,
                    x: chart.x,
                    size: chart.size
                };
            });
        }
    }]);

    function BaseChart(props) {
        _classCallCheck(this, BaseChart);

        var _this = _possibleConstructorReturn(this, (BaseChart.__proto__ || Object.getPrototypeOf(BaseChart)).call(this, props));

        _this.state = {
            chartArray: [],
            dataSets: {},
            xScale: 'linear',
            ignoreArray: [],
            isOrdinal: false,
            stacked: false,
            xAxisRange: [null, null],
            xAxisType: 'linear'
        };

        _this.chartConfig = _this.props.config;

        _this.sortDataBasedOnConfig = _this.sortDataBasedOnConfig.bind(_this);
        return _this;
    }

    _createClass(BaseChart, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.sortDataBasedOnConfig(this.props);
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var config = nextProps.config;


            if (!this.chartConfig || !_lodash2.default.isEqual(config, this.chartConfig) || !this.props.append) {
                this.state.chartArray = [];
                this.state.dataSets = {};
                this.chartConfig = config;
            }

            this.sortDataBasedOnConfig(nextProps);
        }

        /**
         * Event handler for mouse events
         * @param evt - event associated with the interaction.
         * @returns {*}
         */

    }, {
        key: 'handleMouseEvent',
        value: function handleMouseEvent(props) {
            var onClick = this.props.onClick;

            var data = {};

            data[this.chartConfig.x] = props.datum.x;
            data[props.datum.yName] = props.datum.y;
            data.colorCategory = props.datum.color;

            return onClick && onClick(data);
        }

        /**
         * Event handler for onClick events of names shown in the legend.
         * @param props
         */

    }, {
        key: 'handleLegendInteraction',
        value: function handleLegendInteraction(props) {
            var ignoreArray = this.state.ignoreArray;


            var ignoreIndex = _lodash2.default.indexOf(ignoreArray, props.datum.name);
            if (ignoreIndex < 0) {
                ignoreArray.push(props.datum.name);
            } else {
                ignoreArray.splice(ignoreIndex, 1);
            }

            this.state.ignoreArray = ignoreArray;

            this.forceUpdate();
        }

        /**
         * Sort and set the state with data received from props.
         * @param props - props received by the component.
         */

    }, {
        key: 'sortDataBasedOnConfig',
        value: function sortDataBasedOnConfig(props) {
            var config = props.config,
                metadata = props.metadata,
                data = props.data;
            var _state = this.state,
                chartArray = _state.chartArray,
                dataSets = _state.dataSets,
                xScale = _state.xScale,
                isOrdinal = _state.isOrdinal,
                xAxisType = _state.xAxisType;
            // generate chart array from the config.

            if (chartArray.length === 0) chartArray = BaseChart.generateChartArray(config.charts);

            var xIndex = metadata.names.indexOf(config.x);
            if (_lodash2.default.keys(dataSets).length === 0) {
                if (!isOrdinal) isOrdinal = metadata.types[xIndex].toLowerCase() === 'ordinal';
                xScale = BaseChart.getXScale(metadata.types[xIndex]);
                xAxisType = metadata.types[xIndex];
            }
            if (xScale !== BaseChart.getXScale(metadata.types[xIndex])) {
                throw (0, _VizGError2.default)('BasicChart', "Provided metadata doesn't match the previous metadata.");
            }

            var dataSet = {};

            chartArray.forEach(function (chart) {
                var yIndex = metadata.names.indexOf(chart.y);
                var colorIndex = metadata.names.indexOf(chart.colorCategoryName);

                if (xIndex < 0 || yIndex < 0) {
                    throw new _VizGError2.default('BasicChart', 'Axis name not found in metadata');
                }

                if (chart.color) {
                    if (colorIndex < 0) {
                        throw new _VizGError2.default('BasicChart', 'Color category not found in metadata.');
                    }
                    dataSet = _lodash2.default.groupBy(data.map(function (datum) {
                        return {
                            x: datum[xIndex] instanceof Date ? datum[xIndex].getTime() : datum[xIndex],
                            y: datum[yIndex],
                            color: datum[colorIndex],
                            yName: metadata.names[yIndex]
                        };
                    }), function (d) {
                        return d.color;
                    });

                    _lodash2.default.difference(_lodash2.default.keys(dataSet), _lodash2.default.keys(chart.dataSetNames)).forEach(function (key) {
                        var colorDomIn = _lodash2.default.indexOf(chart.colorDomain, key);
                        if (chart.colorIndex >= chart.colorScale.length) {
                            chart.colorIndex = 0;
                        }
                        if (colorDomIn < 0) {
                            chart.dataSetNames[key] = chart.colorScale[chart.colorIndex++];
                        } else if (colorDomIn > chart.colorScale.length) {
                            chart.dataSetNames[key] = chart.colorScale[0];
                        } else {
                            chart.dataSetNames[key] = chart.colorScale[colorDomIn];
                        }
                    });
                } else {
                    dataSet[chart.y] = data.map(function (datum) {
                        return { x: datum[xIndex], y: datum[yIndex], yName: chart.y };
                    });
                    chart.dataSetNames[chart.y] = config.charts[chart.id].fill || chart.colorScale[chart.colorIndex];
                }
            });

            this.setState(function (prevState) {
                var _prevState$chartArray;

                (_prevState$chartArray = prevState.chartArray).push.apply(_prevState$chartArray, _toConsumableArray(_lodash2.default.differenceWith(chartArray, prevState.chartArray, _lodash2.default.isEqual)));
                if (!isOrdinal) {
                    if (_lodash2.default.isEmpty(prevState.dataSets) || !_lodash2.default.isEqual(_lodash2.default.sortBy(prevState.dataSets), _lodash2.default.sortBy(dataSet))) {
                        _lodash2.default.mergeWith(prevState.dataSets, dataSet, function (objValue, srcValue) {
                            if (_lodash2.default.isArray(objValue)) {
                                return objValue.concat(srcValue);
                            }
                        });
                    }
                } else {
                    _lodash2.default.keys(dataSet).forEach(function (key) {
                        prevState.dataSets[key] = prevState.dataSets[key] || [];
                        dataSet[key].forEach(function (datum) {
                            var objIndex = _lodash2.default.findIndex(prevState.dataSets[key], function (obj) {
                                return obj.x === datum.x;
                            });
                            if (objIndex > -1) {
                                prevState.dataSets[key][objIndex].y = datum.y;
                            } else {
                                prevState.dataSets[key].push(datum);
                            }
                        });
                    });
                }

                _lodash2.default.keys(prevState.dataSets).forEach(function (key) {
                    return _lodash2.default.sortBy(prevState.dataSets[key], function (o) {
                        return o.x;
                    });
                });
                if (config.maxLength) BaseChart.trimDataSet(prevState.dataSets, config.maxLength);
                prevState.isOrdinal = isOrdinal;
                prevState.xScale = xScale;

                if (!isOrdinal) {
                    var range = [null, null];

                    Object.keys(prevState.dataSets).forEach(function (key) {
                        var dataSetRange = [];
                        dataSetRange[0] = _lodash2.default.minBy(prevState.dataSets[key], 'x');
                        dataSetRange[1] = _lodash2.default.maxBy(prevState.dataSets[key], 'x');

                        if (dataSetRange[0]) {
                            dataSetRange[0] = dataSetRange[0].x;
                        }
                        if (dataSetRange[1]) {
                            dataSetRange[1] = dataSetRange[1].x;
                        }
                        if (!range[0]) {
                            range = dataSetRange;
                        } else {
                            if (dataSetRange[0] < range[0]) {
                                range[0] = dataSetRange[0];
                            }

                            if (dataSetRange[1] > range[1]) {
                                range[1] = dataSetRange[1];
                            }
                        }
                    });

                    prevState.xAxisRange = range;
                }

                prevState.xAxisType = xAxisType;

                return prevState;
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement('div', null);
        }
    }]);

    return BaseChart;
}(_react2.default.Component);

exports.default = BaseChart;


BaseChart.defaultProps = {
    width: 800,
    height: 400,
    onClick: null,
    yDomain: null,
    append: true
};

BaseChart.propTypes = {
    width: _propTypes2.default.number,
    height: _propTypes2.default.number,
    onClick: _propTypes2.default.func,
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
        height: _propTypes2.default.number,
        width: _propTypes2.default.number,
        maxLength: _propTypes2.default.number
    }).isRequired,
    yDomain: _propTypes2.default.arrayOf(_propTypes2.default.number),
    append: _propTypes2.default.bool
};