"use strict";

var _setPrototypeOf = require("babel-runtime/core-js/object/set-prototype-of");

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = require("babel-runtime/core-js/object/create");

var _create2 = _interopRequireDefault(_create);

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _getOwnPropertyDescriptor = require("babel-runtime/core-js/object/get-own-property-descriptor");

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _defineProperty = require("babel-runtime/core-js/object/define-property");

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _isIterable2 = require("babel-runtime/core-js/is-iterable");

var _isIterable3 = _interopRequireDefault(_isIterable2);

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = (0, _getIterator3.default)(arr), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if ((0, _isIterable3.default)(Object(arr))) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; (0, _defineProperty2.default)(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = (0, _getOwnPropertyDescriptor2.default)(object, property); if (desc === undefined) { var parent = (0, _getPrototypeOf2.default)(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _constants = require("../lib/constants.js");

var _objectList = require("../lib/objectList.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass; }

function clamp(v, lo, hi) {
	return v < hi ? v > lo ? v : lo : hi;
}

function alignStep(min, max, value, steps) {
	var range = max - min;
	var singleStep = range / steps;
	return Math.floor(value / singleStep) * singleStep;
}

/**
 * Certain live.* objects, for example live.slider and live.dial, manage their internal state using two separate but
 * related parameters: "distance" and "value". The "distance" parameter is always a value between 0 and 1, ignoring the
 * range and possible nonlinear scaling applied to the object. The "value" parameter is the one that the object will
 * display, and is computed by applying the exponent and range parameters to the "distance" parameter. This mixin
 * simply performs this calculation automatically whenever the "distance" parameter is set.
 *
 * @mixin LiveScalingObjectMixin
 * @example
 * // dialNode is the ObjectNode for the live.dial
 * dialNode.setParamValue("_parameter_range", [10, 20]);
 * dialNode.setParamValue("_parameter_exponent", 1);
 * dialNode.setParamValue("distance", 0.5);
 * dialNode.getParamValue("value"); // returns 15
 *
 * dialNode.setParamValue("_parameter_exponent", 2);
 * dialNode.getParamValue("value"); // returns 12.5
 */

exports.default = function (objClass) {
	return function (_objClass) {
		_inherits(_class, _objClass);

		function _class(id, type, creationSeq, patcherId) {
			_classCallCheck(this, _class);

			var _this = _possibleConstructorReturn(this, (_class.__proto__ || (0, _getPrototypeOf2.default)(_class)).apply(this, arguments));

			_this._ignoredValueSeq = 0;
			return _this;
		}

		/**
   * @ignore
   * @override
   * @memberof LiveScalingObjectMixin
   * @instance
   */


		_createClass(_class, [{
			key: "setParamValue",
			value: function setParamValue(type, value) {
				// Handle live.slider and live.dial distance
				if (type === "distance") {

					var distParam = this._getParamForType(type);

					if (!distParam) return;

					var dist = clamp(value, 0, 1);

					var parameterType = this.getParamValue(_objectList.PARAMETER_ATTR.TYPE);
					var parameterSteps = this.getParamValue(_objectList.PARAMETER_ATTR.STEPS);

					var _getParamValue = this.getParamValue(_objectList.PARAMETER_ATTR.RANGE),
					    _getParamValue2 = _slicedToArray(_getParamValue, 2),
					    min = _getParamValue2[0],
					    max = _getParamValue2[1];

					// Steps and enum handler


					if (parameterType === _constants.LIVE_VALUE_TYPES.ENUM) {
						min = 0;
						max = this.getParamValue(_objectList.PARAMETER_ATTR.RANGE).length - 1;

						dist = alignStep(0, 1, dist, max);
					} else if (parameterSteps > 1) {
						dist = alignStep(0, 1, dist, parameterSteps - 1);
					} else if (parameterType === _constants.LIVE_VALUE_TYPES.INT) {
						dist = alignStep(0, 1, dist, max - min);
					}

					// set distance
					distParam.value = dist;

					// calc and set scaled value
					var valueParam = this._getParamForType("value");
					if (!valueParam) return;

					var expDist = dist;
					var pExpo = this.getParamValue(_objectList.PARAMETER_ATTR.EXPONENT) || 1;
					if (pExpo !== 1) expDist = Math.pow(expDist, pExpo);

					var val = expDist * (max - min) + min;
					if (parameterType !== _constants.LIVE_VALUE_TYPES.FLOAT) val = Math.round(val);

					valueParam.modify(val, valueParam.types, valueParam.remoteSequence + 1);
				}
				// Handle live.numbox
				else if (type === "value" && this.type === _objectList.OBJECTS.LIVE_NUMBOX) {

						var _parameterType = this.getParamValue(_objectList.PARAMETER_ATTR.TYPE);
						var _parameterSteps = this.getParamValue(_objectList.PARAMETER_ATTR.STEPS);

						var _ref = _parameterType === _constants.LIVE_VALUE_TYPES.ENUM ? [0, this.getParamValue(_objectList.PARAMETER_ATTR.RANGE).length - 1] : this.getParamValue(_objectList.PARAMETER_ATTR.RANGE),
						    _ref2 = _slicedToArray(_ref, 2),
						    _min = _ref2[0],
						    _max = _ref2[1];

						var _val = clamp(value, _min, _max);

						if (_parameterType === _constants.LIVE_VALUE_TYPES.ENUM) {
							_val = alignStep(_min, _max, _val, _max);
						} else if (_parameterSteps > 1) {
							_val = alignStep(_min, _max, _val, _parameterSteps - 1);
						} else {
							_val = Math.round(_val);
						}

						var param = this._getParamForType(type);
						if (param) param.value = _val;
					} else {
						_get(_class.prototype.__proto__ || (0, _getPrototypeOf2.default)(_class.prototype), "setParamValue", this).call(this, type, value);
						return;
					}
			}
		}]);

		return _class;
	}(objClass);
};

module.exports = exports["default"];