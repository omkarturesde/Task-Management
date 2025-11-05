import { useState } from 'react';
import {
  Home,
  Users,
  User,
  Folder,
  Calendar,
  BookOpen,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

const SidebarLink = ({ icon: Icon, label, badge }: any) => (
  <a
    href='#'
    className='flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100'
  >
    <Icon className='size-4' />
    {label}
    {badge && (
      <span className='ms-auto py-0.5 px-1.5 inline-flex items-center gap-x-1.5 text-xs bg-gray-200 text-gray-800 rounded-full'>
        {badge}
      </span>
    )}
  </a>
);

const SidebarAccordion = ({ icon: Icon, label, children }: any) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className='w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100'
      >
        <Icon className='size-4' />
        {label}
        {open ? (
          <ChevronUp className='ms-auto size-4 text-gray-600' />
        ) : (
          <ChevronDown className='ms-auto size-4 text-gray-600' />
        )}
      </button>
      {open && <div className='pl-6 space-y-1'>{children}</div>}
    </div>
  );
};

const Sidebar = () => {
  return (
    <aside className='fixed top-0 start-0 z-60 w-64 h-full bg-white border-e border-gray-200 flex flex-col'>
      {/* Header */}
      <header className='p-4 flex justify-between items-center'>
        <a href='#' className='font-semibold text-xl text-black'>
          Brand
        </a>
      </header>

      {/* Body */}
      <nav className='flex-1 overflow-y-auto px-2 pb-4'>
        <ul className='space-y-1'>
          <li>
            <SidebarLink icon={Home} label='Dashboard' />
          </li>

          <li>
            <SidebarAccordion icon={Users} label='Users'>
              <SidebarAccordion icon={User} label='Sub Menu 1'>
                <SidebarLink label='Link 1' icon={User} />
                <SidebarLink label='Link 2' icon={User} />
                <SidebarLink label='Link 3' icon={User} />
              </SidebarAccordion>

              <SidebarAccordion icon={User} label='Sub Menu 2'>
                <SidebarLink label='Link 1' icon={User} />
                <SidebarLink label='Link 2' icon={User} />
              </SidebarAccordion>
            </SidebarAccordion>
          </li>

          <li>
            <SidebarAccordion icon={User} label='Account'>
              <SidebarLink label='Profile' icon={User} />
              <SidebarLink label='Settings' icon={User} />
            </SidebarAccordion>
          </li>

          <li>
            <SidebarAccordion icon={Folder} label='Projects'>
              <SidebarLink label='Ongoing' icon={Folder} />
              <SidebarLink label='Completed' icon={Folder} />
            </SidebarAccordion>
          </li>

          <li>
            <SidebarLink icon={Calendar} label='Calendar' badge='New' />
          </li>
          <li>
            <SidebarLink icon={BookOpen} label='Documentation' />
          </li>
        </ul>
      </nav>

      {/* Footer */}
      <footer className='mt-auto border-t border-gray-200 p-3'>
        <div className='flex items-center gap-x-2 p-2 hover:bg-gray-100 rounded-lg cursor-pointer'>
          <img
            src='https://images.unsplash.com/photo-1734122415415-88cb1d7d5dc0?q=80&w=320&h=320&auto=format&fit=facearea&facepad=3'
            alt='Avatar'
            className='size-6 rounded-full'
          />
          <span className='text-sm text-gray-800'>Mia Hudson</span>
        </div>
      </footer>
    </aside>
  );
};

export default Sidebar;
