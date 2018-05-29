'use strict';

exports.__esModule = true;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DaySlot = function (_React$Component) {
    _inherits(DaySlot, _React$Component);

    function DaySlot() {
        _classCallCheck(this, DaySlot);

        return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
    }

    DaySlot.prototype.render = function render() {
        var _this2 = this;

        return _react2.default.createElement(
            'div',
            { className: '' },
            _react2.default.createElement(
                'div',
                { className: 'topbar' },
                _react2.default.createElement(
                    'div',
                    { className: 'info-title' },
                    'Appointment info'
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'icons' },
                    _react2.default.createElement(
                        'ul',
                        null,
                        _react2.default.createElement(
                            'li',
                            null,
                            _react2.default.createElement(
                                'a',
                                { className: 'edit', href: '#', onClick: function onClick(e) {
                                        return _this2.hoverDialogActions(event, e, 'edit');
                                    } },
                                _react2.default.createElement('i', { className: 'fa fa-pencil-square-o', 'aria-hidden': 'true' })
                            )
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            _react2.default.createElement(
                                'a',
                                { className: 'trash', href: '#', onClick: function onClick(e) {
                                        return _this2.hoverDialogActions(event, e, 'delete');
                                    } },
                                _react2.default.createElement('i', { className: 'fa fa-trash-o', 'aria-hidden': 'true' })
                            )
                        )
                    )
                )
            ),
            _react2.default.createElement(
                'div',
                { className: 'info-content' },
                _react2.default.createElement(
                    'div',
                    { className: 'personal-info' },
                    _react2.default.createElement(
                        'div',
                        { className: 'info-pic' },
                        _react2.default.createElement('img', { src: Img, width: '80px', height: '80px' })
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'info-p' },
                        _react2.default.createElement(
                            'div',
                            { className: 'name' },
                            'Dr ',
                            patientName
                        ),
                        _react2.default.createElement(
                            'a',
                            { href: '#', onClick: function onClick(e) {
                                    return _this2.hoverDialogActions(event, e, 'view_profile');
                                } },
                            'View Client Profile'
                        ),
                        _react2.default.createElement(
                            'a',
                            { href: '#', onClick: function onClick(e) {
                                    return _this2.hoverDialogActions(event, e, 'soap_note');
                                } },
                            'View Client Profile'
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'about-event' },
                    _react2.default.createElement(
                        'div',
                        { className: 'info-p' },
                        _react2.default.createElement(
                            'p',
                            null,
                            _react2.default.createElement(
                                'b',
                                null,
                                'Appointment: '
                            ),
                            _react2.default.createElement(
                                'span',
                                null,
                                'New Patient Consultation'
                            )
                        ),
                        _react2.default.createElement(
                            'p',
                            null,
                            _react2.default.createElement(
                                'b',
                                null,
                                'Time: '
                            ),
                            _react2.default.createElement(
                                'span',
                                null,
                                '02:00-02:30 p.m'
                            )
                        ),
                        _react2.default.createElement(
                            'p',
                            null,
                            _react2.default.createElement(
                                'b',
                                null,
                                'Co-Pay: '
                            ),
                            _react2.default.createElement(
                                'span',
                                null,
                                _react2.default.createElement('i', { className: 'fa fa-usd', 'aria-hidden': 'true' }),
                                ' 00.00'
                            )
                        )
                    )
                )
            )
        );
    };

    return DaySlot;
}(_react2.default.Component);

exports.default = DaySlot;
module.exports = exports['default'];