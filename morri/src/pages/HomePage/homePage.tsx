import React from "react";
import "./homePage.css";
import WorkSchedule from "./WorkSchedule";

import styled from "@emotion/styled";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { Button, IconButton } from "@mui/material";
const HomePage: React.FC = () => {
  const StyledIconButton = styled(IconButton)`
    margin: 4px 0px;
  `;
  return (
    <div className="home-page">
      <span className="title-text">Hello Uyn</span>
      <div className="line" />
      <div>
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h2>Chào mừng đến với Morri Jewelry</h2>
            <StyledIconButton
              className={`edit-button`}
              size="small"
              // onClick={}
            >
              <BorderColorIcon fontSize="small" />
            </StyledIconButton>
          </div>
          <span>
            Chúng mình đã háo hức chờ đợi khoảnh khắc này để gặp gỡ và làm việc
            cùng nhau. Morri Jewelry rất vui mừng được chào đón bạn đến với gia
            đình Morri. Hãy cùng nhau tạo ra những trải nghiệm khó quên và xây
            dựng một môi trường làm việc tuyệt vời. Hãy sẵn sàng khám phá, đổi
            mới và đạt được thành công đáng kể.
            <br />
            Chào mừng đến với <strong>Morri Jewelry</strong>! <br />
            Trân trọng,
            <br />
            <strong>Morri</strong>
          </span>
        </div>
        <div className="line" />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2>Điều khoản, điều kiện</h2>
          <StyledIconButton
            className={`edit-button`}
            size="small"
            // onClick={}
          >
            <BorderColorIcon fontSize="small" />
          </StyledIconButton>
        </div>
        <span>
          Khi bạn mua hàng và sử dụng dịch vụ, bạn đồng ý với các điều khoản và
          điều kiện dưới đây.
          <br />
          <strong>1. Sản phẩm:</strong> Tất cả sản phẩm đều được mô tả một cách
          chính xác. Chúng tôi không đảm bảo rằng màu sắc và hình ảnh trên trang
          web hoàn toàn giống với sản phẩm thực tế.
          <br />
          <strong>2. Đặt hàng:</strong> Khi đặt hàng, bạn đồng ý cung cấp thông
          tin chính xác và đầy đủ. Chúng tôi có quyền từ chối hoặc hủy bỏ đơn
          hàng nếu thông tin không chính xác.
          <br />
          <strong>3. Phương thức thanh toán:</strong> Chúng tôi chấp nhận nhiều
          phương thức thanh toán khác nhau. Tất cả giao dịch sẽ được xử lý an
          toàn và bảo mật.
          <br />
          <strong>4. Chính sách hoàn trả:</strong> Chúng tôi có chính sách hoàn
          trả trong vòng 14 ngày. Sản phẩm phải còn nguyên vẹn và không bị hư
          hại.
          <br />
          <strong>5. Quyền lợi và trách nhiệm:</strong> Chúng tôi cam kết cung
          cấp dịch vụ tốt nhất cho khách hàng. Tuy nhiên, chúng tôi không chịu
          trách nhiệm cho bất kỳ thiệt hại nào phát sinh từ việc sử dụng sản
          phẩm.
          <br />
          <strong>6. Thay đổi điều khoản:</strong> Chúng tôi có quyền thay đổi
          các điều khoản và điều kiện này mà không cần thông báo trước. Khách
          hàng nên thường xuyên kiểm tra để cập nhật các thay đổi.
          <br />
          <strong>7. Liên hệ:</strong> Nếu bạn có bất kỳ câu hỏi nào về các điều
          khoản này, xin vui lòng liên hệ với chúng tôi qua email hoặc số điện
          thoại.
        </span>
      </div>

      <div className="line" />
      <h2>Lịch làm việc</h2>
      <WorkSchedule />
    </div>
  );
};

export default HomePage;
