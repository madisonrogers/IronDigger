'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Selection = require('./Selection');

var _Selection2 = _interopRequireDefault(_Selection);

var _dates = require('./utils/dates');

var _dates2 = _interopRequireDefault(_dates);

var _selection = require('./utils/selection');

var _localizer = require('./localizer');

var _localizer2 = _interopRequireDefault(_localizer);

var _helpers = require('./utils/helpers');

var _propTypes3 = require('./utils/propTypes');

var _accessors = require('./utils/accessors');

var _doctor = require('./img/doctor.png');

var _doctor2 = _interopRequireDefault(_doctor);

var _dayViewLayout = require('./utils/dayViewLayout');

var _dayViewLayout2 = _interopRequireDefault(_dayViewLayout);

var _TimeColumn = require('./TimeColumn');

var _TimeColumn2 = _interopRequireDefault(_TimeColumn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function snapToSlot(date, step) {
  var roundTo = 1000 * 60 * step;
  return new Date(Math.floor(date.getTime() / roundTo) * roundTo);
}

function startsAfter(date, max) {
  return _dates2.default.gt(_dates2.default.merge(max, date), max, 'minutes');
}

var DaySlot = function (_React$Component) {
  _inherits(DaySlot, _React$Component);

  function DaySlot(props) {
    _classCallCheck(this, DaySlot);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.state = { selecting: false };

    _this.renderEvents = function () {
      var _this$props = _this.props,
          events = _this$props.events,
          min = _this$props.min,
          max = _this$props.max,
          culture = _this$props.culture,
          eventPropGetter = _this$props.eventPropGetter,
          selected = _this$props.selected,
          eventTimeRangeFormat = _this$props.eventTimeRangeFormat,
          eventComponent = _this$props.eventComponent,
          EventWrapper = _this$props.eventWrapperComponent,
          isRtl = _this$props.rtl,
          step = _this$props.step,
          startAccessor = _this$props.startAccessor,
          endAccessor = _this$props.endAccessor,
          titleAccessor = _this$props.titleAccessor,
          patientNameAccessor = _this$props.patientNameAccessor,
          clinicianImageAccessor = _this$props.clinicianImageAccessor,
          clinicianNameAccessor = _this$props.clinicianNameAccessor,
          appointmentTypeAccessor = _this$props.appointmentTypeAccessor,
          appointmentTimeAccessor = _this$props.appointmentTimeAccessor,
          appointmentAddressAccessor = _this$props.appointmentAddressAccessor,
          coPayAccessor = _this$props.coPayAccessor,
          soapNoteTitleAccessor = _this$props.soapNoteTitleAccessor,
          setProfileTitleAccessor = _this$props.setProfileTitleAccessor,
          staffsAccessor = _this$props.staffsAccessor,
          isRecurrenceAccessor = _this$props.isRecurrenceAccessor,
          isRecurrenceEditAccessor = _this$props.isRecurrenceEditAccessor,
          isEditAccessor = _this$props.isEditAccessor,
          isDeleteAccessor = _this$props.isDeleteAccessor,
          isCancelAccessor = _this$props.isCancelAccessor,
          isUnCancelAccessor = _this$props.isUnCancelAccessor,
          cancellationReasonAccessor = _this$props.cancellationReasonAccessor,
          isAppointmentRenderedAccessor = _this$props.isAppointmentRenderedAccessor,
          isVideoCallAccessor = _this$props.isVideoCallAccessor,
          isAppoinmentCancelledAccessor = _this$props.isAppoinmentCancelledAccessor,
          practitionerNameAccessor = _this$props.practitionerNameAccessor;


      var EventComponent = eventComponent;

      var styledEvents = (0, _dayViewLayout2.default)({
        events: events, startAccessor: startAccessor, endAccessor: endAccessor, min: min, totalMin: _this._totalMin, step: step
      });

      return styledEvents.map(function (_ref, idx) {
        var _extends2;

        var event = _ref.event,
            style = _ref.style;

        var start = (0, _accessors.accessor)(event, startAccessor);
        var end = (0, _accessors.accessor)(event, endAccessor);

        var continuesPrior = (0, _dayViewLayout.startsBefore)(start, min);
        var continuesAfter = startsAfter(end, max);

        var title = (0, _accessors.accessor)(event, titleAccessor);

        // @Appointment associate appointment data with the fields
        var patientName = (0, _accessors.accessor)(event, patientNameAccessor);
        var clinicianImage = (0, _accessors.accessor)(event, clinicianImageAccessor);
        var clinicianName = (0, _accessors.accessor)(event, clinicianNameAccessor);
        var appointmentType = (0, _accessors.accessor)(event, appointmentTypeAccessor);
        var appointmentTime = (0, _accessors.accessor)(event, appointmentTimeAccessor);
        var appointmentAddress = (0, _accessors.accessor)(event, appointmentAddressAccessor);
        var coPay = (0, _accessors.accessor)(event, coPayAccessor);
        var soapNoteTitle = (0, _accessors.accessor)(event, soapNoteTitleAccessor);
        var setProfileTitle = (0, _accessors.accessor)(event, setProfileTitleAccessor);
        var staffs = (0, _accessors.accessor)(event, staffsAccessor);
        var isRecurrence = (0, _accessors.accessor)(event, isRecurrenceAccessor);
        var isRecurrenceEdit = (0, _accessors.accessor)(event, isRecurrenceEditAccessor);
        var isEdit = (0, _accessors.accessor)(event, isEditAccessor);
        var isDelete = (0, _accessors.accessor)(event, isDeleteAccessor);
        var isCancel = (0, _accessors.accessor)(event, isCancelAccessor);
        var isUnCancel = (0, _accessors.accessor)(event, isUnCancelAccessor);
        var cancellationReason = (0, _accessors.accessor)(event, cancellationReasonAccessor);
        var isAppointmentRendered = (0, _accessors.accessor)(event, isAppointmentRenderedAccessor);
        var isVideoCall = (0, _accessors.accessor)(event, isVideoCallAccessor);
        var isAppoinmentCancelled = (0, _accessors.accessor)(event, isAppoinmentCancelledAccessor);
        var practitionerName = (0, _accessors.accessor)(event, practitionerNameAccessor);

        var label = _localizer2.default.format({ start: start, end: end }, eventTimeRangeFormat, culture);
        var _isSelected = (0, _selection.isSelected)(event, selected);
        var viewClass = '';
        var getEndHour = end.getHours();

        if (getEndHour > 17) {
          viewClass = _this.props.view === 'week' ? 'appointment_box dayslot hoverup' : 'appointment_box hoverup';
        } else {
          viewClass = _this.props.view === 'week' ? 'appointment_box dayslot' : 'appointment_box';
        }

        var dayClass = _this.props.view === 'day' ? 'colwrap' : '';

        if (eventPropGetter) var _eventPropGetter = eventPropGetter(event, start, end, _isSelected),
              xStyle = _eventPropGetter.style,
              className = _eventPropGetter.className;

        var height = style.height,
            top = style.top,
            width = style.width,
            xOffset = style.xOffset;


        return _react2.default.createElement(
          EventWrapper,
          { event: event, key: 'evt_' + idx },
          _react2.default.createElement(
            'div',
            {
              style: _extends({}, xStyle, (_extends2 = {
                top: top + '%',
                height: height + '%'
              }, _extends2[isRtl ? 'right' : 'left'] = Math.max(0, xOffset) + '%', _extends2.width = width + '%', _extends2))
              // title={label + ': ' + title }
              //onClick={(e) => this._select(event, e)}
              , className: (0, _classnames2.default)('rbc-event ' + dayClass, className, {
                'rbc-selected': _isSelected,
                'rbc-event-continues-earlier': continuesPrior,
                'rbc-event-continues-later': continuesAfter
              })
            },
            _react2.default.createElement(
              'div',
              { className: 'rbc-event-label rbc-event-content textoverflow' },
              isRecurrence ? _react2.default.createElement('i', { className: 'fa fa-repeat pr5', 'aria-hidden': 'true' }) : '',
              isAppointmentRendered ? _react2.default.createElement('i', { className: 'fa fa-check-circle-o pr5', 'aria-hidden': 'true' }) : '',
              isVideoCall ? _react2.default.createElement('i', { className: 'fa fa-video-camera pr5', 'aria-hidden': 'true' }) : '',
              isAppoinmentCancelled ? _react2.default.createElement('i', { className: 'fa fa-ban pr5', 'aria-hidden': 'true' }) : '',
              EventComponent ? _react2.default.createElement(EventComponent, { event: event }) : title,
              ' ',
              label
            ),
            _react2.default.createElement(
              'div',
              { className: viewClass },
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
                            return _this.hoverDialogActions(event, e, 'edit_recurrence');
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
                            return _this.hoverDialogActions(event, e, 'cancel');
                          } },
                        _react2.default.createElement('i', { className: 'fa fa-ban', 'aria-hidden': 'true' })
                      )
                    ) : isUnCancel ? _react2.default.createElement(
                      'li',
                      null,
                      _react2.default.createElement(
                        'a',
                        { title: 'Undo Cancel', className: 'edit', href: '#', onClick: function onClick(e) {
                            return _this.hoverDialogActions(event, e, 'uncancel');
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
                            return _this.hoverDialogActions(event, e, 'edit');
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
                            return _this.hoverDialogActions(event, e, 'delete');
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
                  staffs ? _this.renderStaffs(staffs) : _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(
                      'div',
                      { className: 'info-pic' },
                      _react2.default.createElement('img', { src: clinicianImage, width: '80px', height: '80px', onClick: function onClick(e) {
                          return _this.hoverDialogActions(event, e, 'view_profile');
                        } })
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'info-p' },
                      _react2.default.createElement(
                        'div',
                        { className: 'name', onClick: function onClick(e) {
                            return _this.hoverDialogActions(event, e, 'view_profile');
                          } },
                        clinicianName
                      ),
                      _react2.default.createElement(
                        'a',
                        { href: '#', onClick: function onClick(e) {
                            return _this.hoverDialogActions(event, e, 'soap_note');
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
        );
      });
    };

    _this._slotStyle = function (startSlot, endSlot) {
      var top = startSlot / _this._totalMin * 100;
      var bottom = endSlot / _this._totalMin * 100;

      return {
        top: top + '%',
        height: bottom - top + '%'
      };
    };

    _this._selectable = function () {
      var node = (0, _reactDom.findDOMNode)(_this);
      var selector = _this._selector = new _Selection2.default(function () {
        return (0, _reactDom.findDOMNode)(_this);
      });

      var maybeSelect = function maybeSelect(box) {
        var onSelecting = _this.props.onSelecting;
        var current = _this.state || {};
        var state = selectionState(box);
        var start = state.startDate,
            end = state.endDate;


        if (onSelecting) {
          if (_dates2.default.eq(current.startDate, start, 'minutes') && _dates2.default.eq(current.endDate, end, 'minutes') || onSelecting({ start: start, end: end }) === false) return;
        }

        _this.setState(state);
      };

      var selectionState = function selectionState(_ref2) {
        var y = _ref2.y;
        var _this$props2 = _this.props,
            step = _this$props2.step,
            min = _this$props2.min,
            max = _this$props2.max;

        var _getBoundsForNode = (0, _Selection.getBoundsForNode)(node),
            top = _getBoundsForNode.top,
            bottom = _getBoundsForNode.bottom;

        var mins = _this._totalMin;

        var range = Math.abs(top - bottom);

        var current = (y - top) / range;

        current = snapToSlot(minToDate(mins * current, min), step);

        if (!_this.state.selecting) _this._initialDateSlot = current;

        var initial = _this._initialDateSlot;

        if (_dates2.default.eq(initial, current, 'minutes')) current = _dates2.default.add(current, step, 'minutes');

        var start = _dates2.default.max(min, _dates2.default.min(initial, current));
        var end = _dates2.default.min(max, _dates2.default.max(initial, current));

        return {
          selecting: true,
          startDate: start,
          endDate: end,
          startSlot: (0, _dayViewLayout.positionFromDate)(start, min, _this._totalMin),
          endSlot: (0, _dayViewLayout.positionFromDate)(end, min, _this._totalMin)
        };
      };

      selector.on('selecting', maybeSelect);
      selector.on('selectStart', maybeSelect);

      selector.on('mousedown', function (box) {
        if (_this.props.selectable !== 'ignoreEvents') return;

        return !(0, _Selection.isEvent)((0, _reactDom.findDOMNode)(_this), box);
      });

      selector.on('click', function (box) {
        if (!(0, _Selection.isEvent)((0, _reactDom.findDOMNode)(_this), box)) _this._selectSlot(_extends({}, selectionState(box), { action: 'click' }));

        _this.setState({ selecting: false });
      });

      selector.on('select', function () {
        if (_this.state.selecting) {
          _this._selectSlot(_extends({}, _this.state, { action: 'select' }));
          _this.setState({ selecting: false });
        }
      });
    };

    _this._teardownSelectable = function () {
      if (!_this._selector) return;
      _this._selector.teardown();
      _this._selector = null;
    };

    _this._selectSlot = function (_ref3) {
      var startDate = _ref3.startDate,
          endDate = _ref3.endDate,
          action = _ref3.action;

      var current = startDate,
          slots = [];

      while (_dates2.default.lte(current, endDate)) {
        slots.push(current);
        current = _dates2.default.add(current, _this.props.step, 'minutes');
      }

      (0, _helpers.notify)(_this.props.onSelectSlot, {
        slots: slots,
        start: startDate,
        end: endDate,
        resourceId: _this.props.resource,
        action: action
      });
    };

    _this._select = function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      (0, _helpers.notify)(_this.props.onSelectEvent, args);
    };

    _this.renderStaffs = _this.renderStaffs.bind(_this);
    return _this;
  }

  DaySlot.prototype.renderStaffs = function renderStaffs(staffs) {
    console.log(staffs);
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

  DaySlot.prototype.componentDidMount = function componentDidMount() {
    this.props.selectable && this._selectable();
  };

  DaySlot.prototype.componentWillUnmount = function componentWillUnmount() {
    this._teardownSelectable();
  };

  DaySlot.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (nextProps.selectable && !this.props.selectable) this._selectable();
    if (!nextProps.selectable && this.props.selectable) this._teardownSelectable();
  };

  DaySlot.prototype.render = function render() {
    var _props = this.props,
        min = _props.min,
        max = _props.max,
        step = _props.step,
        now = _props.now,
        selectRangeFormat = _props.selectRangeFormat,
        culture = _props.culture,
        props = _objectWithoutProperties(_props, ['min', 'max', 'step', 'now', 'selectRangeFormat', 'culture']);

    this._totalMin = _dates2.default.diff(min, max, 'minutes');

    var _state = this.state,
        selecting = _state.selecting,
        startSlot = _state.startSlot,
        endSlot = _state.endSlot;

    var style = this._slotStyle(startSlot, endSlot);

    var selectDates = {
      start: this.state.startDate,
      end: this.state.endDate
    };

    var lastNodeOfWeek = document.getElementsByClassName('rbc-day-slot');
    var len = lastNodeOfWeek.length;

    // @Week add class to last column - for sat
    var lastelement = len < 1 ? '' : lastNodeOfWeek[len - 1];
    if (lastelement.classList !== undefined) {
      lastelement.classList.add('custom-class-sat');
    }

    // @Week add class to last column - for friday
    var secondLastElement = len < 2 ? '' : lastNodeOfWeek[len - 2];
    if (secondLastElement.classList !== undefined) {
      secondLastElement.classList.add('custom-class-sat');
    }

    return _react2.default.createElement(
      _TimeColumn2.default,
      _extends({}, props, {
        className: (0, _classnames2.default)('rbc-day-slot', _dates2.default.isToday(max) && 'rbc-today'),
        now: now,
        min: min,
        max: max,
        step: step
      }),
      this.renderEvents(),
      selecting && _react2.default.createElement(
        'div',
        { className: 'rbc-slot-selection', style: style },
        _react2.default.createElement(
          'span',
          null,
          _localizer2.default.format(selectDates, selectRangeFormat, culture)
        )
      )
    );
  };

  DaySlot.prototype.hoverDialogActions = function hoverDialogActions(event, e, action) {
    e.preventDefault();
    event.action = action;
    this._select(event, e);
  };

  return DaySlot;
}(_react2.default.Component);

DaySlot.propTypes = {
  events: _propTypes2.default.array.isRequired,
  step: _propTypes2.default.number.isRequired,
  min: _propTypes2.default.instanceOf(Date).isRequired,
  max: _propTypes2.default.instanceOf(Date).isRequired,
  now: _propTypes2.default.instanceOf(Date),

  rtl: _propTypes2.default.bool,
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

  allDayAccessor: _propTypes3.accessor.isRequired,
  startAccessor: _propTypes3.accessor.isRequired,
  endAccessor: _propTypes3.accessor.isRequired,

  selectRangeFormat: _propTypes3.dateFormat,
  eventTimeRangeFormat: _propTypes3.dateFormat,
  culture: _propTypes2.default.string,

  selected: _propTypes2.default.object,
  selectable: _propTypes2.default.oneOf([true, false, 'ignoreEvents']),
  eventOffset: _propTypes2.default.number,

  onSelecting: _propTypes2.default.func,
  onSelectSlot: _propTypes2.default.func.isRequired,
  onSelectEvent: _propTypes2.default.func.isRequired,

  className: _propTypes2.default.string,
  dragThroughEvents: _propTypes2.default.bool,
  eventPropGetter: _propTypes2.default.func,
  dayWrapperComponent: _propTypes3.elementType,
  eventComponent: _propTypes3.elementType,
  eventWrapperComponent: _propTypes3.elementType.isRequired,
  resource: _react2.default.PropTypes.string
};
DaySlot.defaultProps = { dragThroughEvents: true };


function minToDate(min, date) {
  var dt = new Date(date),
      totalMins = _dates2.default.diff(_dates2.default.startOf(date, 'day'), date, 'minutes');

  dt = _dates2.default.hours(dt, 0);
  dt = _dates2.default.minutes(dt, totalMins + min);
  dt = _dates2.default.seconds(dt, 0);
  return _dates2.default.milliseconds(dt, 0);
}

exports.default = DaySlot;
module.exports = exports['default'];