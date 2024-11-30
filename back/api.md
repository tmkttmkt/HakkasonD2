# lgion
/login
##
- pass:/
- body={id:str,pass:str}
- res={success:bool}
##
- pass:/signup
- body={id:str,pass:str,name:str}
- res={- pass:/success
:bool}