# phonebook_backend
Backend for phonebook app, Fullstack2020 excercise 3.x
/               phonebook GUI
/info           shows total amount of persons in database and date
/api/persons    the detailed persons list in json format

Local server running on port 3001 by default, see .env

-------------------------------------------------------------------------------------

.env:
#Port the server to listen to
PORT=3009
#MongoDB path 
MONGODB_URI="mongodb+srv://esa-fullstack:XXXXXXXX@cluster0-fhhrm.mongodb.net/phonebook-app?authSource=admin&replicaSet=Cluster0-shard-0&readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=true"

-------------------------------------------------------------------------------------
UTIL mongo.js
command line tool to work with database

-------------------------------------------------------------------------------------

Heroku:
https://powerful-mountain-66311.herokuapp.com/


Note! if creating, editing Procfile in Windows, pay special attention to extra chars/symbols whatever added by windows - could not get it working despite trying to force UTF-8, created the file in linux computer and pushed to git. 

