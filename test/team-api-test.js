const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
chai.use(chaiHttp);

const connection = require('../lib/setup-mongoose');
const app = require('../lib/app');

describe('teams api', () => {
  before(done => {
    const CONNECTED = 1;
    if(connection.readyState === CONNECTED) dropCollection();
    else connection.on('open', dropCollection)

    function dropCollection() {
      const name = 'teams';
      connection.db
        .listCollections({name})
        .next((err, collinfo) => {
          if (!collinfo) return done();
          connection.db.dropCollection(name, done);
        });
    }
  });

  const request =  chai.request(app);
  const navi = {"teamName":"Natus Vincere","teamMembers":["Ditya Ra","Dendi","GeneRaL","SoNNeikO","Artstyle"],"tiWinner":true};


  it('should save a file from a POST request', done => {
    request
      .post('/teams')
      .send(navi)
      .then(res => {
        assert.ok(res.body._id);
        navi._id = res.body._id;
        navi.__v = 0;
        done()
      })
      .catch(done);
  });

  it('should get all teams from a GET request', done => {
    request
      .get('/teams')
      .then(res => {
        assert.deepEqual(res.body, [navi]);
        done();
      })
      .catch(done);
  });

  it('should get a team by id', done => {
    request
      .get(`/teams/${navi._id}`)
      .then(res => {
        assert.deepEqual(res.body, navi)
        done();
      })
      .catch(done);
  });

  it('should get a team by team name', done => {
    request
      .get('/teams')
      .query({teamName: 'Natus Vincere'})
      .then(res => {
        assert.deepEqual(res.body, [navi]);
        done();
      })
      .catch(done);
  });

  it('should update a file', done => {
    request
      .put(`/teams/${navi._id}`)
      .send({teamName: 'Navi'})
      .then(res => {
        assert.deepEqual(res.body, {ok: 1, nModified: 1, n: 1});
        done();
      })
      .catch(done);
  });
  it('should delete a file', done => {
    request
      .del(`/teams/${navi._id}`)
      .then(res => {
        assert.equal(res.text, `Resource ${navi._id} was deleted`);
        done();
      })
      .catch(done);
  });
});