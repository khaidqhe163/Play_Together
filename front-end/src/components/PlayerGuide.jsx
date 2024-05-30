import React from 'react';

export default function PlayerGuide() {
  return (
    <>
      <h1 className="text-white">Hướng dẫn Player</h1>
      <div className="text-white mt-4">
        <h2 className="text-lg font-bold">1. LÀM SAO ĐỂ TRANG CÁ NHÂN ĐƯỢC HIỂN THỊ TRÊN TRANG CHỦ PLAYER DUO?</h2>
        <p>Để được hiển thị trên trang chủ Player Duo, bạn phải là Hot Player. Bạn có thể xem điều kiện trở thành Hot Player tại trang Player. Nếu tất cả được bật xanh thì bạn đã đủ điều kiện trở thành Hot Player.</p>
        <p>Để khởi đầu tại Player Duo bạn cần:</p>
        <ul className="list-disc pl-6">
          <li>Cập nhật cho mình 1 Profile thật hoàn chỉnh và chuyên nghiệp.</li>
          <li>Giới thiệu link profile cá nhân của mình trên tường cá nhân hoặc những group game mà bạn tham gia.</li>
          <li>Tránh từ chối yêu cầu và hoàn thành thật tốt tất cả yêu cầu duo để nhận được nhận xét tốt từ khách hàng.</li>
          <li>Nếu các bạn là Streamer, hãy tích hợp donate vào kênh stream của mình để cảm ơn khách hàng.</li>
          <li>Hãy khởi đầu với mức phí tối thiểu để nhanh chóng kiếm cho mình những khách hàng thân thiết.</li>
        </ul>
        <p>Chúc các bạn có được 1 khởi đầu thành công tại Player Duo.</p>

        <h2 className="text-lg font-bold mt-6">2. CHI PHÍ CHO PLAYER DUO LÀ BAO NHIÊU?</h2>
        <p>Đối với mỗi yêu cầu Duo, Player Duo sẽ thu 10% giá trị yêu cầu.</p>
        <p>Đối với mỗi lượt Donate, Player Duo sẽ thu 5% giá trị donate.</p>
      </div>
    </>
  );
}
