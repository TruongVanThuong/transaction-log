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
                                <div class="card-body">
                                    <div class="border p-4 rounded">
                                        <div class="form-body row g-3">
                                            <input  v-model="doi_mat_khau.ma_bam_quen_mat_khau" type="hidden">
                                            <div class="col-12">
                                                <label for="inputEmailAddress" class="form-label">Mật khẩu mới</label>
                                                <div class="input-group" id="show_hide_password">
                                                    <input v-model="doi_mat_khau.password_new" type="password"
                                                        class="form-control border-end-0" placeholder="Nhập mật khẩu">
                                                    <a href="javascript:;" class="input-group-text bg-transparent">
                                                        <i class='bx bx-hide'></i>
                                                    </a>
                                                </div>
                                                <div v-if="errors.password_new" class="alert alert-warning">@{{ errors.password_new[0]
                                                    }}</div>
                                            </div>
                                            <div class="col-12">
                                                <label for="inputChoosePassword" class="form-label">Nhập lại mật
                                                    khẩu</label>
                                                <div class="input-group" id="show_hide_password1">
                                                    <input v-model="doi_mat_khau.password_retype" type="password"
                                                        class="form-control border-end-0" placeholder="Nhập mật khẩu">
                                                    <a href="javascript:;" class="input-group-text bg-transparent">
                                                        <i class='bx bx-hide'></i>
                                                    </a>
                                                </div>
                                                <div v-if="errors.password_retype" class="alert alert-warning">@{{
                                                    errors.password_retype[0] }}</div>
                                            </div>
                                            <div class="col-12">
                                                <div class="d-grid">
                                                    <button type="submit" v-on:click="kich_hoat_doi_mat_khau()"
                                                        class="btn btn-primary">
                                                        <i class="bx bxs-lock-open"></i>
                                                        Đổi mật khẩu
                                                    </button>
                                                </div>
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


    <script>
        new Vue({
            el: "#app",
            data: {
                doi_mat_khau: {
                    ma_bam_quen_mat_khau: "{{ $ma_bam_quen_mat_khau }}",
                },
                errors: {},
            },

            methods: {
                kich_hoat_doi_mat_khau() {
                    axios
                        .post('/admin/ho-so/doi-mat-khau', this.doi_mat_khau)
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