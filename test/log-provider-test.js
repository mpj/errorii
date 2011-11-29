

var vows        = require('vows'),
    assert      = require('assert'),
    sinon       = require('sinon'),
    MockServer  = require('./mock-mongo').MockServer,
    LogProvider = require('../log_provider').LogProvider;

vows.describe('LogProvider').addBatch({
  'when a LogProvider is instansiated with a server': {
    topic: function() {
      this.mongo_server = new MockServer();
      return new LogProvider(this.mongo_server)
    },
      'save': { 
        topic: function(provider) { 
          provider.save("127.128.129.130",
                        "Windooze",
                        "http://mysite.com/myurl",
                        "stackstackstack",
                        "object dump here",
                        "dom dump here",
                        this.callback);
        },

        'collection called': assertCollectionCalled('logs'),
        'insert called': assertInsertCalled({
          'ip':         '127.128.129.130',
          'uagent':     'Windooze',
          'url':        'http://mysite.com/myurl',
          'stack':      'stackstackstack',
          'dmp_dom':    'dom dump here',
          'dmp_app':    'object dump here'
        })
      }
    }/*,
    'but when dividing zero by zero': {
        topic: function () { return 0 / 0 },

        'we get a value which': {
            'is not a number': function (topic) {
                assert.isNaN (topic);
            },
            'is not equal to itself': function (topic) {
                assert.notEqual (topic, topic);
            }
        }
    }*/
}).export(module); // Run it

function assertInsertCalled(doc) {
  return function() {
    var coll = this.mongo_server.current_collection;
    assert.isTrue( coll.insert_called(doc), 
      "Expected \n" + JSON.stringify(doc) + 
      "\nbut got \n" + JSON.stringify(coll.doc_inserted_last));
  }
}

function assertCollectionCalled(collName) {
  return function() {
    assert.isTrue(
      this.mongo_server.collection_called(collName));
  }
}