import Link from "next/link";
import { FunctionComponent, ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col">
      <div className="flex h-[6rem] w-screen items-center justify-between bg-[#283645] pl-[2rem] pr-16">
        <Link href="/">
        <div className="relative flex h-full items-center justify-center overflow-clip">
          <h1 className="mb-3 text-[8rem] font-bold  font-pragati-narrow text-[#2e4d7e]">UC</h1>
          <h1 className="absolute inset-0 flex h-full w-full items-center justify-center font-prata text-2xl text-white text-[1.4rem]">
            Páginas Celestes
          </h1>
        </div>
        </Link>
        <div className="flex space-x-5 text-white">
          <Link href="#" className="font-prata text-2xl">
            Mi Perfil
          </Link>
          <Link href="#" className="font-prata text-2xl">
            Mis Métricas
          </Link>
          <Link href="#" className="font-prata text-2xl">
            Salir
          </Link>
        </div>
      </div>
      <div className="flex">
        <div className="flex h-screen w-[14rem] flex-col items-center bg-[#d2dff4] py-[1rem]">
          <div className="mt-[2rem] flex w-full flex-col space-y-[1rem] px-7">
            <Link href="#" className="font-work-sans text-xl text-[#213144]">
              Explorar Clases
            </Link>
            <Link href="#" className="font-work-sans text-xl text-[#213144]">
              Mis Servicios
            </Link>
            <Link href="#" className="font-work-sans text-xl text-[#213144]">
              Servicios Contratados
            </Link>
            <Link href="#" className="font-work-sans text-xl text-[#213144]">
              Historial
            </Link>
            <Link href="#" className="font-work-sans text-xl text-[#213144]">
              Chats
            </Link>
          </div>
        </div>
        <div className="flex h-full w-full flex-1 p-5">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
