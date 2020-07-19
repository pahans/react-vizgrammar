'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _victory = require('victory');

var _CustomLegend = require('./CustomLegend');

var _CustomLegend2 = _interopRequireDefault(_CustomLegend);

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
 * Class to handle the visualization of legends.
 */
var LegendComponent = function (_React$Component) {
    _inherits(LegendComponent, _React$Component);

    function LegendComponent() {
        _classCallCheck(this, LegendComponent);

        return _possibleConstructorReturn(this, (LegendComponent.__proto__ || Object.getPrototypeOf(LegendComponent)).apply(this, arguments));
    }

    _createClass(LegendComponent, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                config = _props.config,
                height = _props.height,
                width = _props.width,
                legendItems = _props.legendItems,
                interaction = _props.interaction,
                theme = _props.theme;

            var maxLegendItems = Math.floor((height - 100) / 25);
            var legendColumns = Math.floor(width / 160);

            return _react2.default.createElement(
                _victory.VictoryPortal,
                null,
                _react2.default.createElement(_victory.VictoryLegend, {
                    x: function () {
                        if (!config.legendOrientation && legendItems.length < maxLegendItems) {
                            return width - (150 + (config.legendOffset ? config.legendOffset : 0));
                        } else if (config.legendOrientation === 'right') {
                            return width - (150 + (config.legendOffset ? config.legendOffset : 0));
                        } else if (config.legendOrientation === 'left') {
                            return config.legendOffset ? config.legendOffset : 0;
                        } else if (legendItems.length > maxLegendItems - 1) {
                            return config.legendOffset ? config.legendOffset : 20;
                        } else {
                            return config.legendOffset ? config.legendOffset : 100;
                        }
                    }(),
                    y: function () {
                        if (!config.legendOrientation && legendItems.length < maxLegendItems) return 0;else if (config.legendOrientation === 'top') {
                            return 0;
                        } else if (config.legendOrientation === 'bottom' || legendItems.length > maxLegendItems - 1) {
                            return height - Math.ceil(legendItems.length / legendColumns) * 30;
                        } else return 0;
                    }(),
                    standalone: true,
                    containerComponent: _react2.default.createElement(_victory.VictoryContainer, { responsive: true }),
                    centerTitle: true,
                    height: height,
                    width: width,
                    orientation: !config.legendOrientation ? function () {
                        if (legendItems.length > maxLegendItems - 1) {
                            return 'horizontal';
                        } else {
                            return 'vertical';
                        }
                    }() : function () {
                        if (config.legendOrientation === 'left' || config.legendOrientation === 'right') {
                            return 'vertical';
                        } else {
                            return 'horizontal';
                        }
                    }(),
                    style: {
                        title: {
                            fontSize: config.style && config.style.legendTitleSize ? config.style.legendTitleSize : theme.legend.style.title.fontSize,
                            fill: config.style && config.style.legendTitleColor ? config.style.legendTitleColor : theme.legend.style.title.fill
                        }
                    },
                    data: legendItems.length > 0 ? legendItems : [{
                        name: 'undefined',
                        symbol: { fill: '#333' }
                    }],
                    itemsPerRow: legendItems.length > maxLegendItems ? legendColumns : null,
                    events: [{
                        target: 'data',
                        eventHandlers: {
                            onClick: function onClick() {
                                return [{ target: 'data', mutation: interaction }];
                            }
                        }
                    }],
                    labelComponent: _react2.default.createElement(_CustomLegend2.default, {
                        config: config,
                        theme: theme
                    })
                })
            );
        }
    }]);

    return LegendComponent;
}(_react2.default.Component);

exports.default = LegendComponent;