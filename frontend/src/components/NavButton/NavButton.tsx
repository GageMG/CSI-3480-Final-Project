function NavButton({
  active = false,
  icon,
  children
}: {
  active?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className={`pt-2 pr-4 pb-2 pl-4 rounded-md ${active ? 'bg-white text-black' : 'hover:bg-gray-800'} flex gap-2 cursor-pointer`}>
      <span className='[&>svg]:w-4'>{icon}</span>
      {children}
    </div>
  );
}

export default NavButton;
