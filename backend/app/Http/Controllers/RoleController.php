<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateRoleRQ;
use App\Http\Requests\EditRoleRQ;
use App\Models\RoleModel;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    public function showRole() {
        $data_role = RoleModel::all();
        $compact = compact('data_role');

        return response()->json($compact);
    }

    public function addRole(CreateRoleRQ $request) {
        $data = $request->all();
        RoleModel::create($data);

        return response()->json([
            'status' => true,
            'message' => 'Thêm role thành công'
        ]);
    }

    public function editRole(EditRoleRQ $request) {
        $data = $request->all();
        $editRole = RoleModel::where('id', $request->id)->first();
        $editRole->update($data);

        return response()->json([
            'status' => true,
            'message' => 'Cập nhật role thành công'
        ]);
    }

    public function deleteRole(Request $request)
    {
        RoleModel::where('id', $request->id)->delete();
        return response()->json([
            'status' => true,
            'message' => 'Đã xóa role thành công !'
        ]);
    }
}