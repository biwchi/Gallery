import { NavLink } from "react-router-dom";
import { twMerge } from "tailwind-merge";

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
    <NavLink
      to={to}
      className={twMerge(
        'duration-300" border-b border-gray-700 text-xl',
        "font-light text-gray-300 transition-all hover:border-gray-300",
        "hover:text-gray-100 [&.active]:border-gray-300 [&.active]:text-gray-100",
      )}
    >
      {text}
    </NavLink>
  );
}
