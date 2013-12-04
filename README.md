
# Nordit Business Intelligence Demo Server - Kompas

## Install

```sh
  $ npm install
  $ cp server/config/config.example.js server/config/config.js
  $ npm start
```

[http://localhost:8090/](http://localhost:8090/) 

## Directory structure

```
/
├─client/		(Frontend files)
│ ├─css/
│ ├─lib/
│ └─scripts/
├─locale/
├─scripts/
├─server/		(Backend files)
│ ├─config/
│ │ ├─api.js
│ │ ├─routes.js
│ │ ├─config.js		(main configuration file)
│ │ ├─passport.js  	(authorization config)
│ │ ├─express.js   	(express config)
│ │ ├─i18n.js      	(i18n-abide config)
│ │ ├─setup.js
│ │ ├─shutdown.js
│ │ └─middlewares/ 	(custom middlewares)
│ ├─controllers/
│ ├─middlewares/
│ └─models/
├─share/		(Shared files)
│ ├─i18n/
│ └─views/
└─sql/
```
