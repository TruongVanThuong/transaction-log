<?php

namespace App\Http\Controllers;

use App\Http\Requests\AccountRequest;
use App\Models\RoleModel;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class AccountController extends Controller
{
    public function index()
    {
        return view('admin.pages.account.managerAcc');
    }


    public function showAcc()
    {
        $data_acc = User::all();
        $data_role = RoleModel::all();
        // $login = Auth::guard('users')->user();

        $compact = compact('data_acc', 'data_role');

        return response()->json($compact);
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

    public function editAcc(Request $request)
    {
        $data = $request->all();
        $acc = User::where('id', $request->id)->first();
        $acc->update($data);
        return response()->json([
            'status' => true,
            'message' => 'Cap nhat thành công'
        ]);
    }

}