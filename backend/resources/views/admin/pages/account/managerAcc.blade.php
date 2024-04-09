@extends('admin.shares.master')
@section('title')
MANAGER ACCOUNT
@endsection
@section('noi_dung')
<!-- HTML -->

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
                  <thead class="bg-primary">
                    <tr>
                      <th class="text-center">ID</th>
                      <th class="text-center">Tên Tài Khoản</th>
                      <th class="text-center">Email</th>
                      <th class="text-center">Role</th>
                      <th class="text-center">Thao Tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr  style="border: 1px solid #000;" v-for="(taikhoan, key) in data_acc">
                      <th style="border: 1px solid #000;"class="align-middle text-center">@{{ key + 1 }}</th>
                      <td style="border: 1px solid #000;" class="align-middle text-center">@{{ taikhoan.name }}</td>
                      <td style="border: 1px solid #000;" class="align-middle text-center">@{{ taikhoan.email }}</td>
                      <td style="border: 1px solid #000;" class="align-middle text-center" v-for="(role, key) in data_role" v-if="role.number_role == taikhoan.role">
                        @{{ role.name_role }}
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
                            <input v-model="add.name" type="text" class="form-control"
                              placeholder="Nhập vào Họ và tên">
                            <div v-if="errors.name" class="alert alert-warning">
                              @{{ errors.name[0] }}
                            </div>
                          </div>
                          <div class="form-group mt-3">
                            <label>Email</label>
                            <input v-model="add.email" type="email" class="form-control" placeholder="Nhập vào email">
                            <div v-if="errors.email" class="alert alert-warning">
                              @{{ errors.email[0] }}
                            </div>
                          </div>
                          <div class="form-group mt-3">
                            <label>Số điện thoại</label>
                            <input v-model="add.phone" type="text" class="form-control"
                              placeholder="Nhập vào số điện thoại">
                            <div v-if="errors.phone" class="alert alert-warning">
                              @{{ errors.phone[0] }}
                            </div>
                          </div>
                          <div class="form-group mt-3">
                            <label>Địa chỉ</label>
                            <input v-model="add.address" type="text" class="form-control" placeholder="Nhập vào địa chỉ">
                            <div v-if="errors.address" class="alert alert-warning">
                              @{{ errors.address[0] }}
                            </div>
                          </div>
                          <div class="form-group mt-3">
                            <label>Loại tài khoản</label>
                            <select v-model="add.role" class="form-control">
                                <option v-for="(role, index) in data_role"
                                  v-if="role.number_role > 1"
                                  :value="role.number_role">
                                  @{{ role.name_role }}
                                </option>
                            </select>
                            <div v-if="errors.role" class="alert alert-warning">
                              @{{ errors.role[0] }}
                            </div>
                          </div>
                          <div class="form-group mt-3">
                            <label>Mật khẩu</label>
                            <input v-model="add.password" type="password" class="form-control"
                              placeholder="Nhập vào mật khẩu">
                            <div v-if="errors.password" class="alert alert-warning">
                              @{{ errors.password[0] }}
                            </div>
                          </div>
                          <div class="form-group mt-3">
                            <label>Mật khẩu</label>
                            <input v-model="add.again_password" type="password" class="form-control"
                              placeholder="Nhập lại mật khẩu">
                            <div v-if="errors.again_password" class="alert alert-warning">
                              @{{ errors.again_password[0] }}
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
                            <input v-model="edit.name" type="text" class="form-control"
                              placeholder="Nhập vào Họ và tên">
                            <div v-if="errors.name" class="alert alert-warning">
                              @{{ errors.name[0] }}
                            </div>
                          </div>
                          <div class="form-group mt-3">
                            <label>Email</label>
                            <input v-model="edit.email" type="email" class="form-control" placeholder="Nhập vào email" disabled>
                            <div v-if="errors.email" class="alert alert-warning">
                              @{{ errors.email[0] }}
                            </div>
                          </div>
                          <div class="form-group mt-3">
                            <label>Số điện thoại</label>
                            <input v-model="edit.phone" type="text" class="form-control"
                              placeholder="Nhập vào số điện thoại">
                            <div v-if="errors.phone" class="alert alert-warning">
                              @{{ errors.phone[0] }}
                            </div>
                          </div>
                          <div class="form-group mt-3">
                            <label>Địa chỉ</label>
                            <input v-model="edit.address" type="text" class="form-control"
                              placeholder="Nhập vào địa chỉ">
                            <div v-if="errors.address" class="alert alert-warning">
                              @{{ errors.address[0] }}
                            </div>
                          </div>
                          <div class="form-group mt-3">
                            <label>Loại tài khoản</label>
                            <select v-model="edit.role" class="form-control">
                                <option v-for="(role, index) in data_role"
                                  v-if="role.number_role > 1"
                                  :value="role.number_role"
                                  :checked="role.number_role === edit.role">
                                  @{{ role.name_role }}
                                </option>
                            </select>
                            <div v-if="errors.role" class="alert alert-warning">
                              @{{ errors.role[0] }}
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


<!-- END HTML -->
@endsection
@section('js')


<script>
    new Vue({
      el: '#app',
      data: {
        errors: {},
        add: {},
        edit: {},
        xoa: {},
        data_acc: [],
        data_role: [],
        // login: {},
      },
      created() {
        this.GetData();
      },

      methods: {
        // hien thi danh sach tai khoan
        GetData() {
          axios
            .get('/managerAccount/show')
            .then((res) => {
              this.data_acc = res.data.data_acc;
              this.data_role = res.data.data_role;
            //   this.login = res.data.login;
            });
        },

        cap_nhat(taikhoan) {
          this.edit = taikhoan;
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
          this.add.hinh_anh = $("#hinh_anh").val();
          axios
            .post('/managerAccount/add', this.add)
            .then((res) => {
                if (res.data.status) {
                    toastr.success(res.data.message);
                    this.GetData();
                    this.add = {};
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
          axios
            .post('/managerAccount/edit', this.edit)
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
                if (error && error.response.data && error.response.data.errors) {
                    this.errors = error.response.data.errors;
                } else {
                    toastr.error('Có lỗi không mong muốn!');
                }
          });
        },

        xoa_nguoi_dung() {
          axios
            .post('/managerAccount/delete', this.xoa)
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
    $(document).ready(function () {
      $('#table_id').DataTable();
    });
  </script>
@endsection
