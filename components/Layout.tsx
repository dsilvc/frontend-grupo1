import Link from "next/link";
import { FunctionComponent, ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col">
      <div className="flex h-[144px] w-screen items-center justify-between bg-[#283645] pl-[47.5px] pr-16">
        <div className="relative flex h-full items-center justify-center overflow-clip">
          <h1 className="mb-3 text-[200px] font-bold text-[#2e4d7e]">UC</h1>
          <h1 className="absolute inset-0 flex h-full w-full items-center justify-center font-prata text-3xl text-white">
            Páginas Celestes
          </h1>
        </div>
        <div className="flex space-x-5 text-white">
          <Link href="#" className="font-prata text-3xl">
            Mi Perfil
          </Link>
          <Link href="#" className="font-prata text-3xl">
            Mis Métricas
          </Link>
          <Link href="#" className="font-prata text-3xl">
            Salir
          </Link>
        </div>
      </div>
      <div className="flex">
        <div className="flex h-[calc(100vh-144px)] w-[379px] flex-col items-center bg-[#d2dff4] py-[20px]">
          <div className="mt-[38px] flex w-full flex-col space-y-[21px] px-7">
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
