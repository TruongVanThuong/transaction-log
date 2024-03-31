<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateRoleRQ extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "name_role"     => "required|unique:roles,name_role",
            "number_role"   => "required|unique:roles,number_role"
        ];
    }

    public function messages()
    {
        return [
            "name_role.required"     => "Name role không được để trống",
            "name_role.unique"      => "Name role đã tồn tại hoặc trong mục thùng rác",
            "number_role.required"   => "Number role không được để trống",
            "number_role.unique"    => "Number role đã tồn tại hoặc trong mục thùng rác",
        ];
    }
}