const xlsxFile = require('read-excel-file/node')
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');
const schema = {
    'Book Title': {
        prop: 'BookTitle',
        type: String
    },
    'Author': {
        prop: 'Author',
        type: String,
    },
    'Owned': {
        prop: 'Owned',
        type: Boolean
    },
    'Category':{
        prop: 'Category',
        type: String
    },
    'Loan': {
        prop: 'Loan',
        type: Boolean
    },
    'ReadingNow': {
        prop: 'ReadingNow',
        type: Boolean
    }
}
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://my-bookshelf-d9b0e.firebaseio.com",
    projectId: "my-bookshelf-d9b0e"
  });
  
  const db = admin.firestore();

xlsxFile('./Library.xlsx',{schema}).then(({rows,errors}) => {
    errors.length === 0
    rows.forEach(element => {
        db.collection('Bookshelf').add({
            Author: element.Author,
            Title: element.BookTitle,
            Owned:element.Owned,
            Category:element.Category,
            Loan: element.Loan,
            ReadingNow: element.ReadingNow
        })
        .catch(err=>{
            console.log(err)
        })
    });
})
.catch(err=>{
    console.log(err)
})