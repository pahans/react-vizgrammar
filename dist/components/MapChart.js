'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactSimpleMaps = require('react-simple-maps');

var _victory = require('victory');

var _reactTooltip = require('react-tooltip');

var _reactTooltip2 = _interopRequireDefault(_reactTooltip);

var _d = require('d3');

var d3 = _interopRequireWildcard(_d);

var _feature = require('topojson-client/src/feature');

var _feature2 = _interopRequireDefault(_feature);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _helper = require('./helper');

var _MapData = require('./resources/MapData');

var _VizGError = require('../VizGError');

var _VizGError2 = _interopRequireDefault(_VizGError);

require('./resources/css/map-chart.css');

var _victoryLightTheme = require('./resources/themes/victoryLightTheme');

var _victoryLightTheme2 = _interopRequireDefault(_victoryLightTheme);

var _victoryDarkTheme = require('./resources/themes/victoryDarkTheme');

var _victoryDarkTheme2 = _interopRequireDefault(_victoryDarkTheme);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

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

var USA_YOFFSET_FACTOR = 2;
var USA_XOFFSET_FACTOR = 0.8;
var USA_PROJECTION_SCALE = 600;
var EUROPE_PROJECTION_SCALE = 350;
var EUROPE_YOFFSET_FACTOR = 2;
var WORLD_PROJECTION_SCALE = 80;

var MapGenerator = function (_React$Component) {
    _inherits(MapGenerator, _React$Component);

    function MapGenerator(props) {
        _classCallCheck(this, MapGenerator);

        var _this = _possibleConstructorReturn(this, (MapGenerator.__proto__ || Object.getPrototypeOf(MapGenerator)).call(this, props));

        _this.state = {
            mapData: [],
            markerData: [],
            config: props.config,
            projectionConfig: {},
            mapType: props.config.charts[0].mapType || 'world',
            mapDataRange: [],
            colorType: 'linear',
            ordinalColorMap: {},
            colorIndex: 0,
            colorScale: []
        };
        _this.chartConfig = null;
        _this._handleMouseEvent = _this._handleMouseEvent.bind(_this);
        return _this;
    }

    _createClass(MapGenerator, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _props = this.props,
                metadata = _props.metadata,
                config = _props.config;


            if (metadata !== null && config !== null) {
                this.chartConfig = config;
                this._handleDataReceived(this.props);
            }
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var config = nextProps.config;


            if (!this.chartConfig || !_lodash2.default.isEqual(config, this.chartConfig) || !(this.chartConfig.append === false)) {
                this.chartConfig = config;
                this.state.mapData = [];
                this.state.projectionConfig = {};
                this.state.mapType = nextProps.config.charts[0].mapType || 'world';
                this.state.mapDataRange = [];
                this.state.colorType = 'linear';
                this.state.ordinalColorMap = {};
                this.state.colorIndex = 0;
                this.state.colorScale = [];
            }
            this._handleDataReceived(nextProps);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.setState({});
        }
    }, {
        key: '_handleMouseEvent',
        value: function _handleMouseEvent(evt) {
            var onClick = this.props.onClick;
            var mapData = this.state.mapData;

            var data = mapData.filter(function (d) {
                return d.x === evt.id;
            })[0];
            var dat = {};
            if (data) {
                dat = {};
                dat[data.x] = data.y;
                return onClick && onClick(dat);
            }
        }

        /**
         * This function converts the country name into
         * Alpha - 3 code in case a whole country name is given
         *
         * @param countryName
         * @private
         */

    }, {
        key: '_convertCountryNamesToCode',
        value: function _convertCountryNamesToCode(countryName) {
            if (countryName.length === 3) {
                return countryName;
            } else {
                var countryName1 = _MapData.CountryInfo.filter(function (x) {
                    return x.name === countryName;
                });
                if (countryName1.length > 0) {
                    return countryName1[0]['alpha-3'];
                } else {
                    return countryName;
                }
            }
        }
    }, {
        key: '_getLinearColor',
        value: function _getLinearColor(value) {
            return d3.scaleLinear().range([this.state.colorScale[0], this.state.colorScale[1]]).domain(this.state.mapDataRange)(value);
        }

        /**
         * handles the data received by the component to render the map
         * @param props - current props of the component
         * @private
         */

    }, {
        key: '_handleDataReceived',
        value: function _handleDataReceived(props) {
            var _this2 = this;

            var metadata = props.metadata,
                data = props.data,
                config = props.config;
            var _state = this.state,
                projectionConfig = _state.projectionConfig,
                mapType = _state.mapType,
                mapDataRange = _state.mapDataRange,
                mapData = _state.mapData,
                colorType = _state.colorType,
                ordinalColorMap = _state.ordinalColorMap,
                colorIndex = _state.colorIndex,
                colorScale = _state.colorScale;

            var mapConfig = config.charts[0];
            var xIndex = metadata.names.indexOf(config.x);
            var yIndex = metadata.names.indexOf(mapConfig.y);

            if (xIndex === -1) {
                throw new _VizGError2.default('MapChart', "Unknown 'x' field is defined in the Geographical chart configuration.");
            }

            if (yIndex === -1) {
                throw new _VizGError2.default('MapChart', "Unknown 'y' field is defined in the Geographical chart configuration.");
            }

            colorScale = Array.isArray(mapConfig.colorScale) ? mapConfig.colorScale : (0, _helper.getDefaultColorScale)();
            mapType = mapConfig.mapType;
            switch (mapConfig.mapType) {
                case 'world':
                    projectionConfig.scale = WORLD_PROJECTION_SCALE;
                    break;
                case 'usa':
                    projectionConfig.scale = USA_PROJECTION_SCALE;
                    projectionConfig.yOffset = 800 / USA_YOFFSET_FACTOR;
                    projectionConfig.xOffset = 800 / USA_XOFFSET_FACTOR;
                    break;
                case 'europe':
                    projectionConfig.scale = EUROPE_PROJECTION_SCALE;
                    projectionConfig.yOffset = 800 / EUROPE_YOFFSET_FACTOR;
                    break;
                default:
                    throw new _VizGError2.default('MapChart', 'Unknown chart type defined in the Geographical chart config.');
            }
            colorType = metadata.types[yIndex].toLowerCase();
            if (metadata.types[yIndex].toLowerCase() === 'linear') {
                data.forEach(function (datum) {
                    var dataIndex = mapData.findIndex(function (obj) {
                        return obj.x === _this2._convertCountryNamesToCode(datum[xIndex]);
                    });
                    if (dataIndex >= 0) {
                        mapData[dataIndex].y = datum[yIndex];
                    } else {
                        mapData.push({
                            givenName: datum[xIndex],
                            x: mapType === 'usa' ? datum[xIndex] : _this2._convertCountryNamesToCode(datum[xIndex]),
                            y: datum[yIndex]
                        });
                    }
                });

                var chloropethMaxVal = config.chloropethRangeUpperbound || (mapData.length > 0 ? _lodash2.default.maxBy(mapData, function (obj) {
                    return obj.y;
                }).y : 0);
                var chloropethMinVal = config.chloropethRangeLowerbound || (mapData.length > 0 ? _lodash2.default.minBy(mapData, function (obj) {
                    return obj.y;
                }).y : 0);

                mapDataRange = [chloropethMinVal, chloropethMaxVal];
            } else {
                data.forEach(function (datum) {
                    if (!ordinalColorMap.hasOwnProperty(datum[yIndex])) {
                        if (colorIndex >= colorScale.length) {
                            colorIndex = 0;
                        }
                        ordinalColorMap[datum[yIndex]] = colorScale[colorIndex++];
                    }

                    mapData.push({
                        givenName: datum[xIndex],
                        x: mapType === 'usa' ? datum[xIndex] : _this2._convertCountryNamesToCode(datum[xIndex]),
                        y: datum[yIndex]
                    });
                });
            }

            this.setState({
                projectionConfig: projectionConfig,
                mapType: mapType,
                mapData: mapData,
                mapDataRange: mapDataRange,
                colorType: colorType,
                ordinalColorMap: ordinalColorMap,
                colorIndex: colorIndex,
                colorScale: colorScale
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var _props2 = this.props,
                config = _props2.config,
                theme = _props2.theme;
            var _state2 = this.state,
                mapType = _state2.mapType,
                mapData = _state2.mapData,
                mapDataRange = _state2.mapDataRange,
                colorType = _state2.colorType,
                ordinalColorMap = _state2.ordinalColorMap;

            var currentTheme = theme === 'light' ? _victoryLightTheme2.default : _victoryDarkTheme2.default;
            var mapFeatureData = null;
            switch (mapType) {
                case 'world':
                    mapFeatureData = _MapData.WorldMap;
                    break;
                case 'usa':
                    mapFeatureData = _MapData.USAMap;
                    break;
                case 'europe':
                    mapFeatureData = _MapData.EuropeMap;
                    break;
                default:
                    throw new _VizGError2.default('MapChart', 'Unknown maptype defined in the config');
            }

            return _react2.default.createElement(
                'div',
                { style: { overflow: 'hidden', height: '100%', display: 'flex' } },
                _react2.default.createElement(
                    'div',
                    {
                        style: {
                            width: '85%',
                            height: '100%'
                        }
                    },
                    _react2.default.createElement(
                        _reactSimpleMaps.ComposableMap,
                        {
                            projection: 'mercator',
                            projectionConfig: this.state.projectionConfig,
                            width: this.state.width,
                            heght: this.state.height,
                            style: {
                                width: '100%',
                                height: '100%'
                            }
                        },
                        _react2.default.createElement(
                            _reactSimpleMaps.Geographies,
                            {
                                geographyPaths: (0, _feature2.default)(mapFeatureData, mapFeatureData.objects[Object.keys(mapFeatureData.objects)[0]]).features,
                                disableOptimization: true
                            },
                            function (geographies, projection) {
                                return geographies.map(function (geography, i) {
                                    var dataTip = '';
                                    var toolTip = null;

                                    if (mapType === 'usa') {
                                        dataTip = mapData.filter(function (x) {
                                            return x.x === geography.properties.name;
                                        });
                                    } else {
                                        dataTip = mapData.filter(function (x) {
                                            return x.x === geography.id;
                                        });
                                    }
                                    if (dataTip.length > 0) {
                                        toolTip = '' + config.x + ' : ' + dataTip[0].givenName + ', ' + config.charts[0].y + ' : ' + dataTip[0].y;
                                    }

                                    return _react2.default.createElement(_reactSimpleMaps.Geography, {
                                        key: i,
                                        'data-tip': toolTip ? toolTip.toString() : '',
                                        geography: geography,
                                        projection: projection,
                                        style: {
                                            default: {
                                                fill: dataTip.length > 0 ? colorType === 'linear' ? _this3._getLinearColor(dataTip[0].y) : ordinalColorMap[dataTip[0].y] : currentTheme.map.style.default.fill,
                                                stroke: currentTheme.map.style.default.stroke,
                                                strokeWidth: currentTheme.map.style.default.strokeWidth,
                                                outline: currentTheme.map.style.default.outline
                                            },
                                            hover: {
                                                fill: dataTip.length > 0 ? colorType === 'linear' ? _this3._getLinearColor(dataTip[0].y) : ordinalColorMap[dataTip[0].y] : currentTheme.map.style.hover.fill,
                                                stroke: currentTheme.map.style.hover.stroke,
                                                opacity: currentTheme.map.style.hover.opacity,
                                                strokeWidth: currentTheme.map.style.hover.strokeWidth,
                                                outline: currentTheme.map.style.hover.outline
                                            },
                                            pressed: {
                                                fill: currentTheme.map.style.pressed.fill,
                                                outline: currentTheme.map.style.pressed.outline
                                            }
                                        },
                                        onClick: _this3._handleMouseEvent
                                    });
                                });
                            }
                        )
                    ),
                    _react2.default.createElement(_reactTooltip2.default, { 'class': 'fontClass' })
                ),
                mapData.length > 0 ? _react2.default.createElement(
                    'div',
                    { style: { width: '15%', height: '100%' } },
                    colorType === 'linear' ? _react2.default.createElement(
                        'svg',
                        { width: '100%', height: '100%' },
                        _react2.default.createElement(
                            'defs',
                            null,
                            _react2.default.createElement(
                                'linearGradient',
                                { id: 'grad1', x1: '0%', y1: '100%', x2: '0%', y2: '0%' },
                                _react2.default.createElement('stop', { offset: '0%', stopColor: this.state.colorScale[0], stopOpacity: 1 }),
                                _react2.default.createElement('stop', { offset: '100%', stopColor: this.state.colorScale[1], stopOpacity: 1 })
                            )
                        ),
                        _react2.default.createElement(
                            'g',
                            { className: 'legend' },
                            _react2.default.createElement(
                                'text',
                                {
                                    style: {
                                        fill: config.style ? config.style.legendTitleColor || currentTheme.map.style.labels.title.fill : currentTheme.map.style.labels.title.fill,
                                        fontSize: config.style ? config.style.legendTitleSize || currentTheme.map.style.labels.title.fontSize : currentTheme.map.style.labels.title.fontSize
                                    },
                                    x: 20,
                                    y: 20
                                },
                                config.charts[0].y
                            ),
                            _react2.default.createElement(
                                'text',
                                {
                                    style: {
                                        fill: config.style ? config.style.legendTextColor || currentTheme.map.style.labels.legend.fill : currentTheme.map.style.labels.legend.fill,
                                        fontSize: config.style ? config.style.legendTextSize || currentTheme.map.style.labels.legend.fontSize : currentTheme.map.style.labels.legend.fontSize
                                    },
                                    x: 37,
                                    y: 37
                                },
                                this.state.mapDataRange[1]
                            ),
                            _react2.default.createElement(
                                'text',
                                {
                                    style: {
                                        fill: config.style ? config.style.legendTextColor || currentTheme.map.style.labels.legend.fill : currentTheme.map.style.labels.legend.fill,
                                        fontSize: config.style ? config.style.legendTextSize || currentTheme.map.style.labels.legend.fontSize : currentTheme.map.style.labels.legend.fontSize
                                    },
                                    x: 37,
                                    y: 132
                                },
                                this.state.mapDataRange[0]
                            ),
                            _react2.default.createElement('rect', { x: 20, y: 30, fill: 'url(#grad1)', height: 100, width: 15 })
                        )
                    ) : _react2.default.createElement(_victory.VictoryLegend, {
                        containerComponent: _react2.default.createElement(_victory.VictoryContainer, { responsive: true }),
                        height: this.state.height,
                        width: 300,
                        title: 'Legend',
                        style: {
                            title: {
                                fontSize: config.style ? config.style.legendTitleSize || currentTheme.map.style.labels.title.fontSize : currentTheme.map.style.labels.title.fontSize,
                                fill: config.style ? config.style.legendTitleColor || currentTheme.map.style.labels.title.fill : currentTheme.map.style.labels.title.fill
                            },
                            labels: {
                                fontSize: config.style ? config.style.legendTextSize || currentTheme.map.style.labels.legend.fontSize : currentTheme.map.style.labels.legend.fontSize,
                                fill: config.style ? config.style.legendTextColor || currentTheme.map.style.labels.legend.fill : currentTheme.map.style.labels.legend.fill
                            }
                        },
                        data: Object.keys(ordinalColorMap).map(function (name) {
                            return { name: name, symbol: { fill: ordinalColorMap[name] } };
                        })
                    })
                ) : null
            );
        }
    }]);

    return MapGenerator;
}(_react2.default.Component);

exports.default = MapGenerator;


MapGenerator.defaultProps = {
    height: 800,
    width: 800
};

MapGenerator.propTypes = {
    height: _propTypes2.default.number,
    width: _propTypes2.default.number,
    config: _propTypes2.default.object.isRequired,
    mapData: _propTypes2.default.array,
    metadata: _propTypes2.default.object,
    colorRange: _propTypes2.default.array,
    colorScale: _propTypes2.default.array,
    colorType: _propTypes2.default.string,
    onClick: _propTypes2.default.func
};