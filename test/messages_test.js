var expect = require('chai').expect,
    should = require('chai').should,
    supertest = require('supertest'),
    api = supertest('http://localhost:3000');

describe('Messages', function () {
    it('GET /messages/abcd12344', function (done) {
        api.get('/messages/abcd12344')
            .set('Accept', 'application/json')
            .expect(200)
            .end(function (err, res) {
                expect(res.body).to.have.property("text");
                expect(res.body.text).to.equal("amor roma");
                expect(res.body.id).to.equal("abcd12344");
                expect(res.body.isPalindrome).to.equal(true);
                done();
            });
    });
    it('GET /messages', function (done) {
        api.get('/messages')
            .set('Accept', 'application/json')
            .expect(200)
            .end(function (err, res) {
                expect(res.body).to.not.equal(null);
                for (var i = 0; i < res.body.length; i++) {
                    expect(res.body[i]).to.have.property("text");
                    expect(res.body[i]).to.have.property("isPalindrome");
                }
                done();
            });
    });

    it('POST palindrome message should post and return a Message', function (done) {
        api.post('/messages/')
            .send({ text: 'amor roma' })
            .set('Accept', 'application/json')
            .expect(200)
            .end(function (err, res) {
                expect(res.body).to.have.property("text");
                expect(res.body).to.have.property("id");
                var messageId = res.body.id;
                expect(res.body.text).to.equal("amor roma");
                expect(res.body.isPalindrome).to.equal(true);
                done();
            });
    });

    it('POST non-palindrome message should post and return a Message', function (done) {
        api.post('/messages/')
            .send({ text: 'This is not a palindrome' })
            .set('Accept', 'application/json')
            .expect(200)
            .end(function (err, res) {
                expect(res.body).to.have.property("text");
                expect(res.body).to.have.property("id");
                var messageId = res.body.id;
                expect(res.body.text).to.equal("This is not a palindrome");
                expect(res.body.isPalindrome).to.equal(false);
                done();
            });
    });

    it("GET /messages/invalidIDhere should return 404", function (done) {
        api.get('/messages/invalidIDhere')
            .expect(404)
            .end(function (err, res) {
                if (err)
                    return done(err);
                done();
            });
    });
    //LC TODO test DELETE

});

