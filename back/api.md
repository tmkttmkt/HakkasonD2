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

APIを３つ
いしゅーのやつ書く