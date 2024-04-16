<?php

namespace App\Http\Controllers;

use App\Http\Requests\AccountRequest;
use App\Models\RoleModel;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class AccountController extends Controller
{

    public function showAcc()
    {
        $usersWithRoles = User::join('roles', 'users.role', '=', 'roles.number_role')
            ->select('users.*', 'roles.name_role')
            ->get();

        return $usersWithRoles;
    }

    public function addAcc(AccountRequest $request)
    {
        $data = $request->all();
        $data['password'] = bcrypt($data['password']);

        User::create($data);

        return response()->json([
            'status' => true,
            'message' => 'Thêm thành công'
        ]);
    }

    public function deleteAcc(Request $request)
    {
        User::where('id', $request->id)->delete();
        return response()->json([
            'status' => true,
            'message' => 'Đã xóa liên hệ thành công !'
        ]);
    }

    public function editAcc($id)
    {

        $data = User::leftJoin('roles', 'users.role', '=', 'roles.id')
        ->select(
            'users.*',
            'roles.*',
        )
        ->findOrFail($id);

        return $data;
    }

    public function updateAcc(Request $request)
    {
        $data = $request->all();
        $acc = User::where('id', $request->id)->first();
        $acc->update($data);
        return response()->json([
            'status' => true,
            'message' => 'Cap nhat thành công'
        ]);
    }

    public function dashEdit($id ) {
        $user = User::find($id);
        return $user;
    }
    public function dashUpdate(Request $request, $id ) {
        $user = User::find($id);
        $user['wallet'] += $request->payment;
        $user->save();
        return response()->json([
            'status' => true,
            'message' => 'Cap nhat thành công'
        ]);
    }

}