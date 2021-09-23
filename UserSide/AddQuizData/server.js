const express = require('express');
const bodyparser = require('body-parser');
const morgan = require('morgan')
const cors = require('cors');
const adminroute = require('./routes/adminroute');
const datainsertionroute = require('./routes/insertquizdataroute');
const retrievedata = require('./routes/retrievedataroute');
const displaysubjects = require('./routes/displaysubjectcardsroute');
const displaydiff = require('./routes/displaydiffroute');
const displaychapter = require('./routes/displaychaproute');
const displaysection = require('./routes/displaysectionroute');
const displayqac = require('./routes/displayqacroute');
const modifyrecords = require('./routes/modifydisplayedqacroute');
const deleterecords = require('./routes/deleterecordsroute');
const checkdataexists = require('./routes/checkiftheparticularsubjectexistsroute')
const addextrachapter = require('./routes/addchapterroute');
const addextrachapterdata = require('./routes/saveadditionalchapterdataroute')
const addsection = require('./routes/addsectionroute');
const addextrasectiondata = require('./routes/saveadditionalsectiondataroute');
const deletedifficulty = require('./routes/deletedifficultyroute');
const deletechapter = require('./routes/deletechapterroute');
const deletesection = require('./routes/deletesectionroute');
const deletesubject = require('./routes/deletesubjectroute');
const app = express();
app.use(cors());
app.use(morgan("tiny"))
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App running on port ${port} `)
});
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.json());
app.use('/admin', adminroute);
app.use('/insert_quiz_data', datainsertionroute);
app.use('/getdata', retrievedata);
app.use('/displaysubjectcard', displaysubjects);
app.use('/displaydifficulty', displaydiff);
app.use('/displaychapter', displaychapter);
app.use('/displaysection', displaysection);
app.use('/displayqac', displayqac);
app.use('/modifyrecords', modifyrecords);
app.use('/deleterecords', deleterecords);
app.use('/checkifdataexists', checkdataexists);
app.use('/addchapter', addextrachapter);
app.use('/saveadditionalchapterdata', addextrachapterdata);
app.use('/addsection', addsection);
app.use('/saveadditionalsectiondata', addextrasectiondata);
app.use('/deletedifficulty', deletedifficulty);
app.use('/deletechapter', deletechapter);
app.use('/deletesection', deletesection);
app.use('/deletesubject', deletesubject)