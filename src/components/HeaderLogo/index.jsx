import Link from "next/link";

function HeaderLogo() {
  return (
    <Link href="/" className="w-20 h-auto overflow-hidden cursor-pointer">
      <img
        className="w=full"
        src="https://jollibee.com.vn/static/version1698938216/frontend/Jollibee/default/vi_VN/images/logo.png"
        title="Logo Jollibee"
        alt="Logo Jollibee"
      />
    </Link>
  );
}

export default HeaderLogo;
