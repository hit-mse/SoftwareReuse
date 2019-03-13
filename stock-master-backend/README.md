# Stöckmästerbackedn

## Dependedies
* npm
* MongoDB


## Run
1. Start MongoDb
2. Run npm start

## Backend HTTP-Post endpoints

### /login
Post-body: {username, password}

### /buy
Post-body: {username, password, stockname, shares}

### /sell
Post-body: {username, password, stockname, shares}

### /search
Post-body: {queryname}

### /stock
Post-body: {stockname, span}, where span = ("day", "week", "month", "year")
