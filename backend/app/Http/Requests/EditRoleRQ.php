<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EditRoleRQ extends FormRequest
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
            "name_role"     => "required",
            "number_role"   => "required"
        ];
    }

    public function messages()
    {
        return [
            "name_role.required"     => "Name role không được để trống",
            "number_role.required"   => "Number role không được để trống",
        ];
    }
}