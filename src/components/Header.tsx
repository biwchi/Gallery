import { Link } from "react-router-dom";

export default function Header() {
  const links = [
    { name: "Gallery", route: "/" },
    { name: "Photos", route: "/photos" },
    { name: "Videos", route: "/videos" },
    { name: "Audios", route: "/audios" },
  ];

  return (
    <div className="w-full p-10">
      <div className="m-auto flex justify-around gap-4">
        {links.map((link, idx) => {
          return <HeaderLink key={idx} to={link.route} text={link.name} />;
        })}
      </div>
    </div>
  );
}

function HeaderLink({ to, text }: { to: string; text: string }) {
  return (
    <Link
      to={to}
      className='class="text-xl duration-300" border-b border-gray-700 font-light text-gray-300 transition-all hover:border-gray-300 hover:text-gray-100'
    >
      {text}
    </Link>
  );
}
