<!doctype html>
<html lang="en">

<head>
  <!-- Required meta tags -->
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <!--favicon-->
  <link rel="icon" href="/assets_admin_rocker/images/icon-admin.jpeg" type="image/png" />
  <!--plugins-->
  <link href="/assets_admin_rocker/plugins/simplebar/css/simplebar.css" rel="stylesheet" />
  <link href="/assets_admin_rocker/plugins/perfect-scrollbar/css/perfect-scrollbar.css" rel="stylesheet" />
  <link href="/assets_admin_rocker/plugins/metismenu/css/metisMenu.min.css" rel="stylesheet" />
  <!-- loader-->
  <link href="/assets_admin_rocker/css/pace.min.css" rel="stylesheet" />
  <script src="/assets_admin_rocker/js/pace.min.js"></script>
  <!-- Bootstrap CSS -->
  <link href="/assets_admin_rocker/css/bootstrap.min.css" rel="stylesheet">
  <link href="/assets_admin_rocker/css/bootstrap-extended.css" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap" rel="stylesheet">
  <link href="/assets_admin_rocker/css/app.css" rel="stylesheet">
  <link href="/assets_admin_rocker/css/icons.css" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css" />
  <link rel="stylesheet" href="https://cdn.datatables.net/1.12.1/css/jquery.dataTables.min.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css">
  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.6/moment.js"></script>
  <title>Đăng nhập</title>
</head>

<body class="bg-login">
  <!--wrapper-->
  <div class="wrapper">
    <div class="section-authentication-signin d-flex align-items-center justify-content-center my-5 my-lg-0">
      <div class="container-fluid">
        <div class="row row-cols-1 row-cols-lg-2 row-cols-xl-3">
          <div class="col mx-auto">
            <div class="mb-4 text-center">
              <div class="d-flex justify-content-center align-items-center">
                <img src="/assets_admin_rocker/images/icon-admin.jpeg" class="logo-icon" alt="logo icon"
                  style="width: 70px;">
                <h3 class="logo-text">GUCCI</h3>
              </div>
            </div>
            <div class="card" id="app">
              <div class="card-body">
                <div class="border p-4 rounded">
                  <div class="form-body row g-3">
                    <div class="section-header mb-3">
                      <h2 class="section-heading text-center text-nowrap">Quên Mật Khẩu</h2>
                    </div>
                    <div class="col-12">
                      <label for="inputEmailAddress" class="form-label">Nhập Email Muốn Đổi Lại Mật Khẩu
                      </label>
                      <input v-model="quen_mat_khau.email" type="email" class="form-control"
                        placeholder="Nhập địa chỉ email">
                      <div v-if="errors.email" class="alert alert-warning">@{{ errors.email[0] }}</div>
                    </div>
                    <div class="col-12 text-end">
                      <a class="mb-2" href="{{asset('/admin/dang-nhap')}}">
                        Đăng nhập
                      </a>
                    </div>
                    <div class="col-12">
                      <div class="d-grid">
                        <button type="submit" v-on:click="kich_hoat_quen_mat_khau()" class="btn btn-primary">
                          Gửi
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
            <!-- end id="app" -->
          </div>
        </div>
        <!--end row-->
      </div>
    </div>
  </div>
  <!--end wrapper-->


  <script>
    new Vue({
      el: "#app",
      data: {
        quen_mat_khau: {},
        errors: {
          email: '',
        },
      },

      methods: {
        kich_hoat_quen_mat_khau() {
          axios
            .post('/admin/ho-so/quen-mat-khau', this.quen_mat_khau)
            .then((res) => {
              if (res.data.status) {
                toastr.success(res.data.message);
                setTimeout(() => {
                  window.location.href = "/admin/dang-nhap";
                }, 1000); // Delay for 2 seconds (2000 milliseconds)
              } else {
                toastr.warning(res.data.message);
              }
            })
            .catch((error) => {
              if (error.response && error.response.data && error.response.data.errors) {
                this.errors = error.response.data.errors;
              } else {
                toastr.error('Có lỗi không mong muốn!');
              }
            })
        },
      }
    });
  </script>



  <!-- Bootstrap JS -->
  <script src="/assets_admin_rocker/js/bootstrap.bundle.min.js"></script>
  <!--plugins-->
  <script src="/assets_admin_rocker/js/jquery.min.js"></script>
  <script src="/assets_admin_rocker/plugins/simplebar/js/simplebar.min.js"></script>
  <script src="/assets_admin_rocker/plugins/metismenu/js/metisMenu.min.js"></script>
  <script src="/assets_admin_rocker/plugins/perfect-scrollbar/js/perfect-scrollbar.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/1.1.3/axios.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.4/moment.min.js"></script>
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
  <!--app JS-->
  <script src="/assets_admin_rocker/js/app.js"></script>
</body>

</html>