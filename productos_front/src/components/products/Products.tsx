import { useEffect, useState, type JSX } from "react";
import { getProducts } from "../../Services/ProductService";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  is_active: boolean;
}

interface Paginación {
  current_page: number;
  last_page: number;
  total: number;
}

interface ProductResponse {
  data: Product[];
  current_page: number;
  last_page: number;
  total: number;
}

export default function Products(): JSX.Element {
  const [data, setData] = useState<Product[]>([]);
  const [meta, setMeta] = useState<Paginación>({
    current_page: 1,
    last_page: 1,
    total: 0,
  });
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false); // Estado de carga

  // Cargar productos cuando cambie la página o el término de búsqueda
  useEffect(() => {
    const load = async (): Promise<void> => {
      setIsLoading(true); // Iniciar carga
      try {
        // Obtener productos desde el servicio
        const response: ProductResponse = await getProducts(page, search);

        setData(response.data || []); // Asegurarse de que sea un array

        // Actualizar metadatos de paginación
        setMeta({
          current_page: response.current_page,
          last_page: response.last_page,
          total: response.total,
        });
        // Manejar caso donde no hay datos
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    const timer = setTimeout(load, 300);
    return () => clearTimeout(timer);
  }, [page, search]);

  // Si no hay datos y no estamos buscando nada, mostramos mensaje de carga
  if (data.length === 0 && !search) {
    return (
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/70 backdrop-blur-sm">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        <p className="text-muted-foreground animate-pulse">
          Cargando productos...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 bg-white px-4 py-2 rounded-lg shadow">
      <div className="p-3 space-y-4">
        <div className="flex justify-between items-center">
          <Input
            placeholder="Buscar productos..."
            className="max-w-sm"
            value={search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>
        <div className="rounded-md border relative rounded-md border min-h-auto">
          {/* Loader en tabla */}
          {isLoading && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/70 backdrop-blur-sm">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
              <p className="text-muted-foreground animate-pulse">
                Cargando productos...
              </p>
            </div>
          )}

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Precio</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium ps-2">
                    {product.name}
                  </TableCell>
                  <TableCell>${product.price}</TableCell>
                  {/* Stock menor a 5 resalta en rojo */}
                  <TableCell
                    className={
                      product.stock < 5
                        ? "text-red-600 font-semibold"
                        : "text-black font-normal"
                    }
                  >
                    {product.stock}
                  </TableCell>
                  <TableCell
                    className={
                      product.is_active
                        ? "text-green-600 font-semibold"
                        : "text-red-600 font-semibold"
                    }
                  >
                    {product.is_active ? "Activo" : "Inactivo"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Paginación simple */}
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            // Usamos el "?" para que si meta es undefined, no truene
            disabled={page <= 1}
            onClick={() => setPage((prev) => prev - 1)}
          >
            Anterior
          </Button>

          <div className="text-sm font-medium">
            {/* Usamos el operador de coalescencia ?? para poner un 1 por defecto */}
            Página {meta?.current_page ?? 1} de {meta?.last_page ?? 1}
          </div>

          <Button
            disabled={page >= (meta?.last_page || 1)}
            onClick={() => setPage(page + 1)}
          >
            Siguiente
          </Button>
        </div>
      </div>
    </div>
  );
}
