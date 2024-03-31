<?php

namespace App\Http\Controllers;

use App\Models\RoleModel;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class ProfileController extends Controller
{
    public function loginAdmin() {
        return view('admin.pages.profile.login');
    }

    public function loginAdminAccess(Request $request) {
        $du_lieu['email'] = $request->email;
        $du_lieu['password'] = $request->password;

        $kiem_tra = Auth::guard('users')->attempt($du_lieu);
        if ($kiem_tra) {
            return response()->json([
                'status' => true,
                'message' => 'Đăng nhập thành công',
            ]);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'Tài khoản hoặc mật khẩu không đúng',
            ]);
        }
    }

    public function logout()
    {
        Auth::guard('users')->logout();
        // toastr()->success('Đăng Xuất Thành Công');
        return redirect('/login');
    }

    public function profile()
    {
        return view('admin.pages.profile.profile');
    }

    public function profileInfor()
    {
        $tai_khoan = Auth::guard('users')->user();
        $data_phanquyen = RoleModel::get();
        $compact = compact('tai_khoan', 'data_phanquyen');

        return response()->json($compact);
    }

    public function updateInfo(Request $request)
    {
        $du_lieu = $request->all();
        // dd($du_lieu);
        $id = Auth::guard('users')->user()->id;
        $tai_khoan = User::find($id);
        $tai_khoan->update($du_lieu);

        return response()->json([
            'status' => true,
            'message' => 'Đã cập nhật hồ sơ thành công!',
        ]);
    }

    public function change()
    {
        return view('admin.pages.profile.changePassword');
    }

    public function changePassword(Request $request)
    {
        $id = Auth::guard('users')->user()->id;
        $tai_khoan = User::find($id);
        $tai_khoan->password = bcrypt($request->password_new);
        $tai_khoan->save();

        return response()->json([
            'status' => true,
            'message' => 'Đã đổi mật khẩu hồ sơ thành công!',
        ]);
    }


}