/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';

	__webpack_require__(1);

	var _express = __webpack_require__(2);

	var _express2 = _interopRequireDefault(_express);

	var _graphqlServerExpress = __webpack_require__(3);

	var _bodyParser = __webpack_require__(4);

	var _bodyParser2 = _interopRequireDefault(_bodyParser);

	var _mongoose = __webpack_require__(5);

	var _mongoose2 = _interopRequireDefault(_mongoose);

	var _firebase = __webpack_require__(6);

	var firebase = _interopRequireWildcard(_firebase);

	var _index = __webpack_require__(7);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// Firebase
	var firebaseConfig = {
	  apiKey: process.env.FIREBASE_API,
	  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
	  databaseURL: process.env.FIREBASE_URL,
	  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
	  messagingSenderId: process.env.FIREBASE_MESSAGING_ID
	};

	firebase.initializeApp(firebaseConfig);

	// Express
	var app = (0, _express2.default)();

	app.set('port', process.env.PORT || 5000);
	app.use(_express2.default.static(__dirname + '/public'));

	app.use('/graphql', _bodyParser2.default.json(), (0, _graphqlServerExpress.graphqlExpress)({
	  schema: _index.graphqlSchema
	}));

	app.use('/graphiql', (0, _graphqlServerExpress.graphiqlExpress)({
	  endpointURL: '/graphql'
	}));

	app.get('/', function (request, response) {
	  response.send('Check Your Rep!');
	});

	app.listen(app.get('port'), function () {
	  console.log("Node app is running at localhost:" + app.get('port'));
	});
	/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("dotenv/config");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("graphql-server-express");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("body-parser");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("mongoose");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("firebase");

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _graphqlTools = __webpack_require__(8);

	var _underscore = __webpack_require__(9);

	var _underscore2 = _interopRequireDefault(_underscore);

	var _congressSchema = __webpack_require__(10);

	var _congressSchema2 = _interopRequireDefault(_congressSchema);

	var _congressResolvers = __webpack_require__(11);

	var _congressResolvers2 = _interopRequireDefault(_congressResolvers);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports.graphqlSchema = (0, _graphqlTools.makeExecutableSchema)({
	  typeDefs: _congressSchema2.default,
	  resolvers: _congressResolvers2.default
	});

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = require("graphql-tools");

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = require("underscore");

/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// GraphQL
	var propublicaSchema = "\n  type Subject {\n    name: String,\n  }\n\n  type Action {\n    datetime: String,\n    description: String,\n  }\n\n  type Bill {\n    number: String,\n    bill_uri: String,\n    title: String,\n    summary: String,\n    sponsor: String,\n    introduced_date: String,\n    cosponsors: Int,\n    actions: [Action],\n    subjects: [Subject],\n  }\n\n  type Member {\n    id: String,\n    thomas_id: String,\n    api_uri: String,\n    first_name: String,\n    middle_name: String,\n    last_name: String,\n    party: String,\n    twitter_account: String,\n    facebook_account: String,\n    facebook_id: String,\n    url: String,\n    rss_url: String,\n    domain: String,\n    dw_nominate: String,\n    ideal_point: String,\n    seniority: String,\n    next_election: String,\n    total_votes: String,\n    missed_votes: String,\n    total_present: String,\n    state: String,\n    missed_votes_pct: String,\n    votes_with_party_pct: String,\n  }\n\n  type MemberBill {\n    congress: String,\n    number: String\n    bill: String,\n    url_number: String,\n    title: String,\n    sponsor: String,\n    sponsor_id: String,\n    introduced_date: String,\n    number_of_cosponsors: String,\n    committees: String,\n    latest_major_action_date: String,\n    latest_major_action: String,\n    house_passage_vote: String,\n    senate_passage_vote: String,\n    subjects: [Subject],\n  }\n\n  # the schema allows the following query:\n  type RootQuery {\n    bill(billId: String): Bill,\n    bills(chamber: String, type: String): [ Bill ],\n    billsByKeywords(keywords: [ String ]): [ Bill ],\n    member(chamber: String, first_name: String, last_name: String): Member,\n    members(chamber: String): [ Member ],\n    memberBills(memberId: String, type: String): [ Bill ],\n    memberBillsByName(chamber: String, first_name: String, last_name: String, type: String): [ Bill ],\n  }\n\n  # we need to tell the server which types represent the root query\n  # and root mutation types. We call them RootQuery and RootMutation by convention.\n  schema {\n    query: RootQuery\n  }\n";
	exports.default = propublicaSchema;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _propublicaConnector = __webpack_require__(12);

	var _sunlightConnector = __webpack_require__(14);

	var resolvers = {
	  RootQuery: {
	    bill: function bill(_, _ref) {
	      var billId = _ref.billId;

	      return _propublicaConnector.congress.getOne(billId).then(function (bill) {
	        return bill;
	      }).catch(function (err) {
	        throw err;
	      });
	    },
	    bills: function bills(_, _ref2) {
	      var chamber = _ref2.chamber,
	          type = _ref2.type;

	      return _propublicaConnector.congress.getRecent(chamber, type).then(function (bills) {
	        return bills;
	      }).catch(function (err) {
	        throw err;
	      });
	    },
	    billsByKeywords: function billsByKeywords(_, _ref3) {
	      var keywords = _ref3.keywords,
	          date = _ref3.date;

	      return _sunlightConnector.congress.getBillsByKeywords(keywords, date).then(function (bills) {
	        return bills;
	      }).catch(function (err) {
	        throw err;
	      });
	    },
	    member: function member(_, _ref4) {
	      var chamber = _ref4.chamber,
	          first_name = _ref4.first_name,
	          last_name = _ref4.last_name;

	      return _propublicaConnector.congress.getMember(chamber, first_name, last_name).then(function (member) {
	        return member;
	      }).catch(function (err) {
	        throw err;
	      });
	    },
	    members: function members(_, _ref5) {
	      var chamber = _ref5.chamber;

	      return _propublicaConnector.congress.getMembers(chamber).then(function (members) {
	        return members;
	      }).catch(function (err) {
	        throw err;
	      });
	    },
	    memberBills: function memberBills(_, _ref6) {
	      var memberId = _ref6.memberId,
	          type = _ref6.type;

	      return _propublicaConnector.congress.getMemberBills(memberId, type).then(function (bills) {
	        return bills;
	      }).catch(function (err) {
	        throw err;
	      });
	    },
	    memberBillsByName: function memberBillsByName(_, _ref7) {
	      var chamber = _ref7.chamber,
	          first_name = _ref7.first_name,
	          last_name = _ref7.last_name,
	          type = _ref7.type;

	      return _propublicaConnector.congress.getMember(chamber, first_name, last_name).then(function (member) {
	        return _propublicaConnector.congress.getMemberBills(member.id, type);
	      }).then(function (bills) {
	        return bills;
	      }).catch(function (err) {
	        throw err;
	      });
	    }
	  }
	};

	exports.default = resolvers;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _requestPromise = __webpack_require__(13);

	var _requestPromise2 = _interopRequireDefault(_requestPromise);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var PROPUBLICA_API_KEY = process.env.PROPUBLICA_API_KEY;
	var propublicaURL = 'https://api.propublica.org/congress/v1/';

	// Propublica

	/**
	 * Get a Bill's subjects
	 * @param {string} billId Bill slug
	 **/

	var billSubjects = function billSubjects(billId) {
	  var options = {
	    method: 'GET',
	    uri: propublicaURL + '114/bills/' + billId + '/subjects.json',
	    headers: {
	      'X-Api-Key': PROPUBLICA_API_KEY
	    }
	  };
	  return new Promise(function (resolve, reject) {
	    (0, _requestPromise2.default)(options).then(function (res) {
	      return JSON.parse(res);
	    }).then(function (res) {
	      var subjects = res.results[0].subjects;
	      resolve(subjects);
	    }).catch(function (err) {
	      return reject(err);
	    });
	  });
	};

	module.exports.congress = {
	  /**
	   * Get a single Bill
	   * @param {string} billId The id of the bill to search
	   **/
	  getOne: function getOne(id) {
	    var options = {
	      method: 'GET',
	      uri: propublicaURL + '114/bills/' + id + '.json',
	      headers: {
	        'X-Api-Key': PROPUBLICA_API_KEY
	      }
	    };
	    return new Promise(function (resolve, reject) {
	      (0, _requestPromise2.default)(options).then(function (res) {
	        return JSON.parse(res);
	      }).then(function (res) {
	        var bill = res.results[0];
	        bill.subjects = billSubjects(id).then(function (subjects) {
	          return subjects;
	        }).catch(function (err) {
	          throw err;
	        });
	        resolve(bill);
	      }).catch(function (err) {
	        return reject(err);
	      });
	    });
	  },


	  /**
	   * Get a list of recent Bills
	   * @param {number} congress The congress (eg 114) that you are requesting bills for
	   * @param {string} chamber The chamber (eg senate) that you are requesting bills for
	   * @param {string} type The type of bill (introduced, major, updated, passed)
	   **/

	  getRecent: function getRecent(chamber, type) {
	    var options = {
	      method: 'GET',
	      uri: propublicaURL + '114/' + chamber + '/bills/' + type + '.json',
	      headers: {
	        'X-Api-Key': PROPUBLICA_API_KEY
	      }
	    };
	    return new Promise(function (resolve, reject) {
	      (0, _requestPromise2.default)(options).then(function (res) {
	        return JSON.parse(res);
	      }).then(function (res) {
	        var bills = res.results[0].bills;
	        // const billsWithSubjects = [];
	        bills.forEach(function (bill) {
	          var billId = bill.number.split('.').join('').toLowerCase();
	          bill.subjects = billSubjects(billId).then(function (subjects) {
	            return subjects;
	          }).catch(function (err) {
	            throw err;
	          });
	        });
	        resolve(bills);
	      }).catch(function (err) {
	        return reject(err);
	      });
	    });
	  },


	  /**
	   * Get a list of Members
	   * @param {string} chamber The chamber for requested members
	   **/

	  getMembers: function getMembers(chamber) {
	    var options = {
	      method: 'GET',
	      uri: propublicaURL + '114/' + chamber + '/members.json',
	      headers: {
	        'X-Api-Key': PROPUBLICA_API_KEY
	      }
	    };
	    return new Promise(function (resolve, reject) {
	      (0, _requestPromise2.default)(options).then(function (res) {
	        return JSON.parse(res);
	      }).then(function (res) {
	        resolve(res.results[0].members);
	      }).catch(function (err) {
	        throw err;
	      });
	    });
	  },


	  /**
	   * Get a specific Member
	   * @param {string} chamber The chamber for requested members
	   **/

	  getMember: function getMember(chamber, first_name, last_name) {
	    var _this = this;

	    return new Promise(function (resolve, reject) {
	      _this.getMembers(chamber).then(function (members) {

	        var member = members.filter(function (member) {
	          if (member.last_name === last_name && member.first_name === first_name) {
	            return member;
	          }
	        });
	        resolve(member[0]);
	      }).catch(function (err) {
	        reject(err);
	      });
	    });
	  },


	  /**
	   * Get a list of Bills by Member
	   * @param {string} memberId The id of the member to search
	   * @param {string} type The type of bill (introduced, updated)
	   **/

	  getMemberBills: function getMemberBills(memberId, type) {
	    var options = {
	      method: 'GET',
	      uri: propublicaURL + 'members/' + memberId + '/bills/' + type + '.json',
	      headers: {
	        'X-Api-Key': PROPUBLICA_API_KEY
	      }
	    };
	    return new Promise(function (resolve, reject) {
	      (0, _requestPromise2.default)(options).then(function (res) {
	        return JSON.parse(res);
	      }).then(function (res) {
	        var bills = res.results[0].bills;
	        bills.forEach(function (bill) {
	          var billId = bill.number.split('.').join('').toLowerCase();
	          bill.subjects = billSubjects(billId).then(function (subjects) {
	            return subjects;
	          }).catch(function (err) {
	            throw err;
	          });
	        });
	        resolve(bills);
	      }).catch(function (err) {
	        return reject(err);
	      });
	    });
	  }
	};

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = require("request-promise");

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _requestPromise = __webpack_require__(13);

	var _requestPromise2 = _interopRequireDefault(_requestPromise);

	var _moment = __webpack_require__(15);

	var _moment2 = _interopRequireDefault(_moment);

	var _underscore = __webpack_require__(9);

	var _underscore2 = _interopRequireDefault(_underscore);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var sunlightURL = 'https://congress.api.sunlightfoundation.com';

	module.exports.congress = {
	  /**
	  * Get a bill by proving a list of keywords
	  * @param {array} keywords An Array of user keywords
	  * @param {string} date Optional - A date in the format of YYYY-MM-DD
	  **/
	  getBillsByKeywords: function getBillsByKeywords(keywords, date) {
	    date = typeof date === 'undefined' ? '?introduced_on=' + (0, _moment2.default)().format("YYYY-MM-DD") : '?introduced_on=' + date;

	    var list = keywords.join('|');
	    var fields = 'number,urls,short_title,sponsor_id,introduced_on,cosponsor_ids,committees,actions,keywords,summary_short,summary';
	    var url = sunlightURL + '/bills?keywords__in=' + list + '&order=introduced_on&fields=' + fields;

	    return new Promise(function (resolve, reject) {
	      (0, _requestPromise2.default)(url).then(function (res) {
	        return JSON.parse(res);
	      }).then(function (bills) {
	        var normBills = bills.results.map(function (bill, idx, bills) {
	          var normBill = {
	            number: bill.number,
	            bill_uri: bill.urls.congress,
	            title: bill.short_title,
	            summary: bill.summary_short ? bill.summary_short : bill.summary,
	            sponsor: bill.sponsor_id,
	            cosponsors: bill.cosponsors_count,
	            introduced_date: bill.introduced_on,
	            actions: bill.actions,
	            subjects: bill.keywords.map(function (keyword) {
	              return { name: keyword };
	            })
	          };
	          return normBill;
	        });

	        resolve(normBills);
	      }).catch(function (err) {
	        reject(err);
	      });
	    });
	  }
	};

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = require("moment");

/***/ }
/******/ ]);