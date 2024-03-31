@extends('admin.shares.master')
@section('title')
MANAGER ACCOUNT
@endsection
@section('noi_dung')
<!-- HTML -->
<div class="row" id="app">

    <div class="row" id="app" v-cloak>

        <div class="col-md-12 mb-3">
          <div class="modal-category">
            <!-- Button trigger modal -->
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
              Thêm tài khoản
            </button>
          </div>
        </div>

        <div class="col-md-12">
          <div class="card">
            <div class="card-header text-center">
              <h3> Danh Sách Tài Khoản</h3>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table id="table_id" class="table table-bordered">
                  <thead clas="bg-primary">
                    <tr>
                      <th class="text-center">ID</th>
                      <th class="text-center">Tên Tài Khoản</th>
                      <th class="text-center">Email</th>
                      <th class="text-center">Vai Trò</th>
                      <th class="text-center">Thao Tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr  style="border: 1px solid #000;" v-for="(taikhoan, key) in data_taikhoan" v-if="taikhoan.loai_tai_khoan > 1 && taikhoan.loai_tai_khoan < (TaiKhoanDangNhap.loai_tai_khoan == 4 ? 4 : 5)">
                      <th style="border: 1px solid #000;"class="align-middle text-center">@{{ taikhoan.id }}</th>
                      <td style="border: 1px solid #000;" class="align-middle text-center">@{{ taikhoan.ten_tai_khoan }}</td>
                      <td style="border: 1px solid #000;" class="align-middle text-center">@{{ taikhoan.email }}</td>
                      <td style="border: 1px solid #000;" class="align-middle text-center">
                        <span :class="getMauPhanQuyen(taikhoan.loai_tai_khoan)">
                          @{{ getTenPhanQuyen(taikhoan.loai_tai_khoan) }}
                        </span>
                      </td>
                      <td style="border: 1px solid #000;" class="align-middle text-center text-nowrap">
                        <!-- Button trigger modal -->
                        <button v-on:click="cap_nhat(taikhoan)" class="btn btn-primary" data-bs-toggle="modal"
                          data-bs-target="#exampleModalEidt"><i class="bx bx-edit"></i>
                        </button>
                        <button v-on:click="xoa = taikhoan" class="btn btn-danger" data-bs-toggle="modal"
                          data-bs-target="#xoaModal"><i class="bx bx-trash"></i>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                  <!-- Modal them tai khoan-->
                  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                    aria-hidden="true">
                    <div class="modal-dialog">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h1 class="modal-title fs-5" id="exampleModalLabel">Thêm tài khoản</h1>
                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                          <div class="form-group mt-3">
                            <label>Họ và tên</label>
                            <input v-model="add_user.ten_tai_khoan" type="text" class="form-control"
                              placeholder="Nhập vào Họ và tên">
                            <div v-if="errors.ten_tai_khoan" class="alert alert-warning">
                              @{{ errors.ten_tai_khoan[0] }}
                            </div>
                          </div>
                          <div class="form-group mt-3">
                            <label>Email</label>
                            <input v-model="add_user.email" type="email" class="form-control" placeholder="Nhập vào email">
                            <div v-if="errors.email" class="alert alert-warning">
                              @{{ errors.email[0] }}
                            </div>
                          </div>
                          <div class="form-group mt-3">
                            <label>Ảnh Sản Phẩm</label>
                            <div class="input-group">
                                <input id="hinh_anh" class="form-control" type="text" name="filepath">
                                <span class="input-group-prepend">
                                    <a id="lfm" data-input="hinh_anh" data-preview="holder" class="btn btn-primary">
                                        <i class="fa fa-picture-o"></i> Choose
                                    </a>
                                </span>
                            </div>
                            <div id="holder" style="margin-top:15px;max-height:100px;"></div>
                        </div>
                          <div class="form-group mt-3">
                            <label>Số điện thoại</label>
                            <input v-model="add_user.so_dien_thoai" type="text" class="form-control"
                              placeholder="Nhập vào số điện thoại">
                            <div v-if="errors.so_dien_thoai" class="alert alert-warning">
                              @{{ errors.so_dien_thoai[0] }}
                            </div>
                          </div>
                          <div class="form-group mt-3">
                            <label>Địa chỉ</label>
                            <input v-model="add_user.dia_chi" type="text" class="form-control" placeholder="Nhập vào địa chỉ">
                            <div v-if="errors.dia_chi" class="alert alert-warning">
                              @{{ errors.dia_chi[0] }}
                            </div>
                          </div>
                          <div class="form-group mt-3">
                            <label>Loại tài khoản</label>
                            <select v-model="add_user.loai_tai_khoan" class="form-control">
                              <!-- <div v-if="TaiKhoanDangNhap.loai_tai_khoan == 4 || TaiKhoanDangNhap.loai_tai_khoan == 5"> -->
                                <option v-for="(phanquyen, index) in data_phanquyen"
                                  v-if="phanquyen.role_phan_quyen > 1 && phanquyen.role_phan_quyen < (TaiKhoanDangNhap.loai_tai_khoan == 4 ? 4 : 5)"
                                  :value="phanquyen.role_phan_quyen">
                                  @{{ phanquyen.ten_phan_quyen }}
                                </option>
                              <!-- </div> -->
                            </select>
                            <div v-if="errors.loai_tai_khoan" class="alert alert-warning">
                              @{{ errors.loai_tai_khoan[0] }}
                            </div>
                          </div>
                          <div class="form-group mt-3">
                            <label>Mật khẩu</label>
                            <input v-model="add_user.password" type="password" class="form-control"
                              placeholder="Nhập vào mật khẩu">
                            <div v-if="errors.password" class="alert alert-warning">
                              @{{ errors.password[0] }}
                            </div>
                          </div>
                          <div class="form-group mt-3">
                            <label>Mật khẩu</label>
                            <input v-model="add_user.nhap_lai_password" type="password" class="form-control"
                              placeholder="Nhập lại mật khẩu">
                            <div v-if="errors.nhap_lai_password" class="alert alert-warning">
                              @{{ errors.nhap_lai_password[0] }}
                            </div>
                          </div>

                        </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Huỷ</button>
                          <button v-on:click="them_nguoi_dung()" type="button" class="btn btn-primary">Thêm tài khoản</button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Modal cap nhat tai khoan-->
                  <div class="modal fade" id="exampleModalEidt" tabindex="-1" aria-labelledby="exampleModalLabel"
                    aria-hidden="true">
                    <div class="modal-dialog">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h1 class="modal-title fs-5" id="exampleModalLabel">Cập Nhật Tài Khoản</h1>
                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                          <div class="form-group mt-3">
                            <label>Họ và tên</label>
                            <input v-model="edit_user.ten_tai_khoan" type="text" class="form-control"
                              placeholder="Nhập vào Họ và tên">
                            <div v-if="errors.ten_tai_khoan" class="alert alert-warning">
                              @{{ errors.ten_tai_khoan[0] }}
                            </div>
                          </div>
                          <div class="form-group mt-3">
                            <label>Email</label>
                            <input v-model="edit_user.email" type="email" class="form-control" placeholder="Nhập vào email" disabled>
                            <div v-if="errors.email" class="alert alert-warning">
                              @{{ errors.email[0] }}
                            </div>
                          </div>
                          <div class="form-group mt-3">
                            <label>Hình </label>
                            <div class="input-group">
                                <input id="hinh_anh_update" class="form-control" type="text" name="filepath">
                                <span class="input-group-prepend">
                                    <a id="lfm_update" data-input="hinh_anh_update" data-preview="holder_update" class="btn btn-primary">
                                        <i class="fa fa-picture-o"></i> Choose
                                    </a>
                                </span>
                            </div>
                            <div id="holder_update" style="margin-top:15px; max-height:100px;">
                            </div>
                          </div>
                          <div class="form-group mt-3">
                            <label>Số điện thoại</label>
                            <input v-model="edit_user.so_dien_thoai" type="text" class="form-control"
                              placeholder="Nhập vào số điện thoại">
                            <div v-if="errors.so_dien_thoai" class="alert alert-warning">
                              @{{ errors.so_dien_thoai[0] }}
                            </div>
                          </div>
                          <div class="form-group mt-3">
                            <label>Địa chỉ</label>
                            <input v-model="edit_user.dia_chi" type="text" class="form-control"
                              placeholder="Nhập vào địa chỉ">
                            <div v-if="errors.dia_chi" class="alert alert-warning">
                              @{{ errors.dia_chi[0] }}
                            </div>
                          </div>
                          <div class="form-group mt-3">
                            <label>Loại tài khoản</label>
                            <select v-model="edit_user.loai_tai_khoan" class="form-control">
                              <div v-if="TaiKhoanDangNhap.loai_tai_khoan == 4 || TaiKhoanDangNhap.loai_tai_khoan == 5">
                                <option v-for="(phanquyen, index) in data_phanquyen"
                                  v-if="phanquyen.role_phan_quyen > 1 && phanquyen.role_phan_quyen < (TaiKhoanDangNhap.loai_tai_khoan == 4 ? 4 : 5)"
                                  :value="phanquyen.role_phan_quyen"
                                  :checked="phanquyen.role_phan_quyen === edit_user.loai_tai_khoan">
                                  @{{ phanquyen.ten_phan_quyen }}
                                </option>
                              </div>
                            </select>
                            <div v-if="errors.loai_tai_khoan" class="alert alert-warning">
                              @{{ errors.loai_tai_khoan[0] }}
                            </div>
                          </div>

                        </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Huỷ</button>
                          <button v-on:click="cap_nhat_nguoi_dung()" type="button" class="btn btn-primary">
                            Cập Nhật Tài Khoản</button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- MODAL DELETE -->
                  <div class="modal fade" id="xoaModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                    aria-hidden="true">
                    <div class="modal-dialog" role="document">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title" id="exampleModalLabel">Xác Nhận Xoá Dữ Liệu</h5>
                          <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div class="modal-body">
                          Bạn có chắc muốn xoá dữ liệu này không?
                        </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Huỷ</button>
                          <button type="button" class="btn btn-danger" v-on:click="xoa_nguoi_dung()"
                            data-bs-dismiss="modal">Xoá</button>
                        </div>
                      </div>
                    </div>
                  </div>

                </table>
              </div>
              <div></div>
            </div>
          </div>
        </div>

</div>

<!-- END HTML -->
@endsection
@section('js')


<script>
    new Vue({
      el: '#app',
      data: {
        errors: {},
        add_user: {
          loai_tai_khoan: 2,
        },
        edit_user: {},
        xoa: {},
        data_taikhoan: [],
        data_phanquyen: [],
        TaiKhoanDangNhap: {},
      },
      created() {
        this.GetData();
      },

      methods: {
        // hien thi danh sach tai khoan
        GetData() {
          axios
            .get('/admin/account/show')
            .then((res) => {
              this.data_taikhoan = res.data.data_taikhoan;
              this.data_phanquyen = res.data.data_phanquyen;
              this.TaiKhoanDangNhap = res.data.TaiKhoanDangNhap;
            });
        },

        cap_nhat(taikhoan) {
          $("#hinh_anh_update").val(taikhoan.hinh_anh);
          var text = '<img src="'+ taikhoan.hinh_anh + '" style="margin-top:15px;max-height:100px;">'
          $("#holder_update").html(text);
          this.edit_user = taikhoan; // Tạo một bản sao của user để tránh ảnh hưởng trực tiếp đến dữ liệu người dùng
        },

        getTenPhanQuyen(rolePhanQuyen) {
          switch (rolePhanQuyen) {
            case 2:
              return 'Nhân Viên Bán Hàng';
            case 3:
              return 'Nhân Viên Đăng Bài';
            case 4:
              return 'Quản Lý Nhân Viên';
            case 5:
              return 'Quản trị Viên';
            default:
              return 'Không xác định';
          }
        },

        getMauPhanQuyen(rolePhanQuyen) {
          switch (rolePhanQuyen) {
            case 2:
              return 'btn btn-info';
            case 3:
              return 'btn btn-info';
            case 4:
              return 'btn btn-warning';
            case 5:
              return 'btn btn-warning';
            default:
              return 'btn btn-muted';
          }
        },

        them_nguoi_dung() {
          this.add_user.hinh_anh = $("#hinh_anh").val();
          axios
            .post('/admin/quan-ly-nhan-vien/them-nhan-vien', this.add_user)
            .then((res) => {

              if (res.data.status) {
                toastr.success(res.data.message);
                this.GetData();
                this.add_user = {};
                $("#hinh_anh").val("");
                // Tắt modal xác nhận
                $('#exampleModal').modal('hide');
              } else {
                toastr.error('Có lỗi không mong muốn!');
              }
            })
            .catch((error) => {
              if (error && error.response.data && error.response.data.errors) {
                this.errors = error.response.data.errors;
              } else {
                toastr.error('Có lỗi không mong muốn!');
              }
            })
        },

        cap_nhat_nguoi_dung() {
          this.edit_user.hinh_anh = $("#hinh_anh_update").val();
          axios
            .post('/admin/quan-ly-nhan-vien/cap-nhat-nhan-vien', this.edit_user)
            .then((res) => {
              if (res.data.status) {
                toastr.success(res.data.message);
                this.GetData();
                // Tắt modal xác nhận
                $('#exampleModalEidt').modal('hide');
              } else {
                toastr.error('Có lỗi không mong muốn! 1');
              }
            })
            .catch((error) => {
              if (error.response) {
                  // Đối tượng error.response chứa thông tin lỗi từ server
                  console.error('Server error:', error.response.data);
                  toastr.error('Server error. Xem console log để biết chi tiết.');
              } else if (error.request) {
                  // Đối tượng error.request chứa thông tin về request gửi lên server
                  console.error('Request error:', error.request);
                  toastr.error('Request error. Xem console log để biết chi tiết.');
              } else {
                  // Các lỗi khác
                  console.error('Error:', error.message);
                  toastr.error('Có lỗi không mong muốn! ' + error.message);
              }
          });
        },

        xoa_nguoi_dung() {
          axios
            .post('/admin/quan-ly-nhan-vien/xoa-nhan-vien', this.xoa)
            .then((res) => {
              if (res.data.status) {
                const message = "Dữ liệu đã được xoá thành công!";
                toastr.success(message);
                this.GetData();
              } else {
                toastr.error('Có lỗi không mong muốn!');
              }
            })
        },


      }
    });
  </script>

  <script>
    var route_prefix = "/laravel-filemanager";
  </script>
  <script src="/vendor/laravel-filemanager/js/stand-alone-button.js"></script>
  <script>
    $("#lfm").filemanager('image', {prefix : route_prefix});
    $("#lfm_update").filemanager('image', {prefix : route_prefix});
  </script>

  {{--  --}}
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
  <script type="text/javascript" src="https://cdn.datatables.net/1.10.16/js/jquery.dataTables.min.js"></script>

  <script>
    $(document).ready(function () {
      $('#table_id').DataTable();
    });
  </script>
@endsection
