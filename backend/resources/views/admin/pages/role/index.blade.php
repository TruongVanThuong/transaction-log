@extends('admin.shares.master')
@section('title')
SOCKET
@endsection
@section('noi_dung')
<!-- HTML -->
<div class="row" id="app" v-cloak>

    <div class="col-md-12 mb-3">
        <div class="modal-category">
            <!-- Button trigger modal -->
            <button type="button" class="btn btn-primary m-3" data-bs-toggle="modal" data-bs-target="#accountModal">
                Thêm Role
            </button>

            <!-- Modal them Role -->
            <div class="modal fade" id="accountModal" tabindex="-1" aria-labelledby="accountModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <form id="account-form">
                            @csrf
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="accountModalLabel">Thêm Role</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div class="form-group mt-3">
                                    <label>Ten Role</label>
                                    <input name="name" type="text" class="form-control" placeholder="Nhập vào Họ và tên" required>
                                </div>
                                <div class="form-group mt-3">
                                    <label>Role ID</label>
                                    <input name="email" type="email" class="form-control" placeholder="Nhập vào email" required>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Huỷ</button>
                                <button type="submit" class="btn btn-submit">Thêm Role</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div class="page-content">
          <div class="mt-3">
            <table class="table table-bordered">
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
                  <td>@{{ role.name_role }}</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
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
      add_role: {},
      data_role: [],
    },
    created() {
      this.GetData();
    },

    methods: {
      GetData() {
        axios
          .get('/admin/role/show')
          .then((res) => {
            this.data_role = res.data.data;
            console.log(this.data_role);
          })
      },
    }
  });
</script>


@endsection
