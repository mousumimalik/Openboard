Get-ExecutionPolicy
# Should get 'Restricted'

Set-ExecutionPolicy Unrestricted / Set-ExecutionPolicy Unrestricted -Scope CurrentUser

Get-ExecutionPolicy
# Should get 'Unrestricted'

nodemon filename.js

# If error
heroku login
# After login | paster error with appname
heroku logs --tail --app openboard-application