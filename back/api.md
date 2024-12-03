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
- body={id:str,pass:str,name:str|null}
- res={success:bool}
## not
- method:POST
- pass:/email
- 
- 
# production
/production
##
- method:GET
- pass:/:id
- body={}
- res={success:bool}
## FormData
- method:POST
- pass:/
- body={file:filedata,type:str,creator:str}
- res={id:str|null}
## 
- method:DELL
- pass:/:id
- body={}
- res={success:bool}
##
- method:GET
- pass:/type
- body={}
- res={lsit[id:int,role:str]}