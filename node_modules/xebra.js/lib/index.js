"use strict";

var _set = require("babel-runtime/core-js/set");

var _set2 = _interopRequireDefault(_set);

var _map = require("babel-runtime/core-js/map");

var _map2 = _interopRequireDefault(_map);

var _stringify = require("babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

var _assign = require("babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _values = require("babel-runtime/core-js/object/values");

var _values2 = _interopRequireDefault(_values);

var _from = require("babel-runtime/core-js/array/from");

var _from2 = _interopRequireDefault(_from);

var _freeze = require("babel-runtime/core-js/object/freeze");

var _freeze2 = _interopRequireDefault(_freeze);

var _setPrototypeOf = require("babel-runtime/core-js/object/set-prototype-of");

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = require("babel-runtime/core-js/object/create");

var _create2 = _interopRequireDefault(_create);

var _keys = require("babel-runtime/core-js/object/keys");

var _keys2 = _interopRequireDefault(_keys);

var _defineProperty = require("babel-runtime/core-js/object/define-property");

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _iterator = require("babel-runtime/core-js/symbol/iterator");

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = require("babel-runtime/core-js/symbol");

var _symbol2 = _interopRequireDefault(_symbol);

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.VERSION = exports.SUPPORTED_OBJECTS = exports.CONNECTION_STATES = exports.State = undefined;

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; (0, _defineProperty2.default)(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _constants = require("./lib/constants.js");

(0, _keys2.default)(_constants).forEach(function (key) {
	if (key === "default" || key === "__esModule") return;
	(0, _defineProperty2.default)(exports, key, {
		enumerable: true,
		get: function get() {
			return _constants[key];
		}
	});
});

var _objectList = require("./lib/objectList.js");

var _resource = require("./lib/resource.js");

var _events = require("events");

var _lodash = require("lodash.pick");

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require("lodash.uniq");

var _lodash4 = _interopRequireDefault(_lodash3);

var _xebraCommunicator = require("xebra-communicator");

var _xebraCommunicator2 = _interopRequireDefault(_xebraCommunicator);

var _index = require("./nodes/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass; }

function isString(v) {
	return typeof v === "string" || v instanceof String;
}

var RESOURCE_REQUEST_DOMAIN = (0, _freeze2.default)({
	INFO: "info",
	DATA: "data"
});

/**
 * List of objects available for synchronization in Xebra. Use this or a subset of this when setting the
 * supported_objects option in Xebra.State.
 *
 * @static
 * @constant
 * @memberof Xebra
 * @type {string[]}
 */
var SUPPORTED_OBJECTS = (0, _freeze2.default)((0, _from2.default)((0, _values2.default)(_objectList.OBJECTS)));

/**
 * @namespace Xebra
 */

// /////////////////////
// Type Definitions   //
// /////////////////////

/**
 * A string or number based id
 * @typedef {number|string} NodeId
 * @memberof Xebra
 */

/**
 * @typedef {number[]} PatchingRect
 * @memberof Xebra
 * @desc Patching Rectangle attribute consisting of 4 Numbers (x, y, width, height)
 */

/**
 * @typedef {number|string|string[]|number[]|object} ParamValueType
 * @memberof Xebra
 * @desc Generic parameter value type
 */

/**
 * @typedef {number[]} Color
 * @memberof Xebra
 * @desc Color attribute consisting of 4 Numbers in the format of [r, g, b, a]
 */

// /////////////////////


/**
 * @desc State instances wrap the state sync and connection with the Max backend.
 * @class
 */

var State = function (_EventEmitter) {
	_inherits(State, _EventEmitter);

	/**
  * @param  {Object} options
  * @param  {Boolean} options.auto_connect=true - Whether to autoconnect on startup
  * @param  {String} options.hostname - The host of the Xebra backend
  * @param  {Number} options.port - The port of the Xebra backend
  * @param  {Boolean} options.secure=false - Whether to use a secure WS connection or not (ws vs wss)
  * @param  {Boolean} options.reconnect=true - Whether to try auto-reconnecting after the connection closed
  * @param  {Number} options.reconnect_attempts=5 - The amount of retries before considering it a failure
  * @param  {Number} options.reconnect_timeout=1000 - Timeout between reconnects in ms
  * @param  {string[]} options.supported_objects - List of objects to include in the state
  */
	function State(options) {
		_classCallCheck(this, State);

		var _this = _possibleConstructorReturn(this, (State.__proto__ || (0, _getPrototypeOf2.default)(State)).call(this));

		_this._onConnectionChange = function (status) {
			/**
    * This event is emitted when the state of the web socket connection to the Max patch (ConnectionState) changes.
    * @event State.connection_changed
    */
			_this.emit("connection_changed", status);
		};

		_this._onGetResourceInfo = function (resource) {
			_this._makeResourceRequest(resource.objectContext, resource, "info");
		};

		_this._onNodeChange = function (object, param) {
			if (object.type === _objectList.OBJECTS.MIRA_FRAME) {
				/**
     * This event is emitted when a parameter of a frame is changed. This change can come from Max or when the value
     * of the parameter is set directly.
     * @event State.frame_changed
     * @param {FrameNode}				frame     The changed frame
     * @param {ParamNode}		param      The parameter node
     */
				if (object.isReady) _this.emit("frame_changed", object, param);
			}
			if (object.type === _objectList.OBJECTS.PATCHER) {
				/**
     * This event is emitted when a parameter of a patcher is changed. This change can come from Max or when the
     * value of the parameter is set directly.
     * @event State.patcher_changed
     * @param {PatcherNode}    patcher    The changed patcher
     * @param {ParamNode}  param      The parameter node
     */
				if (object.isReady) _this.emit("patcher_changed", object, param);
			}

			/**
    * This event is emitted when a parameter of an object is changed. This change can come from Max or when the value
    * of the parameter is set directly.
    * @event State.object_changed
    * @param {ObjectNode} object     The changed object
    * @param {ParamNode}  param      The parameter node
    */
			if (object.isReady) _this.emit("object_changed", object, param);
		};

		_this._onNodeInitialized = function (object) {
			_this.emit("object_added", object);
		};

		_this._onFrameInitialized = function (frame) {
			_this.emit("frame_added", frame);
		};

		_this._onPatcherInitialized = function (patcher) {
			_this.emit("patcher_added", patcher);
		};

		_this._onModifiyNodeChange = function (object, param) {
			var val = param.value;
			if (!Array.isArray(val)) val = [val];

			_this._communicator.sendModifyMessage({
				id: param.id,
				sequence: param.sequence,
				creation_sequence: param.creationSequence,
				values: val,
				types: param.types
			});
		};

		_this._addNode = function (data) {

			var node = (0, _index.getInstanceForObjectType)(data.id, data.type, data.sequence, data.parent_id);

			// patchers and frames are handled differently as we have to put them into the correct
			// list other than just adding them to the statetree.
			if (node.type === _objectList.OBJECTS.PATCHER) {
				_this._addPatcher(node);

				/**
     * This event is emitted when a patcher is added in Max.
     * @event State.patcher_added
     * @param {PatcherNode} object The added patcher
     */
				if (node.isReady) {
					_this.emit("patcher_added", node);
				} else {
					node.once("initialized", _this._onPatcherInitialized);
				}
			} else if (data.type === _objectList.OBJECTS.MIRA_FRAME) {
				var parentPatcher = _this._getPatcher(data.parent_id);
				parentPatcher.addFrame(node);

				/**
     * This event is emitted when a frame is added in Max.
     * @event State.frame_added
     * @param {FrameNode} object The added frame
     */
				if (node.isReady) {
					_this.emit("frame_added", node);
				} else {
					node.once("initialized", _this._onFrameInitialized);
				}
			} else {
				// object node
				var _parentPatcher = _this._getPatcher(data.parent_id);
				_parentPatcher.addObject(node);

				if (node.type === _objectList.OBJECTS.MIRA_MOTION) _this._addMotion(node);
			}

			_this._doInsertNode(node);

			/**
    * This event is emitted when an object is added in Max.
    * @event State.object_added
    * @param {ObjectNode} object The added object
    */
			if (node.isReady) {
				_this.emit("object_added", node);
			} else {
				node.once("initialized", _this._onNodeInitialized);
			}
		};

		_this._addParam = function (data) {
			var parent = _this._state.get(data.parent_id);
			var param = new _index.ParamNode(data.id, data.type, data.sequence);

			_this._state.set(param.id, param);

			parent.addParam(param);
		};

		_this._channelMessage = function (channel, message) {
			/**
    * This event is emitted when a message is sent to a mira.channel object
    * @event State.channel_message_received
    * @param {String} channel The name of the channel where the message was received
    * @param {Number|String|Array<Number|String>|Object} message The message received from Max
    */
			_this.emit("channel_message_received", channel, message);
		};

		_this._clientParamChange = function (key, value) {
			/**
    * Client param change event
    * @private
    * @event State#client_param_changed
    * @param {String} key
    * @param {String} value
    */
			_this.emit("client_param_changed", key, value);
		};

		_this._deleteNode = function (data) {
			var node = _this._state.get(data.id);
			if (!node) return;

			var parentPatcher = _this._getPatcher(node.patcherId);

			// remove frame from parent patcher
			if (node.type === _objectList.OBJECTS.MIRA_FRAME) {
				if (parentPatcher) parentPatcher.removeFrame(node.id);

				/**
     * This event is emitted when a frame is removed from Max.
     * @event State.frame_removed
     * @param {FrameNode} object The removed frame
     */
				if (node.isReady) _this.emit("frame_removed", node);
			} else if (node.type === _objectList.OBJECTS.PATCHER) {

				/**
     * This event is emitted when a patcher is removed from Max.
     * @event State.patcher_removed
     * @param {PatcherNode} object The removed patcher
     */
				if (node.isReady) _this.emit("patcher_removed", node);
			} else {
				if (parentPatcher) parentPatcher.removeObject(node.id);
			}

			if (node.type === _objectList.OBJECTS.MIRA_MOTION) _this._removeMotion(node);

			_this._destroyNode(node);

			/**
    * This event is emitted when an object is removed from Max.
    * @event State.object_removed
    * @param {ObjectNode} object The removed object
    */
			if (node.isReady) _this.emit("object_removed", node);
		};

		_this._handleResourceData = function (data) {
			if (data.request) {
				var sequence = data.request.sequence;
				var resource = _this._resourceRequests.data.sequenceToResource[sequence];
				if (resource) {
					resource.handleData(data);
					delete _this._resourceRequests.data.resourceToSequence[resource.id];
					delete _this._resourceRequests.data.sequenceToResource[sequence];
				}
			}
		};

		_this._handleResourceInfo = function (data) {
			if (data.request) {
				var sequence = data.request.sequence;
				var resource = _this._resourceRequests.info.sequenceToResource[sequence];
				if (resource) {
					_this._makeResourceRequest(data.request.context, resource, "data");
					delete _this._resourceRequests.info.resourceToSequence[resource.id];
					delete _this._resourceRequests.info.sequenceToResource[sequence];
				}
			} else {
				console.log("Could not handle badly formatted resource info response", data);
			}
		};

		_this._modifyNode = function (data) {
			var node = _this._state.get(data.id);
			if (node) node.modify(data.values, data.types, data.sequence);
		};

		_this._statedump = function (data) {
			/**
    * This event is emitted when the web socket connection is persistently interrupted to the point that the xebra
    * state and Max state fall out of sync. In this case, xebra will attempt to reset and rebuild the state, which
    * fires this event. This should happen very infrequently. A state#loaded event will fire when this event fires.
    * @event State.reset
    */
			if (_this._state) {
				_this.emit("reset");
			}

			_this._resetState();

			for (var i = 0, il = data.messages.length; i < il; i++) {
				var msg = data.messages[i];
				if (msg.message === _xebraCommunicator2.default.XEBRA_MESSAGES.ADD_NODE) {
					_this._addNode(msg.payload);
				} else if (msg.message === _xebraCommunicator2.default.XEBRA_MESSAGES.ADD_PARAM) {
					_this._addParam(msg.payload);
				} else if (msg.message === _xebraCommunicator2.default.XEBRA_MESSAGES.MODIFY_NODE) {
					_this._modifyNode(msg.payload, true);
				}
			}

			/**
    * This event is emitted when the entire Max state has been loaded. At this point, all `frame_added`,
    * `object_added`, and `patcher_added` events will have fired, and all of their parameters will have been
    * loaded. This is analogous to $(document).ready() in jQuery.
    * @event State.loaded
    */
			_this._isStateLoaded = true;
			_this.emit("loaded");
		};

		var commOptions = (0, _lodash2.default)(options, ["auto_connect", "hostname", "port", "secure", "reconnect", "reconnect_attempts", "reconnect_timeout"]);
		if (!options.supported_objects) options.supported_objects = SUPPORTED_OBJECTS;

		commOptions.supported_objects = (0, _assign2.default)({}, _objectList.MANDATORY_OBJECTS);
		options.supported_objects.forEach(function (objDetails) {
			if (isString(objDetails)) {
				var params = _objectList.OBJECT_PARAMETERS[objDetails];
				if (params) {
					commOptions.supported_objects[objDetails] = params;
					return;
				}

				if (!_objectList.MANDATORY_OBJECTS.hasOwnProperty(objDetails)) {
					console.log("WARN: Unsupported or unknown object " + objDetails + ". Please use the { name : \"\"<obj_name>\", parameters: [\"param_1\", \"param_2\"] } syntax for non built-in objects.");
					return;
				}
			} else if ((typeof objDetails === "undefined" ? "undefined" : _typeof(objDetails)) === "object") {
				if (!objDetails.name || !isString(objDetails.name) || !objDetails.parameters || !Array.isArray(objDetails.parameters)) {
					console.log("WARN: Skipping object defintion '" + (0, _stringify2.default)(objDetails) + "' Please declare objects using their name or the { name : \"\"<obj_name>\", parameters: [\"param_1\", \"param_2\"] } syntax.");
					return;
				}

				// make sure that all required parameters are in place
				var _params = _objectList.DEFAULT_PARAMS.concat(objDetails.parameters);
				_params = (0, _lodash4.default)(_params);
				commOptions.supported_objects[objDetails.name] = _params;

				return;
			}

			console.log("WARN: Skipping object defintion '" + objDetails + "' Please declare objects using their name or the { name : \"\"<obj_name>\", parameters: [\"param_1\", \"param_2\"] } syntax.");
			return;
		});

		_this._communicator = new _xebraCommunicator2.default(commOptions);
		_this._communicator.on(_xebraCommunicator2.default.XEBRA_MESSAGES.CONNECTION_CHANGE, _this._onConnectionChange);

		_this._communicator.on(_xebraCommunicator2.default.XEBRA_MESSAGES.ADD_NODE, _this._addNode);
		_this._communicator.on(_xebraCommunicator2.default.XEBRA_MESSAGES.ADD_PARAM, _this._addParam);
		_this._communicator.on(_xebraCommunicator2.default.XEBRA_MESSAGES.CHANNEL_MESSAGE, _this._channelMessage);
		_this._communicator.on(_xebraCommunicator2.default.XEBRA_MESSAGES.DELETE_NODE, _this._deleteNode);
		_this._communicator.on(_xebraCommunicator2.default.XEBRA_MESSAGES.HANDLE_RESOURCE_DATA, _this._handleResourceData);
		_this._communicator.on(_xebraCommunicator2.default.XEBRA_MESSAGES.HANDLE_RESOURCE_INFO, _this._handleResourceInfo);
		_this._communicator.on(_xebraCommunicator2.default.XEBRA_MESSAGES.INIT_NODE, _this._modifyNode);
		_this._communicator.on(_xebraCommunicator2.default.XEBRA_MESSAGES.MODIFY_NODE, _this._modifyNode);
		_this._communicator.on(_xebraCommunicator2.default.XEBRA_MESSAGES.STATEDUMP, _this._statedump);
		_this._communicator.on(_xebraCommunicator2.default.XEBRA_MESSAGES.CLIENT_param_changed, _this._clientParamChange);

		_this._resourceRequests = {
			info: {
				sequence: 0,
				resourceToSequence: {},
				sequenceToResource: {}
			},
			data: {
				sequence: 0,
				resourceToSequence: {},
				sequenceToResource: {}
			}
		};

		_this._isStateLoaded = false;
		_this._rootNode = null;
		_this._state = new _map2.default();
		_this._patchers = new _map2.default();
		_this._motionNodes = new _map2.default();
		_this._resourceController = new _resource.ResourceController();
		_this._resourceController.on("get_resource_info", _this._onGetResourceInfo);
		return _this;
	}

	/**
  * Returns whether motion tracking is currently enabled/disabled.
  * @type {boolean}
  * @readonly
  */


	_createClass(State, [{
		key: "_makeResourceRequest",


		/* Connection related events */

		/**
   * @private
   * @throws throws an Error when the RESOURCE_REQUEST_DOMAIN is invalid
   */
		value: function _makeResourceRequest(context, resource, domain) {
			if (domain !== RESOURCE_REQUEST_DOMAIN.INFO && domain !== RESOURCE_REQUEST_DOMAIN.DATA) {
				throw new Error("Resource request domain must be one of: " + RESOURCE_REQUEST_DOMAIN.DATA + ", " + RESOURCE_REQUEST_DOMAIN.INFO);
			}

			// If there was a previous request from this resource, remove it
			if (this._resourceRequests[domain].resourceToSequence.hasOwnProperty(resource.id)) {
				var oldSequence = this._resourceRequests[domain].resourceToSequence[resource.id];
				delete this._resourceRequests[domain].sequenceToResource[oldSequence];
			}

			var sequence = ++this._resourceRequests[domain].sequence;
			this._resourceRequests[domain].resourceToSequence[resource.id] = sequence;
			this._resourceRequests[domain].sequenceToResource[sequence] = resource;
			var payload = {
				context: context,
				name: resource.filename,
				width: resource.dimensions.width,
				height: resource.dimensions.height,
				sequence: sequence,
				as_png: 1 // This asks Max to render SVG surfaces to PNG instead of raw bytes
			};

			if (domain === RESOURCE_REQUEST_DOMAIN.INFO) {
				this._communicator.getResourceInfo(payload);
			} else if (domain === RESOURCE_REQUEST_DOMAIN.DATA) {
				this._communicator.getResourceData(payload);
			}
		}

		/**
   * @private
   */


		/**
   * @private
   */


		/**
   * @private
   * @fires State.frame_changed
   * @fires State.object_changed
   * @fires State.patcher_changed
   */


		/**
   * @private
   */


		/**
   * @private
   */


		/**
   * @private
   */


		/**
   * @private
   */

	}, {
		key: "_addMotion",


		/**
   * @private
   */
		value: function _addMotion(node) {
			this._motionNodes.set(node.id, node);

			if (this._motionNodes.size === 1) {
				/**
     * This event is emitted when there is at least one mira.motion object in Max.
     * @event State.motion_enabled
     */
				this.emit("motion_enabled");
			}
		}

		/**
   * @private
   */

	}, {
		key: "_getMotion",
		value: function _getMotion(id) {
			return this._motionNodes.get(id) || null;
		}

		/**
   * @private
   */

	}, {
		key: "_removeMotion",
		value: function _removeMotion(node) {
			this._motionNodes.delete(node.id);
			if (this._motionNodes.size === 0) {
				/**
     * This event is emitted when the last mira.motion object is removed from Max. This event is not emitted when
     * xebra first connects to Max, and there are no mira.motion objects in Max.
     * @event State.motion_disabled
     */
				this.emit("motion_disabled");
			}
		}

		/**
   * @private
   */

	}, {
		key: "_addPatcher",
		value: function _addPatcher(node) {
			this._patchers.set(node.id, node);
		}

		/**
   * @private
   */

	}, {
		key: "_getPatcher",
		value: function _getPatcher(id) {
			return this._patchers.get(id) || null;
		}

		/**
   * @private
   */

	}, {
		key: "_removePatcher",
		value: function _removePatcher(node) {
			this._patchers.delete(node.id);
		}

		/**
   * @private
   *
   * @listens ObjectNode.param_changed
   * @listens ObjectNode#param_set
   * @fires State.frame_added
   * @fires State.object_added
   * @fires State.patcher_added
   */

	}, {
		key: "_doInsertNode",


		/**
   * @private
   */
		value: function _doInsertNode(node) {
			this._state.set(node.id, node);
			node.on("param_changed", this._onNodeChange);
			node.on("param_set", this._onModifiyNodeChange);
			if (node.resourceController) node.resourceController.on("get_resource_info", this._onGetResourceInfo);
		}

		/**
   * @private
   */


		/**
   * @private
   */


		/**
   * @private
   */


		/**
   * @private
   * @fires State.frame_removed
   * @fires State.object_removed
   * @fires State.patcher_removed
   */

	}, {
		key: "_destroyNode",
		value: function _destroyNode(node) {
			var _this2 = this;

			node.destroy();

			node.forEachChild(function (child) {
				if (child instanceof _index.ParamNode) _this2._destroyNode(child);
			}, this);

			this._state.delete(node.id);
		}

		/**
   * private
   */

		/**
   * @private
   */


		/**
   * @private
   */

	}, {
		key: "_resetState",


		/**
   * @private
   */
		value: function _resetState() {
			// destroy all old nodes
			if (this._state) {
				this._state.forEach(function (node) {
					node.destroy();
				});
				this._state.clear();
			}

			this._isStateLoaded = false;
			this._state = new _map2.default();
			this._patchers = new _map2.default();

			// reset motion
			this._motionNodes = new _map2.default();
			this.emit("motion_disabled");

			this._rootNode = new _index.ObjectNode(0, "root");
			this._doInsertNode(this._rootNode);
		}

		/**
   * Closes the Xebra connection and resets the state.
   */

	}, {
		key: "close",
		value: function close() {
			this._communicator.close();
			this._resetState();
		}

		/**
   * Connects to the Xebra server. If `auto_connect : true` is passed to State on.
   */

	}, {
		key: "connect",
		value: function connect() {
			this._communicator.connect();
		}

		/**
   * Create a {@link Resource}, which can be used to retrieve image data from the Max search path.
   * @return {Resource}
   */

	}, {
		key: "createResource",
		value: function createResource() {
			return this._resourceController.createResource();
		}

		/**
   * Send an arbitrary message to the named channel. The type of the message will be coerced to
   * a Max type in the Max application by mira.channel
   * @param {String} channel - The name of the mira.channel objects that should receive this message
   * @param {Number|String|Array<Number|String>|Object} message - the message to send
   */

	}, {
		key: "sendMessageToChannel",
		value: function sendMessageToChannel(channel, message) {
			this._communicator.sendChannelMessage(channel, message);
		}

		/**
   * Send mira.motion updates to parameters on the root node.
   * @see Xebra.MOTION_TYPES
   * @param {string} motionType - The type of motion
   * @param {number} motionX
   * @param {number} motionY
   * @param {number} motionZ
   * @param {number} timestamp
   * @throws Will throw an error when motion is currently disabled on the instance of State.
   */

	}, {
		key: "sendMotionData",
		value: function sendMotionData(motionType, motionX, motionY, motionZ, timestamp) {
			var xuuid = this.xebraUuid;
			if (!xuuid) return;

			if (!this.isMotionEnabled) throw new Error("Can't send motion data when motion is disabled");

			this._rootNode.setParamValue(motionType, [xuuid, xuuid, motionX, motionY, motionZ, timestamp]);
		}

		/**
   * Returns a list of the names of all mira.channel objects in all patchers
   * @return {string[]}
   */

	}, {
		key: "getChannelNames",
		value: function getChannelNames() {
			var names = new _set2.default();
			this._patchers.forEach(function (patcher) {
				patcher.getChannelNames().forEach(function (name) {
					names.add(name);
				});
			});
			return (0, _from2.default)(names);
		}

		/**
   * Returns a list of available patchers.
   * @return {PatcherNode[]}
   */

	}, {
		key: "getPatchers",
		value: function getPatchers() {
			return (0, _from2.default)(this._patchers.values());
		}

		/**
   * Returns a list of node objects with the given scripting name (the Max attribute 'varname').
   * @return {ObjectNode[]}
   */

	}, {
		key: "getObjectsByScriptingName",
		value: function getObjectsByScriptingName(scriptingName) {
			var retVal = [];
			this._patchers.forEach(function (patcher, id) {
				var obj = patcher.getObjectByScriptingName(scriptingName);
				if (obj) retVal.push(obj);
			});
			return retVal;
		}
		/**
   * Returns the object speficied by the given id.
   * @param {Xebra.NodeId} id - The id of the object
   * @return {ObjectNode|null} the object or null if not known
  */

	}, {
		key: "getObjectById",
		value: function getObjectById(id) {
			var node = this._state.get(id);
			if (!node || !(node instanceof _index.ObjectNode)) return null;
			return node;
		}

		/**
   * Returns the patcher speficied by the given id.
   * @param {Xebra.NodeId} id - The id of the patcher
   * @return {PatcherNode|null} the patcher or null if not known
  */

	}, {
		key: "getPatcherById",
		value: function getPatcherById(id) {
			return this._patchers.get(id) || null;
		}
	}, {
		key: "isMotionEnabled",
		get: function get() {
			return this._motionNodes.size > 0;
		}

		/**
   * Returns the current connection state.
   * @type {number}
   * @readonly
   * @see {Xebra.CONNECTION_STATES}
   */

	}, {
		key: "connectionState",
		get: function get() {
			return this._communicator.connectionState;
		}

		/**
   * Name of the current xebra connection. For some Max objects, like mira.motion and mira.multitouch, multiple xebra
   * clients (connected via Xebra.js or the Mira iOS app) can send events to the same object. This name property will
   * be appended to these events, so that the events can be routed in Max.
   * @type {string}
   */

	}, {
		key: "name",
		get: function get() {
			return this._communicator.name;
		},
		set: function set(name) {
			this._communicator.name = name;
		}

		/**
   * Hostname of the Max WebSocket.
   * @type {string}
   * @readonly
   */

	}, {
		key: "hostname",
		get: function get() {
			return this._communicator.host;
		}

		/**
   * Returns whether the initial state has been received from Max and loaded.
   * @type {boolean}
   * @readonly
   */

	}, {
		key: "isStateLoaded",
		get: function get() {
			return this._isStateLoaded;
		}

		/**
   * Returns the port number of the Max WebSocket.
   * @type {number}
   * @readonly
   */

	}, {
		key: "port",
		get: function get() {
			return this._communicator.port;
		}

		/**
   * WebSocket connection URL.
   * @type {string}
   * @readonly
   */

	}, {
		key: "wsUrl",
		get: function get() {
			return this._communicator.wsUrl;
		}

		/**
   * UUID associated with this state.
   * @type {string}
   * @readonly
   */

	}, {
		key: "uuid",
		get: function get() {
			return this._communicator.uuid;
		}

		/**
   * UID assigned to this state by Max, after connection.
   * @private
   * @readonly
   */

	}, {
		key: "xebraUuid",
		get: function get() {
			return this._communicator.xebraUuid;
		}
	}]);

	return State;
}(_events.EventEmitter);

exports.State = State;

// constants

/**
 * Connection States
 * @static
 * @constant
 * @memberof Xebra
 * @type {object}
 * @property {number} INIT - The connection hasn't been set up yet, it's still waiting for a call to connect (unless
 *     auto_connect is set to true)
 * @property {number} CONNECTING - The connection is being established
 * @property {number} CONNECTED - The connection is established and alive
 * @property {number} CONNECTION_FAIL - The connection could NEVER be established
 * @property {number} RECONNECTING - The connection was lost and attempts to reconnect are made (based on reconnect,
 *     reconnect_attempts and reconnect_timeout options)
 * @property {number} DISCONNECTED - The connection was lost and all attempts to reconnect failed
 */

var CONNECTION_STATES = _xebraCommunicator2.default.CONNECTION_STATES;
var VERSION = _xebraCommunicator2.default.XEBRA_VERSION;

exports.CONNECTION_STATES = CONNECTION_STATES;
exports.SUPPORTED_OBJECTS = SUPPORTED_OBJECTS;
exports.VERSION = VERSION;