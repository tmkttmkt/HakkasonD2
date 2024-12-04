import React,{useState} from 'react';
import Send_to_Hedear_data from '../Head/Send_to_Hedear_data'
function Login_data({ take_address }) 
{
    // take_addressは関数として渡される
    const [mail,set_mail]=useState('');
    
    const Take_Login_mail_address=()=>//ログイン時に入力したメールアドレスを取得
    {
        set_mail(take_address);
    }
    return(
        <dev>
            
        </dev>
    );
}
export default  Login_data;