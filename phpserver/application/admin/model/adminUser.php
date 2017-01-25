<?php 
namespace app\Admin\model;
use think\Model;
class adminUser extends	Model {	

	protected $autoWriteTimestamp=true;				
	protected $insert=['status'=>1];
	protected $field=['admin_id'=>'int','admin_createtime'=>'int','admin_username','admin_password','admin_loginIp'];
}