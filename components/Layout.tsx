import Link from "next/link";
import { FunctionComponent, ReactNode } from "react";



type LayoutProps = {
  children: React.ReactNode;
};

const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col">
      <div className="flex h-[144px] w-screen items-center justify-between bg-[#283645] pl-[47.5px] pr-16">
        <Link href="/">
          <div className="relative flex h-full items-center justify-center overflow-clip">
            <h1 className="mb-3 text-[200px] font-bold text-[#2e4d7e]">UC</h1>
            <h1 className="absolute inset-0 flex h-full w-full items-center justify-center font-prata text-3xl text-white">
              Páginas Celestes
            </h1>
          </div>
        </Link>
        <div className="flex space-x-8 text-white">
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
      <div className="flex flex-1">
        <div className="h-[calc(100vh-144px)] w-[375px] flex-col items-center bg-[#d2dff4] py-[20px]">
          <div className="mt-[38px] w-full flex-col space-y-[21px] px-7">
            <Link href="ExplorarClases" className="font-work-sans text-xl text-[#213144]">
              Explorar Clases
            </Link>
          </div>
          <div className="mt-[38px] w-full flex-col space-y-[21px] px-7">
            <Link href="MisServicios" className="font-work-sans text-xl text-[#213144]">
              Mis Servicios
            </Link>
          </div>
          <div className="mt-[38px] w-full flex-col space-y-[21px] px-7">
            <Link href="ExplorarClases" className="font-work-sans text-xl text-[#213144]">
              Servicios Contratados
            </Link>
          </div>
          <div className="mt-[38px] w-full flex-col space-y-[21px] px-7">
            <Link href="Historial" className="font-work-sans text-xl text-[#213144]">
              Historial
            </Link>
          </div>
        </div>
        <div className="flex flex-col flex-1 p-5">
          {children}
        </div>
      </div>

    </div>
  );
};

export default Layout;
