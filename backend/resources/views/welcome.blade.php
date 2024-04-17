<?php
// Thông tin kết nối đến cơ sở dữ liệu
$servername = "localhost";
$username = "root"; // Tên người dùng MySQL
$password = ""; // Mật khẩu MySQL
$database = "transaction"; // Tên cơ sở dữ liệu MySQL

// Tạo kết nối
$conn = new mysqli($servername, $username, $password, $database);

// Kiểm tra kết nối
if ($conn->connect_error) {
    die("Kết nối đến cơ sở dữ liệu thất bại: " . $conn->connect_error);
}

// Truy vấn SQL
$sql = "SELECT id, name, email FROM users";
$result = $conn->query($sql);

// Kiểm tra và hiển thị kết quả
if ($result->num_rows > 0) {
    // Duyệt qua từng hàng dữ liệu
    while($row = $result->fetch_assoc()) {
        echo "ID: " . $row["id"]. " - Tên: " . $row["name"]. " - Email: " . $row["email"]. "<br>";
    }
} else {
    echo "Không có dữ liệu";
}

// Đóng kết nối
$conn->close();
?>
