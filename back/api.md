# lgion
/login
##
- method:POST
- pass:/
- body={id:str,pass:str}
- res={success:bool}
##
- method:POST
- pass:/signup
- body={id:str,pass:str,name:str}
- res={success:bool}
##
- method:GET
- pass:/
- body={}
- res={success:bool}

# point
/point
##
- method: GET
- pass: /get-okome
- body: { userId: str }
- res: { success: bool, okome: int }
##
- method: POST
- pass: /update-okome
- body: { userId: str, value: int }
- res: { success: bool, okome: int }