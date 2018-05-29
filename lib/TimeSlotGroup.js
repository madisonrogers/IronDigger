'use strict';

exports.__esModule = true;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _TimeSlot = require('./TimeSlot');

var _TimeSlot2 = _interopRequireDefault(_TimeSlot);

var _dates = require('./utils/dates.js');

var _dates2 = _interopRequireDefault(_dates);

var _localizer = require('./localizer');

var _localizer2 = _interopRequireDefault(_localizer);

var _propTypes3 = require('./utils/propTypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TimeSlotGroup = function (_Component) {
  _inherits(TimeSlotGroup, _Component);

  function TimeSlotGroup() {
    _classCallCheck(this, TimeSlotGroup);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  TimeSlotGroup.prototype.renderSlice = function renderSlice(slotNumber, content, value) {
    var _props = this.props,
        dayWrapperComponent = _props.dayWrapperComponent,
        showLabels = _props.showLabels,
        isNow = _props.isNow,
        culture = _props.culture,
        slotPropGetter = _props.slotPropGetter,
        resource = _props.resource,
        usersAvailability = _props.usersAvailability;

    return _react2.default.createElement(_TimeSlot2.default, {
      key: slotNumber,
      slotPropGetter: slotPropGetter,
      dayWrapperComponent: dayWrapperComponent,
      showLabel: showLabels && !slotNumber,
      content: content,
      culture: culture,
      isNow: isNow,
      value: value,
      resource: resource
    });
  };

  TimeSlotGroup.prototype.renderSlices = function renderSlices() {
    var ret = [];
    var sliceLength = this.props.step;
    var sliceValue = this.props.value;
    for (var i = 0; i < this.props.timeslots; i++) {
      var content = _localizer2.default.format(sliceValue, this.props.timeGutterFormat, this.props.culture);
      ret.push(this.renderSlice(i, content, sliceValue));
      sliceValue = _dates2.default.add(sliceValue, sliceLength, 'minutes');
    }
    return ret;
  };

  TimeSlotGroup.prototype.isAvailableDateTime = function isAvailableDateTime(availibilityArray, slotInfo, isDayAvailibility, resource) {
    var isValidDateTime = false,
        tempArray = availibilityArray;
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var SlotStartDate = new Date(slotInfo.start).toDateString(),
        nowDate = new Date(),
        year = nowDate.getFullYear(),
        month = nowDate.getMonth(),
        date = nowDate.getDate(),
        slotStart = new Date(slotInfo.start),
        slotStartTime = new Date(year, month, date, slotStart.getHours(), slotStart.getMinutes()),
        SlotDayName = days[new Date(slotInfo.start).getDay()];

    for (var index = 0; index < tempArray.length; index++) {
      var isValidDay = false;
      if (isDayAvailibility) {
        var availableDayName = tempArray[index].dayName || '';
        isValidDay = SlotDayName.toLowerCase() === availableDayName.toLowerCase();
      } else {
        var availableDate = new Date(tempArray[index].date).toDateString();
        isValidDay = availableDate === SlotStartDate;
      }
      var availStartTime = new Date(tempArray[index].startTime),
          avialEndTime = new Date(tempArray[index].endTime),
          startTime = new Date(year, month, date, availStartTime.getHours(), availStartTime.getMinutes()),
          endTime = new Date(year, month, date, avialEndTime.getHours(), avialEndTime.getMinutes());

      var isResourceId = resource ? resource === tempArray[index].staffID || '' : true;
      var isValidTime = startTime <= slotStartTime && endTime > slotStartTime;
      if (isResourceId && isValidDay && isValidTime) {
        isValidDateTime = true;
        break;
      }
    }
    return isValidDateTime;
  };

  TimeSlotGroup.prototype.render = function render() {
    var _props2 = this.props,
        value = _props2.value,
        usersAvailability = _props2.usersAvailability,
        resource = _props2.resource;

    // if (slotPropGetter)
    //     var { style: xStyle } = (slotPropGetter && slotPropGetter(date)) || {};
    // console.log('this.props time Slot Group ...', this.props)

    var slot_bg_color = '';
    if (usersAvailability) {
      var isAvailable = false;
      var isUnavailable = false;
      var slotInfo = {
        'start': value
      };
      var availableArray = usersAvailability;
      if (availableArray.unavailable && availableArray.unavailable.length) {
        var isDayAvailibility = false;
        isUnavailable = this.isAvailableDateTime(availableArray.unavailable, slotInfo, isDayAvailibility, resource);
      }
      if (isUnavailable) {
        isAvailable = false;
      } else {
        if (availableArray.available && availableArray.available.length) {
          var _isDayAvailibility = false;
          isAvailable = this.isAvailableDateTime(availableArray.available, slotInfo, _isDayAvailibility, resource);
        }
        if (!isAvailable && availableArray.days && availableArray.days.length) {
          var _isDayAvailibility2 = true;
          isAvailable = this.isAvailableDateTime(availableArray.days, slotInfo, _isDayAvailibility2, resource);
        }
      }
      slot_bg_color = isAvailable ? 'available-slot-color' : '';
    }

    return _react2.default.createElement(
      'div',
      { className: 'rbc-timeslot-group ' + slot_bg_color },
      this.renderSlices()
    );
  };

  return TimeSlotGroup;
}(_react.Component);

TimeSlotGroup.propTypes = {
  dayWrapperComponent: _propTypes3.elementType,
  timeslots: _propTypes2.default.number.isRequired,
  step: _propTypes2.default.number.isRequired,
  value: _propTypes2.default.instanceOf(Date).isRequired,
  showLabels: _propTypes2.default.bool,
  isNow: _propTypes2.default.bool,
  slotPropGetter: _propTypes2.default.func,
  timeGutterFormat: _propTypes3.dateFormat,
  culture: _propTypes2.default.string,
  resource: _propTypes2.default.string,

  usersAvailability: _propTypes2.default.object
};
TimeSlotGroup.defaultProps = {
  timeslots: 2,
  step: 30,
  isNow: false,
  showLabels: false
};
exports.default = TimeSlotGroup;
module.exports = exports['default'];