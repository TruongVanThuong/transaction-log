<!doctype html>
<html lang="en">

<head>
  @include('admin.shares.css')
  <title>@yield('title')</title>
  @yield('css')
</head>

<body>
  <!--wrapper-->
  <div class="wrapper">
    <!--sidebar wrapper -->
    <div class="sidebar-wrapper" data-simplebar="true">
      @include('admin.shares.sidebar')
    </div>
    <!--end sidebar wrapper -->
    <!--start header -->
    <header>
      @include('admin.shares.header')
    </header>
    <!--end header -->
    <!--start page wrapper -->
    <div class="page-wrapper">
      @yield('noi_dung')
    </div>
    <!--end page wrapper -->
    <!--start overlay-->
    <div class="overlay toggle-icon"></div>
    <!--end overlay-->
    <!--Start Back To Top Button-->
    <a href="javaScript:;" class="back-to-top"><i class='bx bxs-up-arrow-alt'></i></a>
    <!--End Back To Top Button-->
    <footer class="page-footer">
      <p class="mb-0">Copyright © 2021. All right reserved.</p>
    </footer>
  </div>
  <!--end wrapper-->
  <!--start switcher-->
  <div class="switcher-wrapper">

    @include('admin.shares.switcher')
  </div>
  <!--end switcher-->


  <!-- SCRIPT -->
  @include('admin.shares.js')
</body>

</html>