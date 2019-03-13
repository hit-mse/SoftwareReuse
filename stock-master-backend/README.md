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
