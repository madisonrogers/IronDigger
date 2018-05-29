'use strict';

exports.__esModule = true;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _EventCell = require('./EventCell');

var _EventCell2 = _interopRequireDefault(_EventCell);

var _height = require('dom-helpers/query/height');

var _height2 = _interopRequireDefault(_height);

var _propTypes3 = require('./utils/propTypes');

var _eventLevels = require('./utils/eventLevels');

var _selection = require('./utils/selection');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable react/prop-types */
exports.default = {
  propTypes: {
    slots: _propTypes2.default.number.isRequired,
    end: _propTypes2.default.instanceOf(Date),
    start: _propTypes2.default.instanceOf(Date),

    selected: _propTypes2.default.object,
    eventPropGetter: _propTypes2.default.func,
    titleAccessor: _propTypes3.accessor,
    // @Appointment field info declaration
    patientNameAccessor: _propTypes3.accessor,
    clinicianImageAccessor: _propTypes3.accessor,
    clinicianNameAccessor: _propTypes3.accessor,
    appointmentTypeAccessor: _propTypes3.accessor,
    appointmentTimeAccessor: _propTypes3.accessor,
    appointmentAddressAccessor: _propTypes3.accessor,
    coPayAccessor: _propTypes3.accessor,
    soapNoteTitleAccessor: _propTypes3.accessor,
    setProfileTitleAccessor: _propTypes3.accessor,
    staffsAccessor: _propTypes3.accessor,
    isRecurrenceAccessor: _propTypes3.accessor,
    isRecurrenceEditAccessor: _propTypes3.accessor,
    isEditAccessor: _propTypes3.accessor,
    isDeleteAccessor: _propTypes3.accessor,
    isCancelAccessor: _propTypes3.accessor,
    isUnCancelAccessor: _propTypes3.accessor,
    cancellationReasonAccessor: _propTypes3.accessor,
    isAppointmentRenderedAccessor: _propTypes3.accessor,
    isVideoCallAccessor: _propTypes3.accessor,
    isAppoinmentCancelledAccessor: _propTypes3.accessor,
    practitionerNameAccessor: _propTypes3.accessor,

    usersAvailability: _propTypes2.default.object,

    allDayAccessor: _propTypes3.accessor,
    startAccessor: _propTypes3.accessor,
    endAccessor: _propTypes3.accessor,

    eventComponent: _propTypes3.elementType,
    eventWrapperComponent: _propTypes3.elementType.isRequired,
    onSelect: _propTypes2.default.func
  },

  defaultProps: {
    segments: [],
    selected: {},
    slots: 7
  },

  renderEvent: function renderEvent(props, event) {
    var eventPropGetter = props.eventPropGetter,
        selected = props.selected,
        start = props.start,
        end = props.end,
        startAccessor = props.startAccessor,
        endAccessor = props.endAccessor,
        titleAccessor = props.titleAccessor,
        patientNameAccessor = props.patientNameAccessor,
        clinicianImageAccessor = props.clinicianImageAccessor,
        clinicianNameAccessor = props.clinicianNameAccessor,
        appointmentTypeAccessor = props.appointmentTypeAccessor,
        appointmentTimeAccessor = props.appointmentTimeAccessor,
        appointmentAddressAccessor = props.appointmentAddressAccessor,
        coPayAccessor = props.coPayAccessor,
        soapNoteTitleAccessor = props.soapNoteTitleAccessor,
        setProfileTitleAccessor = props.setProfileTitleAccessor,
        staffsAccessor = props.staffsAccessor,
        isRecurrenceAccessor = props.isRecurrenceAccessor,
        isRecurrenceEditAccessor = props.isRecurrenceEditAccessor,
        isEditAccessor = props.isEditAccessor,
        isDeleteAccessor = props.isDeleteAccessor,
        isCancelAccessor = props.isCancelAccessor,
        isUnCancelAccessor = props.isUnCancelAccessor,
        cancellationReasonAccessor = props.cancellationReasonAccessor,
        isAppointmentRenderedAccessor = props.isAppointmentRenderedAccessor,
        isVideoCallAccessor = props.isVideoCallAccessor,
        isAppoinmentCancelledAccessor = props.isAppoinmentCancelledAccessor,
        practitionerNameAccessor = props.practitionerNameAccessor,
        usersAvailability = props.usersAvailability,
        allDayAccessor = props.allDayAccessor,
        eventComponent = props.eventComponent,
        eventWrapperComponent = props.eventWrapperComponent,
        onSelect = props.onSelect;


    return _react2.default.createElement(_EventCell2.default, {
      event: event,
      eventWrapperComponent: eventWrapperComponent,
      eventPropGetter: eventPropGetter,
      onSelect: onSelect,
      selected: (0, _selection.isSelected)(event, selected),
      startAccessor: startAccessor,
      endAccessor: endAccessor,
      titleAccessor: titleAccessor,
      patientNameAccessor: patientNameAccessor,
      clinicianImageAccessor: clinicianImageAccessor,
      clinicianNameAccessor: clinicianNameAccessor,
      appointmentTypeAccessor: appointmentTypeAccessor,
      appointmentTimeAccessor: appointmentTimeAccessor,
      appointmentAddressAccessor: appointmentAddressAccessor,
      coPayAccessor: coPayAccessor,
      soapNoteTitleAccessor: soapNoteTitleAccessor,
      setProfileTitleAccessor: setProfileTitleAccessor,
      staffsAccessor: staffsAccessor,
      isRecurrenceAccessor: isRecurrenceAccessor,
      isRecurrenceEditAccessor: isRecurrenceEditAccessor,
      isEditAccessor: isEditAccessor,
      isDeleteAccessor: isDeleteAccessor,
      isCancelAccessor: isCancelAccessor,
      isUnCancelAccessor: isUnCancelAccessor,
      cancellationReasonAccessor: cancellationReasonAccessor,
      isAppointmentRenderedAccessor: isAppointmentRenderedAccessor,
      isVideoCallAccessor: isVideoCallAccessor,
      isAppoinmentCancelledAccessor: isAppoinmentCancelledAccessor,
      practitionerNameAccessor: practitionerNameAccessor,
      allDayAccessor: allDayAccessor,
      usersAvailability: usersAvailability,
      slotStart: start,
      slotEnd: end,
      eventComponent: eventComponent
    });
  },
  renderSpan: function renderSpan(props, len, key) {
    var content = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : ' ';
    var left = arguments[4];
    var slots = props.slots;


    var customClass = 'rbc-row-segment custom-class-' + left;
    return _react2.default.createElement(
      'div',
      { key: key, className: customClass, style: (0, _eventLevels.segStyle)(Math.abs(len), slots) },
      content
    );
  },
  getRowHeight: function getRowHeight() {
    (0, _height2.default)((0, _reactDom.findDOMNode)(this));
  }
};
module.exports = exports['default'];