import { Outlet } from 'react-router-dom';

export default function HadithLayout() {
  return (
    <div className="w-full h-full relative">
      <Outlet />
    </div>
  );
}
