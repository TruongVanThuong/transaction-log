<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CategoryRequest extends FormRequest
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
            "name_cate"     => "required|unique:categories,name_cate",
        ];
    }

    public function messages()
    {
        return [
            "name_cate.required"     => "name cate không được để trống",
            "name_cate.unique"      => "name cate đã tồn tại hoặc trong mục thùng rác",
        ];
    }
}