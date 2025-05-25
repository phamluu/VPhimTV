export default function Footer() {
  return (
    <footer className="footer footer-vertical sm:footer-horizontal bg-base-300 text-base-content py-10">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-5 gap-8">
        <div className="md:col-span-1">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-primary flex items-center justify-center rounded-full mr-3 text-white">🤟</div>
            <div>
              <h2 className="font-bold text-lg">VPhimTV</h2>
              <p className="text-sm">Phim Mới and Chill</p>
            </div>
          </div>
          <p className="text-sm leading-relaxed">
            Website xem phim trực tuyến chất lượng cao, cập nhật phim mới nhất vietsub mỗi ngày, xem miễn phí hàng nghìn
            bộ phim HD/4K đa thể loại.
          </p>
        </div>
        <div>
          <span className="footer-title text-primary">Phim Mới</span>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="link link-hover">
                Phim chiếu rạp
              </a>
            </li>
            <li>
              <a href="#" className="link link-hover">
                Phim lẻ
              </a>
            </li>
            <li>
              <a href="#" className="link link-hover">
                Phim bộ
              </a>
            </li>
            <li>
              <a href="#" className="link link-hover">
                Phim hành động
              </a>
            </li>
            <li>
              <a href="#" className="link link-hover">
                Phim viễn tưởng
              </a>
            </li>
            <li>
              <a href="#" className="link link-hover">
                Phim tâm lý
              </a>
            </li>
            <li>
              <a href="#" className="link link-hover">
                Phim hài hước
              </a>
            </li>
          </ul>
        </div>

        <div>
          <span className="footer-title text-primary">Phim Hay</span>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="link link-hover">
                Phim Mỹ
              </a>
            </li>
            <li>
              <a href="#" className="link link-hover">
                Phim Hàn Quốc
              </a>
            </li>
            <li>
              <a href="#" className="link link-hover">
                Phim Trung Quốc
              </a>
            </li>
            <li>
              <a href="#" className="link link-hover">
                Phim Thái Lan
              </a>
            </li>
            <li>
              <a href="#" className="link link-hover">
                Phim Việt Nam
              </a>
            </li>
            <li>
              <a href="#" className="link link-hover">
                Phim Ma Kinh Dị
              </a>
            </li>
            <li>
              <a href="#" className="link link-hover">
                Phim Hoạt Hình
              </a>
            </li>
          </ul>
        </div>

        <div>
          <span className="footer-title text-primary">Phim Hot</span>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="link link-hover">
                Về chúng tôi
              </a>
            </li>
            <li>
              <a href="#" className="link link-hover">
                Phimmoi
              </a>
            </li>
            <li>
              <a href="#" className="link link-hover">
                Sitemap
              </a>
            </li>
          </ul>

          <span className="footer-title text-primary mt-6">Trợ giúp</span>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="link link-hover">
                Hỏi đáp
              </a>
            </li>
            <li>
              <a href="#" className="link link-hover">
                Liên hệ
              </a>
            </li>
            <li>
              <a href="#" className="link link-hover">
                Tin tức
              </a>
            </li>
          </ul>
        </div>

        <div>
          <span className="footer-title text-primary">Thông tin</span>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="link link-hover">
                Điều khoản sử dụng
              </a>
            </li>
            <li>
              <a href="#" className="link link-hover">
                Chính sách riêng tư
              </a>
            </li>
            <li>
              <a href="#" className="link link-hover">
                Khiếu nại bản quyền
              </a>
            </li>
          </ul>
          <p className="text-xs mt-6">© 2025 VPhimTV.Com</p>
        </div>
      </div>
    </footer>
  );
}
