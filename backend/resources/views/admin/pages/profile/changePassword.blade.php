@extends('admin.shares.master')
@section('noi_dung')

<div class="page-content" id="app" v-cloak>
  <!--breadcrumb-->
  <div class="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
    <div class="breadcrumb-title pe-3">Đổi Mật Khẩu</div>
    <div class="ps-3">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb mb-0 p-0">
          <li class="breadcrumb-item"><a href="/admin/"><i class="bx bx-home-alt"></i></a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">Đổi Mật Khẩu</li>
        </ol>
      </nav>
    </div>
  </div>
  <!--end breadcrumb-->
  <div class="container">
    <div class="main-body">
      <div class="row" style="height: auto;">
        <div class="col-lg-4">
          <div class="card" style="height: 100%;">
            <div class="card-body">
              <div class="d-flex flex-column align-items-center text-center">
                <i class="bx bx-user user-img" style="font-size: 35px;
                  background-color: #333;
                  text-align: center;
                  color: #fff;
                  align-items: center;
                  width: 70px;
                  display: grid;
                  height: 70px;"></i>
                <div class="mt-3">
                    <h4>@{{ edit_user.name }}</h4>
                    <p class="text-secondary mb-1">@{{ edit_user.email }}</p>
                    <p class="text-muted font-size-sm">@{{ edit_user.address }}</p>
                    <button class="btn btn-outline-primary" v-for="role in data_role"
                        v-if="role.number_role == edit_user.role">@{{ role.name_role }}
                    </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-8">
          <div class="card" style="height: 100%;">
            <div class="card-body">
              <div class="row mb-3">
                <div class="col-sm-4">
                  <h6 class="mb-0">Mật khẩu mới</h6>
                </div>
                <div class="col-sm-8 text-secondary">
                  <div class="input-group" id="show_hide_password1">
                    <input v-model="doi_mat_khau.password_new" type="password" class="form-control border-end-0"
                      placeholder="Nhập mật khẩu">
                    <a href="javascript:;" class="input-group-text bg-transparent">
                      <i class='bx bx-hide'></i>
                    </a>
                  </div>
                  <div v-if="errors.password_new" class="alert alert-warning">
                    @{{ errors.password_new[0] }}
                  </div>
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-sm-4">
                  <h6 class="mb-0">Nhập lại mật khẩu mới</h6>
                </div>
                <div class="col-sm-8 text-secondary">
                  <div class="input-group" id="show_hide_password">
                    <input v-model="doi_mat_khau.password_retype" type="password" class="form-control border-end-0"
                      placeholder="Nhập mật khẩu">
                    <a href="javascript:;" class="input-group-text bg-transparent">
                      <i class='bx bx-hide'></i>
                    </a>
                  </div>
                  <div v-if="errors.password_retype" class="alert alert-warning">
                    @{{ errors.password_retype[0] }}
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-4"></div>
                <div class="col-sm-8 text-secondary">
                  <button type="button" v-on:click="doi_mat_khau_ho_so()" class="btn btn-primary px-4">Cập nhật Mật Khẩu</button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</div>

@endsection
@section('js')

<script>
  new Vue({
    el: "#app",

    data: {
        edit_user:{},
        errors: {},
        doi_mat_khau: {},
    },

    created() {
      this.GetData();
    },

    methods: {
      GetData() {
        axios
          .get('/profile/information')
          .then((res) => {
            this.edit_user = res.data.tai_khoan;
            this.data_role = res.data.data_phanquyen;
        });
      },

      doi_mat_khau_ho_so() {
        axios
          .post('/profile/changePassword', this.doi_mat_khau)
          .then((res) => {
            if (res.data.status) {
              toastr.success(res.data.message);
              this.GetData();
            } else {
              toastr.error(res.data.message);
            }
          })
          .catch((error) => {
            if (error.response && error.response.data && error.response.data.errors) {
              this.errors = error.response.data.errors;
            } else {
              toastr.error('Có lỗi không mong muốn!');
            }
          });
      }
    }
  });
</script>


<script>
    $(document).ready(function () {
      $("#show_hide_password a").on('click', function (event) {
        event.preventDefault();
        if ($('#show_hide_password input').attr("type") == "text") {
          $('#show_hide_password input').attr('type', 'password');
          $('#show_hide_password i').addClass("bx-hide");
          $('#show_hide_password i').removeClass("bx-show");
        } else if ($('#show_hide_password input').attr("type") == "password") {
          $('#show_hide_password input').attr('type', 'text');
          $('#show_hide_password i').removeClass("bx-hide");
          $('#show_hide_password i').addClass("bx-show");
        }
      });
    });
  </script>

  <script>
    $(document).ready(function () {
      $("#show_hide_password1 a").on('click', function (event) {
        event.preventDefault();
        if ($('#show_hide_password1 input').attr("type") == "text") {
          $('#show_hide_password1 input').attr('type', 'password');
          $('#show_hide_password1 i').addClass("bx-hide");
          $('#show_hide_password1 i').removeClass("bx-show");
        } else if ($('#show_hide_password1 input').attr("type") == "password") {
          $('#show_hide_password1 input').attr('type', 'text');
          $('#show_hide_password1 i').removeClass("bx-hide");
          $('#show_hide_password1 i').addClass("bx-show");
        }
      });
    });
  </script>


@endsection
