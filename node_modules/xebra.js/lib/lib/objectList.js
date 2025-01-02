"use strict";

var _values = require("babel-runtime/core-js/object/values");

var _values2 = _interopRequireDefault(_values);

var _freeze = require("babel-runtime/core-js/object/freeze");

var _freeze2 = _interopRequireDefault(_freeze);

var _defineProperty2 = require("babel-runtime/core-js/object/define-property");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _Object$freeze, _Object$freeze2, _Object$freeze3;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { (0, _defineProperty3.default)(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var PARAMETER_ATTR = exports.PARAMETER_ATTR = (0, _freeze2.default)({
	CUSTOM_UNITS: "_parameter_units",
	EXPONENT: "_parameter_exponent",
	LONGNAME: "_parameter_longname",
	RANGE: "_parameter_range",
	SHORTNAME: "_parameter_shortname",
	STEPS: "_parameter_steps",
	TYPE: "_parameter_type",
	UNIT_STYLE: "_parameter_unitstyle"
});

var OBJECTS = exports.OBJECTS = (0, _freeze2.default)({
	BUTTON: "button",
	COMMENT: "comment",
	DIAL: "dial",
	FLONUM: "flonum",
	FPIC: "fpic",
	GAIN: "gain~",
	KSLIDER: "kslider",
	LIVE_BUTTON: "live.button",
	LIVE_DIAL: "live.dial",
	LIVE_GRID: "live.grid",
	LIVE_NUMBOX: "live.numbox",
	LIVE_SLIDER: "live.slider",
	LIVE_TAB: "live.tab",
	LIVE_TEXT: "live.text",
	LIVE_TOGGLE: "live.toggle",
	MESSAGE: "message",
	METER: "meter~",
	MIRA_CHANNEL: "mira.channel",
	MIRA_FRAME: "mira.frame",
	MIRA_MOTION: "mira.motion",
	MIRA_MULTITOUCH: "mira.multitouch",
	MULTISLIDER: "multislider",
	NUMBER: "number",
	PATCHER: "jpatcher",
	PATCHERVIEW: "patcherview",
	PANEL: "panel",
	RSLIDER: "rslider",
	SLIDER: "slider",
	SWATCH: "swatch",
	TOGGLE: "toggle",
	UMENU: "umenu"
});

var MANDATORY_OBJECTS = exports.MANDATORY_OBJECTS = (0, _freeze2.default)((_Object$freeze = {}, _defineProperty(_Object$freeze, OBJECTS.PATCHER, ["editing_bgcolor", "locked_bgcolor", "openinpresentation"]), _defineProperty(_Object$freeze, OBJECTS.PATCHERVIEW, ["name", "presentation", "locked"]), _defineProperty(_Object$freeze, OBJECTS.MIRA_CHANNEL, ["name"]), _defineProperty(_Object$freeze, OBJECTS.MIRA_FRAME, ["color", "mira_focus", "patching_rect", "presentation_rect", "presentation", "tabname", "taborder"]), _defineProperty(_Object$freeze, OBJECTS.MIRA_MOTION, []), _Object$freeze));

var DEFAULT_PARAMS = exports.DEFAULT_PARAMS = ["patching_rect", "presentation_rect", "zorder", "presentation", "hidden", "ignoreclick", "varname"];

var OBJECT_PARAMETERS = exports.OBJECT_PARAMETERS = (0, _freeze2.default)((_Object$freeze2 = {}, _defineProperty(_Object$freeze2, OBJECTS.BUTTON, DEFAULT_PARAMS.concat(["bgcolor", "blinkcolor", "outlinecolor", "value"])), _defineProperty(_Object$freeze2, OBJECTS.COMMENT, DEFAULT_PARAMS.concat(["textfield", "fontsize", "textjustification", "fontname", "fontface", "bgcolor", "textcolor", "bubble", "bubblepoint", "bubbleside", "bubbletextmargin"])), _defineProperty(_Object$freeze2, OBJECTS.DIAL, DEFAULT_PARAMS.concat(["distance", "floatoutput", "mode", "size", "min", "mult", "degrees", "thickness", "bgcolor", "needlecolor", "outlinecolor", "vtracking"])), _defineProperty(_Object$freeze2, OBJECTS.FLONUM, DEFAULT_PARAMS.concat(["value", "fontsize", "fontname", "fontface", "format", "bgcolor", "textcolor", "tricolor", "triscale", "numdecimalplaces", "htricolor", "minimum", "maximum"])), _defineProperty(_Object$freeze2, OBJECTS.FPIC, DEFAULT_PARAMS.concat(["alpha", "destrect", "autofit", "xoffset", "yoffset", "pic"])), _defineProperty(_Object$freeze2, OBJECTS.GAIN, DEFAULT_PARAMS.concat(["value", "size", "orientation", "bgcolor", "stripecolor", "knobcolor", "distance"])), _defineProperty(_Object$freeze2, OBJECTS.KSLIDER, DEFAULT_PARAMS.concat(["value", "blackkeycolor", "hkeycolor", "mode", "offset", "range", "selectioncolor", "whitekeycolor", "rawsend"])), _defineProperty(_Object$freeze2, OBJECTS.LIVE_BUTTON, DEFAULT_PARAMS.concat([PARAMETER_ATTR.LONGNAME, PARAMETER_ATTR.SHORTNAME, PARAMETER_ATTR.RANGE], ["active", "bgcolor", "bgoncolor", "activebgcolor", "activebgoncolor", "bordercolor", "focusbordercolor", "value"])), _defineProperty(_Object$freeze2, OBJECTS.LIVE_DIAL, DEFAULT_PARAMS.concat((0, _values2.default)(PARAMETER_ATTR), ["fontname", "fontsize", "fontface", "active", "activedialcolor", "activeneedlecolor", "appearance", "bordercolor", "dialcolor", "focusbordercolor", "needlecolor", "panelcolor", "showname", "shownumber", "textcolor", "triangle", "tribordercolor", "tricolor", "distance", "value"])), _defineProperty(_Object$freeze2, OBJECTS.LIVE_GRID, DEFAULT_PARAMS.concat(["amountcolor", "bgstepcolor", "bgstepcolor2", "bordercolor", "bordercolor2", "columns", "direction", "direction_height", "directioncolor", "displayamount", "freezecolor", "hbgcolor", "link", "marker_horizontal", "marker_vertical", "matrixmode", "mode", "rounded", "rows", "spacing", "stepcolor", "distance", "touchy", "directions", "setcell", "currentstep", "constraint"])), _defineProperty(_Object$freeze2, OBJECTS.LIVE_NUMBOX, DEFAULT_PARAMS.concat((0, _values2.default)(PARAMETER_ATTR), ["activebgcolor", "active", "activeslidercolor", "activetricolor", "activetricolor2", "appearance", "bordercolor", "focusbordercolor", "textcolor", "tricolor", "tricolor2", "value", "fontname", "fontface", "fontsize"])), _defineProperty(_Object$freeze2, OBJECTS.LIVE_SLIDER, DEFAULT_PARAMS.concat((0, _values2.default)(PARAMETER_ATTR), ["fontname", "fontsize", "fontface", "orientation", "relative", "showname", "shownumber", "slidercolor", "textcolor", "tribordercolor", "trioncolor", "tricolor", "value", "distance"])), _defineProperty(_Object$freeze2, OBJECTS.LIVE_TAB, DEFAULT_PARAMS.concat([PARAMETER_ATTR.LONGNAME, PARAMETER_ATTR.SHORTNAME, PARAMETER_ATTR.RANGE], ["active", "activebgcolor", "activebgoncolor", "bgcolor", "bgoncolor", "blinktime", "bordercolor", "button", "focusbordercolor", "inactivetextoffcolor", "inactivetextoncolor", "mode", "multiline", "num_lines_patching", "num_lines_presentation", "pictures", "rounded", "spacing_x", "spacing_y", "textcolor", "textoncolor", "fontname", "fontsize", "fontface", "value", "usepicture"])), _defineProperty(_Object$freeze2, OBJECTS.LIVE_TEXT, DEFAULT_PARAMS.concat([PARAMETER_ATTR.LONGNAME, PARAMETER_ATTR.SHORTNAME, PARAMETER_ATTR.RANGE], ["activebgcolor", "active", "bgcolor", "activebgoncolor", "bgoncolor", "bordercolor", "textcolor", "activetextoncolor", "activetextcolor", "text", "texton", "value", "fontsize", "fontname", "fontface", "pictures", "usepicture", "mode"])), _defineProperty(_Object$freeze2, OBJECTS.LIVE_TOGGLE, DEFAULT_PARAMS.concat([PARAMETER_ATTR.LONGNAME, PARAMETER_ATTR.SHORTNAME, PARAMETER_ATTR.RANGE], ["bgcolor", "activebgcolor", "bgoncolor", "activebgoncolor", "bordercolor", "focusbordercolor", "value", "rounded", "active"])), _defineProperty(_Object$freeze2, OBJECTS.MESSAGE, DEFAULT_PARAMS.concat(["textfield", "fontsize", "textjustification", "fontname", "fontface", "bgcolor", "bgfillcolor_color", "bgfillcolor_type", "bgfillcolor_pt1", "bgfillcolor_pt2", "bgfillcolor_color1", "bgfillcolor_color2", "bgfillcolor_color", "bgfillcolor_proportion", "bgfillcolor_angle", "textcolor", "value"])), _defineProperty(_Object$freeze2, OBJECTS.METER, DEFAULT_PARAMS.concat(["bgcolor", "offcolor", "ntepidleds", "nwarmleds", "nhotleds", "numleds", "dbperled", "coldcolor", "tepidcolor", "warmcolor", "hotcolor", "overloadcolor", "level"])), _defineProperty(_Object$freeze2, OBJECTS.MIRA_MULTITOUCH, DEFAULT_PARAMS.concat(["color", "hsegments", "vsegments", "region", "pinch", "pinch_enabled", "rotate", "rotate_enabled", "tap", "tap_enabled", "tap_touch_count", "tap_tap_count", "swipe", "swipe_enabled", "swipe_touch_count", "remote_gestures", "remote_circles", "moved_touch", "up_down_cancelled_touch"])), _defineProperty(_Object$freeze2, OBJECTS.MULTISLIDER, DEFAULT_PARAMS.concat(["distance", "ghostbar", "setstyle", "candycane", "size", "setminmax", "orientation", "thickness", "bgcolor", "slidercolor", "candicane2", "candicane3", "candicane4", "candicane5", "candicane6", "candicane7", "candicane8", "peakcolor", "drawpeaks", "signed", "spacing", "settype"])), _defineProperty(_Object$freeze2, OBJECTS.NUMBER, DEFAULT_PARAMS.concat(["value", "fontsize", "fontname", "fontface", "format", "bgcolor", "textcolor", "tricolor", "triscale", "numdecimalplaces", "htricolor", "minimum", "maximum"])), _defineProperty(_Object$freeze2, OBJECTS.PANEL, DEFAULT_PARAMS.concat(["bgcolor", "bgfillcolor_color", "bgfillcolor_type", "bgfillcolor_pt1", "bgfillcolor_pt2", "bgfillcolor_color1", "bgfillcolor_color2", "bgfillcolor_color", "bgfillcolor_proportion", "bgfillcolor_angle", "bordercolor", "border", "rounded", "shape", "horizontal_direction", "vertical_direction", "arrow_orientation"])), _defineProperty(_Object$freeze2, OBJECTS.RSLIDER, DEFAULT_PARAMS.concat(["distance", "size", "min", "mult", "orientation", "drawline", "bgcolor", "bordercolor", "fgcolor"])), _defineProperty(_Object$freeze2, OBJECTS.SLIDER, DEFAULT_PARAMS.concat(["bgcolor", "distance", "elementcolor", "floatoutput", "knobcolor", "knobshape", "min", "mult", "orientation", "relative", "size", "thickness"])), _defineProperty(_Object$freeze2, OBJECTS.SWATCH, DEFAULT_PARAMS.concat(["distance", "value", "compatibility", "saturation"])), _defineProperty(_Object$freeze2, OBJECTS.TOGGLE, DEFAULT_PARAMS.concat(["bgcolor", "checkedcolor", "uncheckedcolor", "thickness", "value"])), _defineProperty(_Object$freeze2, OBJECTS.UMENU, DEFAULT_PARAMS.concat(["arrow", "applycolors", "bgcolor", "bgfillcolor_type", "bgfillcolor_color1", "bgfillcolor_color2", "bgfillcolor_pt1", "bgfillcolor_pt2", "bgfillcolor_color", "bgfillcolor_proportion", "bgfillcolor_angle", "color", "elementcolor", "fontname", "fontsize", "fontface", "items", "menumode", "textcolor", "textjustification", "truncate", "underline", "value"])), _Object$freeze2));

var OPTIONAL_OBJECT_PARAMETERS = exports.OPTIONAL_OBJECT_PARAMETERS = (0, _freeze2.default)((_Object$freeze3 = {}, _defineProperty(_Object$freeze3, OBJECTS.LIVE_TAB, ["pictures"]), _defineProperty(_Object$freeze3, OBJECTS.LIVE_DIAL, ["tribordercolor"]), _defineProperty(_Object$freeze3, OBJECTS.MESSAGE, ["bgfillcolor_angle", "bgfillcolor_proportion"]), _defineProperty(_Object$freeze3, OBJECTS.PANEL, ["bgfillcolor_angle", "bgfillcolor_proportion"]), _defineProperty(_Object$freeze3, OBJECTS.UMENU, ["bgfillcolor_angle", "bgfillcolor_proportion"]), _Object$freeze3));