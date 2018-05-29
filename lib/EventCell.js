'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _dates = require('./utils/dates');

var _dates2 = _interopRequireDefault(_dates);

var _propTypes3 = require('./utils/propTypes');

var _accessors = require('./utils/accessors');

var _doctor = require('./img/doctor.png');

var _doctor2 = _interopRequireDefault(_doctor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
  event: _propTypes2.default.object.isRequired,
  slotStart: _propTypes2.default.instanceOf(Date),
  slotEnd: _propTypes2.default.instanceOf(Date),

  selected: _propTypes2.default.bool,
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

  allDayAccessor: _propTypes3.accessor,
  startAccessor: _propTypes3.accessor,
  endAccessor: _propTypes3.accessor,

  eventComponent: _propTypes3.elementType,
  eventWrapperComponent: _propTypes3.elementType.isRequired,
  onSelect: _propTypes2.default.func
};

var EventCell = function (_React$Component) {
  _inherits(EventCell, _React$Component);

  function EventCell(props) {
    _classCallCheck(this, EventCell);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.renderStaffs = _this.renderStaffs.bind(_this);
    return _this;
  }

  EventCell.prototype.renderStaffs = function renderStaffs(staffs) {
    if (staffs) {
      return staffs.map(function (obj, index) {
        return _react2.default.createElement(
          'div',
          { className: 'info-p' },
          _react2.default.createElement('img', { src: obj.image, width: '35px', height: '35px' }),
          _react2.default.createElement(
            'p',
            null,
            obj.staffName
          )
        );
      });
    }
  };

  EventCell.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props,
        className = _props.className,
        event = _props.event,
        selected = _props.selected,
        eventPropGetter = _props.eventPropGetter,
        startAccessor = _props.startAccessor,
        endAccessor = _props.endAccessor,
        titleAccessor = _props.titleAccessor,
        patientNameAccessor = _props.patientNameAccessor,
        clinicianImageAccessor = _props.clinicianImageAccessor,
        clinicianNameAccessor = _props.clinicianNameAccessor,
        appointmentTypeAccessor = _props.appointmentTypeAccessor,
        appointmentTimeAccessor = _props.appointmentTimeAccessor,
        appointmentAddressAccessor = _props.appointmentAddressAccessor,
        coPayAccessor = _props.coPayAccessor,
        soapNoteTitleAccessor = _props.soapNoteTitleAccessor,
        setProfileTitleAccessor = _props.setProfileTitleAccessor,
        staffsAccessor = _props.staffsAccessor,
        isRecurrenceAccessor = _props.isRecurrenceAccessor,
        isRecurrenceEditAccessor = _props.isRecurrenceEditAccessor,
        isEditAccessor = _props.isEditAccessor,
        isDeleteAccessor = _props.isDeleteAccessor,
        isCancelAccessor = _props.isCancelAccessor,
        isUnCancelAccessor = _props.isUnCancelAccessor,
        cancellationReasonAccessor = _props.cancellationReasonAccessor,
        isAppointmentRenderedAccessor = _props.isAppointmentRenderedAccessor,
        isVideoCallAccessor = _props.isVideoCallAccessor,
        isAppoinmentCancelledAccessor = _props.isAppoinmentCancelledAccessor,
        practitionerNameAccessor = _props.practitionerNameAccessor,
        slotStart = _props.slotStart,
        slotEnd = _props.slotEnd,
        onSelect = _props.onSelect,
        Event = _props.eventComponent,
        EventWrapper = _props.eventWrapperComponent,
        props = _objectWithoutProperties(_props, ['className', 'event', 'selected', 'eventPropGetter', 'startAccessor', 'endAccessor', 'titleAccessor', 'patientNameAccessor', 'clinicianImageAccessor', 'clinicianNameAccessor', 'appointmentTypeAccessor', 'appointmentTimeAccessor', 'appointmentAddressAccessor', 'coPayAccessor', 'soapNoteTitleAccessor', 'setProfileTitleAccessor', 'staffsAccessor', 'isRecurrenceAccessor', 'isRecurrenceEditAccessor', 'isEditAccessor', 'isDeleteAccessor', 'isCancelAccessor', 'isUnCancelAccessor', 'cancellationReasonAccessor', 'isAppointmentRenderedAccessor', 'isVideoCallAccessor', 'isAppoinmentCancelledAccessor', 'practitionerNameAccessor', 'slotStart', 'slotEnd', 'onSelect', 'eventComponent', 'eventWrapperComponent']);

    var title = (0, _accessors.accessor)(event, titleAccessor),
        patientName = (0, _accessors.accessor)(event, patientNameAccessor),
        clinicianImage = (0, _accessors.accessor)(event, clinicianImageAccessor),
        clinicianName = (0, _accessors.accessor)(event, clinicianNameAccessor),
        appointmentType = (0, _accessors.accessor)(event, appointmentTypeAccessor),
        appointmentTime = (0, _accessors.accessor)(event, appointmentTimeAccessor),
        appointmentAddress = (0, _accessors.accessor)(event, appointmentAddressAccessor),
        coPay = (0, _accessors.accessor)(event, coPayAccessor),
        soapNoteTitle = (0, _accessors.accessor)(event, soapNoteTitleAccessor),
        setProfileTitle = (0, _accessors.accessor)(event, setProfileTitleAccessor),
        staffs = (0, _accessors.accessor)(event, staffsAccessor),
        isRecurrence = (0, _accessors.accessor)(event, isRecurrenceAccessor),
        isRecurrenceEdit = (0, _accessors.accessor)(event, isRecurrenceEditAccessor),
        isEdit = (0, _accessors.accessor)(event, isEditAccessor),
        isDelete = (0, _accessors.accessor)(event, isDeleteAccessor),
        isCancel = (0, _accessors.accessor)(event, isCancelAccessor),
        isUnCancel = (0, _accessors.accessor)(event, isUnCancelAccessor),
        cancellationReason = (0, _accessors.accessor)(event, cancellationReasonAccessor),
        isAppointmentRendered = (0, _accessors.accessor)(event, isAppointmentRenderedAccessor),
        isVideoCall = (0, _accessors.accessor)(event, isVideoCallAccessor),
        isAppoinmentCancelled = (0, _accessors.accessor)(event, isAppoinmentCancelledAccessor),
        practitionerName = (0, _accessors.accessor)(event, practitionerNameAccessor),
        end = (0, _accessors.accessor)(event, endAccessor),
        start = (0, _accessors.accessor)(event, startAccessor),
        isAllDay = (0, _accessors.accessor)(event, props.allDayAccessor),
        continuesPrior = _dates2.default.lt(start, slotStart, 'day'),
        continuesAfter = _dates2.default.gt(end, slotEnd, 'day');

    if (eventPropGetter) var _eventPropGetter = eventPropGetter(event, start, end, selected),
          style = _eventPropGetter.style,
          xClassName = _eventPropGetter.className;

    return _react2.default.createElement(
      EventWrapper,
      { event: event },
      _react2.default.createElement(
        'div',
        {
          style: _extends({}, props.style, style),
          className: (0, _classnames2.default)('rbc-event', className, xClassName, {
            'rbc-selected': selected,
            'rbc-event-allday': isAllDay || _dates2.default.diff(start, _dates2.default.ceil(end, 'day'), 'day') > 1,
            'rbc-event-continues-prior': continuesPrior,
            'rbc-event-continues-after': continuesAfter
          })
          // onClick={(e) => onSelect(event, e)}
        },
        _react2.default.createElement(
          'div',
          { className: 'rbc-event-content' },
          _react2.default.createElement(
            'ul',
            { className: 'quickview' },
            isRecurrence === true ? _react2.default.createElement(
              'li',
              null,
              _react2.default.createElement('i', { className: 'fa fa-repeat', 'aria-hidden': 'true' })
            ) : '',
            isAppointmentRendered ? _react2.default.createElement(
              'li',
              null,
              _react2.default.createElement('i', { className: 'fa fa-check-circle-o', 'aria-hidden': 'true' })
            ) : '',
            isVideoCall ? _react2.default.createElement(
              'li',
              null,
              _react2.default.createElement('i', { className: 'fa fa-video-camera', 'aria-hidden': 'true' })
            ) : '',
            isAppoinmentCancelled ? _react2.default.createElement(
              'li',
              null,
              _react2.default.createElement('i', { className: 'fa fa-ban', 'aria-hidden': 'true' })
            ) : ''
          ),
          Event ? _react2.default.createElement(Event, { event: event, title: title }) : title,
          _react2.default.createElement(
            'div',
            { className: 'appointment_box month_box' },
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
                  isRecurrenceEdit ? _react2.default.createElement(
                    'li',
                    null,
                    _react2.default.createElement(
                      'a',
                      { title: 'Edit recurrence', className: 'edit', href: '#', onClick: function onClick(e) {
                          return _this2.hoverDialogActions(event, e, 'edit_recurrence');
                        } },
                      _react2.default.createElement('i', { className: 'fa fa-repeat', 'aria-hidden': 'true' })
                    )
                  ) : '',
                  isCancel ? _react2.default.createElement(
                    'li',
                    null,
                    _react2.default.createElement(
                      'a',
                      { title: 'Cancel', className: 'edit', href: '#', onClick: function onClick(e) {
                          return _this2.hoverDialogActions(event, e, 'cancel');
                        } },
                      _react2.default.createElement('i', { className: 'fa fa-ban', 'aria-hidden': 'true' })
                    )
                  ) : isUnCancel ? _react2.default.createElement(
                    'li',
                    null,
                    _react2.default.createElement(
                      'a',
                      { title: 'Undo Cancel', className: 'edit', href: '#', onClick: function onClick(e) {
                          return _this2.hoverDialogActions(event, e, 'uncancel');
                        } },
                      _react2.default.createElement('i', { className: 'fa fa-undo', 'aria-hidden': 'true' })
                    )
                  ) : '',
                  isEdit ? _react2.default.createElement(
                    'li',
                    null,
                    _react2.default.createElement(
                      'a',
                      { title: 'Edit', className: 'edit', href: '#', onClick: function onClick(e) {
                          return _this2.hoverDialogActions(event, e, 'edit');
                        } },
                      _react2.default.createElement('i', { className: 'fa fa-pencil-square-o', 'aria-hidden': 'true' })
                    )
                  ) : '',
                  isDelete ? _react2.default.createElement(
                    'li',
                    null,
                    _react2.default.createElement(
                      'a',
                      { title: 'Delete', className: 'trash', href: '#', onClick: function onClick(e) {
                          return _this2.hoverDialogActions(event, e, 'delete');
                        } },
                      _react2.default.createElement('i', { className: 'fa fa-trash-o', 'aria-hidden': 'true' })
                    )
                  ) : ''
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
                  { className: 'boxicon' },
                  isRecurrence ? _react2.default.createElement('i', { title: 'Recurrence Appointment', className: 'fa fa-repeat', 'aria-hidden': 'true' }) : '',
                  isAppointmentRendered ? _react2.default.createElement('i', { title: 'Rendered Appointment', className: 'fa fa-check-circle-o', 'aria-hidden': 'true' }) : '',
                  isVideoCall ? _react2.default.createElement('i', { title: 'Video Call in Appointment', className: 'fa fa-video-camera', 'aria-hidden': 'true' }) : '',
                  isAppoinmentCancelled ? _react2.default.createElement('i', { title: '' + cancellationReason, className: 'fa fa-ban', 'aria-hidden': 'true' }) : ''
                ),
                staffs ? this.renderStaffs(staffs) : _react2.default.createElement(
                  'div',
                  null,
                  _react2.default.createElement(
                    'div',
                    { className: 'info-pic' },
                    _react2.default.createElement('img', { src: clinicianImage, width: '80px', height: '80px', onClick: function onClick(e) {
                        return _this2.hoverDialogActions(event, e, 'view_profile');
                      } })
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'info-p' },
                    _react2.default.createElement(
                      'div',
                      { className: 'name', onClick: function onClick(e) {
                          return _this2.hoverDialogActions(event, e, 'view_profile');
                        } },
                      clinicianName
                    ),
                    _react2.default.createElement(
                      'a',
                      { href: '#', onClick: function onClick(e) {
                          return _this2.hoverDialogActions(event, e, 'soap_note');
                        } },
                      soapNoteTitle
                    )
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
                    _react2.default.createElement('i', { className: 'fa fa-clock-o', 'aria-hidden': 'true' }),
                    _react2.default.createElement(
                      'span',
                      null,
                      appointmentTime
                    )
                  ),
                  practitionerName ? _react2.default.createElement(
                    'p',
                    null,
                    _react2.default.createElement('i', { className: 'fa fa-user', 'aria-hidden': 'true' }),
                    _react2.default.createElement(
                      'span',
                      null,
                      practitionerName
                    )
                  ) : '',
                  _react2.default.createElement(
                    'p',
                    null,
                    _react2.default.createElement('i', { className: 'fa fa-calendar-o', 'aria-hidden': 'true' }),
                    _react2.default.createElement(
                      'span',
                      null,
                      appointmentType
                    )
                  ),
                  _react2.default.createElement(
                    'p',
                    null,
                    _react2.default.createElement('i', { className: 'fa fa-map-marker', 'aria-hidden': 'true' }),
                    _react2.default.createElement(
                      'span',
                      null,
                      appointmentAddress
                    )
                  )
                )
              )
            )
          )
        )
      )
    );
  };

  EventCell.prototype.hoverDialogActions = function hoverDialogActions(event, e, action) {
    e.preventDefault();
    event.action = action;
    this.props.onSelect(event, e);
  };

  return EventCell;
}(_react2.default.Component);

EventCell.propTypes = propTypes;

exports.default = EventCell;
module.exports = exports['default'];