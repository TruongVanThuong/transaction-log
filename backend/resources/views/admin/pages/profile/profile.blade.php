@extends('admin.shares.master')
@section('noi_dung')

<div class="page-content" id="app" v-cloak>
  <!--breadcrumb-->
  <div class="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
    <div class="breadcrumb-title pe-3">Hồ Sơ</div>
    <div class="ps-3">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb mb-0 p-0">
          <li class="breadcrumb-item"><a href="/admin/"><i class="bx bx-home-alt"></i></a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">Hồ Sơ</li>
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
                <div class="col-sm-3">
                  <h6 class="mb-0">Họ và tên</h6>
                </div>
                <div class="col-sm-9 text-secondary">
                  <input type="text" class="form-control" v-model="edit_user.name" />
                  <div v-if="errors.name" class="alert alert-warning">
                    @{{ errors.name[0] }}
                  </div>
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-sm-3">
                  <h6 class="mb-0">Email</h6>
                </div>
                <div class="col-sm-9 text-secondary">
                  <input type="text" class="form-control" v-model="edit_user.email" />
                  <div v-if="errors.email" class="alert alert-warning">
                    @{{ errors.email[0] }}
                  </div>
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-sm-3">
                  <h6 class="mb-0">Số điện thoại</h6>
                </div>
                <div class="col-sm-9 text-secondary">
                  <input type="text" class="form-control" v-model="edit_user.phone" />
                  <div v-if="errors.phone" class="alert alert-warning">
                    @{{ errors.phone[0] }}
                  </div>
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-sm-3">
                  <h6 class="mb-0">Địa chỉ</h6>
                </div>
                <div class="col-sm-9 text-secondary">
                  <input type="text" class="form-control" v-model="edit_user.address" />
                  <div v-if="errors.address" class="alert alert-warning">
                    @{{ errors.address[0] }}
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-3"></div>
                <div class="col-sm-9 text-secondary">
                  <button type="button" v-on:click="cap_nhap_ho_so()" class="btn btn-primary px-4">Cập nhật hồ
                    sơ</button>
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
      edit_user: {},
      errors: {},
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

      cap_nhap_ho_so() {
        axios
          .post('/profile/updateInfo', this.edit_user)
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

@endsection
