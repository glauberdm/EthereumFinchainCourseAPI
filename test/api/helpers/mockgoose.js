var
     mongoose = require('mongoose')
    , Mockgoose = require('mockgoose').Mockgoose
    , mockgoose = new Mockgoose(mongoose)
;

before((done) => {
    mockgoose.prepareStorage().then(function() {
        mongoose.connect(config.mongodbUri,  {useMongoClient: true}, (err) => {
            done(err);
        });
        mongoose.connection.on('connected', () => {  
            console.log('db connection is now open (mockgoose)');
        }); 
    });
});

beforeEach((done) => {
    mockgoose.helper.reset().then(() => {
        done()
    });
});