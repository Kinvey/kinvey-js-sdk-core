import Request from '../../src/core/request';
import Auth from '../../src/core/auth';
import Kinvey from '../../src/kinvey';
import DataPolicy from '../../src/enums/dataPolicy';

describe('Request', function() {
  beforeEach(function() {
    this.request = new Request();
  });

  describe('headers', function() {
    it('should be undefiend', function() {
      expect(this.request.headers).to.be.undefined;
    });
  });

  describe('method', function() {
    it('should be set to GET by default', function() {
      expect(this.request).to.have.property('method', 'GET');
    });

    it('should be set to the provided method in the constructor', function() {
      const method = 'POST';
      const request = new Request(method);
      expect(request.method).to.equal(method);
    });

    it('should be able to be set after creating a request', function() {
      const method = 'POST';
      this.request.method = method;
      expect(this.request.method).to.equal(method);
    });

    it('should throw an error for an invalid method', function() {
      expect(function() {
        return new Request('foo');
      }).to.throw('Invalid Http Method. OPTIONS, GET, POST, PATCH, PUT, and DELETE are allowed.');
    });
  });

  describe('protocol', function() {
    it(`should be set to ${Kinvey.apiProtocol} by default`, function() {
      expect(this.request).to.have.property('protocol', Kinvey.apiProtocol);
    });

    it('should be able to be set to a different value', function() {
      const protocol = 'foo';
      this.request.protocol = protocol;
      expect(this.request.protocol).to.equal(protocol);
    });
  });

  describe('hostname', function() {
    it(`should be set to ${Kinvey.apiHostname} by default`, function() {
      expect(this.request).to.have.property('hostname', Kinvey.apiHostname);
    });

    it('should be able to be set to a different value', function() {
      const hostname = 'foo.com';
      this.request.hostname = hostname;
      expect(this.request.hostname).to.equal(hostname);
    });
  });

  describe('auth', function() {
    it('should be set to Auth.none by default', function() {
      expect(this.request).to.have.property('auth', Auth.none);
    });

    it('should be able to be set to a different value', function() {
      const auth = {};
      this.request.auth = auth;
      expect(this.request.auth).to.deep.equal(auth);
    });
  });

  describe('path', function() {
    it('should be equal to an empty string by default', function() {
      expect(this.request).to.have.property('path', '');
    });

    it('should be set to the provided path in the constructor', function() {
      const path = '/foo';
      const request = new Request('GET', path);
      expect(request.path).to.equal(path);
    });

    it('should be able to be set to a different value', function() {
      const path = '/foo';
      this.request.path = path;
      expect(this.request.path).to.equal(path);
    });
  });

  describe('query', function() {
  });

  describe('body', function() {
    it('should be undefined', function() {
      expect(this.request).to.have.property('body', undefined);
    });

    it('should not be able to be set', function() {
      expect(function() {
        this.request.body = {};
      }).to.throw(Error);
    });
  });

  describe('dataPolicy', function() {
    it('should be equal to DataPolicy.CloudFirst by default', function() {
      expect(this.request).to.have.property('dataPolicy', DataPolicy.CloudFirst);
    });

    it('should be able to be set to a data policy', function() {
      this.request.dataPolicy = DataPolicy.LocalFirst;
      expect(this.request.dataPolicy).to.equal(DataPolicy.LocalFirst);
    });

    it('should throw and error for an invalid data policy', function() {
      const dataPolicy = 'foo';
      expect(function() {
        this.request.dataPolicy = dataPolicy;
      }).to.throw(Error);
    });
  });

  describe('url', function() {
    it(`should be equal to ${Kinvey.apiUrl}`, function() {
      expect(this.request).to.have.property('url', Kinvey.apiUrl);
    });

    it('should not be able to be set', function() {
      expect(function() {
        this.request.url = 'foo';
      }).to.throw(Error);
    });
  });

  describe('response', function() {
    it('should not exist', function() {
      expect(this.request.response).to.be.undefined;
    });

    it('should not be able to be set', function() {
      expect(function() {
        this.request.response = {};
      }).to.throw(Error);
    });
  });

  describe('getHeader()', function() {
    it('should respond', function() {
      expect(this.request).to.respondTo('getHeader');
    });

    it('should have Accept header set to application/json by default', function() {
      expect(this.request.getHeader('Accept')).to.equal('application/json');
    });

    it('should have Content-Type header set to application/json by default', function() {
      expect(this.request.getHeader('Content-Type')).to.equal('application/json');
    });

    it(`should have X-Kinvey-Api-Version header set to ${Kinvey.apiVersion} by default`, function() {
      expect(this.request.getHeader('X-Kinvey-Api-Version')).to.equal(Kinvey.apiVersion);
    });
  });

  describe('setHeader()', function() {
    it('should respond', function() {
      expect(this.request).to.respondTo('setHeader');
    });

    it('should add the header', function() {
      const header = 'foo';
      const value = 'bar';
      this.request.setHeader(header, value);
      expect(this.request.getHeader(header)).to.equal(value);
    });

    it('should replace an existing header', function() {
      const header = 'content-type';
      const value = 'application/xml';
      this.request.setHeader(header, value);
      expect(this.request.getHeader(header)).to.equal(value);
    });

    it('should throw an error if header value is not a string');
    it('should throw an error if the header value is to large');
  });

  describe('addHeaders()', function() {
    it('should respond', function() {
      expect(this.request).to.respondTo('addHeaders');
    });

    it('should add the headers', function() {
      const headers = {
        foo: 'bar',
        hello: 'world'
      };
      this.request.addHeaders(headers);
      expect(this.request.getHeader('foo')).to.equal(headers.foo);
      expect(this.request.getHeader('hello')).to.equal(headers.hello);
    });

    it('should replace existing headers', function() {
      const headers = {
        accept: 'application/xml'
      };
      this.request.addHeaders(headers);
      expect(this.request.getHeader('accept')).to.equal(headers.accept);
    });

    it('should throw an error if header value is not a string');
    it('should throw an error if the header value is to large');
  });

  describe('removeHeader()', function() {
    it('should respond', function() {
      expect(this.request).to.respondTo('removeHeader');
    });

    it('should remove a header', function() {
      this.request.removeHeader('content-type');
      expect(this.request.getHeader('content-type')).to.be.undefined;
    });
  });

  describe('isCacheEnabled()', function() {
    it('should respond', function() {
      expect(this.request).to.respondTo('isCacheEnabled');
    });

    it('should return a boolean', function() {
      expect(typeof this.request.isCacheEnabled()).to.equal('boolean');
    });
  });

  describe('enableCache()', function() {
    it('should respond', function() {
      expect(this.request).to.respondTo('enableCache');
    });

    it('should enable the cache', function() {
      this.request.enableCache();
      expect(this.request.isCacheEnabled()).to.be.true;
    });
  });

  describe('disableCache()', function() {
    it('should respond', function() {
      expect(this.request).to.respondTo('disableCache');
    });

    it('should disable the cache', function() {
      this.request.disableCache();
      expect(this.request.isCacheEnabled()).to.be.false;
    });
  });

  describe('execute function', function() {
    it('should respond', function() {
      expect(this.request).to.respondTo('execute');
    });

    it('should return a promise');
  });

  describe('toJSON()', function() {
    it('should respond', function() {
      expect(this.request).to.respondTo('toJSON');
    });

    it('should return an object', function() {
      const json = this.request.toJSON();
      expect(json).to.be.an('object');
      expect(json).to.deep.equal({
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          'x-kinvey-api-version': '3'
        },
        method: 'GET',
        url: 'https://baas.kinvey.com',
        body: undefined,
        cacheKey: '"https://baas.kinvey.com"',
        response: undefined
      });
    });
  });
});
