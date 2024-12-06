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
- res={list[{id:int,role:str}]}
# point
/point
##
- method: GET
- pass: /get-okome
- body: { userId: str }
- res: { okome: int }
##
- method: POST
- pass: /update-okome
- body: { userId: str, value: int }
- res: { okome: int }
# conversation
## 
- method:DELL
- pass:/:id
- body={}
- res={success:bool}
## 
- method:POST
- pass:/
- body={sendId:str,receiveId:str,data:str}
- res={id:str}
## 
- method:GET
- pass:/one-on-one
- body={id_a:str,id_b:str}
- res={datas:[{sendId:str,receiveId:str,data:str,time:time}]}
## 
- method:GET
- pass:/:id
- body={}
- res={data:str,time:time}
## 
- method:GET
- pass:/creator/:id
- body={}
- res={ids:[str]}
## 
- method:GET
- pass:/matuoka/:id
- body={}
- res={quotes:[str]}