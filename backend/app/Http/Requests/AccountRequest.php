<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AccountRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    public function rules()
    {
        return [
            'name'                  =>  'required|min:6|max:50',
            'email'                 =>  'required|email|unique:users,email',
            'password'              =>  'required|min:6|max:30',
            'again_password'        =>  'required|same:password',
            'phone'                 =>  'required|digits:10',
            'address'               =>  'required|min:6|max:50',
            'role'                  =>  'required',
        ];
    }

    public function messages()
    {
        return [
            'name.required'                 => 'Họ và tên không được để trống',
            'name.min'                      => 'Họ và tên phải từ 6 ký tự trở lên',
            'name.max'                       => 'Họ và tên không được vượt quá 50 ký tự',
            'email.required'                => 'Email không được để trống',
            'email.email'                   => 'Email không đúng định dạng',
            'email.unique'                  => 'Email đã tồn tại',
            'password.required'             => 'Mật khẩu không được để trống',
            'password.min'                  => 'Mật khẩu phải từ 6 ký tự trở lên',
            'password.max'                  => 'Mật khẩu không được vượt quá 30 ký tự',
            'again_password.required'       => 'Nhập lại mật khẩu không được để trống',
            'again_password.same'           => 'Mật khẩu nhập lại không khớp',
            'phone.required'                => 'Số điện thoại không được để trống',
            'phone.digits'                  => 'Số điện thoại phải có 10 chữ số',
            'address.required'              => 'Địa chỉ không được để trống',
            'address.min'                   => 'Địa chỉ phải từ 6 ký tự trở lên',
            'address.max'                   => 'Địa chỉ không được vượt quá 50 ký tự',
            'role.required'                 => 'role không được để trống',
        ];
    }

}