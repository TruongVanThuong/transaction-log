@extends('admin.shares.master')
@section('title')
Role
@endsection
@section('noi_dung')
<!-- HTML -->
<div class="row" id="app" v-cloak>

    <div class="col-md-12 mb-3">
        <div class="modal-category">
            <!-- Button trigger modal -->
            <button type="button" class="btn btn-primary m-3" data-bs-toggle="modal" data-bs-target="#roleModal">
                Thêm Role
            </button>

            <!-- Modal them Role -->
            <div class="modal fade" id="roleModal" tabindex="-1" aria-labelledby="roleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="roleModalLabel">Thêm Role</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div class="form-group mt-3">
                                    <label>Name Role</label>
                                    <input v-model="add.name_role" type="text" class="form-control" placeholder="Name Role">
                                    <div v-if="errors.name_role" class="alert alert-warning">
                                        @{{ errors.name_role[0] }}
                                      </div>
                                </div>
                                <div class="form-group mt-3">
                                    <label>Number Role</label>
                                    <input v-model="add.number_role" type="number" class="form-control" placeholder="Number Role">
                                    <div v-if="errors.number_role" class="alert alert-warning">
                                        @{{ errors.number_role[0] }}
                                      </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Huỷ</button>
                                <button type="submit" v-on:click="add_role()" class="btn btn-submit">Thêm Role</button>
                            </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="page-content">
          <div class="mt-3">
            <table id="table_id" class="table table-bordered">
              <thead class="bg-primary">
                <tr>
                  <th class="text-center" style="width: 20px;">STT</th>
                  <th class="text-center">Ten Role</th>
                  <th class="text-center">Role ID</th>
                  <th class="text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(role, key) in data_role">
                  <td class="text-center">@{{ key + 1 }}</td>
                  <td class="text-center">@{{ role.name_role }}</td>
                  <td class="text-center">@{{ role.number_role }}</td>
                  <td class="text-center">
                    <!-- Button trigger modal -->
                    <button v-on:click="cap_nhat(role)" class="btn btn-primary" data-bs-toggle="modal"
                        data-bs-target="#EditModal"><i class="bx bx-edit"></i>
                    </button>
                    <button v-on:click="xoa = role" class="btn btn-danger" data-bs-toggle="modal"
                        data-bs-target="#DeleteModal"><i class="bx bx-trash"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Modal cap nhat role-->
        <div class="modal fade" id="EditModal" tabindex="-1" aria-labelledby="EditModalLabel"
        aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="EditModalLabel">Cập Nhật Role</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="form-group mt-3">
                    <label>Name Role</label>
                    <input v-model="edit.name_role" type="text" class="form-control" placeholder="Name Role">
                    <div v-if="errors.name_role" class="alert alert-warning">
                        @{{ errors.name_role[0] }}
                      </div>
                </div>
                <div class="form-group mt-3">
                    <label>Number Role</label>
                    <input v-model="edit.number_role" type="number" class="form-control" placeholder="Number Role">
                    <div v-if="errors.number_role" class="alert alert-warning">
                        @{{ errors.number_role[0] }}
                      </div>
                </div>

            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Huỷ</button>
              <button v-on:click="cap_nhat_role()" type="button" class="btn btn-primary">
                Cập Nhật Role</button>
            </div>
          </div>
        </div>
      </div>

      <!-- MODAL DELETE -->
      <div class="modal fade" id="DeleteModal" tabindex="-1" role="dialog" aria-labelledby="DeleteModalLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="DeleteModalLabel">Xác Nhận Xoá Dữ Liệu</h5>
              <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              Bạn có chắc muốn xoá dữ liệu này không?
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Huỷ</button>
              <button type="button" class="btn btn-danger" v-on:click="xoa_role()">Xoá</button>
            </div>
          </div>
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
      add: {},
      edit: {},
      xoa: {},
      data_role: [],
    },
    created() {
      this.GetData();
    },

    methods: {
        GetData() {
            axios
            .get('/role/show')
            .then((res) => {
                this.data_role = res.data.data_role;
            })
        },

        cap_nhat(role) {
            this.edit = role;
        },

        add_role() {
            axios
            .post('/role/add', this.add)
            .then((res) => {
                if(res.data.status) {
                    toastr.success(res.data.message);
                    this.GetData();
                    $('#roleModal').modal('hide');
                } else {
                    toastr.error("Lỗi trạng thái !");
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

        cap_nhat_role(){
            axios.post('/role/edit', this.edit)
            .then((res) => {
                if(res.data.status) {
                    toastr.success(res.data.message);
                    this.GetData();
                    $('#EditModal').modal('hide');
                } else {
                    toastr.error("Lỗi trạng thái !");
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

        xoa_role() {
          axios
            .post('/role/delete', this.xoa)
            .then((res) => {
                if(res.data.status) {
                    toastr.success(res.data.message);
                    this.GetData();
                    $('#DeleteModal').modal('hide');
                } else {
                    toastr.error("Lỗi trạng thái !");
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
