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
- res={url:str,creator:str,type:int}
##
- method:GET
- pass:/creator/:id
- body={}
- res={ids:[int]}
## FormData
- method:POST
- pass:/
- body={file:filedata,type:int,creator:str}
- res={id:str}
## 
- method:DELL
- pass:/:id
- body={}
- res={success:bool}
##
- method:GET
- pass:/type
- body={}
- res={success:bool}
- res={list[{id:int,role:str}]}
-
-
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
-
-
# recruitment
/recruitment
##
- method:POST
- pass:/start
- body: { creator:str, produc:str, order:str, explanation:str }
- res: { success:bool }
##
- method:GET
- pass:/get
- body: { creator:str|null }
- res: { success:bool }
##
- method:POST
- pass:/stop
- body: { id:int }
- res: { success:bool }