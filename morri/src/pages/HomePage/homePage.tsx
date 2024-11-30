import React from "react";
import "./homePage.css";

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <span className="title-text">Hello Uyn</span>
      <div className="line" />
      <div className="">
        <div className="">
          <h2>Chào mừng đến với Morri Jewelry</h2>
          <span >
            Chúng mình đã háo hức chờ đợi khoảnh khắc này để gặp gỡ và làm việc cùng nhau. 
            Morri Jewelry rất vui mừng được chào đón bạn đến với gia đình Morri. 
            Hãy cùng nhau tạo ra những trải nghiệm khó quên và xây dựng một môi trường làm việc tuyệt vời. 
            Hãy sẵn sàng khám phá, đổi mới và đạt được thành công đáng kể.
            <br/>Chào mừng đến với <strong>Morri Jewelry</strong>! <br/>
            Trân trọng,<br/>
            <strong>Morri</strong>
          </span>
        </div>
        <div className="line" />
        <h2>Điều khoản, điều kiện</h2>
        <span>Điều khoản điều kiện<br/>
        </span>
      </div>
    </div>
  );
};

export default HomePage;
