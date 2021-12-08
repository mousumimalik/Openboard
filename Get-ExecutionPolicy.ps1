Get-ExecutionPolicy
# Should get 'Restricted'

Set-ExecutionPolicy Unrestricted / Set-ExecutionPolicy Unrestricted -Scope CurrentUser

Get-ExecutionPolicy
# Should get 'Unrestricted'

nodemon filename.js