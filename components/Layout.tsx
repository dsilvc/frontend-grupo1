import Link from "next/link";
import { FunctionComponent, ReactNode } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { setToken } from "./../redux/features/userSlice";
        
type LayoutProps = {
  children: React.ReactNode;
};

const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  return (
    <div className="flex flex-col">
      <div className="flex h-[6rem] w-screen items-center justify-between bg-[#283645] pl-[47.5px] pr-16">
        <div className="relative flex items-center justify-center overflow-clip">
          <Link href="/main/ExplorarClases">
            <h1 className="mb-3 text-[8rem] font-bold  font-pragati-narrow text-[#266dd869]">UC</h1>
            <h1 className="absolute inset-0 flex h-full w-full items-center justify-center font-prata text-2xl text-white text-[1.4rem]">
              Páginas Celestes
            </h1>
          </Link>
        </div>
        <div className="flex space-x-8 text-white">
          <Link href="/user/profile" className="font-prata text-1xl">
            Mi Perfil
          </Link>
          <Link href="/" className="font-prata text-1xl" onClick={() => dispatch(setToken(''))}>
            Salir
          </Link>
        </div>
      </div>
      <div className="flex flex-1">
        <div className="h-[100vh] w-[15em] flex-col items-center bg-[#d2dff4] py-[20px] sticky top-0 overflow-auto">
          <div className="mt-[38px] w-full flex-col space-y-[21px] px-7">
            <Link href="/main/ExplorarClases" className="font-work-sans text-xl text-[#213144]">
              Explorar Clases
            </Link>
          </div>
          <div className="mt-[38px] w-full flex-col space-y-[21px] px-7">
            <Link href="/main/MisServicios" className="font-work-sans text-xl text-[#213144]">
              Mis Ofertas
            </Link>
          </div>
          <div className="mt-[38px] w-full flex-col space-y-[21px] px-7">
            <Link href="/main/OfertasContactatdas" className="font-work-sans text-xl text-[#213144]">
              Ofertas Contactadas
            </Link>
          </div>
          <div className="mt-[38px] w-full flex-col space-y-[21px] px-7">
            <Link href="/main/Historial" className="font-work-sans text-xl text-[#213144]">
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
