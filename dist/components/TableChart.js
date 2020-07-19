'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactTable = require('react-table');

var _reactTable2 = _interopRequireDefault(_reactTable);

var _d = require('d3');

require('react-table/react-table.css');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

require('./resources/css/tableChart.css');

var _helper = require('./helper');

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

var DAFAULT_ROW_COUNT_FOR_PAGINATION = 5;

/**
 * Class to handle visualization of table charts.
 */

var TableChart = function (_BaseChart) {
    _inherits(TableChart, _BaseChart);

    function TableChart(props) {
        _classCallCheck(this, TableChart);

        var _this = _possibleConstructorReturn(this, (TableChart.__proto__ || Object.getPrototypeOf(TableChart)).call(this, props));

        _this.state = {
            dataSets: [],
            chartArray: [],
            initialized: false,
            filterValue: '',
            number: 0,
            selected: null,
            loading: props.manual // for loading animation when server-side pagination enabled
        };

        _this.chartConfig = props.config;

        _this.sortDataBasedOnConfig = _this.sortDataBasedOnConfig.bind(_this);
        _this._getLinearColor = _this._getLinearColor.bind(_this);
        _this.idColumn = _this.uuidv4();
        return _this;
    }

    _createClass(TableChart, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (this.props.config && this.props.metadata) {
                this.sortDataBasedOnConfig(this.props);
            }
        }
    }, {
        key: 'handleRowSelect',
        value: function handleRowSelect(e, row) {
            var onClick = this.props.onClick;


            this.setState({ selected: row.original[this.idColumn] });

            return onClick && onClick(row.original);
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (!this.chartConfig || !_lodash2.default.isEqual(nextProps.config, this.chartConfig) || !this.props.append) {
                this.state.initialized = false;
                this.state.dataSets = [];
                this.state.chartArray = [];
                this.state.selected = null;
                this.chartConfig = nextProps.config;
            }

            this.setState({ loading: false });
            this.sortDataBasedOnConfig(nextProps);
        }
    }, {
        key: 'sortDataBasedOnConfig',
        value: function sortDataBasedOnConfig(props) {
            var _this2 = this;

            var config = props.config,
                metadata = props.metadata,
                data = props.data;
            var _state = this.state,
                dataSets = _state.dataSets,
                chartArray = _state.chartArray,
                initialized = _state.initialized,
                number = _state.number;


            var key = config.charts[0].uniquePropertyColumn;

            data = data.map(function (d) {
                var tmp = {};
                for (var i = 0; i < metadata.names.length; i++) {
                    tmp[metadata.names[i]] = d[i];
                }
                tmp[_this2.idColumn] = number++;
                return tmp;
            });

            if (key) {
                dataSets = _lodash2.default.unionBy(dataSets, data, key);
            } else {
                dataSets = dataSets.concat(data);
            }

            while (dataSets.length > config.maxLength) {
                dataSets.shift();
            }

            config.charts.forEach(function (chart) {
                chart.columns.forEach(function (column, i) {
                    var colIndex = _lodash2.default.indexOf(metadata.names, column.name);

                    if (colIndex === -1) {
                        throw new _VizGError2.default('TableChart', 'Unknown column name defined in the chart config.');
                    }

                    if (!initialized) {
                        chartArray.push({
                            name: column.name,
                            title: column.title || column.name,
                            highLight: !!column.highlight,
                            colorBasedStyle: column.colorBasedStyle,
                            colorScale: column.colorBasedStyle === true ? column.colorScale || (0, _helper.getDefaultColorScale)() : undefined,
                            colorDomain: column.colorDomain,
                            isTime: metadata.types[colIndex].toLowerCase() === 'time',
                            colorIndex: 0,
                            timeFormat: column.timeFormat,
                            textColor: column.textColor
                        });
                    }

                    if (column.colorBasedStyle === true) {
                        if (metadata.types[colIndex].toLowerCase() === 'linear' || metadata.types[colIndex].toLowerCase() === 'time') {
                            var max = _lodash2.default.max(dataSets.map(function (datum) {
                                return datum[metadata.names[colIndex]];
                            }));
                            var min = _lodash2.default.min(dataSets.map(function (datum) {
                                return datum[metadata.names[colIndex]];
                            }));

                            if (!Object.prototype.hasOwnProperty.call(chartArray[i], 'range')) {
                                chartArray[i].range = [min, max];
                            } else if (!_lodash2.default.isEqual(chartArray[i].range, [min, max])) {
                                chartArray[i].range = [min, max];
                            }
                        } else {
                            if (!Object.prototype.hasOwnProperty.call(chartArray[i], 'colorMap')) {
                                chartArray[i].colorIndex = 0;
                                chartArray[i].colorMap = {};
                            }

                            _lodash2.default.map(dataSets, column.name).forEach(function (category) {
                                if (!Object.prototype.hasOwnProperty.call(chartArray[i].colorMap, category)) {
                                    if (chartArray[i].colorIndex >= chartArray[i].colorScale.length) {
                                        chartArray[i].colorIndex = 0;
                                    }

                                    if (column.colorDomain) {
                                        var domainIndex = _lodash2.default.indexOf(column.colorDomain, category);

                                        if (domainIndex >= 0 && domainIndex < chartArray[i].colorScale.length) {
                                            chartArray[i].colorMap[category] = chartArray[i].colorScale[domainIndex];
                                        } else {
                                            chartArray[i].colorMap[category] = chartArray[i].colorScale[chartArray[i].colorIndex++];
                                        }
                                    } else {
                                        chartArray[i].colorMap[category] = chartArray[i].colorScale[chartArray[i].colorIndex++];
                                    }
                                }
                            });
                        }
                    }
                });
            });

            initialized = true;

            this.setState({ dataSets: dataSets, chartArray: chartArray, initialized: initialized, number: number });
        }
    }, {
        key: '_getLinearColor',
        value: function _getLinearColor(color, range, value) {
            return (0, _d.scaleLinear)().range(['#fff', color]).domain(range)(value);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var _props = this.props,
                config = _props.config,
                metadata = _props.metadata,
                manual = _props.manual,
                _onFetchData = _props.onFetchData,
                pages = _props.pages;
            var _state2 = this.state,
                dataSets = _state2.dataSets,
                chartArray = _state2.chartArray,
                filterValue = _state2.filterValue,
                selected = _state2.selected;


            var tableConfig = chartArray.map(function (column) {
                var columnConfig = {
                    Header: column.title,
                    accessor: column.name,
                    getProps: function getProps(state, rowInfo) {
                        return column.highLight && typeof config.dataFunction === 'function' ? config.dataFunction(state, rowInfo) : '';
                    }
                };

                if (column.colorBasedStyle === true) {
                    columnConfig.Cell = function (props) {
                        return _react2.default.createElement(
                            'div',
                            {
                                style: {
                                    width: '100%',
                                    backgroundColor: props.original[_this3.idColumn] === selected ? config.selectedBackground || '#4286f4' : column.range ? _this3._getLinearColor(column.colorScale[column.colorIndex], column.range, props.value) : column.colorMap[props.value],
                                    margin: 0,
                                    textAlign: metadata.types[metadata.names.indexOf(props.column.id)] === 'linear' || metadata.types[metadata.names.indexOf(props.column.id)] === 'time' ? 'right' : 'left',
                                    borderRight: '1px solid rgba(0,0,0,0.02)'
                                }
                            },
                            _react2.default.createElement(
                                'span',
                                {
                                    style: {
                                        color: column.textColor || null,
                                        width: '100%'
                                    }
                                },
                                column.isTime && column.timeFormat ? (0, _d.timeFormat)(column.timeFormat)(props.value) : props.value
                            )
                        );
                    };
                } else {
                    columnConfig.Cell = function (props) {
                        return _react2.default.createElement(
                            'div',
                            {
                                className: _this3.props.theme === 'light' ? 'rt-td' : 'cell-data',
                                style: {
                                    background: props.original[_this3.idColumn] === selected ? config.selectedBackground || '#4286f4' : null,
                                    color: config.selectedTextColor || null,
                                    width: '100%',
                                    textAlign: metadata.types[metadata.names.indexOf(props.column.id)] === 'linear' || metadata.types[metadata.names.indexOf(props.column.id)] === 'time' ? 'right' : 'left'
                                }
                            },
                            _react2.default.createElement(
                                'span',
                                {
                                    style: {
                                        width: '100%'
                                    }
                                },
                                column.isTime && column.timeFormat ? (0, _d.timeFormat)(column.timeFormat)(props.value) : props.value
                            )
                        );
                    };
                }

                return columnConfig;
            });

            var filteredData = _lodash2.default.filter(dataSets, function (obj) {
                return _lodash2.default.values(obj).toString().toLowerCase().includes(filterValue.toLowerCase());
            });

            var manualProps = {};

            if (manual) {
                manualProps = {
                    onFetchData: function onFetchData(state, instance) {
                        _this3.setState({ loading: true });
                        return _onFetchData(state, instance);
                    },
                    pages: pages
                };
            }
            var sortable = true;
            if (config.sortable === false) {
                sortable = false;
            }

            return _react2.default.createElement(
                'div',
                null,
                config.filterable ? _react2.default.createElement(
                    'div',
                    { className: this.props.theme === 'light' ? 'lightTheme filter-search-container' : 'darkTheme filter-search-container' },
                    _react2.default.createElement('input', {
                        className: this.props.theme === 'light' ? 'lightTheme filter-search' : 'darkTheme filter-search',
                        type: 'text',
                        onChange: function onChange(evt) {
                            _this3.setState({ filterValue: evt.target.value });
                        },
                        placeholder: 'Enter value to filter data'
                    })
                ) : null,
                _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(_reactTable2.default, _extends({
                        data: filteredData,
                        columns: tableConfig,
                        showPagination: config.pagination === true,
                        sortable: sortable,
                        minRows: DAFAULT_ROW_COUNT_FOR_PAGINATION,
                        className: this.props.theme === 'light' ? 'lightTheme' : 'darkTheme',
                        getTrProps: function getTrProps(state, rowInfo) {
                            return {
                                onClick: function onClick(e) {
                                    return _this3.handleRowSelect(e, rowInfo);
                                }
                            };
                        },
                        defaultPageSize: config.pagination === true ? DAFAULT_ROW_COUNT_FOR_PAGINATION : config.maxLength,
                        manual: manual
                    }, manualProps, {
                        loading: this.state.loading
                    }))
                )
            );
        }
    }, {
        key: 'uuidv4',
        value: function uuidv4() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0,
                    v = c == 'x' ? r : r & 0x3 | 0x8;
                return v.toString(16);
            });
        }
    }]);

    return TableChart;
}(_BaseChart3.default);

exports.default = TableChart;