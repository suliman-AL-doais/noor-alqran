import { Outlet } from 'react-router-dom';

export default function QuranLayout() {
  return (
    <div className="w-full h-full relative">
      <Outlet />
    </div>
  );
}
