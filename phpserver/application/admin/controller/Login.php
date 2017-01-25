<?php
namespace app\admin\controller;

use app\admin\model\adminUser as adminUser;
use	think\Controller; 
use	think\Request;
use think\Session;
class Login extends Controller 
{
    public function login(Request $request)
    {
    	$data = $request->param();
    	$adminUser = adminUser::get(["admin_username"=>$data['username']]);
    	$result = [];
        if($adminUser){
        	if(md5($data['pwd']) !== $adminUser->admin_password){
        		$result = [
	        		'code'=> 40002,
	        		'msg'=>'密码错误',
	        		'time'=>$_SERVER['REQUEST_TIME']
        		];
        	}else{
        		Session::set('adminUserName',$adminUser->admin_username);
        		Session::set('adminPwd',$adminUser->admin_password);
        		$result = [
	        		'code'=> 20001,
	        		'msg'=>'登录成功',
	        		'time'=>$_SERVER['REQUEST_TIME']
        		];
        	}
        }else{
        	$result = [
        		'code'=> 40001,
        		'msg'=>'管理员不存在',
        		'time'=>$_SERVER['REQUEST_TIME']
        	];
        }
        
        return json($result);
    }
}
