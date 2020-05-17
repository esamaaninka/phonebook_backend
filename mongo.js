const mongoose = require('mongoose')

// print process.argv
/*process.argv.forEach((val, index) => {
    console.log(`Argv ${index}: ${val}`);
  });
*/

if ( process.argv.length<3 ) {
    console.log('\nTo add a new name - give password, new name and number as arguments\n')
    console.log('To list the phonebook content - give password as only argument\n')
    console.log('To list the count of phonebook content - give password and count as arguments\n')
    process.exit(1)
}

const url =
  `mongodb+srv://esa-fullstack:${process.argv[2]}@cluster0-fhhrm.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const phonebookSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Phonebook = mongoose.model('Phonebook', phonebookSchema)

const phonebook = new Phonebook({
    name: process.argv[3],
    number: process.argv[4],
})

switch (process.argv.length) {

    case 3: 
        Phonebook.find({}).then(result => {
            console.log('Phonebook:')
            result.forEach(p => {
              console.log(p.name + ' ' + p.number  )
            })
            mongoose.connection.close()
          })
        break;
        
    case 4:
          Phonebook.countDocuments().then(result => {
            console.log('Count: ', result)
            mongoose.connection.close()
          })
          
      break;

    case 5:
        phonebook.save().then(response => {
          //console.log('phonebook saved!', response)
          console.log(`Added ${response.name} number ${response.number} to phonebook`)
          mongoose.connection.close()
        })
        break;
}

