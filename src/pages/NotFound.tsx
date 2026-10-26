import { useLocation } from "react-router-dom";

const NotFound = () => {
  const { pathname } = useLocation();

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="font-mono text-sm text-fg2">
        <p>
          <span className="text-accent2">guest</span>
          <span className="text-fg4">@</span>
          <span className="text-accent">umesh</span>
          <span className="text-fg4">:~$</span> cd {pathname}
        </p>
        <p className="mt-1 text-red-400">404: no such page</p>
        <a href="/" className="mt-4 inline-block text-accent hover:underline">
          ← back home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
