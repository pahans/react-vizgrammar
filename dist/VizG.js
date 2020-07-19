'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _MapChart = require('./components/MapChart');

var _MapChart2 = _interopRequireDefault(_MapChart);

var _TableChart = require('./components/TableChart');

var _TableChart2 = _interopRequireDefault(_TableChart);

var _NumberChart = require('./components/NumberChart');

var _NumberChart2 = _interopRequireDefault(_NumberChart);

var _InlineChart = require('./components/InlineChart');

var _InlineChart2 = _interopRequireDefault(_InlineChart);

var _VizGError = require('./VizGError');

var _VizGError2 = _interopRequireDefault(_VizGError);

var _LineChart = require('./components/LineChart');

var _LineChart2 = _interopRequireDefault(_LineChart);

var _AreaChart = require('./components/AreaChart');

var _AreaChart2 = _interopRequireDefault(_AreaChart);

var _BarChart = require('./components/BarChart');

var _BarChart2 = _interopRequireDefault(_BarChart);

var _ComposedChart = require('./components/ComposedChart');

var _ComposedChart2 = _interopRequireDefault(_ComposedChart);

var _ArcCharts = require('./components/ArcCharts');

var _ArcCharts2 = _interopRequireDefault(_ArcCharts);

var _ScatterPlot = require('./components/ScatterPlot');

var _ScatterPlot2 = _interopRequireDefault(_ScatterPlot);

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


var VizG = function (_Component) {
    _inherits(VizG, _Component);

    function VizG() {
        _classCallCheck(this, VizG);

        return _possibleConstructorReturn(this, (VizG.__proto__ || Object.getPrototypeOf(VizG)).apply(this, arguments));
    }

    _createClass(VizG, [{
        key: '_getChartComponent',

        /**
         * Function will render a chart based on the given chart.
         * @param {String} chartType Chart type of the chart.
         * @param {Object} config Chart configuration provided by the user
         * @param {Array} data Data provided by the user
         * @param {Object} metadata Metadata related to the data provided
         * @param {Function} onClick OnClick function provided by the user
         * @param {Boolean} manual indicates if the user handle data manually
         * @param {Function} onFetchData function to be executed when fetching data(only for table charts with
         * server-side pagination)
         * @param {Number} pages Total number of pages(only for table charts)
         * @private
         */
        value: function _getChartComponent(chartType, config, data, metadata, onClick, manual, onFetchData, pages) {
            if (chartType === 'spark-line' || chartType === 'spark-area' || chartType === 'spark-bar') chartType = 'inline';

            var component = {
                line: _LineChart2.default,
                area: _AreaChart2.default,
                bar: _BarChart2.default,
                composed: _ComposedChart2.default,
                arc: _ArcCharts2.default,
                scatter: _ScatterPlot2.default,
                table: _TableChart2.default,
                number: _NumberChart2.default,
                inline: _InlineChart2.default,
                map: _MapChart2.default
            };

            if (!component[chartType]) throw new _VizGError2.default('VizG', 'Invalid chart type defined in the configuration.');

            var ChartComponent = component[chartType];

            return _react2.default.createElement(ChartComponent, {
                config: config,
                metadata: metadata,
                data: data,
                onClick: onClick,
                yDomain: this.props.yDomain,
                append: config.append,
                theme: this.props.theme,
                width: this.props.width,
                height: this.props.height

                // table chart specific props
                , manual: manual // to let the component know all the sorting and handling of data will be done by the user
                , onFetchData: onFetchData // function to be executed when fetching data (only when serverside pagination enabled)
                , pages: pages // Total number of pages that will be there in the table(only when serverside pagination enabled)
            });
        }

        /**
         * Check if the chart contains configuration of a mixed chart.
         * @param config
         * @returns {string}
         * @private
         */

    }, {
        key: '_isComposed',
        value: function _isComposed(config) {
            var chartType = config.charts[0].type;
            if ((chartType === 'line' || chartType === 'area' || chartType === 'bar') && config.charts.length > 1) {
                var areaChart = _lodash2.default.find(config.charts, { type: 'area' });
                var barChart = _lodash2.default.find(config.charts, { type: 'bar' });
                var lineChart = _lodash2.default.find(config.charts, { type: 'line' });

                if (!areaChart && !barChart || !lineChart && !areaChart || !barChart && !lineChart) {
                    return chartType;
                } else {
                    return 'composed';
                }
            } else {
                return chartType;
            }
        }
    }, {
        key: 'warningMessage',
        value: function warningMessage(message) {
            return _react2.default.createElement(
                'div',
                {
                    style: {
                        display: 'flex', justifyContent: 'center', background: '#9E9E9E', color: '#000',
                        fontWeight: 500
                    }
                },
                message
            );
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                config = _props.config,
                data = _props.data,
                metadata = _props.metadata,
                onClick = _props.onClick,
                manual = _props.manual,
                onFetchData = _props.onFetchData,
                pages = _props.pages;

            return _react2.default.createElement(
                'div',
                { style: { height: this._isComposed(config) === 'table' ? 'auto' : '100%', width: '100%' } },
                function () {
                    if (!config || !metadata) {
                        return _this2.warningMessage('No configurations available');
                    } else if (typeof data === 'undefined' || !data.length && !manual) {
                        return _this2.warningMessage('No data available');
                    } else {
                        return _this2._getChartComponent(_this2._isComposed(config), config, data, metadata, onClick, manual, onFetchData, pages);
                    }
                }()
            );
        }
    }]);

    return VizG;
}(_react.Component);

VizG.defaultProps = {
    append: true,
    theme: 'light',
    width: 800,
    height: 450,
    manual: false,
    pages: -1
};

VizG.propTypes = {
    config: _propTypes2.default.object.isRequired,
    data: _propTypes2.default.array,
    metadata: _propTypes2.default.object.isRequired,
    onClick: _propTypes2.default.func,
    append: _propTypes2.default.bool,
    theme: _propTypes2.default.string,
    height: _propTypes2.default.number,
    width: _propTypes2.default.number,
    manual: _propTypes2.default.bool,
    onFetchData: _propTypes2.default.func,
    pages: _propTypes2.default.number
};

exports.default = VizG;